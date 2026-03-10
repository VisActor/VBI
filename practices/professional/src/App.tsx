/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import { ConfigProvider, theme, Dropdown, Button } from 'antd';
import { LeftOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import DimensionShelf from './components/Shelfs/DimensionShelf';
import MeasureShelf from './components/Shelfs/MeasureShelf';
import { FilterPanel, type FilterItem } from './components/Filter/FilterPanel';

import { ChartTypeSelector } from './components/ChartType';
import FieldsList from './components/Fields/FieldList';
import MeasureFieldList from './components/Fields/MeasureFieldList';
import EncodingPanel from './components/Fields/EncodingPanel';
import { VSeedRender } from './components/Render';
import { useVBIStore } from './model';
import { useShallow } from 'zustand/shallow';
import { setLocalData } from './utils/localConnector';

type EncodingChannel =
  | 'yAxis'
  | 'xAxis'
  | 'color'
  | 'label'
  | 'tooltip'
  | 'size';

export function APP() {
  const [leftWidth, setLeftWidth] = useState(220);
  const [dragging, setDragging] = useState(false);
  const [builderCollapsed, setBuilderCollapsed] = useState(false);

  // VBI builder 相关

  const builderRef = useRef<any>(null);

  // 可用的字段和选中的字段
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [dimensionFields, setDimensionFields] = useState<string[]>([]);
  const [measureFields, setMeasureFields] = useState<string[]>([]);
  const [measuresDetail, setMeasuresDetail] = useState<
    Record<
      string,
      {
        alias?: string;
        aggregate?: { func: string; quantile?: number };
        encoding?: EncodingChannel;
      }
    >
  >({});
  const [dimensionMeasures, setDimensionMeasures] = useState<string[]>([]);
  const [chartTypeOptions, setChartTypeOptions] = useState<string[]>([]);
  const [currentChartType, setCurrentChartType] = useState<string>('table');
  const [renderKey, setRenderKey] = useState(0);

  // 获取 vbi store 的状态
  const { initialize, initialized, builder, vseed, dsl } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
      builder: state.builder,
      vseed: state.vseed,
      dsl: state.dsl,
    })),
  );

  const activeFields = useMemo(() => {
    if (!dsl) return [];
    const fields = new Set<string>();

    const extractFields = (items: any[]) => {
      items?.forEach((item) => {
        if (item && typeof item === 'object') {
          if ('field' in item && typeof item.field === 'string') {
            fields.add(item.field);
          }
          if ('children' in item && Array.isArray(item.children)) {
            extractFields(item.children);
          }
        }
      });
    };

    extractFields(dsl.dimensions || []);
    extractFields(dsl.measures || []);
    return Array.from(fields);
  }, [dsl]);

  const [allFields, setAllFields] = useState<
    { name: string; role: 'dimension' | 'measure' }[]
  >([]);
  const [filters, setFilters] = useState<FilterItem[]>([]);

  useEffect(() => {
    const handleFilterError = () => {
      setFilters((prev) => prev.slice(0, -1));
    };
    window.addEventListener('vbi-filter-error', handleFilterError);
    return () =>
      window.removeEventListener('vbi-filter-error', handleFilterError);
  }, []);

  useEffect(() => {
    if (initialized && builder) {
      const fetchSchema = async () => {
        const schema = await builder.getSchema();
        setAllFields(
          schema.map((s: { name: string; type: string }) => ({
            name: s.name,
            role: s.type === 'number' ? 'measure' : 'dimension',
          })),
        );
      };
      fetchSchema();
    }
  }, [initialized, builder]);

  const handleFilterChange = (newFilters: FilterItem[]) => {
    setFilters(newFilters);
    if (builder) {
      builder.doc.transact(() => {
        builder.where.clear();
        newFilters.forEach((f) => {
          builder.where.add(f.field, (node) => {
            node.setOperator(f.operator);
            node.setValue(f.value);
          });
        });
      });
      setRenderKey((prev) => prev + 1);
    }
  };

  // 初始化
  useEffect(() => {
    initialize();
    builderRef.current = builder;
    // setCurrentBuilder(builder);

    // 获取可用的图表类型
    if (builder?.chartType?.getAvailableChartTypes) {
      const types = builder.chartType.getAvailableChartTypes();
      setChartTypeOptions(types);
    }

    // 从 connector schema 获取可用的字段
    const loadSchema = async () => {
      if (builder?.getSchema) {
        try {
          const schema = await builder.getSchema();
          const dims = schema
            .filter((d: any) => d.type !== 'number')
            .map((d: any) => d.name);
          const meas = schema
            .filter((d: any) => d.type === 'number')
            .map((d: any) => d.name);
          setDimensions(dims);
          setMeasures(meas);
        } catch (err) {
          console.error('Failed to load schema:', err);
        }
      }
    };

    loadSchema();

    // 初始化度量字段详情
    if (builder?.measures?.toJson) {
      const measures = builder.measures.toJson();
      const detail: Record<
        string,
        {
          alias?: string;
          aggregate?: { func: string; quantile?: number };
          encoding?: EncodingChannel;
        }
      > = {};

      if (Array.isArray(measures)) {
        measures.forEach((value: any) => {
          const field = value.field;
          const alias = value.alias || '';
          const aggregate = value.aggregate;
          // 使用 field 作为 key，而不是 alias
          detail[field] = {
            alias,
            aggregate: aggregate
              ? { func: aggregate.func, quantile: aggregate.quantile }
              : undefined,
            encoding: value.encoding,
          };
        });
      }

      setMeasuresDetail(detail);
    }
  }, []);

  // Compute encoding information from DSL as the single source of truth
  const encodingInfo = useMemo(() => {
    if (!measureFields.length) {
      return [];
    }

    const map: Record<string, string[]> = {};

    for (const field of measureFields) {
      const detail = measuresDetail[field];
      const encoding = detail?.encoding ?? 'yAxis';
      const displayName = detail?.alias || field;

      if (!map[encoding]) {
        map[encoding] = [];
      }
      map[encoding].push(displayName);
    }

    return Object.entries(map).map(([encoding, measures]) => ({
      encoding,
      measures,
    }));
  }, [measureFields, measuresDetail]);

  // Compute supported encodings for current chart type
  const supportedEncodings = useMemo(() => {
    return [];
  }, [currentChartType]);

  // 加载 demo 数据
  const handleLoadDemo = async () => {
    try {
      const url = 'https://visactor.github.io/VBI/dataset/supermarket.csv';
      const response = await fetch(url);
      const csv = await response.text();

      const lines = csv.split('\n');
      const headers = lines[0].split(',').map((h: string) => h.trim());
      const data = lines
        .slice(1)
        .map((line: string) => {
          const values = line.split(',').map((v: string) => v.trim());
          const row: Record<string, unknown> = {};
          headers.forEach((header: string, index: number) => {
            const value = values[index];
            row[header] = isNaN(Number(value)) ? value : Number(value);
          });
          return row;
        })
        .filter((row: Record<string, unknown>) =>
          Object.values(row).some((v) => v !== ''),
        );

      // 设置本地数据
      setLocalData(data);

      // 识别维度和度量
      if (data.length > 0) {
        const dims = headers.filter((h: string) => isNaN(Number(data[0]?.[h])));
        const meas = headers.filter(
          (h: string) => !isNaN(Number(data[0]?.[h])),
        );
        setDimensions(dims.length > 0 ? dims : headers.slice(0, 3));
        setMeasures(meas.length > 0 ? meas : headers.slice(3));
        setDimensionFields([]);
        setMeasureFields([]);
      }

      console.log('Demo 数据已加载');
    } catch (err) {
      console.error('加载 Demo 数据失败:', err);
    }
  };

  // 上传 CSV
  const handleUploadCSV = () => {
    alert(
      'Function not yet implemented. Currently only demo data is supported.',
    );
  };

  const dataMenuItems = [
    { key: 'demo', label: 'Demo Data' },
    { key: 'csv', label: 'Upload CSV' },
  ];

  const handleDataMenuClick = ({ key }: { key: string }) => {
    if (key === 'demo') {
      handleLoadDemo();
    } else if (key === 'csv') {
      handleUploadCSV();
    }
  };

  // 维度字段变化
  const handleAddDimension = (field: string) => {
    if (!dimensionFields.includes(field)) {
      const newDims = [...dimensionFields, field];
      setDimensionFields(newDims);
      if (builderRef.current?.dimensions && builderRef.current.doc) {
        const { dimensions, doc } = builderRef.current;
        doc.transact(() => {
          dimensions.add(field, (node: unknown) => {
            const nodeObj = node as Record<string, (field: string) => void>;
            if (nodeObj?.setAlias) {
              nodeObj.setAlias(field);
            }
          });
        });
      }
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleRemoveDimension = (field: string) => {
    const newDims = dimensionFields.filter((d) => d !== field);
    setDimensionFields(newDims);
    if (builderRef.current?.dimensions && builderRef.current.doc) {
      const { dimensions, doc } = builderRef.current;
      doc.transact(() => {
        dimensions.removeDimension(field);
      });
    }
    setRenderKey((prev) => prev + 1);
  };

  // 同步度量字段详情
  const syncMeasuresDetail = () => {
    if (builderRef.current?.measures) {
      const measures = builderRef.current.measures.toJson();
      const detail: Record<
        string,
        {
          alias?: string;
          aggregate?: { func: string; quantile?: number };
          encoding?: EncodingChannel;
        }
      > = {};

      if (Array.isArray(measures)) {
        measures.forEach((value: any) => {
          const field = value.field;
          const alias = value.alias || '';
          const aggregate = value.aggregate;
          // 使用 field 作为 key，而不是 alias
          detail[field] = {
            alias,
            aggregate: aggregate
              ? { func: aggregate.func, quantile: aggregate.quantile }
              : undefined,
            encoding: value.encoding,
          };
        });
      }

      setMeasuresDetail(detail);
    }
  };

  // 度量字段变化
  const handleAddMeasure = (field: string) => {
    if (!measureFields.includes(field)) {
      const newMeas = [...measureFields, field];
      setMeasureFields(newMeas);
      if (builderRef.current?.measures && builderRef.current.doc) {
        const { measures, doc } = builderRef.current;
        doc.transact(() => {
          measures.add(field, (node: unknown) => {
            const nodeObj = node as Record<string, (field: string) => void>;
            if (nodeObj?.setAlias) {
              nodeObj.setAlias(field);
            }
          });
        });
      }
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleRemoveMeasure = (field: string) => {
    const newMeas = measureFields.filter((m) => m !== field);
    setMeasureFields(newMeas);
    if (builderRef.current?.measures && builderRef.current.doc) {
      const { measures, doc } = builderRef.current;
      doc.transact(() => {
        measures.removeMeasure(field);
      });
    }
    setRenderKey((prev) => prev + 1);
  };

  const handleRenameMeasure = (field: string, newAlias: string) => {
    if (builderRef.current?.measures && builderRef.current.doc) {
      const { measures, doc } = builderRef.current;
      doc.transact(() => {
        measures.renameMeasure(field, newAlias);
      });
      // measureFields 存的是 field，不需要改
      syncMeasuresDetail();
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleChangeAggregateFunc = (
    field: string,
    func: string,
    quantile?: number,
  ) => {
    if (builderRef.current?.measures && builderRef.current.doc) {
      const { measures, doc } = builderRef.current;
      doc.transact(() => {
        measures.modifyAggregate(field, func, quantile);
      });
      syncMeasuresDetail();
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleAddMeasureFromDimension = (field: string) => {
    if (!builderRef.current?.measures || !builderRef.current.doc) {
      return;
    }

    const { measures, doc } = builderRef.current;
    const hasMeasure = measureFields.includes(field);

    if (!hasMeasure) {
      doc.transact(() => {
        measures.add(field, (node: unknown) => {
          const nodeObj = node as any;
          if (nodeObj?.setAlias) {
            nodeObj.setAlias(field);
          }
          if (nodeObj?.setAggregate) {
            nodeObj.setAggregate({ func: 'count' });
          }
        });
      });
      setMeasureFields((prev) => [...prev, field]);
      setDimensionMeasures((prev) => [...prev, field]);
      syncMeasuresDetail();
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleDropMeasureToEncoding = (
    field: string,
    encoding: EncodingChannel,
  ) => {
    if (!builderRef.current?.measures || !builderRef.current.doc) {
      return;
    }

    const { measures, doc } = builderRef.current;
    const hasMeasure = measureFields.includes(field);

    return;

    doc.transact(() => {
      if (hasMeasure) {
        measures.modifyEncoding(field, encoding);
      } else {
        measures.add(field);
        measures.modifyEncoding(field, encoding);
      }
    });

    if (!hasMeasure) {
      setMeasureFields((prev) => [...prev, field]);
    }

    syncMeasuresDetail();
    setRenderKey((prev) => prev + 1);
  };

  const handleDropDimensionToEncoding = (
    field: string,
    encoding: EncodingChannel,
  ) => {
    if (!builderRef.current?.measures || !builderRef.current.doc) {
      return;
    }

    const { measures, doc } = builderRef.current;
    const hasMeasure = measureFields.includes(field);

    return;

    doc.transact(() => {
      if (hasMeasure) {
        // Already added as measure, just modify encoding
        measures.modifyEncoding(field, encoding);
      } else {
        // Add dimension as measure with count aggregate
        measures.add(field, (node: unknown) => {
          const nodeObj = node as any;
          if (nodeObj?.setAlias) {
            nodeObj.setAlias(field);
          }
          if (nodeObj?.setAggregate) {
            nodeObj.setAggregate({ func: 'count' });
          }
        });
        measures.modifyEncoding(field, encoding);
      }
    });

    if (!hasMeasure) {
      setMeasureFields((prev) => [...prev, field]);
      setDimensionMeasures((prev) => [...prev, field]);
    }

    syncMeasuresDetail();
    setRenderKey((prev) => prev + 1);
  };

  // 图表类型变化
  const handleChangeChartType = (type: string) => {
    setCurrentChartType(type);
    if (builderRef.current?.chartType) {
      builderRef.current.chartType.changeChartType(type);
    }
    setRenderKey((prev) => prev + 1);
  };

  // 数据筛选变化

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => {
      setLeftWidth((w) => Math.max(140, Math.min(400, w + e.movementX)));
    };

    const onUp = () => {
      setDragging(false);
      document.body.style.userSelect = '';
    };

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  if (!initialized) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="app-root">
        <div className="builder-layout">
          {!builderCollapsed && (
            <>
              <div className="left-panel" style={{ width: leftWidth }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 12,
                  }}
                  className="title left-panel-title"
                >
                  Data
                  <Dropdown
                    menu={{
                      items: dataMenuItems,
                      onClick: handleDataMenuClick,
                    }}
                    placement="bottomRight"
                  >
                    <Button
                      type="text"
                      size="small"
                      icon={<UploadOutlined />}
                      style={{ color: '#e0e0e0' }}
                    />
                  </Dropdown>
                </div>
                {(dimensions.length > 0 || measures.length > 0) && (
                  <div style={{ padding: '0 12px' }}>
                    <FilterPanel
                      fields={
                        allFields.length > 0
                          ? allFields
                          : [
                              ...dimensions.map((d) => ({
                                name: d,
                                role: 'dimension' as const,
                              })),
                              ...measures.map((m) => ({
                                name: m,
                                role: 'measure' as const,
                              })),
                            ]
                      }
                      activeFields={activeFields}
                      filters={filters}
                      onChange={handleFilterChange}
                    />
                  </div>
                )}
                {dimensions.length > 0 && (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#999',
                        padding: '8px 12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Dimensions
                    </div>
                    <DimensionShelf
                      items={dimensions}
                      onAdd={handleAddDimension}
                      existingFields={dimensionFields}
                    />
                  </>
                )}
                {measures.length > 0 && (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#999',
                        padding: '8px 12px',
                        fontWeight: 'bold',
                      }}
                    >
                      Measures
                    </div>
                    <MeasureShelf
                      items={measures}
                      onAdd={handleAddMeasure}
                      existingFields={measureFields}
                    />
                  </>
                )}
                {dimensions.length === 0 && measures.length === 0 && (
                  <div
                    style={{
                      fontSize: 12,
                      color: '#666',
                      padding: '20px 12px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <UploadOutlined style={{ fontSize: 24, color: '#999' }} />
                    <div>点击右上角上传数据</div>
                  </div>
                )}
              </div>
              <div
                className="splitter"
                onMouseDown={() => setDragging(true)}
              ></div>
              <div className="middle-panel">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px',
                  }}
                >
                  <ChartTypeSelector
                    value={currentChartType}
                    options={chartTypeOptions}
                    onChange={handleChangeChartType}
                  />
                  <button
                    className="collapse-btn"
                    onClick={() => setBuilderCollapsed(true)}
                  >
                    <LeftOutlined />
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '12px',
                    padding: '0 12px 12px 12px',
                    flex: 1,
                    minHeight: 0,
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Panel: Configuration */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0',
                      backgroundColor: '#1a1b33',
                      borderRadius: '4px',
                      border: '1px solid #2a2b4d',
                      overflow: 'hidden',
                    }}
                  >
                    <FieldsList
                      title="DIMENSIONS"
                      items={dimensionFields}
                      onAdd={handleAddDimension}
                      onRemove={handleRemoveDimension}
                      onDropDimension={handleAddDimension}
                      style={{ flex: 1, minHeight: 0 }}
                    />
                    <MeasureFieldList
                      items={measureFields}
                      measures={measuresDetail}
                      dimensionMeasures={Array.from(dimensionMeasures)}
                      onRename={handleRenameMeasure}
                      onChangeAggregate={handleChangeAggregateFunc}
                      onRemove={handleRemoveMeasure}
                      onDropDimension={handleAddMeasureFromDimension}
                      style={{
                        flex: 1,
                        minHeight: 0,
                        borderTop: '1px solid #2a2b4d',
                      }}
                    />
                  </div>

                  {/* Bottom Panel: Encoding */}
                  <div
                    style={{
                      backgroundColor: '#1a1b33',
                      borderRadius: '4px',
                      border: '1px solid #2a2b4d',
                      overflow: 'auto',
                      minHeight: '200px',
                    }}
                  >
                    <EncodingPanel
                      supportedEncodings={supportedEncodings}
                      encodingInfo={encodingInfo}
                      onDropMeasureToEncoding={handleDropMeasureToEncoding}
                      onDropDimensionToEncoding={handleDropDimensionToEncoding}
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="canvas-panel">
            {builderCollapsed && (
              <button
                className="expand-btn"
                onClick={() => setBuilderCollapsed(false)}
              >
                <RightOutlined />
              </button>
            )}
            {vseed && <VSeedRender key={renderKey} vseed={vseed} />}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default APP;
