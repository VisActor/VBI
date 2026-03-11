import React, { useState } from 'react';
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { ObserveCallback } from '@visactor/vbi';
import {
  Flex,
  Tag,
  Popover,
  Select,
  InputNumber,
  Button,
  Typography,
} from 'antd';
import { useEffect, useState as useStateHook } from 'react';
import { useVBIStore } from 'src/model';
import './shelfs.css';

const { Text } = Typography;
const { Option } = Select;

const MEASURE_OPERATORS = [
  { label: '等于 (=)', value: '=' },
  { label: '不等于 (!=)', value: '!=' },
  { label: '大于 (>)', value: '>' },
  { label: '大于等于 (>=)', value: '>=' },
  { label: '小于 (<)', value: '<' },
  { label: '小于等于 (<=)', value: '<=' },
];

interface HavingFilterData {
  field: string;
  operator: string;
  value: unknown;
}

export const HavingShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);

  const [filters, setFilters] = useStateHook<HavingFilterData[]>([]);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const loadFilters = () => {
      const havingFilters =
        builder.havingFilters.toJson() as unknown as HavingFilterData[];
      setFilters(havingFilters);
    };
    loadFilters();

    const updateFilters: ObserveCallback = () => {
      loadFilters();
    };

    const unobserve = builder.havingFilters.observe(updateFilters);
    return unobserve;
  }, [builder]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!e.dataTransfer.types.includes('application/json')) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.role === 'measure') {
        builder.doc.transact(() => {
          builder.havingFilters.add(data.name, (node) => {
            node.setOperator('>');
            node.setValue(0);
          });
        });
      }
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  const deleteFilter = (field: string) => {
    builder.havingFilters.remove(field);
  };

  const updateFilter = (field: string, updates: Partial<HavingFilterData>) => {
    builder.doc.transact(() => {
      builder.havingFilters.update(field, (node) => {
        if (updates.operator) {
          node.setOperator(updates.operator);
        }
        if (updates.value !== undefined) {
          node.setValue(updates.value);
        }
      });
    });
  };

  const renderFilterPopover = (filter: HavingFilterData) => {
    const operators = MEASURE_OPERATORS;

    const handleOperatorChange = (op: string) => {
      updateFilter(filter.field, { operator: op, value: 0 });
    };

    const handleValueChange = (val: number | string) => {
      updateFilter(filter.field, { value: val });
    };

    return (
      <div style={{ width: 280, padding: 4 }}>
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            字段
          </Text>
          <div style={{ fontWeight: 500 }}>{filter.field}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            操作符
          </Text>
          <Select
            value={filter.operator}
            onChange={handleOperatorChange}
            style={{ width: '100%', marginTop: 4 }}
            size="small"
          >
            {operators.map((op) => (
              <Option key={op.value} value={op.value}>
                {op.label}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            筛选值
          </Text>
          <InputNumber
            placeholder="输入筛选值"
            value={Number(filter.value) || 0}
            onChange={(val) => handleValueChange(val ?? 0)}
            style={{ marginTop: 4, width: '100%' }}
            size="small"
          />
        </div>
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => deleteFilter(filter.field)}
          style={{ width: '100%' }}
        >
          删除筛选
        </Button>
      </div>
    );
  };

  const shelfStyle: React.CSSProperties = {
    flexBasis: 300,
    ...style,
  };

  return (
    <Flex
      vertical={false}
      gap={6}
      className={`vbi-shelf vbi-shelf--having${dragOver ? ' vbi-shelf--dragover' : ''}`}
      style={shelfStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="vbi-shelf-icon">
        <FilterOutlined style={{ color: '#722ed1', fontSize: 12 }} />
      </div>
      {filters.length === 0 ? (
        <span className="vbi-shelf-empty">拖拽度量添加结果筛选</span>
      ) : (
        filters.map((filter) => (
          <Popover
            key={`having-${filter.field}`}
            content={renderFilterPopover(filter)}
            trigger="click"
            placement="bottomLeft"
            overlayStyle={{ zIndex: 1050 }}
          >
            <Tag className="vbi-shelf-filter-tag">
              {filter.field} {filter.operator} {String(filter.value)}
            </Tag>
          </Popover>
        ))
      )}
    </Flex>
  );
};
