import React, { useState, useRef, useEffect } from 'react'
import {
  Select,
  Input,
  Button,
  Space,
  Popover,
  Form,
  Typography,
  Tooltip,
  InputNumber,
  Empty,
  Badge,
  Tag,
  theme,
} from 'antd'
import {
  FilterOutlined,
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  ClearOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import type { VBIHavingAggregate } from '@visactor/vbi'
import { CompatSelectOption as Option } from '../antdCompat'
import { useTranslation } from '../../i18n'
import {
  getDefaultHavingAggregateByFieldRole,
  getDefaultHavingOperator,
  getHavingAggregateOptionGroupsByFieldRole,
  getHavingDisplayText,
  getHavingFilterFormValue,
  getHavingFilterInputStrategy,
  getHavingOperatorOptions,
  isHavingNumericAggregate,
  normalizeHavingAggregate,
  normalizeHavingOperator,
  normalizeHavingRangeValue,
  serializeHavingFilterValue,
  toHavingAggregate,
  type HavingFilterRangeValue,
} from './havingFilterUtils'

const { Text } = Typography

const POPOVER_TEXT_BUTTON_STYLE: React.CSSProperties = {
  height: 22,
  padding: '0 12px',
}

const POPOVER_ICON_BUTTON_STYLE: React.CSSProperties = {
  width: 22,
  minWidth: 22,
  height: 22,
  padding: 0,
}

export interface HavingItem {
  id?: string
  field: string
  aggregate: VBIHavingAggregate
  operator: string
  value: unknown
}

export interface HavingField {
  name: string
  role: 'dimension' | 'measure'
  type?: string
  isDate?: boolean
}

interface HavingFilterPanelProps {
  fields: HavingField[]
  activeFields?: string[]
  filters: HavingItem[]
  onChange?: (filters: HavingItem[]) => void
  onAdd?: (filter: HavingItem) => void
  onRemove?: (id: string) => void
  onCancel?: () => void
  embedded?: boolean
  itemEdit?: boolean
  open?: boolean
  fixedField?: string
}

type HavingFormValues = {
  field: string
  aggregateFunc: string
  operator: string
  value: HavingFormValue
}

type HavingFormValue = string | number | Array<string | number> | HavingFilterRangeValue | undefined

const getFieldRole = (fields: HavingField[], fieldName: string | undefined): 'dimension' | 'measure' => {
  if (!fieldName) {
    return 'measure'
  }
  return fields.find((field) => field.name === fieldName)?.role ?? 'measure'
}

const getFieldRoleLabel = (field: HavingField, t: (key: string) => string) => {
  if (field.role === 'measure') {
    return t('filtersFieldRolesMeasure')
  }

  if (field.isDate) {
    return t('filtersFieldRolesDateDimension')
  }

  return t('filtersFieldRolesDimension')
}

export const HavingFilterPanel: React.FC<HavingFilterPanelProps> = ({
  fields,
  activeFields = [],
  filters = [],
  onChange,
  onAdd,
  onRemove,
  onCancel,
  embedded = false,
  itemEdit = false,
  open = false,
  fixedField,
}) => {
  const { token } = theme.useToken()
  const { t } = useTranslation()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form] = Form.useForm<HavingFormValues>()
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedFieldFromForm = Form.useWatch('field', form)
  const selectedAggregateFunc = Form.useWatch('aggregateFunc', form)
  const selectedOperator = normalizeHavingOperator(Form.useWatch('operator', form))
  const isSingleItemEdit = itemEdit && filters.length === 1
  const editingItem = isSingleItemEdit ? filters[0] : undefined
  const fixedEditingField = isSingleItemEdit ? fixedField || filters[0]?.field : undefined
  const selectedField = selectedFieldFromForm ?? fixedEditingField

  const sortedFields = React.useMemo(() => {
    const activeSet = new Set(activeFields)
    return [...fields].sort((a, b) => {
      const aActive = activeSet.has(a.name)
      const bActive = activeSet.has(b.name)
      if (aActive && !bActive) return -1
      if (!aActive && bActive) return 1
      return 0
    })
  }, [fields, activeFields])

  const selectedFieldRole = React.useMemo(() => {
    if (selectedField) {
      return getFieldRole(fields, selectedField)
    }

    if (isSingleItemEdit) {
      return getFieldRole(fields, filters[0]?.field)
    }

    return 'measure'
  }, [fields, selectedField, isSingleItemEdit, filters])

  const aggregateOptionGroups = React.useMemo(() => {
    return getHavingAggregateOptionGroupsByFieldRole(selectedFieldRole, t)
  }, [selectedFieldRole, t])

  const aggregateSelectOptions = React.useMemo(() => {
    return aggregateOptionGroups.map((group) => ({
      label: group.label,
      options: group.options.map((item) => ({
        label: item.label,
        value: item.value,
      })),
    }))
  }, [aggregateOptionGroups])

  const availableAggregateFuncs = React.useMemo(() => {
    return aggregateOptionGroups.flatMap((group) => group.options.map((item) => item.value))
  }, [aggregateOptionGroups])

  const recommendedAggregateOptions = React.useMemo(() => {
    return aggregateOptionGroups.find((group) => group.key === 'common')?.options ?? []
  }, [aggregateOptionGroups])

  const selectedAggregate = React.useMemo(() => {
    const fallback = getDefaultHavingAggregateByFieldRole(selectedFieldRole)
    const aggregate = selectedAggregateFunc ? toHavingAggregate(selectedAggregateFunc) : fallback
    return normalizeHavingAggregate(aggregate, selectedFieldRole)
  }, [selectedAggregateFunc, selectedFieldRole])

  const isNumericValue = React.useMemo(() => {
    return isHavingNumericAggregate(selectedFieldRole, selectedAggregate)
  }, [selectedFieldRole, selectedAggregate])

  const operatorOptions = React.useMemo(() => {
    return getHavingOperatorOptions(isNumericValue, t)
  }, [isNumericValue, t])

  const inputStrategy = React.useMemo(() => {
    return getHavingFilterInputStrategy(selectedOperator, isNumericValue)
  }, [selectedOperator, isNumericValue])

  const isActive = embedded || popoverOpen || (isSingleItemEdit && open)

  useEffect(() => {
    if (itemEdit) {
      return
    }
    if (!popoverOpen) {
      setIsAdding(false)
      setEditingId(null)
      form.resetFields()
    }
  }, [popoverOpen, form, itemEdit])

  useEffect(() => {
    if (!isSingleItemEdit || !open) {
      return
    }

    const current = editingItem
    if (!current) {
      return
    }

    const fieldRole = getFieldRole(fields, current.field)
    const aggregate = normalizeHavingAggregate(current.aggregate, fieldRole)
    const operator = normalizeHavingOperator(current.operator)

    form.setFieldsValue({
      field: current.field,
      aggregateFunc: aggregate.func,
      operator,
      value: getHavingFilterFormValue(operator, current.value) as HavingFormValue,
    })
  }, [isSingleItemEdit, open, editingItem, fields, form])

  useEffect(() => {
    if (!isActive) {
      return
    }

    const currentAggregateFunc = form.getFieldValue('aggregateFunc')
    if (currentAggregateFunc && availableAggregateFuncs.includes(currentAggregateFunc)) {
      return
    }

    form.setFieldValue('aggregateFunc', getDefaultHavingAggregateByFieldRole(selectedFieldRole).func)
  }, [form, isActive, selectedFieldRole, availableAggregateFuncs])

  useEffect(() => {
    if (!isActive) {
      return
    }

    const currentOperator = normalizeHavingOperator(form.getFieldValue('operator'))
    if (operatorOptions.some((option) => option.value === currentOperator)) {
      return
    }

    form.setFieldValue('operator', getDefaultHavingOperator(isNumericValue))
  }, [form, isActive, operatorOptions, isNumericValue])

  useEffect(() => {
    if (!isActive) {
      return
    }

    const currentValue = form.getFieldValue('value')
    if (inputStrategy === 'none') {
      if (currentValue !== undefined) {
        form.setFieldValue('value', undefined)
      }
      return
    }

    if (inputStrategy === 'range') {
      const normalizedRange = normalizeHavingRangeValue(currentValue)
      const hasChanged =
        !currentValue ||
        typeof currentValue !== 'object' ||
        Array.isArray(currentValue) ||
        currentValue.min !== normalizedRange.min ||
        currentValue.max !== normalizedRange.max

      if (hasChanged) {
        form.setFieldValue('value', normalizedRange)
      }
      return
    }

    if (inputStrategy === 'tags') {
      if (!Array.isArray(currentValue)) {
        form.setFieldValue('value', getHavingFilterFormValue(selectedOperator, currentValue) as HavingFormValue)
      }
      return
    }

    if (Array.isArray(currentValue)) {
      form.setFieldValue('value', currentValue[0])
      return
    }

    if (typeof currentValue === 'object' && currentValue !== null) {
      form.setFieldValue('value', undefined)
    }
  }, [form, inputStrategy, isActive, selectedOperator])

  const handleAddClick = () => {
    setEditingId(null)
    form.resetFields()
    form.setFieldsValue({
      aggregateFunc: 'sum',
      operator: getDefaultHavingOperator(true),
    })
    setIsAdding(true)
  }

  const handleEdit = (id: string) => {
    const item = filters.find((filter) => filter.id === id)
    if (!item) {
      return
    }

    const fieldRole = getFieldRole(fields, item.field)
    const aggregate = normalizeHavingAggregate(item.aggregate, fieldRole)
    const operator = normalizeHavingOperator(item.operator)

    setEditingId(id)
    setIsAdding(false)
    form.setFieldsValue({
      field: item.field,
      aggregateFunc: aggregate.func,
      operator,
      value: getHavingFilterFormValue(operator, item.value) as HavingFormValue,
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    form.resetFields()
    onCancel?.()
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const field = values.field ?? fixedEditingField
      if (!field) {
        return
      }

      const fieldRole = getFieldRole(fields, field)
      const aggregate = normalizeHavingAggregate(toHavingAggregate(values.aggregateFunc), fieldRole)
      const operator = normalizeHavingOperator(values.operator)
      const finalValue = serializeHavingFilterValue({
        operator,
        isNumericValue: isHavingNumericAggregate(fieldRole, aggregate),
        value: values.value,
      })

      const existingFilter = isSingleItemEdit
        ? filters[0]
        : editingId
          ? filters.find((filter) => filter.id === editingId)
          : undefined

      const nextFilter: HavingItem = {
        id: existingFilter?.id,
        field,
        aggregate,
        operator,
        value: finalValue,
      }

      if (editingId || isSingleItemEdit) {
        if (onChange) {
          const nextFilters = [...filters]
          const targetId = existingFilter?.id
          const targetIndex = nextFilters.findIndex((item) => item.id === targetId)
          if (targetIndex >= 0) {
            nextFilters[targetIndex] = {
              ...nextFilters[targetIndex],
              ...nextFilter,
            }
            onChange(nextFilters)
          }
        } else if (onRemove && existingFilter?.id) {
          onRemove(existingFilter.id)
          onAdd?.(nextFilter)
        }
      } else if (onAdd) {
        onAdd(nextFilter)
      } else if (onChange) {
        onChange([...filters, nextFilter])
      }

      setIsAdding(false)
      setEditingId(null)
      form.resetFields()
    })
  }

  const handleDelete = (id: string) => {
    if (onChange) {
      onChange(filters.filter((item) => item.id !== id))
      return
    }

    onRemove?.(id)
  }

  const handleClearAll = () => {
    onChange?.([])
  }

  const renderValueFormItem = () => {
    if (inputStrategy === 'none') {
      return (
        <Form.Item style={{ marginBottom: 10 }}>
          <Text type='secondary' style={{ fontSize: 11 }}>
            {t('filtersFormNoValueRequired')}
          </Text>
        </Form.Item>
      )
    }

    if (inputStrategy === 'range') {
      return (
        <Form.Item label={isSingleItemEdit ? undefined : t('filtersFormValueRange')} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <Form.Item name={['value', 'min']} noStyle>
              <InputNumber
                variant='filled'
                controls={false}
                style={{ width: '100%' }}
                placeholder={t('filtersFormMinValue')}
              />
            </Form.Item>
            <Form.Item name={['value', 'max']} noStyle>
              <InputNumber
                variant='filled'
                controls={false}
                style={{ width: '100%' }}
                placeholder={t('filtersFormMaxValue')}
              />
            </Form.Item>
          </div>
        </Form.Item>
      )
    }

    if (inputStrategy === 'tags') {
      return (
        <Form.Item
          label={isSingleItemEdit ? undefined : t('filtersFormValue')}
          name='value'
          rules={[{ required: true, message: t('filtersValidationEnterValue') }]}
          style={{ marginBottom: 10 }}
        >
          <Select
            mode='tags'
            variant='filled'
            tokenSeparators={[',']}
            placeholder={t('filtersFormInputMultipleValues')}
          />
        </Form.Item>
      )
    }

    if (inputStrategy === 'number') {
      return (
        <Form.Item
          label={isSingleItemEdit ? undefined : t('filtersFormValue')}
          name='value'
          rules={[{ required: true, message: t('filtersValidationEnterNumber') }]}
          style={{ marginBottom: 10 }}
        >
          <InputNumber
            variant='filled'
            controls={false}
            style={{ width: '100%' }}
            placeholder={t('filtersFormInputNumber')}
          />
        </Form.Item>
      )
    }

    return (
      <Form.Item
        label={isSingleItemEdit ? undefined : t('filtersFormValue')}
        name='value'
        rules={[{ required: true, message: t('filtersValidationEnterValue') }]}
        style={{ marginBottom: 10 }}
      >
        <Input placeholder={t('filtersFormInputValue')} variant='filled' />
      </Form.Item>
    )
  }

  const renderHavingForm = () => (
    <Form
      form={form}
      layout='vertical'
      size='small'
      requiredMark={false}
      style={{
        width: isSingleItemEdit ? 230 : 254,
        marginTop: isSingleItemEdit ? 0 : 6,
      }}
      initialValues={{
        aggregateFunc: 'sum',
        operator: getDefaultHavingOperator(true),
      }}
    >
      {!isSingleItemEdit && (
        <Form.Item
          label={t('filtersFormField')}
          name='field'
          rules={[{ required: true, message: t('filtersValidationSelectField') }]}
          style={{ marginBottom: 8 }}
        >
          <Select
            placeholder={t('filtersFormSelectField')}
            showSearch
            variant='filled'
            onChange={(fieldName: string) => {
              const fieldRole = getFieldRole(fields, fieldName)
              const aggregate = getDefaultHavingAggregateByFieldRole(fieldRole)
              form.setFieldsValue({
                aggregateFunc: aggregate.func,
                operator: getDefaultHavingOperator(isHavingNumericAggregate(fieldRole, aggregate)),
                value: undefined,
              })
            }}
          >
            {sortedFields.map((field) => {
              const isActive = activeFields.includes(field.name)
              return (
                <Option key={field.name} value={field.name}>
                  <span style={isActive ? { color: '#e39700', fontWeight: 'bold' } : {}}>
                    {field.name} ({getFieldRoleLabel(field, t)}) {isActive ? t('commonStatusRecommended') : ''}
                  </span>
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label={isSingleItemEdit ? undefined : t('filtersFormAggregate')}
        name='aggregateFunc'
        rules={[{ required: true, message: t('filtersValidationSelectAggregate') }]}
        style={{ marginBottom: 10 }}
      >
        <div>
          {!isSingleItemEdit && recommendedAggregateOptions.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginBottom: 8,
              }}
            >
              {recommendedAggregateOptions.map((option) => (
                <Tag.CheckableTag
                  key={`having-aggregate-quick-${option.value}`}
                  checked={selectedAggregateFunc === option.value}
                  onChange={() => {
                    form.setFieldValue('aggregateFunc', option.value)
                  }}
                >
                  {option.shortLabel}
                </Tag.CheckableTag>
              ))}
            </div>
          )}
          <Select
            variant='filled'
            options={aggregateSelectOptions}
            value={selectedAggregateFunc}
            placeholder={t('filtersFormSelectAggregate')}
            onChange={(value: string) => {
              form.setFieldValue('aggregateFunc', value)
            }}
            style={{ width: '100%' }}
          />
        </div>
      </Form.Item>

      <Form.Item
        label={isSingleItemEdit ? undefined : t('filtersFormOperator')}
        name='operator'
        rules={[{ required: true, message: t('filtersValidationSelectOperator') }]}
        style={{ marginBottom: 10 }}
      >
        <Select
          variant='filled'
          onChange={() => {
            form.setFieldValue('value', undefined)
          }}
        >
          {operatorOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {renderValueFormItem()}

      <Form.Item style={{ marginBottom: 0, marginTop: 2, textAlign: 'right' }}>
        <Space size={8}>
          <Button size='small' onClick={handleCancel} style={POPOVER_TEXT_BUTTON_STYLE}>
            {t('commonActionsCancel')}
          </Button>
          <Button
            type='primary'
            size='small'
            onClick={handleSubmit}
            icon={<CheckOutlined />}
            style={POPOVER_TEXT_BUTTON_STYLE}
          >
            {editingId || isSingleItemEdit ? t('commonActionsSave') : t('commonActionsAdd')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )

  const renderHavingList = () => (
    <div style={{ width: 268 }}>
      {filters.length === 0 && !isAdding ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t('filtersEmptyHaving')}
          style={{ margin: '20px 0' }}
        />
      ) : (
        <div style={{ maxHeight: 220, overflow: 'auto' }}>
          {filters.map((item, index) => (
            <div
              key={item.id ?? `having-filter-${index}`}
              style={{
                padding: '8px 6px',
                opacity: editingId === item.id ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                borderBottom: index < filters.length - 1 ? `1px solid ${token.colorBorderSecondary}` : 'none',
                background: editingId === item.id ? token.colorFillSecondary : 'transparent',
                borderRadius: token.borderRadiusSM,
              }}
            >
              <Text style={{ fontSize: 12, minWidth: 0, flex: 1 }} ellipsis>
                {getHavingDisplayText(item, t)}
              </Text>
              <Space size={2}>
                <Tooltip title={t('commonActionsEdit')}>
                  <Button
                    type='text'
                    size='small'
                    icon={<EditOutlined />}
                    onClick={() => item.id && handleEdit(item.id)}
                    style={{
                      ...POPOVER_ICON_BUTTON_STYLE,
                      color: token.colorPrimary,
                    }}
                  />
                </Tooltip>
                <Tooltip title={t('commonActionsDelete')}>
                  <Button
                    type='text'
                    size='small'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => item.id && handleDelete(item.id)}
                    style={POPOVER_ICON_BUTTON_STYLE}
                  />
                </Tooltip>
              </Space>
            </div>
          ))}
        </div>
      )}

      {isAdding && renderHavingForm()}
    </div>
  )

  const popoverContent = (
    <div ref={containerRef}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text strong style={{ fontSize: 13 }}>
          {t('filtersTitlesHaving')}
        </Text>
        <Space size={4}>
          {!isAdding && !editingId && (
            <>
              <Tooltip title={t('commonActionsAddCondition')}>
                <Button
                  type='text'
                  size='small'
                  icon={<PlusOutlined />}
                  onClick={handleAddClick}
                  style={POPOVER_ICON_BUTTON_STYLE}
                />
              </Tooltip>
              {filters.length > 0 && (
                <Tooltip title={t('commonActionsClearAll')}>
                  <Button
                    type='text'
                    size='small'
                    danger
                    icon={<ClearOutlined />}
                    onClick={handleClearAll}
                    style={POPOVER_ICON_BUTTON_STYLE}
                  />
                </Tooltip>
              )}
            </>
          )}
        </Space>
      </div>

      {renderHavingList()}
    </div>
  )

  if (isSingleItemEdit) {
    return <div ref={containerRef}>{renderHavingForm()}</div>
  }

  if (embedded) {
    return popoverContent
  }

  return (
    <Popover
      content={popoverContent}
      trigger='click'
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
      placement='left'
      styles={{
        root: { padding: 0 },
        container: {
          padding: '14px 18px 12px',
          borderRadius: token.borderRadiusLG,
        },
      }}
    >
      <Badge count={filters.length} size='small' offset={[8, 0]}>
        <Button size='small' icon={<FilterOutlined />}>
          {t('filtersButtonsHaving')}
        </Button>
      </Badge>
    </Popover>
  )
}
