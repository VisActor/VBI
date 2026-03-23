import { useEffect, useMemo, useState } from 'react';
import type {
  VBIBuilder,
  VBIDimension,
  VBIHavingAggregate,
  VBIMeasure,
} from '@visactor/vbi';
import { isVBIHavingFilter } from '@visactor/vbi';
import './App.css';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Empty,
  InputNumber,
  Segmented,
  Spin,
  theme,
  Tooltip,
} from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import {
  LeftOutlined,
  MoonOutlined,
  RedoOutlined,
  RightOutlined,
  SunOutlined,
  UndoOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import DimensionShelf from './components/Shelfs/DimensionShelf';
import MeasureShelf from './components/Shelfs/MeasureShelf';
import { FilterPanel, type FilterItem } from './components/Filter/FilterPanel';
import { HavingFilterPanel } from './components/Filter/HavingFilterPanel';
import { ChartTypeSelector } from './components/ChartType';
import DimensionFieldList from './components/Fields/DimensionFieldList';
import MeasureFieldList from './components/Fields/MeasureFieldList';
import EncodingPanel, {
  type MeasureEncodingInfo,
} from './components/Fields/EncodingPanel';
import { VSeedRender } from './components/Render';
import { useTranslation } from './i18n';
import { useVBIStore } from './model';
import { useShallow } from 'zustand/shallow';
import {
  useVBIBuilder,
  useVBIChartType,
  useVBIDimensions,
  useVBIHavingFilter,
  useVBIMeasures,
  useVBISchemaFields,
  useVBIUndoManager,
  useVBIWhereFilter,
} from './hooks';
import { setLocalDataWithSchema } from './utils/localConnector';
import { parseCsv } from './utils/parseCsv';
import { supermarketSchema } from './utils/supermarketSchema';
import {
  PROFESSIONAL_DEFAULT_LIMIT,
  type ProfessionalLocale,
  type ProfessionalTheme,
} from './constants/builder';

const ANT_LOCALES = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const;

const createThemeConfig = (themeMode: ProfessionalTheme) => ({
  algorithm:
    themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: themeMode === 'dark' ? '#6c8cff' : '#275df5',
    borderRadius: 12,
    controlHeight: 30,
    fontSize: 12,
  },
});

const normalizeLimit = (value: number) => Math.max(1, Math.round(value));
type MeasureEncoding = NonNullable<VBIMeasure['encoding']>;
type MeasureAggregate = NonNullable<VBIMeasure['aggregate']>;
type DimensionEncoding = NonNullable<VBIDimension['encoding']>;
type DimensionAggregate = NonNullable<VBIDimension['aggregate']>;

const clearBuilderState = (builder: VBIBuilder) => {
  const dimensionIds = builder.dimensions.toJSON().map((item) => item.id).reverse();
  const measureIds = builder.measures.toJSON().map((item) => item.id).reverse();

  builder.doc.transact(() => {
    dimensionIds.forEach((id) => {
      builder.dimensions.remove(id);
    });
    measureIds.forEach((id) => {
      builder.measures.remove(id);
    });
    builder.whereFilter.clear();
    builder.havingFilter.clear();
  });

  builder.chartType.changeChartType('table');
  builder.limit.setLimit(PROFESSIONAL_DEFAULT_LIMIT);
};

export function APP() {
  const [leftWidth, setLeftWidth] = useState(244);
  const [dragging, setDragging] = useState(false);
  const [builderCollapsed, setBuilderCollapsed] = useState(false);
  const [schemaRefreshKey, setSchemaRefreshKey] = useState(0);

  const { initialize, initialized, builder, vseed } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
      builder: state.builder,
      vseed: state.vseed,
    })),
  );
  const { locale, setLocale, t } = useTranslation();
  const { theme: themeMode, setTheme, limit, setLimit } = useVBIBuilder(builder);
  const { chartType, changeChartType, availableChartTypes } =
    useVBIChartType(builder);
  const { schemaFields, fieldRoleMap, fieldTypeMap } = useVBISchemaFields(
    builder,
    schemaRefreshKey,
  );
  const { dimensions, addDimension, removeDimension, updateDimension } =
    useVBIDimensions(builder);
  const {
    filters: havingFilters,
    rootOperator: havingRootOperator,
    setRootOperator: setHavingRootOperator,
    replaceFilters: replaceHavingFilters,
  } = useVBIHavingFilter(builder);
  const { measures, addMeasure, removeMeasure, updateMeasure } =
    useVBIMeasures(builder);
  const {
    flatFilters,
    rootOperator: whereRootOperator,
    setRootOperator: setWhereRootOperator,
    replaceFilters,
  } = useVBIWhereFilter(builder);
  const { canUndo, canRedo, undo, redo } = useVBIUndoManager(builder);

  useEffect(() => {
    return initialize();
  }, [initialize]);

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setLeftWidth((width) => Math.max(180, Math.min(360, width + event.movementX)));
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

  const availableDimensions = useMemo(() => {
    return schemaFields
      .filter((field) => field.role === 'dimension')
      .map((field) => field.name);
  }, [schemaFields]);

  const availableMeasures = useMemo(() => {
    return schemaFields
      .filter((field) => field.role === 'measure')
      .map((field) => field.name);
  }, [schemaFields]);

  const dimensionFields = useMemo(() => {
    return dimensions.map((item) => item.field);
  }, [dimensions]);

  const measureFields = useMemo(() => {
    return measures.map((item) => item.field);
  }, [measures]);

  const measureDetails = useMemo(() => {
    return Object.fromEntries(
      measures.map((item) => [
        item.field,
        {
          alias: item.alias,
          aggregate: item.aggregate,
          encoding: item.encoding,
        },
      ]),
    );
  }, [measures]);

  const dimensionMeasureFields = useMemo(() => {
    return measures
      .filter((item) => fieldRoleMap[item.field] === 'dimension')
      .map((item) => item.field);
  }, [fieldRoleMap, measures]);

  const encodingInfo = useMemo<MeasureEncodingInfo[]>(() => {
    const grouped = new Map<MeasureEncoding, string[]>();

    measures.forEach((measureItem) => {
      const encoding = measureItem.encoding;
      if (!encoding) {
        return;
      }

      const list = grouped.get(encoding) ?? [];
      list.push(measureItem.alias || measureItem.field);
      grouped.set(encoding, list);
    });

    return Array.from(grouped.entries()).map(
      ([encoding, assignedMeasures]) => ({
        encoding,
        measures: assignedMeasures,
      }),
    );
  }, [measures]);

  const activeFields = useMemo(() => {
    return Array.from(new Set([...dimensionFields, ...measureFields]));
  }, [dimensionFields, measureFields]);

  const allFields = useMemo(() => {
    return schemaFields.map(({ name, role }) => ({ name, role }));
  }, [schemaFields]);

  const filterItems = useMemo<FilterItem[]>(() => {
    return flatFilters.map((item) => ({
      field: item.field,
      operator: item.op,
      value: item.value,
    }));
  }, [flatFilters]);

  const supportedEncodings =
    (builder?.chartType.getSupportedMeasureEncodings() ?? []) as MeasureEncoding[];
  const supportedDimensionEncodings =
    (builder?.chartType.getSupportedDimensionEncodings() ?? []) as DimensionEncoding[];

  const havingFilterItems = useMemo(() => {
    return havingFilters
      .filter(isVBIHavingFilter)
      .map((item) => ({
        field: item.field,
        aggregate: item.aggregate,
        operator: item.op,
        value: item.value,
      }));
  }, [havingFilters]);

  const antdLocale = ANT_LOCALES[locale];
  const themeConfig = useMemo(() => createThemeConfig(themeMode), [themeMode]);

  const addFieldAsDimension = (field: string) => {
    if (dimensionFields.includes(field)) {
      return;
    }

    addDimension(field, (node) => {
      node.setAlias(field);
    });
  };

  const findMeasureByField = (field: string) => {
    return measures.find((item) => item.field === field);
  };

  const addFieldAsMeasure = (field: string, encoding?: MeasureEncoding) => {
    if (findMeasureByField(field)) {
      return;
    }

    addMeasure(field, (node) => {
      node.setAlias(field);
      if (fieldRoleMap[field] === 'dimension') {
        node.setAggregate({ func: 'count' });
      }
      if (encoding) {
        node.setEncoding(encoding);
      }
    });
  };

  const handleRenameDimension = (id: string, alias: string) => {
    updateDimension(id, (node) => {
      node.setAlias(alias);
    });
  };

  const handleChangeDimensionEncoding = (
    id: string,
    encoding: DimensionEncoding,
  ) => {
    updateDimension(id, (node) => {
      node.setEncoding(encoding);
    });
  };

  const handleChangeDimensionAggregate = (
    id: string,
    aggregate?: DimensionAggregate,
  ) => {
    updateDimension(id, (node) => {
      if (aggregate) {
        node.setAggregate(aggregate);
      } else {
        node.clearAggregate();
      }
    });
  };

  const handleRemoveMeasure = (field: string) => {
    const target = findMeasureByField(field);
    if (target) {
      removeMeasure(target.id);
    }
  };

  const handleRenameMeasure = (field: string, alias: string) => {
    const target = findMeasureByField(field);
    if (!target) {
      return;
    }

    updateMeasure(target.id, (node) => {
      node.setAlias(alias);
    });
  };

  const handleChangeAggregateFunc = (
    field: string,
    func: MeasureAggregate['func'],
    quantile?: number,
  ) => {
    const target = findMeasureByField(field);
    if (!target) {
      return;
    }

    updateMeasure(target.id, (node) => {
      const aggregate: MeasureAggregate =
        func === 'quantile' ? { func, quantile } : { func };
      node.setAggregate(aggregate);
    });
  };

  const handleDropMeasureToEncoding = (
    field: string,
    encoding: MeasureEncoding,
  ) => {
    const target = findMeasureByField(field);
    if (!target) {
      addFieldAsMeasure(field, encoding);
      return;
    }

    updateMeasure(target.id, (node) => {
      node.setEncoding(encoding);
    });
  };

  const handleDropDimensionToEncoding = (
    field: string,
    encoding: MeasureEncoding,
  ) => {
    const target = findMeasureByField(field);
    if (!target) {
      addMeasure(field, (node) => {
        node.setAlias(field);
        node.setAggregate({ func: 'count' });
        node.setEncoding(encoding);
      });
      return;
    }

    updateMeasure(target.id, (node) => {
      node.setEncoding(encoding);
      node.setAggregate({ func: 'count' });
    });
  };

  const handleFilterChange = (nextFilters: FilterItem[]) => {
    replaceFilters(nextFilters);
  };

  const handleHavingChange = (
    nextFilters: Array<{
      field: string;
      aggregate: VBIHavingAggregate;
      operator: string;
      value: unknown;
    }>,
  ) => {
    replaceHavingFilters(nextFilters);
  };

  const handleLoadDemo = async () => {
    try {
      const response = await fetch(
        'https://visactor.github.io/VBI/dataset/supermarket.csv',
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch demo data: ${response.status}`);
      }

      const csv = await response.text();
      const [headerRow = [], ...dataRows] = parseCsv(csv);
      const headers = headerRow.map((item: string) => item.trim());
      const schemaByName = new Map(
        supermarketSchema.map((field) => [field.name, field.type]),
      );

      const data = dataRows
        .map((values: string[]) => {
          const row: Record<string, unknown> = {};
          headers.forEach((header: string, index: number) => {
            const rawValue = values[index]?.trim() ?? '';
            row[header] =
              schemaByName.get(header) === 'number'
                ? rawValue === ''
                  ? null
                  : Number(rawValue)
                : rawValue;
          });
          return row;
        })
        .filter((row) => Object.values(row).some((value) => value !== '' && value !== null));

      setLocalDataWithSchema(data, supermarketSchema);
      clearBuilderState(builder);
      setSchemaRefreshKey((value) => value + 1);
    } catch (error) {
      console.error('Failed to load demo data:', error);
    }
  };

  const handleUploadCsv = () => {
    window.alert('CSV upload is not connected yet.');
  };

  if (!initialized) {
    return (
      <ConfigProvider locale={antdLocale} theme={themeConfig} componentSize="small">
        <Spin tip={t('appInitializing')} fullscreen />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider locale={antdLocale} theme={themeConfig} componentSize="small">
      <div className={`app-root app-root-${themeMode}`}>
        <div className="builder-layout">
          {!builderCollapsed && (
            <>
              <div className="left-panel" style={{ width: leftWidth }}>
                <div className="builder-toolbar">
                  <div className="builder-toolbar-main">
                    <ChartTypeSelector
                      value={chartType}
                      options={availableChartTypes}
                      onChange={changeChartType}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <InputNumber
                      min={1}
                      step={50}
                      value={limit}
                      onChange={(value) => {
                        if (typeof value === 'number') {
                          setLimit(normalizeLimit(value));
                        }
                      }}
                      style={{ width: 96 }}
                      addonBefore={t('toolbarRows')}
                    />
                    <Button
                      className="collapse-btn"
                      onClick={() => setBuilderCollapsed(true)}
                      icon={<LeftOutlined />}
                    />
                  </div>
                  <div className="builder-toolbar-meta">
                    <div className="toolbar-actions">
                      <Tooltip title={t('toolbarUndo')}>
                        <Button
                          icon={<UndoOutlined />}
                          disabled={!canUndo}
                          onClick={() => undo()}
                        />
                      </Tooltip>
                      <Tooltip title={t('toolbarRedo')}>
                        <Button
                          icon={<RedoOutlined />}
                          disabled={!canRedo}
                          onClick={() => redo()}
                        />
                      </Tooltip>
                    </div>
                    <Segmented<ProfessionalLocale>
                      value={locale}
                      options={[
                        { label: '中', value: 'zh-CN' },
                        { label: 'EN', value: 'en-US' },
                      ]}
                      onChange={(value) => setLocale(value)}
                    />
                    <Segmented<ProfessionalTheme>
                      value={themeMode}
                      options={[
                        { label: <SunOutlined />, value: 'light' },
                        { label: <MoonOutlined />, value: 'dark' },
                      ]}
                      onChange={(value) => setTheme(value)}
                    />
                  </div>
                </div>

                <div className="left-panel-header">
                  <span className="title">{t('toolbarData')}</span>
                  <Dropdown
                    menu={{
                      items: [
                        { key: 'demo', label: t('toolbarLoadDemo') },
                        { key: 'csv', label: t('toolbarUploadCsv') },
                      ],
                      onClick: ({ key }) => {
                        if (key === 'demo') {
                          void handleLoadDemo();
                        } else {
                          handleUploadCsv();
                        }
                      },
                    }}
                    placement="bottomRight"
                  >
                    <Button type="text" icon={<UploadOutlined />} />
                  </Dropdown>
                </div>

                <div className="left-panel-scroll">
                  <div className="panel-card">
                    <FilterPanel
                      fields={allFields}
                      activeFields={activeFields}
                      filters={filterItems}
                      rootOperator={whereRootOperator}
                      onRootOperatorChange={setWhereRootOperator}
                      onChange={handleFilterChange}
                    />
                  </div>

                  <div className="panel-card">
                    <HavingFilterPanel
                      fields={allFields}
                      filters={havingFilterItems}
                      rootOperator={havingRootOperator}
                      onRootOperatorChange={setHavingRootOperator}
                      onChange={handleHavingChange}
                    />
                  </div>

                  <div className="panel-section-title">
                    {t('fieldsAvailableDimensions')}
                  </div>
                  <DimensionShelf
                    items={availableDimensions}
                    onAdd={addFieldAsDimension}
                    existingFields={dimensionFields}
                  />

                  <div className="panel-section-title">
                    {t('fieldsAvailableMeasures')}
                  </div>
                  <MeasureShelf
                    items={availableMeasures}
                    onAdd={(field) => addFieldAsMeasure(field)}
                    existingFields={measureFields}
                  />

                  {schemaFields.length === 0 && (
                    <div className="data-hint">{t('dataHint')}</div>
                  )}
                </div>
              </div>

              <div className="splitter" onMouseDown={() => setDragging(true)} />

              <div className="middle-panel">
                <div className="middle-panel-scroll">
                  <div className="panel-card panel-stack">
                    <DimensionFieldList
                      items={dimensions}
                      fieldTypeMap={fieldTypeMap}
                      supportedEncodings={supportedDimensionEncodings}
                      onRemove={removeDimension}
                      onRename={handleRenameDimension}
                      onChangeEncoding={handleChangeDimensionEncoding}
                      onChangeAggregate={handleChangeDimensionAggregate}
                      onDropDimension={addFieldAsDimension}
                    />
                    <MeasureFieldList
                      items={measureFields}
                      measures={measureDetails}
                      dimensionMeasures={dimensionMeasureFields}
                      onRename={handleRenameMeasure}
                      onChangeAggregate={handleChangeAggregateFunc}
                      onRemove={handleRemoveMeasure}
                      onDropDimension={(field) => addFieldAsMeasure(field)}
                    />
                  </div>

                  <div className="panel-card encoding-card">
                    <EncodingPanel
                      supportedEncodings={supportedEncodings}
                      encodingInfo={encodingInfo}
                      onDropMeasureToEncoding={handleDropMeasureToEncoding}
                      onDropDimensionToEncoding={handleDropDimensionToEncoding}
                      title={t('encodingTitle')}
                      emptyText={t('encodingEmpty')}
                      dropText={t('encodingDrop')}
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="canvas-panel">
            {builderCollapsed && (
              <Button
                className="expand-btn"
                icon={<RightOutlined />}
                onClick={() => setBuilderCollapsed(false)}
              />
            )}
            {vseed ? (
              <VSeedRender vseed={vseed} themeMode={themeMode} />
            ) : (
              <Empty
                className="canvas-empty"
                description={t('canvasEmpty')}
              />
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default APP;
