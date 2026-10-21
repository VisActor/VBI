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
  Badge,
  Empty,
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
import {
  getDefaultWhereOperator,
  getWhereDisplayText,
  getWhereFilterFormValue,
  getWhereFilterInputStrategy,
  getWhereOperatorOptions,
  normalizeWhereOperator,
  normalizeWhereRangeValue,
  serializeWhereFilterValue,
} from './whereFilterUtils'
import { DateFilterEditor } from './DateFilterEditor'
import { getDefaultDatePredicate } from './dateFilterUtils'
import type { VBIWhereDatePredicate } from '@visactor/vbi'
import { CompatSelectOption as Option } from '../antdCompat'
import { useTranslation } from '../../i18n'

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

export interface FilterItem {
  id?: string
  field: string
  operator: string
  value: unknown
}

export interface FilterField {
  name: string
  role: 'dimension' | 'measure'
  type?: string
  isDate?: boolean
}

interface FilterPanelProps {
  fields: FilterField[]
  activeFields?: string[]
  filters: FilterItem[]
  onAdd?: (filter: FilterItem) => void
  onRemove?: (id: string) => void
  onClear?: () => void
  onChange?: (filters: FilterItem[]) => void
  onCancel?: () => void
  embedded?: boolean
  itemEdit?: boolean
  open?: boolean
  fixedField?: string
}

const getFieldRoleLabel = (field: FilterField, t: (key: string) => string) => {
  if (field.role === 'measure') {
    return t('filtersFieldRolesMeasure')
  }

  if (field.isDate) {
    return t('filtersFieldRolesDateDimension')
  }

  return t('filtersFieldRolesDimension')
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  fields,
  activeFields = [],
  filters = [],
  onAdd,
  onRemove,
  onClear,
  onChange,
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
  const [form] = Form.useForm()
  const [datePredicate, setDatePredicate] = useState<VBIWhereDatePredicate | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const operator = Form.useWatch('operator', form)
  const selectedFieldFromForm = Form.useWatch('field', form)
  const isSingleItemEdit = itemEdit && filters.length === 1
  const editingItem = isSingleItemEdit ? filters[0] : undefined
  const fixedEditingField = isSingleItemEdit ? fixedField || filters[0]?.field : undefined
  const selectedField = selectedFieldFromForm ?? fixedEditingField

  // 根据选择的字段自动判断类型
  const selectedFieldMeta = selectedField ? fields.find((f) => f.name === selectedField) : undefined
  const selectedFieldRole = selectedFieldMeta?.role ?? 'dimension'
  const isDateField = selectedFieldMeta?.isDate === true

  const availableOperators = React.useMemo(() => {
    return getWhereOperatorOptions(selectedFieldRole, t)
  }, [selectedFieldRole, t])

  const inputStrategy = React.useMemo(() => {
    return getWhereFilterInputStrategy(operator, selectedFieldRole)
  }, [operator, selectedFieldRole])

  // Reset form when opening/closing
  useEffect(() => {
    if (itemEdit) {
      return
    }
    if (!popoverOpen) {
      setIsAdding(false)
      setEditingId(null)
      setDatePredicate(null)
      form.resetFields()
    }
  }, [popoverOpen, form, itemEdit])

  // itemEdit 模式下，每次打开都从当前 builder 值回填表单
  useEffect(() => {
    if (!editingItem || !open) {
      return
    }

    const item = editingItem
    if (normalizeWhereOperator(item.operator) === 'date') {
      setDatePredicate(item.value as VBIWhereDatePredicate)
      form.setFieldsValue({ field: item.field })
    } else {
      setDatePredicate(null)
      form.setFieldsValue({
        field: item.field,
        operator: normalizeWhereOperator(item.operator),
        value: getWhereFilterFormValue(item.operator, item.value),
      })
    }
  }, [editingItem, open, form])

  // Update operator when role changes (skip in date mode)
  useEffect(() => {
    if (isDateField || datePredicate) {
      return
    }
    if (isAdding || editingId || (isSingleItemEdit && open)) {
      const currentOperator = normalizeWhereOperator(form.getFieldValue('operator'))
      if (currentOperator && !availableOperators.find((op) => op.value === currentOperator)) {
        form.setFieldValue('operator', availableOperators[0]?.value)
      }
    }
  }, [availableOperators, form, isAdding, editingId, isSingleItemEdit, open, isDateField, datePredicate])

  // 按输入策略维护表单值形状 (skip in date mode)
  useEffect(() => {
    if (isDateField || datePredicate) {
      return
    }
    if (isAdding || editingId || (isSingleItemEdit && open)) {
      const currentValue = form.getFieldValue('value')

      if (inputStrategy === 'none') {
        if (currentValue !== undefined) {
          form.setFieldValue('value', undefined)
        }
        return
      }

      if (inputStrategy === 'range') {
        const normalizedRange = normalizeWhereRangeValue(currentValue)
        const changed =
          currentValue !== normalizedRange &&
          (!currentValue ||
            typeof currentValue !== 'object' ||
            Array.isArray(currentValue) ||
            currentValue.min !== normalizedRange.min ||
            currentValue.max !== normalizedRange.max ||
            currentValue.leftOp !== normalizedRange.leftOp ||
            currentValue.rightOp !== normalizedRange.rightOp)

        if (changed) {
          form.setFieldValue('value', normalizedRange)
        }
        return
      }

      if (inputStrategy === 'tags') {
        if (!Array.isArray(currentValue)) {
          form.setFieldValue('value', getWhereFilterFormValue(operator, currentValue))
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
    }
  }, [form, inputStrategy, isAdding, editingId, isSingleItemEdit, open, operator, isDateField, datePredicate])

  const handleAddClick = () => {
    setEditingId(null)
    setDatePredicate(null)
    form.resetFields()
    form.setFieldsValue({
      operator: getDefaultWhereOperator('dimension'),
    })
    setIsAdding(true)
  }

  const handleEdit = (id: string) => {
    const item = filters.find((f) => f.id === id)
    if (!item) return

    setEditingId(id)
    setIsAdding(false)

    if (normalizeWhereOperator(item.operator) === 'date') {
      setDatePredicate(item.value as VBIWhereDatePredicate)
      form.setFieldsValue({ field: item.field })
    } else {
      setDatePredicate(null)
      form.setFieldsValue({
        field: item.field,
        operator: normalizeWhereOperator(item.operator),
        value: getWhereFilterFormValue(item.operator, item.value),
      })
    }
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const field = values.field ?? fixedEditingField
      if (!field) {
        return
      }

      const fieldMeta = fields.find((f) => f.name === field)
      const isDateSubmit = fieldMeta?.isDate === true || datePredicate !== null

      let normalizedOperator: string
      let finalValue: unknown

      if (isDateSubmit && datePredicate) {
        normalizedOperator = 'date'
        finalValue = datePredicate
      } else {
        const { operator, value } = values
        const fieldRole = fieldMeta?.role ?? selectedFieldRole ?? 'dimension'
        normalizedOperator = normalizeWhereOperator(operator)
        finalValue = serializeWhereFilterValue({
          operator: normalizedOperator,
          fieldRole,
          value,
        })
      }

      // 获取原有 filter 的 id（编辑模式）
      const existingFilter = isSingleItemEdit
        ? filters[0]
        : editingId
          ? filters.find((f) => f.id === editingId)
          : undefined
      const newFilter: FilterItem = {
        id: existingFilter?.id,
        field,
        operator: normalizedOperator,
        value: finalValue,
      }

      if (editingId || isSingleItemEdit) {
        // 编辑模式：优先使用 onChange 回调
        if (onChange) {
          const newFilters = [...filters]
          const targetId = existingFilter?.id
          const editIndex = newFilters.findIndex((f) => f.id === targetId)
          if (editIndex >= 0) {
            newFilters[editIndex] = { ...newFilters[editIndex], ...newFilter }
            onChange(newFilters)
          }
        } else if (onRemove) {
          // 兼容模式：先删除再添加
          if (existingFilter?.id) {
            onRemove(existingFilter.id)
          }
          onAdd?.(newFilter)
        }
      } else if (onChange) {
        // 添加模式：如果有 onChange 则使用全量更新
        onChange([...filters, newFilter])
      } else if (onAdd) {
        onAdd(newFilter)
      }

      setIsAdding(false)
      setEditingId(null)
      setDatePredicate(null)
      form.resetFields()
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setDatePredicate(null)
    form.resetFields()
    onCancel?.()
  }

  const handleDelete = (id: string) => {
    // 优先使用 onChange 回调
    if (onChange) {
      const newFilters = filters.filter((f) => f.id !== id)
      onChange(newFilters)
    } else if (onRemove) {
      onRemove(id)
    }
  }

  const handleClearAll = () => {
    // 优先使用 onChange 回调
    if (onChange) {
      onChange([])
    } else if (onClear) {
      onClear()
    }
  }

  // Generate filter display text
  const getFilterDisplayText = (item: FilterItem) => {
    return getWhereDisplayText(item, t)
  }

  const renderFilterForm = () => (
    <Form
      form={form}
      layout='vertical'
      size='small'
      requiredMark={false}
      style={{
        width: isSingleItemEdit ? 214 : 238,
        marginTop: isSingleItemEdit ? 0 : 6,
      }}
      initialValues={{
        operator: getDefaultWhereOperator('dimension'),
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
              const nextField = fields.find((f) => f.name === fieldName)
              const nextFieldRole = nextField?.role ?? 'dimension'
              if (nextField?.isDate) {
                setDatePredicate(getDefaultDatePredicate())
                form.setFieldsValue({
                  operator: undefined,
                  value: undefined,
                })
              } else {
                setDatePredicate(null)
                form.setFieldsValue({
                  operator: getDefaultWhereOperator(nextFieldRole),
                  value: undefined,
                })
              }
            }}
          >
            {fields.map((f) => {
              const isActive = activeFields.includes(f.name)
              return (
                <Option key={f.name} value={f.name}>
                  <span style={isActive ? { color: '#e39700', fontWeight: 'bold' } : {}}>
                    {f.name} ({getFieldRoleLabel(f, t)}) {isActive ? t('commonStatusRecommended') : ''}
                  </span>
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      )}

      {isDateField || datePredicate ? (
        <div style={{ marginBottom: 10 }}>
          <DateFilterEditor value={datePredicate ?? getDefaultDatePredicate()} onChange={setDatePredicate} />
        </div>
      ) : (
        <>
          <Form.Item
            label={isSingleItemEdit ? undefined : t('filtersFormOperator')}
            name='operator'
            rules={[{ required: true, message: t('filtersValidationSelectOperator') }]}
            style={{ marginBottom: 10 }}
          >
            <Select
              variant='filled'
              onChange={() => {
                form.setFieldsValue({ value: undefined })
              }}
            >
              {availableOperators.map((op) => (
                <Option key={op.value} value={op.value}>
                  {op.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {inputStrategy === 'none' ? (
            <div style={{ color: '#999', fontSize: 11, padding: '6px 0 10px' }}>{t('filtersFormNoValueRequired')}</div>
          ) : inputStrategy === 'range' ? (
            <Form.Item label={isSingleItemEdit ? undefined : t('filtersFormRange')} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Form.Item name={['value', 'min']} noStyle>
                  {selectedFieldRole === 'measure' ? (
                    <InputNumber
                      placeholder={t('filtersFormMin')}
                      variant='filled'
                      style={{ width: isSingleItemEdit ? 46 : 62 }}
                      controls={false}
                    />
                  ) : (
                    <Input
                      placeholder={t('filtersFormMin')}
                      variant='filled'
                      style={{ width: isSingleItemEdit ? 46 : 62 }}
                    />
                  )}
                </Form.Item>
                <Form.Item name={['value', 'leftOp']} noStyle>
                  <Select variant='filled' style={{ width: isSingleItemEdit ? 36 : 48 }}>
                    <Option value='<'>&lt;</Option>
                    <Option value='<='>&lt;=</Option>
                  </Select>
                </Form.Item>
                {!isSingleItemEdit && (
                  <Text ellipsis style={{ maxWidth: 60, fontSize: 12 }}>
                    {selectedField || '?'}
                  </Text>
                )}
                <Form.Item name={['value', 'rightOp']} noStyle>
                  <Select variant='filled' style={{ width: isSingleItemEdit ? 36 : 48 }}>
                    <Option value='<'>&lt;</Option>
                    <Option value='<='>&lt;=</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={['value', 'max']} noStyle>
                  {selectedFieldRole === 'measure' ? (
                    <InputNumber
                      placeholder={t('filtersFormMax')}
                      variant='filled'
                      style={{ width: isSingleItemEdit ? 46 : 62 }}
                      controls={false}
                    />
                  ) : (
                    <Input
                      placeholder={t('filtersFormMax')}
                      variant='filled'
                      style={{ width: isSingleItemEdit ? 46 : 62 }}
                    />
                  )}
                </Form.Item>
              </div>
            </Form.Item>
          ) : inputStrategy === 'tags' ? (
            <Form.Item
              label={isSingleItemEdit ? undefined : t('filtersFormValue')}
              name='value'
              rules={[
                {
                  validator: (_, value) => {
                    if (Array.isArray(value) && value.length > 0) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(t('filtersValidationEnterAtLeastOneValue')))
                  },
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Select
                mode='tags'
                variant='filled'
                tokenSeparators={[',']}
                placeholder={
                  selectedFieldRole === 'measure' ? t('filtersFormInputNumbers') : t('filtersFormInputValues')
                }
                style={{ width: '100%' }}
              />
            </Form.Item>
          ) : (
            <Form.Item
              label={isSingleItemEdit ? undefined : t('filtersFormValue')}
              name='value'
              rules={[
                {
                  required: !['is null', 'is not null'].includes(operator ?? ''),
                  message: t('filtersValidationEnterValue'),
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              {inputStrategy === 'number' ? (
                <InputNumber
                  variant='filled'
                  placeholder={t('filtersFormInputNumber')}
                  style={{ width: '100%' }}
                  controls={false}
                />
              ) : (
                <Input placeholder={t('filtersFormInputValue')} variant='filled' />
              )}
            </Form.Item>
          )}
        </>
      )}

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

  const renderFilterList = () => (
    <div style={{ width: 256 }}>
      {filters.length === 0 && !isAdding ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('filtersEmptyWhere')} style={{ margin: '20px 0' }} />
      ) : (
        <div style={{ maxHeight: 200, overflow: 'auto' }}>
          {filters.map((item, index) => (
            <div
              key={item.id ?? `where-filter-${index}`}
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
                {getFilterDisplayText(item)}
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

      {isAdding && renderFilterForm()}
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
          {t('filtersTitlesWhere')}
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

      {renderFilterList()}
    </div>
  )

  // itemEdit 模式：只渲染单个 item 的编辑表单
  if (itemEdit && filters.length === 1) {
    return <div ref={containerRef}>{renderFilterForm()}</div>
  }

  // embedded 模式下直接渲染内容，不显示按钮
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
          {t('filtersButtonsWhere')}
        </Button>
      </Badge>
    </Popover>
  )
}
