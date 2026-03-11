import React, { useState } from 'react';
import {
  Select,
  Input,
  Button,
  Card,
  Modal,
  Form,
  List,
  Typography,
  Tooltip,
  Radio,
  InputNumber,
} from 'antd';
import {
  FilterOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

export interface FilterItem {
  field: string;
  operator: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface FilterGroup {
  id: string;
  type: 'and' | 'or';
  items: FilterItem[];
}

export interface FilterField {
  name: string;
  role: 'dimension' | 'measure';
}

type FilterType = 'where' | 'having';

interface FilterPanelProps {
  title?: string; // 面板标题
  fields: FilterField[]; // 可供筛选的字段列表
  activeFields?: string[]; // 正在使用的字段
  filters: FilterItem[];
  onChange: (filters: FilterItem[], type?: FilterType) => void;
}

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
  { label: '范围 (between)', value: 'between' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  title,
  fields,
  activeFields = [],
  filters = [],
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form] = Form.useForm();

  const sortedFields = React.useMemo(() => {
    const activeSet = new Set(activeFields);
    return [...fields].sort((a, b) => {
      const aActive = activeSet.has(a.name);
      const bActive = activeSet.has(b.name);
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;
      return 0;
    });
  }, [fields, activeFields]);

  const selectedRole = Form.useWatch('role', form);
  const operator = Form.useWatch('operator', form);
  const selectedField = Form.useWatch('field', form);
  const displayFields = React.useMemo(() => {
    return sortedFields.filter((f) => f.role === selectedRole);
  }, [sortedFields, selectedRole]);

  const availableOperators = React.useMemo(() => {
    return selectedRole === 'measure' ? MEASURE_OPERATORS : DIMENSION_OPERATORS;
  }, [selectedRole]);

  React.useEffect(() => {
    if (isModalOpen) {
      const currentOperator = form.getFieldValue('operator');
      if (
        currentOperator &&
        !availableOperators.find((op) => op.value === currentOperator)
      ) {
        form.setFieldValue('operator', availableOperators[0]?.value);
      }
    }
  }, [selectedRole, availableOperators, form, isModalOpen]);

  React.useEffect(() => {
    if (isModalOpen && operator) {
      const currentValue = form.getFieldValue('value');
      if (operator === 'between') {
        if (
          typeof currentValue !== 'object' ||
          Array.isArray(currentValue) ||
          currentValue === null
        ) {
          form.setFieldValue('value', { leftOp: '<=', rightOp: '<=' });
        }
      } else {
        if (
          typeof currentValue === 'object' &&
          !Array.isArray(currentValue) &&
          currentValue !== null
        ) {
          form.setFieldValue('value', undefined);
        }
      }
    }
  }, [operator, isModalOpen, form]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFilterError = (e: any) => {
      const lastFilter = e.detail;
      if (lastFilter) {
        // Find role based on field
        const fieldRole =
          fields.find((f) => f.name === lastFilter.field)?.role || 'dimension';
        const value =
          lastFilter.operator === 'between'
            ? lastFilter.value
            : Array.isArray(lastFilter.value)
              ? lastFilter.value.join(',')
              : lastFilter.value;
        form.setFieldsValue({
          role: fieldRole,
          field: lastFilter.field,
          operator: lastFilter.operator,
          value: value,
        });
      }
      setIsModalOpen(true);
    };

    window.addEventListener('vbi-filter-error', handleFilterError);
    return () =>
      window.removeEventListener('vbi-filter-error', handleFilterError);
  }, [form, fields]);

  const handleAddClick = () => {
    setEditingIndex(null);
    form.resetFields();
    form.setFieldsValue({
      role: 'dimension',
      operator: 'in',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    const item = filters[index];
    const value =
      item.operator === 'between'
        ? item.value
        : Array.isArray(item.value)
          ? item.value.join(',')
          : item.value;
    const fieldRole =
      fields.find((f) => f.name === item.field)?.role || 'dimension';
    setEditingIndex(index);
    form.setFieldsValue({
      role: fieldRole,
      field: item.field,
      operator: item.operator,
      value: value,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { field, operator, value } = values;
      const finalValue =
        (operator === 'in' ||
          operator === 'not in' ||
          operator === '=' ||
          operator === '!=') &&
        typeof value === 'string'
          ? value.split(',').map((v: string) => v.trim())
          : value;

      if (editingIndex !== null) {
        const newFilters = [...filters];
        newFilters[editingIndex] = {
          ...newFilters[editingIndex],
          field,
          operator,
          value: finalValue,
        };
        onChange(newFilters);
      } else {
        const newFilter: FilterItem = {
          field,
          operator,
          value: finalValue,
        };
        onChange([...filters, newFilter]);
      }

      setIsModalOpen(false);
      setEditingIndex(null);
      form.resetFields();
    });
  };

  const handleDelete = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    onChange(newFilters);
  };

  return (
    <Card
      size="small"
      title={
        <span style={{ fontWeight: 600, fontSize: 14 }}>
          <FilterOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
          {title || '数据筛选器'}
        </span>
      }
      extra={
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={handleAddClick}
          style={{
            background: 'linear-gradient(135deg, #fa8c16 0%, #fa541c 100%)',
            border: 'none',
            borderRadius: 6,
          }}
        >
          添加筛选
        </Button>
      }
      style={{ marginBottom: 0, borderRadius: 8 }}
      styles={{
        body: {
          padding: 12,
        },
        header: {
          padding: '12px 16px',
        },
      }}
    >
      {filters.length === 0 ? (
        <div
          style={{
            color: '#bfbfbf',
            fontSize: 13,
            textAlign: 'center',
            padding: '24px 12px',
            background: 'rgba(0,0,0,0.02)',
            borderRadius: 8,
            border: '1px dashed #d9d9d9',
          }}
        >
          <FilterOutlined
            style={{ fontSize: 24, marginBottom: 8, opacity: 0.5 }}
          />
          <div>暂无筛选条件</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>点击上方按钮添加筛选</div>
        </div>
      ) : (
        <List
          size="small"
          dataSource={filters}
          renderItem={(item, index) => {
            return (
              <List.Item
                style={{
                  padding: '10px 12px',
                  background: 'rgba(0,0,0,0.02)',
                  borderRadius: 8,
                  marginBottom: 8,
                  border: '1px solid #f0f0f0',
                }}
                actions={[
                  <Tooltip title="编辑" key="edit">
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(index)}
                      style={{ color: '#1890ff' }}
                    />
                  </Tooltip>,
                  <Tooltip title="删除" key="delete">
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(index)}
                    />
                  </Tooltip>,
                ]}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '140px',
                  }}
                >
                  {(() => {
                    const displayLabel =
                      item.operator === 'between' && item.value
                        ? `${item.value.min ?? ''} ${item.value.leftOp ?? '<='} 变量 ${item.value.rightOp ?? '<='} ${item.value.max ?? ''}`
                        : `${item.operator} ${String(item.value)}`;
                    return (
                      <>
                        <Text style={{ fontSize: 13 }} ellipsis>
                          {`${item.field} ${displayLabel}`}
                        </Text>
                      </>
                    );
                  })()}
                </div>
              </List.Item>
            );
          }}
        />
      )}

      <Modal
        title={editingIndex !== null ? '编辑筛选器' : '新增筛选器'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        okText={editingIndex !== null ? '保存' : '添加'}
        cancelText="取消"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            operator: 'in',
            role: 'dimension',
          }}
        >
          <Form.Item label="字段类型" name="role">
            <Radio.Group
              optionType="button"
              onChange={(e) => {
                form.setFieldsValue({
                  field: undefined,
                  operator: e.target.value === 'measure' ? '=' : 'in',
                  value: undefined,
                });
              }}
            >
              <Radio value="dimension">维度 (Dimension)</Radio>
              <Radio value="measure">度量 (Measure)</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="字段"
            name="field"
            rules={[{ required: true, message: '请选择字段' }]}
          >
            <Select
              placeholder="选择要筛选的字段"
              showSearch
              onChange={() => {
                form.setFieldsValue({
                  operator: selectedRole === 'measure' ? '=' : 'in',
                  value: undefined,
                });
              }}
            >
              {displayFields.map((f) => {
                const isActive = activeFields.includes(f.name);
                return (
                  <Option key={f.name} value={f.name}>
                    <span
                      style={
                        isActive ? { color: '#e39700', fontWeight: 'bold' } : {}
                      }
                    >
                      {f.name} {isActive ? '(推荐)' : ''}
                    </span>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="操作符"
            name="operator"
            rules={[{ required: true }]}
          >
            {selectedRole === 'dimension' ? (
              <Radio.Group
                optionType="button"
                onChange={() => {
                  form.setFieldsValue({
                    value: undefined,
                  });
                }}
              >
                {availableOperators.map((op) => (
                  <Radio key={op.value} value={op.value}>
                    {op.label}
                  </Radio>
                ))}
              </Radio.Group>
            ) : (
              <Select
                onChange={() => {
                  form.setFieldsValue({
                    value: undefined,
                  });
                }}
              >
                {availableOperators.map((op) => (
                  <Option key={op.value} value={op.value}>
                    {op.label}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {operator === 'between' ? (
            <Form.Item label="范围设置">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Form.Item name={['value', 'min']} noStyle>
                  <InputNumber
                    placeholder="最小值"
                    style={{ width: '80px' }}
                    controls={false}
                  />
                </Form.Item>
                <Form.Item name={['value', 'leftOp']} noStyle>
                  <Select style={{ width: '60px' }}>
                    <Option value="<">&lt;</Option>
                    <Option value="<=">&lt;=</Option>
                  </Select>
                </Form.Item>
                <Text
                  ellipsis
                  style={{ maxWidth: '80px', textAlign: 'center' }}
                  title={selectedField || '变量'}
                >
                  {selectedField || '变量'}
                </Text>
                <Form.Item name={['value', 'rightOp']} noStyle>
                  <Select style={{ width: '60px' }}>
                    <Option value="<">&lt;</Option>
                    <Option value="<=">&lt;=</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={['value', 'max']} noStyle>
                  <InputNumber
                    placeholder="最大值"
                    style={{ width: '80px' }}
                    controls={false}
                  />
                </Form.Item>
              </div>
            </Form.Item>
          ) : (
            <Form.Item
              label="筛选值"
              name="value"
              rules={[{ required: true, message: '请输入筛选值' }]}
            >
              <Input
                placeholder={
                  ['in', 'not in', '=', '!='].includes(operator)
                    ? '输入筛选值 (如需多选，请用英文逗号分隔)'
                    : '输入筛选值'
                }
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Card>
  );
};
