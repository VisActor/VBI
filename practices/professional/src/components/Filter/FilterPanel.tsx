import React, { useState } from 'react';
import {
  Select,
  Input,
  Button,
  Space,
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
import { useTranslation } from 'src/i18n';

const { Option } = Select;
const { Text } = Typography;

export interface FilterItem {
  field: string;
  operator: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface FilterField {
  name: string;
  role: 'dimension' | 'measure';
}

interface FilterPanelProps {
  fields: FilterField[]; // 可供筛选的字段列表
  activeFields?: string[]; // 正在使用的字段
  filters: FilterItem[];
  rootOperator?: 'and' | 'or';
  onRootOperatorChange?: (operator: 'and' | 'or') => void;
  onChange: (filters: FilterItem[]) => void;
}

const getDimensionOperators = (isZh: boolean) => [
  { label: isZh ? '包含 (in)' : 'Includes (in)', value: 'in' },
  { label: isZh ? '不包含 (not in)' : 'Excludes (not in)', value: 'not in' },
];

const getMeasureOperators = (isZh: boolean) => [
  { label: isZh ? '等于 (=)' : 'Equals (=)', value: '=' },
  { label: isZh ? '不等于 (!=)' : 'Not equal (!=)', value: '!=' },
  { label: isZh ? '大于 (>)' : 'Greater than (>)', value: '>' },
  { label: isZh ? '大于等于 (>=)' : 'Greater or equal (>=)', value: '>=' },
  { label: isZh ? '小于 (<)' : 'Less than (<)', value: '<' },
  { label: isZh ? '小于等于 (<=)' : 'Less or equal (<=)', value: '<=' },
  { label: isZh ? '范围 (between)' : 'Between', value: 'between' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  fields,
  activeFields = [],
  filters = [],
  rootOperator = 'and',
  onRootOperatorChange,
  onChange,
}) => {
  const { locale, t } = useTranslation();
  const isZh = locale === 'zh-CN';
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
    return selectedRole === 'measure'
      ? getMeasureOperators(isZh)
      : getDimensionOperators(isZh);
  }, [isZh, selectedRole]);

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
        const operator = lastFilter.operator ?? lastFilter.op;
        // Find role based on field
        const fieldRole =
          fields.find((f) => f.name === lastFilter.field)?.role || 'dimension';
        const value =
          operator === 'between'
            ? lastFilter.value
            : Array.isArray(lastFilter.value)
              ? lastFilter.value.join(',')
              : lastFilter.value;
        form.setFieldsValue({
          role: fieldRole,
          field: lastFilter.field,
          operator,
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
        <Space>
          <FilterOutlined />
          {t('filtersTitle')}
        </Space>
      }
      extra={
        <Space size={4}>
          {onRootOperatorChange && (
            <Radio.Group
              size="small"
              value={rootOperator}
              onChange={(event) => onRootOperatorChange(event.target.value)}
              optionType="button"
              options={[
                { label: 'AND', value: 'and' },
                { label: 'OR', value: 'or' },
              ]}
            />
          )}
          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
          />
        </Space>
      }
      style={{ marginBottom: 0 }}
      styles={{
        body: {
          padding: '12px',
        },
      }}
    >
      {filters.length === 0 ? (
        <div
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            padding: '10px 0',
          }}
        >
          {t('filtersEmpty')}
        </div>
      ) : (
        <List
          size="small"
          dataSource={filters}
          renderItem={(item, index) => {
            return (
              <List.Item
                style={{ padding: '8px 0' }}
                actions={[
                  <Tooltip title={t('filtersEdit')} key="edit">
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(index)}
                      style={{ color: '#1890ff' }}
                    />
                  </Tooltip>,
                  <Tooltip title={t('filtersDelete')} key="delete">
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
                        ? `${item.value.min ?? ''} ${item.value.leftOp ?? '<='} ${item.field} ${item.value.rightOp ?? '<='} ${item.value.max ?? ''}`
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
        title={editingIndex !== null ? t('filtersEdit') : t('filtersAdd')}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        okText={isZh ? '保存' : 'Save'}
        cancelText={isZh ? '取消' : 'Cancel'}
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
          <Form.Item label={t('filtersRole')} name="role">
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
              <Radio value="dimension">{t('filtersDimension')}</Radio>
              <Radio value="measure">{t('filtersMeasure')}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={t('filtersField')}
            name="field"
            rules={[{ required: true, message: isZh ? '请选择字段' : 'Select a field' }]}
          >
            <Select
              placeholder={isZh ? '选择要筛选的字段' : 'Choose a field'}
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
                      {f.name} {isActive ? (isZh ? '(推荐)' : '(Recommended)') : ''}
                    </span>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label={t('filtersOperator')}
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
                    name: undefined,
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
            <Form.Item label={isZh ? '范围设置' : 'Range'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Form.Item name={['value', 'min']} noStyle>
                  <InputNumber
                    placeholder={isZh ? '最小值' : 'Min'}
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
                  {selectedField || (isZh ? '变量' : 'Value')}
                </Text>
                <Form.Item name={['value', 'rightOp']} noStyle>
                  <Select style={{ width: '60px' }}>
                    <Option value="<">&lt;</Option>
                    <Option value="<=">&lt;=</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={['value', 'max']} noStyle>
                  <InputNumber
                    placeholder={isZh ? '最大值' : 'Max'}
                    style={{ width: '80px' }}
                    controls={false}
                  />
                </Form.Item>
              </div>
            </Form.Item>
          ) : (
            <Form.Item
              label={t('filtersValue')}
              name="value"
              rules={[{ required: true, message: isZh ? '请输入筛选值' : 'Enter a value' }]}
            >
              <Input
                placeholder={
                  ['in', 'not in', '=', '!='].includes(operator)
                    ? isZh
                      ? '输入筛选值，多个值用英文逗号分隔'
                      : 'Enter values, separated by commas'
                    : isZh
                      ? '输入筛选值'
                      : 'Enter a value'
                }
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Card>
  );
};
