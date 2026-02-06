import { List, Card } from 'antd';
import { useEffect, useState } from 'react';
import { NumberOutlined } from '@ant-design/icons';
import { useVBIStore } from 'src/model';

export const MeasuresList = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);

  const [schema, setSchema] = useState<
    {
      name: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    const run = async () => {
      const schema = await builder.getSchema();
      setSchema(schema);
    };
    run();
  }, [builder]);

  const measures = schema.filter((d) => d.type === 'number');

  const addMeasure = (measureName: string) => () => {
    builder.doc.transact(() => {
      builder.measures.addMeasure(measureName, (node) => {
        node.setAlias(measureName);
        node.setAggregate({
          func: 'sum',
        });
      });
    });
  };

  return (
    <Card
      title="Measures"
      style={{ ...style }}
      styles={{
        body: {
          padding: '0 0 10px 0',
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          height: 'calc(100% - 48px)',
        },
        header: {
          minHeight: '48px',
        },
      }}
    >
      <List
        size="small"
        dataSource={measures}
        split={false}
        renderItem={(item) => (
          <List.Item style={{ padding: 0, marginBottom: 2 }}>
            <div
              onClick={addMeasure(item.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '4px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <span
                style={{
                  marginRight: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <NumberOutlined style={{ color: '#52c41a' }} />
              </span>
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '13px',
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
