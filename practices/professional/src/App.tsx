/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { ConfigProvider, theme, Dropdown, Button } from 'antd';
import { LeftOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import DimensionShelf from './components/Shelfs/DimensionShelf';
import MeasureShelf from './components/Shelfs/MeasureShelf';
import { ChartTypeSelector } from './components/ChartType';
import FieldsList from './components/Fields/FieldList';
import MeasureFieldList from './components/Fields/MeasureFieldList';
import { VSeedRender } from './components/Render';
import { useVBIStore } from './model';
import { useShallow } from 'zustand/shallow';

export function APP() {
  const [leftWidth, setLeftWidth] = useState(220);
  const [dragging, setDragging] = useState(false);
  const [builderCollapsed, setBuilderCollapsed] = useState(false);

  // VBI builder 相关
  const builderRef = useRef<{
    dimensions?: {
      addDimension: (field: string, callback?: (node: unknown) => void) => void;
      removeDimension: (field: string) => void;
    };
    measures?: {
      addMeasure: (field: string, callback?: (node: unknown) => void) => void;
      removeMeasure: (field: string) => void;
      renameMeasure: (alias: string, newAlias: string) => void;
      modifyAggregate: (alias: string, func: string, quantile?: number) => void;
      getMeasures: () => any[];
    };
    chartType?: {
      changeChartType: (type: string) => void;
      getAvailableChartTypes: () => string[];
    };
    doc?: {
      transact: (callback: () => void) => void;
    };
  }>(null);

  // 可用的字段和选中的字段
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [dimensionFields, setDimensionFields] = useState<string[]>([]);
  const [measureFields, setMeasureFields] = useState<string[]>([]);
  const [measuresDetail, setMeasuresDetail] = useState<
    Record<string, { alias?: string; aggregate?: { func: string; quantile?: number } }>
  >({});
  const [chartTypeOptions, setChartTypeOptions] = useState<string[]>([]);
  const [currentChartType, setCurrentChartType] = useState<string>('table');
  const [renderKey, setRenderKey] = useState(0);
  // Track which measures came from dimensions (to restrict their aggregates)
  const [dimensionMeasures, setDimensionMeasures] = useState<string[]>([]);

  // 获取 vbi store 的状态
  const { initialize, initialized, builder, vseed } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
      builder: state.builder,
      vseed: state.vseed,
    })),
  );

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
          const dims = schema.filter((d: any) => d.type !== 'number').map((d: any) => d.name);
          const meas = schema.filter((d: any) => d.type === 'number').map((d: any) => d.name);
          setDimensions(dims);
          setMeasures(meas);
        } catch (err) {
          console.error('Failed to load schema:', err);
        }
      }
    };

    loadSchema();

    // 初始化度量字段详情
    if (builder?.measures?.getMeasures) {
      const measures = builder.measures.getMeasures();
      const detail: Record<
        string,
        { alias?: string; aggregate?: { func: string; quantile?: number } }
      > = {};

      if (Array.isArray(measures)) {
        measures.forEach((value: any) => {
          const field = value.field;
          const alias = value.alias || '';
          const aggregate = value.aggregate;
          // 使用 field 作为 key，而不是 alias
          detail[field] = {
            alias,
            aggregate: aggregate ? { func: aggregate.func, quantile: aggregate.quantile } : undefined,
          };
        });
      }

      setMeasuresDetail(detail);
    }
  }, []);

  // 加载 demo 数据
  const handleLoadDemo = async () => {
    // 数据已经通过 demoConnector 的 query 方法从云端加载
    // 字段列表已经通过 getSchema 获得
  };

  // 上传 CSV - 暂未实现，目前仅支持 demo 数据
  const handleUploadCSV = () => {
    alert('Function not yet implemented. Currently only demo data is supported.');
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
          dimensions.addDimension(field, (node: unknown) => {
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

  // 从 dimension 添加 measure（默认使用 count 聚合）
  const handleAddMeasureFromDimension = (field: string) => {
    if (!measureFields.includes(field)) {
      const newMeas = [...measureFields, field];
      setMeasureFields(newMeas);
      setDimensionMeasures((prev) => [...prev, field]);
      if (builderRef.current?.measures && builderRef.current.doc) {
        const { measures, doc } = builderRef.current;
        doc.transact(() => {
          measures.addMeasure(field, (node: unknown) => {
            const nodeObj = node as any;
            if (nodeObj?.setAlias) {
              nodeObj.setAlias(field);
            }
            // Dimension 转为 measure 时默认使用 count 聚合
            if (nodeObj?.setAggregate) {
              nodeObj.setAggregate({ func: 'count' });
            }
          });
        });
        syncMeasuresDetail();
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
      const measures = builderRef.current.measures.getMeasures();
      const detail: Record<
        string,
        { alias?: string; aggregate?: { func: string; quantile?: number } }
      > = {};

      if (Array.isArray(measures)) {
        measures.forEach((value: any) => {
          const field = value.field;
          const alias = value.alias || '';
          const aggregate = value.aggregate;
          // 使用 field 作为 key，而不是 alias
          detail[field] = {
            alias,
            aggregate: aggregate ? { func: aggregate.func, quantile: aggregate.quantile } : undefined,
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
          measures.addMeasure(field, (node: unknown) => {
            const nodeObj = node as Record<string, (field: string) => void>;
            if (nodeObj?.setAlias) {
              nodeObj.setAlias(field);
            }
          });
        });
        syncMeasuresDetail();
      }
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleRemoveMeasure = (field: string) => {
    const newMeas = measureFields.filter((m) => m !== field);
    setMeasureFields(newMeas);
    setDimensionMeasures((prev) => prev.filter((m) => m !== field));
    if (builderRef.current?.measures && builderRef.current.doc) {
      const { measures, doc } = builderRef.current;
      doc.transact(() => {
        measures.removeMeasure(field);
      });
      syncMeasuresDetail();
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
    quantile?: number
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

  // 图表类型变化
  const handleChangeChartType = (type: string) => {
    setCurrentChartType(type);
    if (builderRef.current?.chartType) {
      builderRef.current.chartType.changeChartType(type);
    }
    setRenderKey((prev) => prev + 1);
  };

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
                      onAddDimension={handleAddDimension}
                      onAddMeasure={handleAddMeasureFromDimension}
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
                <FieldsList
                  title="DIMENSIONS"
                  items={dimensionFields}
                  onAdd={handleAddDimension}
                  onRemove={handleRemoveDimension}
                  style={{ flex: 1, minHeight: 0 }}
                />
                <MeasureFieldList
                  items={measureFields}
                  measures={measuresDetail}
                  dimensionMeasures={Array.from(dimensionMeasures)}
                  onRename={handleRenameMeasure}
                  onChangeAggregate={handleChangeAggregateFunc}
                  onRemove={handleRemoveMeasure}
                  style={{ flex: 1, minHeight: 0, marginTop: 12 }}
                />
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
