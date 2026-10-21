import { useDraggable } from '@dnd-kit/core'
import {
  CalendarOutlined,
  FontSizeOutlined,
  FilterOutlined,
  NumberOutlined,
  DownOutlined,
  SearchOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Badge, Button, Checkbox, Divider, Flex, Input, Popover, Typography, theme } from 'antd'
import { memo, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { CompatCard as Card } from '../../antdCompat'
import { createSchemaFieldDragId, type SchemaFieldDragData } from '../../Shelves/dnd'
import { getDefaultDimensionDateAggregate } from '../../Shelves/dimensionDateAggregateUtils'
import type { VBISchemaField } from '../../../hooks/useVBISchemaFields'
import { useVBIDimensions, useVBIMeasures, useVBISchemaFields } from '../../../hooks'
import { useTranslation } from '../../../i18n'
import { useVBIStore } from '../../../model'
import type { FieldRole } from '../../../utils/fieldRole'

const MAX_VISIBLE_FIELDS = 10
const FIELD_ROLE_OPTIONS: FieldRole[] = ['dimension', 'measure']
const FIELD_TYPE_LABEL_KEYS: Record<string, string> = {
  number: 'panelsFieldsTypeNumber',
  string: 'panelsFieldsTypeString',
  date: 'panelsFieldsTypeDate',
  datetime: 'panelsFieldsTypeDatetime',
  timestamp: 'panelsFieldsTypeTimestamp',
  boolean: 'panelsFieldsTypeBoolean',
}

const getFieldIcon = (field: Pick<VBISchemaField, 'isDate' | 'role'>, color: string) => {
  if (field.role === 'measure') {
    return <NumberOutlined style={{ color, fontSize: 12 }} />
  }

  if (field.isDate) {
    return <CalendarOutlined style={{ color, fontSize: 12 }} />
  }

  return <FontSizeOutlined style={{ color, fontSize: 12 }} />
}

const FieldListItem = ({ field, onClick }: { field: VBISchemaField; onClick: () => void }) => {
  const { token } = theme.useToken()
  const [isHovered, setIsHovered] = useState(false)
  const accentColor = field.role === 'measure' ? token.colorSuccessText : token.colorPrimaryText
  const hoverBackground = field.role === 'measure' ? token.colorSuccessBg : token.colorPrimaryBg
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: createSchemaFieldDragId({
      field: field.name,
      role: field.role,
    }),
    data: {
      kind: 'schema-field',
      payload: {
        field: field.name,
        type: field.type,
        role: field.role,
      },
      label: field.name,
    } satisfies SchemaFieldDragData,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        width: '100%',
        padding: '4px 6px',
        cursor: 'grab',
        borderRadius: token.borderRadiusSM,
        border: `1px solid ${isHovered ? accentColor : 'transparent'}`,
        transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
        fontSize: 12,
        color: isHovered ? accentColor : token.colorText,
        backgroundColor: isHovered ? hoverBackground : 'transparent',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 14,
          flexShrink: 0,
        }}
      >
        {getFieldIcon(field, accentColor)}
      </span>
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 12,
          lineHeight: '18px',
        }}
      >
        {field.name}
      </span>
    </div>
  )
}

const FieldSection = ({
  title,
  fields,
  onAddField,
  expanded,
  onToggleExpanded,
  expandLabel,
  collapseLabel,
}: {
  title: string
  fields: VBISchemaField[]
  onAddField: (field: VBISchemaField) => void
  expanded: boolean
  onToggleExpanded: () => void
  expandLabel: string
  collapseLabel: string
}) => {
  const { token } = theme.useToken()
  const visibleFields = expanded ? fields : fields.slice(0, MAX_VISIBLE_FIELDS)
  const shouldShowToggle = fields.length > MAX_VISIBLE_FIELDS

  return (
    <Flex vertical gap={4}>
      <Typography.Text
        type='secondary'
        style={{
          fontSize: 11,
          fontWeight: 500,
          lineHeight: '16px',
          paddingInline: 8,
        }}
      >
        {title}
      </Typography.Text>
      <Flex vertical gap={1}>
        {visibleFields.map((field) => (
          <FieldListItem key={`${field.role}-field-${field.name}`} field={field} onClick={() => onAddField(field)} />
        ))}
        {shouldShowToggle && (
          <Button
            type='text'
            size='small'
            onClick={onToggleExpanded}
            icon={expanded ? <UpOutlined /> : <DownOutlined />}
            style={{
              justifyContent: 'center',
              paddingInline: 8,
              height: 24,
              fontSize: 11,
              color: token.colorTextSecondary,
            }}
          >
            {expanded ? collapseLabel : expandLabel}
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

const formatFallbackTypeLabel = (fieldType: string) => {
  return fieldType.replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export const FieldList = memo(({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder)
  const { token } = theme.useToken()
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<FieldRole[]>(FIELD_ROLE_OPTIONS)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isDimensionsExpanded, setIsDimensionsExpanded] = useState(false)
  const [isMeasuresExpanded, setIsMeasuresExpanded] = useState(false)
  const hasInitializedTypeFiltersRef = useRef(false)
  const { dimensions: shelfDimensions, addDimension } = useVBIDimensions(builder)
  const { measures: shelfMeasures, addMeasure } = useVBIMeasures(builder)
  const { schemaFields } = useVBISchemaFields(builder)

  const fieldTypeOptions = useMemo(() => {
    return Array.from(
      new Set(schemaFields.map((field) => field.type).filter((fieldType): fieldType is string => Boolean(fieldType))),
    )
  }, [schemaFields])

  useEffect(() => {
    if (hasInitializedTypeFiltersRef.current) {
      return
    }

    if (fieldTypeOptions.length === 0) {
      return
    }

    hasInitializedTypeFiltersRef.current = true
    setSelectedTypes(fieldTypeOptions)
  }, [fieldTypeOptions])

  const effectiveSelectedTypes = hasInitializedTypeFiltersRef.current ? selectedTypes : fieldTypeOptions

  const normalizedKeyword = keyword.trim().toLowerCase()
  const filteredFields = useMemo(() => {
    return schemaFields.filter((field) => {
      if (!selectedRoles.includes(field.role)) {
        return false
      }

      if (!effectiveSelectedTypes.includes(field.type)) {
        return false
      }

      if (!normalizedKeyword) {
        return true
      }

      return (
        field.name.toLowerCase().includes(normalizedKeyword) || field.type.toLowerCase().includes(normalizedKeyword)
      )
    })
  }, [effectiveSelectedTypes, normalizedKeyword, schemaFields, selectedRoles])

  const dimensions = useMemo(() => {
    return filteredFields.filter((field) => field.role === 'dimension')
  }, [filteredFields])

  const measures = useMemo(() => {
    return filteredFields.filter((field) => field.role === 'measure')
  }, [filteredFields])

  const hasFields = dimensions.length > 0 || measures.length > 0
  const hasActiveFilter =
    selectedRoles.length !== FIELD_ROLE_OPTIONS.length || effectiveSelectedTypes.length !== fieldTypeOptions.length

  const getFieldTypeLabel = (fieldType: string) => {
    const key = FIELD_TYPE_LABEL_KEYS[fieldType.toLowerCase()]
    return key ? t(key) : formatFallbackTypeLabel(fieldType)
  }

  const addField = (field: VBISchemaField) => {
    if (field.role === 'measure') {
      if (!shelfMeasures.some((measure) => measure.field === field.name)) {
        addMeasure(field.name)
      }
      return
    }

    if (!shelfDimensions.some((dimension) => dimension.field === field.name)) {
      addDimension(field.name, (node) => {
        if (field.isDate) {
          node.setAggregate(getDefaultDimensionDateAggregate())
        }
      })
    }
  }

  const resetFilters = () => {
    setSelectedRoles(FIELD_ROLE_OPTIONS)
    setSelectedTypes(fieldTypeOptions)
  }

  const filterContent = (
    <Flex vertical gap={8} style={{ width: 188 }}>
      <Flex align='center' justify='space-between'>
        <Typography.Text style={{ fontSize: 12, fontWeight: 500 }}>{t('panelsFieldsFiltersTitle')}</Typography.Text>
        <Button type='text' size='small' onClick={resetFilters} style={{ paddingInline: 4, height: 22, fontSize: 11 }}>
          {t('panelsFieldsFiltersReset')}
        </Button>
      </Flex>

      <Flex vertical gap={6}>
        <Typography.Text type='secondary' style={{ fontSize: 11, lineHeight: '16px' }}>
          {t('panelsFieldsFiltersRole')}
        </Typography.Text>
        <Checkbox.Group value={selectedRoles} onChange={(values: unknown[]) => setSelectedRoles(values as FieldRole[])}>
          <Flex vertical gap={4}>
            {FIELD_ROLE_OPTIONS.map((role) => (
              <Checkbox key={role} value={role}>
                {role === 'dimension' ? t('panelsFieldsFilterDimension') : t('panelsFieldsFilterMeasure')}
              </Checkbox>
            ))}
          </Flex>
        </Checkbox.Group>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <Flex vertical gap={6}>
        <Typography.Text type='secondary' style={{ fontSize: 11, lineHeight: '16px' }}>
          {t('panelsFieldsFiltersType')}
        </Typography.Text>
        <Checkbox.Group value={selectedTypes} onChange={(values: unknown[]) => setSelectedTypes(values as string[])}>
          <Flex vertical gap={4}>
            {fieldTypeOptions.map((fieldType) => (
              <Checkbox key={fieldType} value={fieldType}>
                {getFieldTypeLabel(fieldType)}
              </Checkbox>
            ))}
          </Flex>
        </Checkbox.Group>
      </Flex>
    </Flex>
  )

  return (
    <Card
      title={<span style={{ fontSize: 13, fontWeight: 500 }}>{t('panelsFieldsTitle')}</span>}
      size='small'
      style={{ ...style }}
      styles={{
        root: {
          height: '100%',
          minHeight: 0,
          borderColor: token.colorBorderSecondary,
        },
        body: {
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
          minHeight: 0,
        },
        header: {
          minHeight: 32,
          padding: '6px 10px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        },
      }}
    >
      <Flex gap={4}>
        <Input
          size='small'
          allowClear
          value={keyword}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value)}
          placeholder={t('panelsFieldsSearchPlaceholder')}
          style={{ flex: 1 }}
          prefix={<SearchOutlined style={{ color: token.colorTextQuaternary, fontSize: 12 }} />}
        />
        <Popover
          trigger='click'
          placement='bottomRight'
          content={filterContent}
          styles={{
            container: {
              padding: 14,
              borderRadius: token.borderRadiusLG,
            },
          }}
        >
          <Badge dot={hasActiveFilter}>
            <Button
              type='text'
              size='small'
              icon={<FilterOutlined />}
              aria-label={t('panelsFieldsFiltersTitle')}
              style={{
                width: 28,
                minWidth: 28,
                height: 28,
                padding: 0,
                borderRadius: token.borderRadiusSM,
                border: `1px solid ${hasActiveFilter ? token.colorPrimaryBorder : token.colorBorderSecondary}`,
                color: hasActiveFilter ? token.colorPrimaryText : token.colorTextSecondary,
                backgroundColor: hasActiveFilter ? token.colorPrimaryBg : token.colorFillQuaternary,
              }}
            />
          </Badge>
        </Popover>
      </Flex>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {hasFields ? (
          <Flex vertical gap={0}>
            {dimensions.length > 0 && (
              <FieldSection
                title={t('panelsFieldsDimensions')}
                fields={dimensions}
                onAddField={addField}
                expanded={isDimensionsExpanded}
                onToggleExpanded={() => setIsDimensionsExpanded((expanded) => !expanded)}
                expandLabel={t('panelsFieldsExpand')}
                collapseLabel={t('panelsFieldsCollapse')}
              />
            )}

            {dimensions.length > 0 && measures.length > 0 && <Divider style={{ margin: '6px 0' }} />}

            {measures.length > 0 && (
              <FieldSection
                title={t('panelsFieldsMeasures')}
                fields={measures}
                onAddField={addField}
                expanded={isMeasuresExpanded}
                onToggleExpanded={() => setIsMeasuresExpanded((expanded) => !expanded)}
                expandLabel={t('panelsFieldsExpand')}
                collapseLabel={t('panelsFieldsCollapse')}
              />
            )}
          </Flex>
        ) : (
          <Flex align='center' justify='center' style={{ height: '100%', minHeight: 120, paddingInline: 12 }}>
            <Typography.Text type='secondary' style={{ fontSize: 12, textAlign: 'center' }}>
              {t('panelsFieldsEmpty')}
            </Typography.Text>
          </Flex>
        )}
      </div>
    </Card>
  )
})
