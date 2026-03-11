import { List, Card, Badge, Input } from 'antd';
import { memo, useEffect, useState, useMemo } from 'react';
import {
  CalendarOutlined,
  FontSizeOutlined,
  TagOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useVBIStore } from 'src/model';

const DIMENSION_COLORS = {
  date: '#1890ff',
  string: '#722ed1',
};

export const DimensionsList = memo(
  ({ style }: { style?: React.CSSProperties }) => {
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
        JSON.stringify({ name: item.name, type: item.type, role: 'dimension' }),
      );
      e.dataTransfer.effectAllowed = 'copy';
    };

    const addDimension = (dimensionName: string) => () => {
      builder.doc.transact(() => {
        builder.dimensions.add(dimensionName, (node) => {
          node.setAlias(dimensionName);
        });
      });
    };

    const dimensions = schema.filter((d) => d.type !== 'number');

    const filteredDimensions = useMemo(() => {
      if (!searchText.trim()) return dimensions;
      const searchLower = searchText.toLowerCase();
      return dimensions.filter((d) =>
        d.name.toLowerCase().includes(searchLower),
      );
    }, [dimensions, searchText]);

    const getIcon = (type: string) => {
      if (type === 'date') {
        return <CalendarOutlined />;
      }
      return <TagOutlined />;
    };

    const getColor = (type: string) => {
      return (
        DIMENSION_COLORS[type as keyof typeof DIMENSION_COLORS] ||
        DIMENSION_COLORS.string
      );
    };

    return (
      <Card
        title={
          <span style={{ fontWeight: 600, fontSize: 11, color: '#666' }}>
            <FontSizeOutlined style={{ marginRight: 4 }} />
            维度
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
            prefix={
              <SearchOutlined style={{ fontSize: 10, color: '#bfbfbf' }} />
            }
            placeholder="搜索维度"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ fontSize: 11 }}
            size="small"
          />
        </div>
        <List
          size="small"
          dataSource={filteredDimensions}
          split={false}
          renderItem={(item) => (
            <List.Item style={{ padding: 0, marginBottom: 1 }}>
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onClick={addDimension(item.name)}
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
                  e.currentTarget.style.background = 'rgba(24,144,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Badge color={getColor(item.type)} style={{ marginRight: 6 }} />
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: getColor(item.type),
                    fontSize: 11,
                  }}
                >
                  {getIcon(item.type)}
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
  },
);
