import React, { useRef, useEffect } from 'react';
import { message } from 'antd';
import { isVBIFilter } from '@visactor/vbi';
import { useVBIStore } from 'src/model';
import type { ProfessionalTheme } from 'src/constants/builder';
import VChart, { ISpec } from '@visactor/vchart';
import {
  ListTable,
  PivotTable,
  PivotChart,
  register,
  PivotChartConstructorOptions,
  ListTableConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable';
import {
  registerAll,
  VSeed,
  isPivotChart,
  isVChart,
  isPivotTable,
  isTable,
  ColorIdEncoding,
  Builder as VSeedBuilder,
} from '@visactor/vseed';

registerAll();
register.chartModule('vchart', VChart);

export const VSeedRender = (props: {
  vseed: VSeed;
  themeMode?: ProfessionalTheme;
  style?: React.CSSProperties;
}) => {
  const { vseed, themeMode = 'dark', style } = props;
  const ref = useRef<HTMLDivElement>(null);
  const vseedBuilderRef = useRef<VSeedBuilder>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    try {
      const builder = VSeedBuilder.from({ ...vseed, theme: themeMode });
      const spec = builder.build();

      vseedBuilderRef.current = builder;
      if (isPivotChart(vseed)) {
        const tableInstance = new PivotChart(
          ref.current,
          spec as PivotChartConstructorOptions,
        );

        tableInstance.on('legend_item_click', (args) => {
          tableInstance.updateFilterRules([
            {
              filterKey: ColorIdEncoding,
              filteredValues: args.value,
            },
          ]);
        });

        tableInstance.on('legend_change', (args) => {
          const maxValue = args.value[1];
          const minValue = args.value[0];
          tableInstance.updateFilterRules([
            {
              filterFunc: (record) => {
                const value = record[record[ColorIdEncoding]];
                if (value >= minValue && value <= maxValue) {
                  return true;
                }
                return false;
              },
            },
          ]);
        });

        return () => tableInstance.release();
      } else if (isVChart(vseed)) {
        const vchart = new VChart(spec as ISpec, { dom: ref.current });
        vchart.renderSync();
        return () => vchart.release();
      } else if (isTable(vseed)) {
        const tableInstance = new ListTable(
          ref.current,
          spec as ListTableConstructorOptions,
        );
        return () => tableInstance.release();
      } else if (isPivotTable(vseed)) {
        const tableInstance = new PivotTable(
          ref.current,
          spec as PivotTableConstructorOptions,
        );
        return () => tableInstance.release();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      message.error(
        '筛选器配置有误导致数据构建失败，已为您自动移除无效筛选器，请重新配置。',
      );

      const storeBuilder = useVBIStore.getState().builder;
      if (storeBuilder) {
        storeBuilder.doc.transact(() => {
          const filters = storeBuilder.whereFilter.toJSON().conditions;
          if (filters && filters.length > 0) {
            // Remove the last filter added since it's most likely the offending one
            const lastFilter = filters[filters.length - 1];
            if (isVBIFilter(lastFilter)) {
              storeBuilder.whereFilter.remove(lastFilter.id);
              window.dispatchEvent(
                new CustomEvent('vbi-filter-error', { detail: lastFilter }),
              );
            }
          }
        });
      }
    }
  }, [themeMode, vseed]);

  return (
    <div
      ref={ref}
      style={{
        height: '100%',
        width: '100%',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        ...style,
      }}
      onClick={() => {}}
    />
  );
};

// react 应用程序, 有一个非常非常重要的概念是: UI状态和业务逻辑是分离的
