import { List, Card, Badge, Input } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import {
  NumberOutlined,
  CalculatorOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useVBIStore } from 'src/model';

const MEASURE_COLOR = '#52c41a';

export const MeasuresList = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);

  const [schema, setSchema] = useState<
    {
      name: string;
      type: string;
    }[]
  >([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const run = async () => {
      const schema = await builder.getSchema();
      setSchema(schema);
    };
    run();
  }, [builder]);

  const handleDragStart = (
    e: React.DragEvent,
    item: { name: string; type: string },
  ) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ name: item.name, type: item.type, role: 'measure' }),
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  const addMeasure = (measureName: string) => () => {
    builder.doc.transact(() => {
      builder.measures.add(measureName, (node) => {
        node.setAlias(measureName);
        node.setAggregate({
          func: 'sum',
        });
      });
    });
  };

  const measures = schema.filter((d) => d.type === 'number');

  const filteredMeasures = useMemo(() => {
    if (!searchText.trim()) return measures;
    const searchLower = searchText.toLowerCase();
    return measures.filter((m) => m.name.toLowerCase().includes(searchLower));
  }, [measures, searchText]);

  return (
    <Card
      title={
        <span style={{ fontWeight: 600, fontSize: 11, color: '#666' }}>
          <CalculatorOutlined style={{ marginRight: 4 }} />
          度量
        </span>
      }
      style={{ ...style, borderRadius: 6 }}
      styles={{
        body: {
          padding: '0 4px 4px 4px',
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          height: 'calc(100% - 36px)',
        },
        header: {
          minHeight: 36,
          padding: '0 8px',
        },
      }}
      size="small"
    >
      <div style={{ padding: '4px 4px 8px 4px' }}>
        <Input
          prefix={<SearchOutlined style={{ fontSize: 10, color: '#bfbfbf' }} />}
          placeholder="搜索度量"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ fontSize: 11 }}
          size="small"
        />
      </div>
      <List
        size="small"
        dataSource={filteredMeasures}
        split={false}
        renderItem={(item) => (
          <List.Item style={{ padding: 0, marginBottom: 1 }}>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={addMeasure(item.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '3px 6px',
                cursor: 'pointer',
                borderRadius: 3,
                transition: 'background 0.15s ease',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(82,196,26,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Badge color={MEASURE_COLOR} style={{ marginRight: 6 }} />
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: MEASURE_COLOR,
                  fontSize: 11,
                }}
              >
                <NumberOutlined />
              </span>
              <span
                style={{
                  marginLeft: 6,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.8)',
                }}
              >
                {item.name}
              </span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};
