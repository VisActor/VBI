import { useRef, useEffect } from 'react';
import VChart from '@visactor/vchart';
import type { ISpec } from '@visactor/vchart';
import {
  ListTable,
  PivotTable,
  PivotChart,
  register,
  type PivotChartConstructorOptions,
  type ListTableConstructorOptions,
  type PivotTableConstructorOptions,
} from '@visactor/vtable';
import {
  registerAll,
  type VSeed,
  ColorIdEncoding,
  isPivotChart,
  isVChart,
  isPivotTable,
  isTable,
  Builder as VSeedBuilder,
} from '@visactor/vseed';

registerAll();
register.chartModule('vchart', VChart);

export interface VSeedRenderProps {
  vseed: VSeed;
  style?: React.CSSProperties;
}

export const VSeedRender = (props: VSeedRenderProps) => {
  const { vseed, style } = props;
  const ref = useRef<HTMLDivElement>(null);
  const vseedBuilderRef = useRef<VSeedBuilder | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const theme = 'light';
    const builder = VSeedBuilder.from({ ...vseed, theme });
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
  }, [vseed]);

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

export default VSeedRender;
