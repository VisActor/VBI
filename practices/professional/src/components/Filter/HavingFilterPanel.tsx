import React, { useMemo, useState } from 'react';
import type { VBIHavingAggregate } from '@visactor/vbi';
import {
  Button,
  Card,
  Form,
  InputNumber,
  List,
  Modal,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'src/i18n';

const { Text } = Typography;

type HavingAggregateFunc = VBIHavingAggregate['func'];

export interface HavingFilterItem {
  field: string;
  aggregate: VBIHavingAggregate;
  operator: string;
  value: unknown;
}

interface HavingField {
  name: string;
  role: 'dimension' | 'measure';
}

interface HavingFilterPanelProps {
  fields: HavingField[];
  filters: HavingFilterItem[];
  rootOperator?: 'and' | 'or';
  onRootOperatorChange?: (operator: 'and' | 'or') => void;
  onChange: (filters: HavingFilterItem[]) => void;
}

const ALL_AGGREGATE_OPTIONS: Array<{
  label: string;
  value: HavingAggregateFunc;
}> = [
  { label: 'Sum', value: 'sum' },
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'countDistinct' },
  { label: 'Average', value: 'avg' },
  { label: 'Min', value: 'min' },
  { label: 'Max', value: 'max' },
  { label: 'Variance', value: 'variance' },
  { label: 'Variance Pop', value: 'variancePop' },
  { label: 'Std Dev', value: 'stddev' },
  { label: 'Median', value: 'median' },
  { label: 'Quantile', value: 'quantile' },
];

const DIMENSION_AGGREGATE_OPTIONS: Array<{
  label: string;
  value: HavingAggregateFunc;
}> = [
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'countDistinct' },
];

const OPERATOR_OPTIONS = [
  { label: '=', value: '=' },
  { label: '!=', value: '!=' },
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
  { label: '<', value: '<' },
  { label: '<=', value: '<=' },
  { label: 'between', value: 'between' },
];

export const HavingFilterPanel: React.FC<HavingFilterPanelProps> = ({
  fields,
  filters,
  rootOperator = 'and',
  onRootOperatorChange,
  onChange,
}) => {
  const { locale } = useTranslation();
  const isZh = locale === 'zh-CN';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form] = Form.useForm();

  const selectedField = Form.useWatch('field', form) as string | undefined;
  const selectedAggregate = Form.useWatch('aggregate', form) as
    | HavingAggregateFunc
    | undefined;
  const operator = Form.useWatch('operator', form) as string | undefined;
  const selectedRole = fields.find((field) => field.name === selectedField)?.role;

  const aggregateOptions = useMemo(() => {
    return selectedRole === 'dimension'
      ? DIMENSION_AGGREGATE_OPTIONS
      : ALL_AGGREGATE_OPTIONS;
  }, [selectedRole]);

  const handleAdd = () => {
    setEditingIndex(null);
    form.resetFields();
    form.setFieldsValue({
      operator: '>',
      aggregate: 'sum',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    const item = filters[index];
    setEditingIndex(index);
    form.setFieldsValue({
      field: item.field,
      aggregate: item.aggregate.func,
      quantile:
        item.aggregate.func === 'quantile'
          ? item.aggregate.quantile || 0.5
          : 0.5,
      operator: item.operator,
      range:
        item.operator === 'between' &&
        typeof item.value === 'object' &&
        item.value !== null
          ? item.value
          : undefined,
      value: item.operator === 'between' ? undefined : item.value,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    const nextFilters = [...filters];
    nextFilters.splice(index, 1);
    onChange(nextFilters);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const aggregate: VBIHavingAggregate =
      values.aggregate === 'quantile'
        ? { func: 'quantile', quantile: values.quantile ?? 0.5 }
        : { func: values.aggregate };

    const nextItem: HavingFilterItem = {
      field: values.field,
      aggregate,
      operator: values.operator,
      value: values.operator === 'between' ? values.range : values.value,
    };

    if (editingIndex === null) {
      onChange([...filters, nextItem]);
    } else {
      const nextFilters = [...filters];
      nextFilters[editingIndex] = nextItem;
      onChange(nextFilters);
    }

    setIsModalOpen(false);
    setEditingIndex(null);
    form.resetFields();
  };

  return (
    <Card
      size="small"
      title={
        <Space>
          <FilterOutlined />
          {isZh ? '分组筛选器' : 'Having Filters'}
        </Space>
      }
      extra={
        <Space size={4}>
          {onRootOperatorChange && (
            <Select
              size="small"
              value={rootOperator}
              onChange={onRootOperatorChange}
              style={{ width: 74 }}
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
            onClick={handleAdd}
          />
        </Space>
      }
      styles={{ body: { padding: 12 } }}
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
          {isZh ? '暂无分组筛选条件' : 'No having filters yet'}
        </div>
      ) : (
        <List
          size="small"
          dataSource={filters}
          renderItem={(item, index) => (
            <List.Item
              style={{ padding: '8px 0' }}
              actions={[
                <Tooltip title={isZh ? '编辑' : 'Edit'} key="edit">
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(index)}
                  />
                </Tooltip>,
                <Tooltip title={isZh ? '删除' : 'Delete'} key="delete">
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
              <Text ellipsis style={{ maxWidth: 180 }}>
                {`${item.aggregate.func}(${item.field}) ${item.operator} ${
                  item.operator === 'between'
                    ? JSON.stringify(item.value)
                    : String(item.value)
                }`}
              </Text>
            </List.Item>
          )}
        />
      )}

      <Modal
        title={
          editingIndex === null
            ? isZh
              ? '新增分组筛选'
              : 'Add Having Filter'
            : isZh
              ? '编辑分组筛选'
              : 'Edit Having Filter'
        }
        open={isModalOpen}
        onOk={() => void handleSubmit()}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={isZh ? '字段' : 'Field'}
            name="field"
            rules={[{ required: true, message: isZh ? '请选择字段' : 'Select a field' }]}
          >
            <Select
              options={fields.map((field) => ({
                label: `${field.name} (${field.role})`,
                value: field.name,
              }))}
              onChange={(value) => {
                const role = fields.find((field) => field.name === value)?.role;
                form.setFieldsValue({
                  aggregate: role === 'dimension' ? 'count' : 'sum',
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label={isZh ? '聚合方式' : 'Aggregate'}
            name="aggregate"
            rules={[{ required: true, message: isZh ? '请选择聚合方式' : 'Select an aggregate' }]}
          >
            <Select options={aggregateOptions} />
          </Form.Item>
          {selectedAggregate === 'quantile' && (
            <Form.Item label="Quantile" name="quantile">
              <InputNumber min={0} max={1} step={0.1} style={{ width: '100%' }} />
            </Form.Item>
          )}
          <Form.Item
            label={isZh ? '操作符' : 'Operator'}
            name="operator"
            rules={[{ required: true, message: isZh ? '请选择操作符' : 'Select an operator' }]}
          >
            <Select options={OPERATOR_OPTIONS} />
          </Form.Item>
          {operator === 'between' ? (
            <Form.Item label={isZh ? '范围' : 'Range'} required>
              <div style={{ display: 'flex', gap: 8 }}>
                <Form.Item
                  name={['range', 'min']}
                  noStyle
                  rules={[{ required: true, message: '' }]}
                >
                  <InputNumber
                    style={{ width: '50%' }}
                    placeholder={isZh ? '最小值' : 'Min'}
                  />
                </Form.Item>
                <Form.Item
                  name={['range', 'max']}
                  noStyle
                  rules={[{ required: true, message: '' }]}
                >
                  <InputNumber
                    style={{ width: '50%' }}
                    placeholder={isZh ? '最大值' : 'Max'}
                  />
                </Form.Item>
              </div>
            </Form.Item>
          ) : (
            <Form.Item
              label={isZh ? '值' : 'Value'}
              name="value"
              rules={[{ required: true, message: isZh ? '请输入值' : 'Enter a value' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Card>
  );
};
