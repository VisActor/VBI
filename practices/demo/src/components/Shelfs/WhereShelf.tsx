import React, { useState } from 'react';
import { DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { ObserveCallback } from '@visactor/vbi';
import {
  Flex,
  Tag,
  Popover,
  Select,
  Input,
  InputNumber,
  Button,
  Typography,
} from 'antd';
import { useEffect, useState as useStateHook } from 'react';
import { useVBIStore } from 'src/model';
import './shelfs.css';

const { Text } = Typography;
const { Option } = Select;

const DIMENSION_OPERATORS = [
  { label: '包含 (in)', value: 'in' },
  { label: '不包含 (not in)', value: 'not in' },
];

const MEASURE_OPERATORS = [
  { label: '等于 (=)', value: '=' },
  { label: '不等于 (!=)', value: '!=' },
  { label: '大于 (>)', value: '>' },
  { label: '大于等于 (>=)', value: '>=' },
  { label: '小于 (<)', value: '<' },
  { label: '小于等于 (<=)', value: '<=' },
];

// VBIFilter uses 'op' instead of 'operator'
interface WhereFilterData {
  id: string;
  field: string;
  op: string;
  value: unknown;
}

interface DragData {
  name: string;
  role: 'dimension' | 'measure';
}

export const WhereShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);

  const [filters, setFilters] = useStateHook<WhereFilterData[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);

  // Form state for the popover
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<string>('in');
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const loadFilters = () => {
      const whereFilters = builder.whereFilters.toJson() as WhereFilterData[];
      // Filter to only get filter nodes (not groups)
      const filterNodes = whereFilters.filter(
        (f) => f.field !== undefined,
      ) as WhereFilterData[];
      setFilters(filterNodes);
    };
    loadFilters();

    const updateFilters: ObserveCallback = () => {
      loadFilters();
    };

    const unobserve = builder.whereFilters.observe(updateFilters);
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
      const data = JSON.parse(
        e.dataTransfer.getData('application/json'),
      ) as DragData;

      // Always show popover for any field type
      setSelectedField(data.name);
      setSelectedOperator(data.role === 'dimension' ? 'in' : '>');
      setInputValue('');
      setPopoverVisible(true);
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  const handleAddFilter = () => {
    if (!selectedField) return;

    let finalValue: unknown;
    const isDimension = !allMeasureFields.includes(selectedField);

    if (['in', 'not in'].includes(selectedOperator)) {
      finalValue = inputValue
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
    } else {
      finalValue = isDimension ? inputValue : Number(inputValue) || 0;
    }

    builder.doc.transact(() => {
      builder.whereFilters.add(selectedField, (node) => {
        node.setOperator(selectedOperator);
        node.setValue(finalValue);
      });
    });

    setPopoverVisible(false);
    // pendingDrag removed
    setSelectedField('');
    setSelectedOperator('in');
    setInputValue('');
  };

  const deleteFilter = (id: string) => {
    builder.whereFilters.remove(id);
  };

  const updateFilter = (id: string, updates: Partial<WhereFilterData>) => {
    builder.doc.transact(() => {
      builder.whereFilters.update(id, (node) => {
        if (updates.op) {
          node.setOperator(updates.op);
        }
        if (updates.value !== undefined) {
          node.setValue(updates.value);
        }
      });
    });
  };

  const getOperatorsByRole = (role: 'dimension' | 'measure') => {
    return role === 'dimension' ? DIMENSION_OPERATORS : MEASURE_OPERATORS;
  };

  const handleFieldChange = (field: string) => {
    setSelectedField(field);
    // Auto-select appropriate operator based on field role
    const isDimension = !allMeasureFields.includes(field);
    setSelectedOperator(isDimension ? 'in' : '>');
  };

  // Get all available fields from builder schema
  const [schemaFields, setSchemaFields] = useState<
    { name: string; type: string }[]
  >([]);
  useEffect(() => {
    const fetchSchema = async () => {
      const schema = await builder.getSchema();
      setSchemaFields(schema);
    };
    fetchSchema();
  }, [builder]);

  const allDimensionFields = schemaFields
    .filter((f) => f.type !== 'number')
    .map((f) => f.name);
  const allMeasureFields = schemaFields
    .filter((f) => f.type === 'number')
    .map((f) => f.name);

  const isSelectedFieldDimension = !allMeasureFields.includes(selectedField);
  const currentOperators = getOperatorsByRole(
    isSelectedFieldDimension ? 'dimension' : 'measure',
  );

  const renderAddFilterPopover = () => {
    return (
      <div style={{ width: 320, padding: 4 }}>
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            字段
          </Text>
          <Select
            value={selectedField}
            onChange={handleFieldChange}
            style={{ width: '100%', marginTop: 4 }}
            placeholder="选择字段"
            size="small"
            showSearch
          >
            <OptionGroup label="维度">
              {allDimensionFields.map((f) => (
                <Option key={f} value={f}>
                  {f}
                </Option>
              ))}
            </OptionGroup>
            <OptionGroup label="度量">
              {allMeasureFields.map((f) => (
                <Option key={f} value={f}>
                  {f}
                </Option>
              ))}
            </OptionGroup>
          </Select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            操作符
          </Text>
          <Select
            value={selectedOperator}
            onChange={setSelectedOperator}
            style={{ width: '100%', marginTop: 4 }}
            size="small"
          >
            {currentOperators.map((op) => (
              <Option key={op.value} value={op.value}>
                {op.label}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {['in', 'not in'].includes(selectedOperator)
              ? '筛选值 (逗号分隔)'
              : '筛选值'}
          </Text>
          {isSelectedFieldDimension ? (
            <Input
              placeholder="输入筛选值，用逗号分隔"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginTop: 4 }}
              size="small"
            />
          ) : (
            <InputNumber
              placeholder="输入数值"
              value={Number(inputValue) || 0}
              onChange={(val) => setInputValue(String(val ?? 0))}
              style={{ marginTop: 4, width: '100%' }}
              size="small"
            />
          )}
        </div>
        <Flex gap={8}>
          <Button
            type="primary"
            size="small"
            onClick={handleAddFilter}
            style={{ flex: 1 }}
          >
            添加
          </Button>
          <Button
            size="small"
            onClick={() => {
              setPopoverVisible(false);
              // pendingDrag removed
            }}
          >
            取消
          </Button>
        </Flex>
      </div>
    );
  };

  const renderFilterPopover = (filter: WhereFilterData) => {
    const isFilterDimension = !allMeasureFields.includes(filter.field);
    const operators = getOperatorsByRole(
      isFilterDimension ? 'dimension' : 'measure',
    );

    const handleOperatorChange = (op: string) => {
      updateFilter(filter.id, {
        op: op,
        value: isFilterDimension ? [] : 0,
      });
    };

    const handleValueChange = (val: string) => {
      if (['in', 'not in'].includes(filter.op)) {
        const finalValue = val.split(',').map((v) => v.trim());
        updateFilter(filter.id, { value: finalValue });
      } else if (!isFilterDimension) {
        updateFilter(filter.id, { value: Number(val) || 0 });
      } else {
        updateFilter(filter.id, { value: val });
      }
    };

    const currentValue = filter.value;
    const displayValue = Array.isArray(currentValue)
      ? currentValue.join(',')
      : String(currentValue ?? '');

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
            value={filter.op}
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
            {['in', 'not in'].includes(filter.op)
              ? '筛选值 (逗号分隔)'
              : '筛选值'}
          </Text>
          {isFilterDimension ? (
            <Input
              placeholder="输入筛选值，用逗号分隔"
              value={displayValue}
              onChange={(e) => handleValueChange(e.target.value)}
              style={{ marginTop: 4 }}
              size="small"
            />
          ) : (
            <InputNumber
              placeholder="输入数值"
              value={Number(displayValue) || 0}
              onChange={(val) => handleValueChange(String(val ?? 0))}
              style={{ marginTop: 4, width: '100%' }}
              size="small"
            />
          )}
        </div>
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => deleteFilter(filter.id)}
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
      className={`vbi-shelf vbi-shelf--where${dragOver ? ' vbi-shelf--dragover' : ''}`}
      style={shelfStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="vbi-shelf-icon">
        <FilterOutlined style={{ color: '#fa8c16', fontSize: 12 }} />
      </div>

      <Popover
        content={renderAddFilterPopover()}
        trigger="click"
        open={popoverVisible}
        onOpenChange={(visible) => {
          if (!visible) {
            setPopoverVisible(false);
            // pendingDrag removed
          }
        }}
        placement="bottomLeft"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore overlayStyle is deprecated but still works
        overlayStyle={{ zIndex: 1050 }}
      >
        <div />
      </Popover>

      {filters.length === 0 ? (
        <span className="vbi-shelf-empty">拖拽字段添加明细筛选</span>
      ) : (
        filters.map((filter) => (
          <Popover
            key={filter.id}
            content={renderFilterPopover(filter)}
            trigger="click"
            placement="bottomLeft"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore overlayStyle is deprecated but still works
            overlayStyle={{ zIndex: 1050 }}
          >
            <Tag className="vbi-shelf-filter-tag">
              {filter.field} {filter.op}{' '}
              {Array.isArray(filter.value)
                ? filter.value.join(',')
                : String(filter.value)}
            </Tag>
          </Popover>
        ))
      )}
    </Flex>
  );
};

// Helper component for option groups
const OptionGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => <Select.OptGroup label={label}>{children}</Select.OptGroup>;
