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
import { VBIBuilder, VBIMeasure, VBIDimension } from '@visactor/vbi';
import { getSupportedEncodings, canDimensionBeOnEncoding, canFieldBeOnEncoding, getDefaultDimensionEncoding, getDefaultMeasureEncoding, type MeasureEncodingType, type DimensionEncodingType } from './utils/chartMeasureEncodings';
import EncodingFieldList from './components/Fields/EncodingFieldList';

export function APP() {
  const [leftWidth, setLeftWidth] = useState(220);
  const [dragging, setDragging] = useState(false);
  const [builderCollapsed, setBuilderCollapsed] = useState(false);

  // VBI builder 相关
  const builderRef = useRef<VBIBuilder | null>(null);

  // 可用的字段和选中的字段
  const [dimensions, setDimensions] = useState<string[]>([]);
  const [measures, setMeasures] = useState<string[]>([]);
  const [dimensionFields, setDimensionFields] = useState<string[]>([]);
  const [measureFields, setMeasureFields] = useState<string[]>([]);
  const [measuresDetail, setMeasuresDetail] = useState<
    Record<string, { alias?: string; aggregate?: { func: string }; encoding?: string }>
  >({});
  const [dimensionsDetail, setDimensionsDetail] = useState<
    Record<string, { alias?: string; encoding?: string }>
  >({});
  const [chartTypeOptions, setChartTypeOptions] = useState<string[]>([]);
  const [currentChartType, setCurrentChartType] = useState<string>('table');
  const [renderKey, setRenderKey] = useState(0);

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

    // 获取可用的图表类型
    if (builder?.chartType?.getAvailableChartTypes) {
      const types = builder.chartType.getAvailableChartTypes();
      setChartTypeOptions(types);
    }

    // 从 connector schema 获取可用的字段
    const loadSchema = async () => {
      const schema = await builder.getSchema();
      const dims = schema.filter((d) => d.type !== 'number').map((d) => d.name);
      const meas = schema.filter((d) => d.type === 'number').map((d) => d.name);
      setDimensions(dims);
      setMeasures(meas);
    };

    loadSchema();
  }, []);

  // 同步 measures 的详细信息（别名、聚合方式、编码）并更新 measureFields
  const syncMeasuresDetail = () => {
    if (builder?.measures) {
      const allMeasures = (builder.measures.getMeasures() as VBIMeasure[]);
      const detail: Record<string, { alias?: string; aggregate?: { func: string }; encoding?: string }> = {};
      const fields: string[] = [];
      
      allMeasures.forEach((m: VBIMeasure) => {
        const alias = m.alias;
        if (alias) {
          detail[alias] = {
            alias: m.alias,
            aggregate: m.aggregate,
            encoding: m.encoding,
          };
          fields.push(alias);
        }
      });
      setMeasuresDetail(detail);
      // 同时更新 measureFields 以保持两者一致
      setMeasureFields(fields);
    }
  };

  // 同步 dimensions 的详细信息（别名、编码）并更新 dimensionFields
  const syncDimensionsDetail = () => {
    if (builder?.dimensions) {
      const allDimensions = (builder.dimensions.getDimensions() as VBIDimension[]);
      const detail: Record<string, { alias?: string; encoding?: string }> = {};
      const fields: string[] = [];
      
      allDimensions.forEach((d: VBIDimension) => {
        const field = d.field;
        if (field) {
          detail[field] = {
            alias: d.alias,
            encoding: d.encoding,
          };
          fields.push(field);
        }
      });
      setDimensionsDetail(detail);
      // 同时更新 dimensionFields 以保持两者一致
      setDimensionFields(fields);
    }
  };

  // 加载 demo 数据
  const handleLoadDemo = async () => {
    // 数据已经通过 demoConnector 的 query 方法从云端加载
    // 字段列表已经通过 getSchema 获得
  };

  // 上传 CSV - 暂时禁用，需要 localConnector
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
    if (builder?.dimensions) {
      const defaultEncoding = getDefaultDimensionEncoding(currentChartType);
      builder.doc.transact(() => {
        builder?.dimensions.addDimension(field, (node) => {
          node.setAlias(field);
          if (defaultEncoding) {
            node.setEncoding(defaultEncoding);
          }
        });
      });
      setTimeout(() => {
        syncDimensionsDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleRemoveDimension = (field: string) => {
    if (builder?.dimensions) {
      builder.doc.transact(() => {
        builder?.dimensions.removeDimension(field);
      });
      setTimeout(() => {
        syncDimensionsDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  // 度量字段变化
  const handleAddMeasure = (field: string) => {
    if (builder?.measures) {
      const defaultEncoding = getDefaultMeasureEncoding(currentChartType);
      builder.doc.transact(() => {
        builder?.measures.addMeasure(field, (node) => {
          node.setAlias(field);
          if (defaultEncoding) {
            node.setEncoding(defaultEncoding);
          }
        });
      });
      setTimeout(() => {
        syncMeasuresDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleRenameMeasure = (field: string, alias: string) => {
    if (builder?.measures) {
      builder.doc.transact(() => {
        builder?.measures.renameMeasure(field, alias);
      });
      setTimeout(() => {
        syncMeasuresDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleChangeAggregateFunc = (field: string, func: string) => {
    if (builder?.measures) {
      builder.doc.transact(() => {
        builder?.measures.updateAggregate(field, func);
      });
      setTimeout(() => {
        syncMeasuresDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  const handleRemoveMeasure = (field: string) => {
    if (builder?.measures) {
      builder.doc.transact(() => {
        builder?.measures.removeMeasure(field);
      });
      setTimeout(() => {
        syncMeasuresDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  // 拖拽处理函数
  const handleDropDimensionToDimension = (field: string) => {
    // dimension → dimension
    handleAddDimension(field);
  };

  const handleDropDimensionToMeasure = (field: string) => {
    // dimension → measure
    handleAddMeasure(field);
  };

  const handleDropMeasureToMeasure = (field: string) => {
    // measure → measure（可能是重排）
    handleAddMeasure(field);
  };

  // 拖拽 measure 到某个 encoding 区域
  const handleDropMeasureToEncoding = (measureAlias: string, encoding: MeasureEncodingType) => {
    // 检查这个 measure 是否可以放在这个 encoding 上
    const canPlace = canFieldBeOnEncoding(currentChartType, 'measure', encoding);
    if (!canPlace) {
      alert(`Cannot place measure on ${encoding} for ${currentChartType} chart`);
      return;
    }

    if (builder?.measures) {
      builder.doc.transact(() => {
        // 关键逻辑：检查 measure 是否存在
        const allMeasures = builder.measures.getMeasures() as VBIMeasure[];
        const measureExists = allMeasures.some((m) => m.alias === measureAlias);

        if (!measureExists) {
          // 创建新的 measure
          const defaultAggregate = 'sum';
          
          builder?.measures.addMeasure(measureAlias, (node) => {
            node.setAlias(measureAlias);
            node.setAggregate({ func: defaultAggregate });
            node.setEncoding(encoding);
          });
        } else {
          // 更新已有 measure 的 encoding
          builder?.measures.updateEncoding(measureAlias, encoding);
        }
      });

      setTimeout(() => {
        syncMeasuresDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  // 获取某个 encoding 对应的 measure 列表
  const getMeasuresByEncoding = (encoding: MeasureEncodingType) => {
    return measureFields.filter((field) => {
      // measureFields contains aliases (not raw field names)
      const measure = measuresDetail[field];
      return measure?.encoding === encoding;
    });
  };

  // 获取当前 chartType 支持的 encoding
  const supportedEncodings = getSupportedEncodings(currentChartType);

  const handleDropDimensionToEncoding = (field: string, encoding: DimensionEncodingType) => {
    // 检查这个 dimension 是否可以放在这个 encoding 上
    const canPlaceDimension = canDimensionBeOnEncoding(currentChartType, encoding);
    
    // 如果 encoding 本身不支持 dimension，检查是否支持 measure
    if (!canPlaceDimension) {
      const canPlaceMeasure = canFieldBeOnEncoding(currentChartType, 'measure', encoding as MeasureEncodingType);
      if (canPlaceMeasure) {
        handleAddMeasure(field);
        return;
      }
      
      alert(`Cannot place dimension on ${encoding} for ${currentChartType} chart`);
      return;
    }

    if (builder?.dimensions) {
      builder.doc.transact(() => {
        const allDimensions = builder.dimensions.getDimensions() as VBIDimension[];
        const dimensionExists = allDimensions.some((d) => d.field === field);

        if (!dimensionExists) {
          builder?.dimensions.addDimension(field, (node) => {
            node.setAlias(field);
          });
        }
        
        builder?.dimensions.updateEncoding(field, encoding);
      });

      setTimeout(() => {
        syncDimensionsDetail();
      }, 0);
      setRenderKey((prev) => prev + 1);
    }
  };

  // 获取某个 encoding 对应的 dimension 列表
  const getDimensionsByEncoding = (encoding: DimensionEncodingType | MeasureEncodingType) => {
    return dimensionFields.filter((field) => {
      const dimension = dimensionsDetail[field];
      return dimension?.encoding === encoding;
    });
  };

  // 获取当前 chartType 支持的维度 encoding

  // 图表类型变化
  const handleChangeChartType = (type: string) => {
    setCurrentChartType(type);
    
    // 修复已存在的 dimension/measure 的 encoding - 为新的 chart type 适配
    if (builder) {
      builder.doc.transact(() => {
        // 修复 dimensions 的 encoding
        const dimensions = builder.dimensions?.getDimensions() as VBIDimension[];
        if (dimensions) {
          const defaultDimEncoding = getDefaultDimensionEncoding(type);
          dimensions.forEach(d => {
            if (!d.encoding || !canDimensionBeOnEncoding(type, d.encoding as DimensionEncodingType)) {
              if (defaultDimEncoding) {
                builder.dimensions?.updateEncoding(d.field, defaultDimEncoding);
              }
            }
          });
        }
        
        // 修复 measures 的 encoding
        const measures = builder.measures?.getMeasures() as VBIMeasure[];
        if (measures) {
          const defaultMeasEncoding = getDefaultMeasureEncoding(type);
          measures.forEach(m => {
            if (!m.encoding || !canFieldBeOnEncoding(type, 'measure', m.encoding as MeasureEncodingType)) {
              if (defaultMeasEncoding) {
                builder.measures?.updateEncoding(m.alias, defaultMeasEncoding);
              }
            }
          });
        }
      });
    }
    
    if (builder?.chartType) {
      builder.chartType.changeChartType(type);
    }
    
    setTimeout(() => {
      syncDimensionsDetail();
      syncMeasuresDetail();
    }, 0);
    
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
                      onAddMeasure={handleAddMeasure}
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
                  onDropDimension={handleDropDimensionToDimension}
                  style={{ flex: 1, minHeight: 0 }}
                />
                <MeasureFieldList
                  items={measureFields}
                  measures={measuresDetail}
                  onRemove={handleRemoveMeasure}
                  onRename={handleRenameMeasure}
                  onChangeAggregate={handleChangeAggregateFunc}
                  onDropDimension={handleDropDimensionToMeasure}
                  onDropMeasure={handleDropMeasureToMeasure}
                  style={{ flex: 1, minHeight: 0, marginTop: 12 }}
                />
                {/* 根据 chartType 生成不同的 encoding fieldlists */}
                {supportedEncodings.length > 0 && (
                  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {supportedEncodings.map((encoding) => {
                      const measuresInEncoding = getMeasuresByEncoding(encoding);
                      const dimensionsInEncoding = getDimensionsByEncoding(encoding);
                      const encodingLabels: Record<MeasureEncodingType, string> = {
                        yAxis: 'Y Axis',
                        xAxis: 'X Axis',
                        color: 'Color',
                        label: 'Label',
                        tooltip: 'Tooltip',
                        size: 'Size',
                      };
                      return (
                        <EncodingFieldList
                          key={encoding}
                          encoding={encoding}
                          label={encodingLabels[encoding]}
                          measureItems={measuresInEncoding}
                          dimensionItems={dimensionsInEncoding}
                          measures={measuresDetail}
                          dimensions={dimensionsDetail}
                          onRemoveMeasure={handleRemoveMeasure}
                          onRemoveDimension={handleRemoveDimension}
                          onRenameMeasure={handleRenameMeasure}
                          onChangeAggregateFunc={handleChangeAggregateFunc}
                          onDropMeasure={handleDropMeasureToEncoding}
                          onDropDimension={handleDropDimensionToEncoding}
                          style={{ flex: 0 }}
                        />
                      );
                    })}
                  </div>
                )}
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
