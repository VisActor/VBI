import { Select, Flex } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { useVBIStore } from 'src/model';

export const ChartTypeSelector = (props: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const chartType = useVBIStore((state) => state.dsl.chartType);

  const { style } = props;
  const changeChartType = (chartType: string) => {
    builder.chartType.changeChartType(chartType);
  };

  const chartTypeOptions = [
    { value: 'bar', label: '柱状图 (Bar)', icon: '📊' },
    { value: 'column', label: '条形图 (Column)', icon: '📈' },
    { value: 'line', label: '折线图 (Line)', icon: '📉' },
    { value: 'pie', label: '饼图 (Pie)', icon: '🥧' },
    { value: 'area', label: '面积图 (Area)', icon: '⬆️' },
    { value: 'scatter', label: '散点图 (Scatter)', icon: '⚪' },
  ];

  return (
    <Flex gap={4} align="center" style={style}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#1890ff',
          whiteSpace: 'nowrap',
        }}
      >
        <BarChartOutlined style={{ marginRight: 3 }} />
        图表
      </span>
      <Select
        value={chartType}
        onChange={changeChartType}
        style={{ flex: 1 }}
        placeholder="选择图表"
        options={chartTypeOptions}
        size="small"
      />
    </Flex>
  );
};
