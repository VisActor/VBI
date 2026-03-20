import React, { useMemo, useState } from 'react';
import type { VBIDimension } from '@visactor/vbi';
import {
  DeleteOutlined,
  EditOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Form, Input, Modal, Select } from 'antd';
import { useTranslation } from 'src/i18n';
import '../FieldList.css';

type DimensionEncoding = NonNullable<VBIDimension['encoding']>;
type DimensionAggregate = NonNullable<VBIDimension['aggregate']>;

const DATE_AGGREGATE_OPTIONS: Array<{
  label: string;
  value: DimensionAggregate['func'];
}> = [
  { label: 'Year', value: 'toYear' },
  { label: 'Quarter', value: 'toQuarter' },
  { label: 'Month', value: 'toMonth' },
  { label: 'Week', value: 'toWeek' },
  { label: 'Day', value: 'toDay' },
  { label: 'Hour', value: 'toHour' },
  { label: 'Minute', value: 'toMinute' },
  { label: 'Second', value: 'toSecond' },
];

export interface DimensionFieldListProps {
  items: VBIDimension[];
  fieldTypeMap: Record<string, string>;
  supportedEncodings: DimensionEncoding[];
  onRemove: (id: string) => void;
  onRename: (id: string, alias: string) => void;
  onChangeEncoding: (id: string, encoding: DimensionEncoding) => void;
  onChangeAggregate: (id: string, aggregate?: DimensionAggregate) => void;
  onDropDimension?: (field: string) => void;
  style?: React.CSSProperties;
}

const isDateField = (fieldType?: string) => {
  return ['date', 'datetime', 'timestamp'].includes(fieldType ?? '');
};

const formatAggregate = (aggregate?: DimensionAggregate) => {
  if (!aggregate) {
    return '';
  }

  return aggregate.func.replace('to', '');
};

const DimensionFieldList: React.FC<DimensionFieldListProps> = ({
  items,
  fieldTypeMap,
  supportedEncodings,
  onRemove,
  onRename,
  onChangeEncoding,
  onChangeAggregate,
  onDropDimension,
  style,
}) => {
  const { locale } = useTranslation();
  const isZh = locale === 'zh-CN';
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlias, setEditAlias] = useState('');
  const [editEncoding, setEditEncoding] = useState<DimensionEncoding>('column');
  const [editAggregate, setEditAggregate] = useState<
    DimensionAggregate['func'] | 'none'
  >('none');
  const [hoveredDropZone, setHoveredDropZone] = useState(false);

  const editingDimension = useMemo(() => {
    return items.find((item) => item.id === editingId);
  }, [editingId, items]);

  const handleEdit = (item: VBIDimension) => {
    setEditingId(item.id);
    setEditAlias(item.alias || item.field);
    setEditEncoding(
      (item.encoding || supportedEncodings[0] || 'column') as DimensionEncoding,
    );
    setEditAggregate(item.aggregate?.func || 'none');
  };

  const handleSave = () => {
    if (!editingDimension) {
      return;
    }

    onRename(editingDimension.id, editAlias);
    onChangeEncoding(editingDimension.id, editEncoding);
    onChangeAggregate(
      editingDimension.id,
      editAggregate === 'none' ? undefined : { func: editAggregate },
    );
    setEditingId(null);
  };

  return (
    <>
      <div
        className="fieldlist"
        style={style}
        onDragOver={(event) => {
          if (!onDropDimension) {
            return;
          }
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          setHoveredDropZone(true);
        }}
        onDragLeave={() => setHoveredDropZone(false)}
        onDrop={(event) => {
          if (!onDropDimension) {
            return;
          }
          event.preventDefault();
          const field =
            event.dataTransfer.getData('application/x-vbi-dimension-field') ||
            event.dataTransfer.getData('text/plain');
          if (field) {
            onDropDimension(field);
          }
          setHoveredDropZone(false);
        }}
      >
        <div
          className="fieldlist-title"
          style={{
            backgroundColor: hoveredDropZone ? '#e6f4ff' : 'transparent',
            transition: 'background-color 0.2s',
          }}
        >
          {isZh ? '维度' : 'DIMENSIONS'}
        </div>
        <div
          className="fieldlist-items"
          style={{
            backgroundColor: hoveredDropZone ? '#e6f4ff' : 'transparent',
            borderRadius: '2px',
            transition: 'background-color 0.2s',
          }}
        >
          {items.length === 0 && (
            <div className="fieldlist-empty">
              {isZh ? '还没有添加维度' : 'No dimensions added'}
            </div>
          )}
          {items.map((item) => {
            const aggregateLabel = formatAggregate(item.aggregate);
            const displayName = item.alias || item.field;
            const suffix = aggregateLabel ? `${aggregateLabel} · ` : '';
            return (
              <div key={item.id} className="fieldlist-item">
                <NumberOutlined style={{ marginRight: 4 }} />
                <span className="fieldlist-item-text">
                  {suffix}
                  {displayName}
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    className="fieldlist-item-action"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEdit(item);
                    }}
                    title={isZh ? '编辑' : 'Edit'}
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="fieldlist-item-remove"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemove(item.id);
                    }}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        title={isZh ? '编辑维度' : 'Edit Dimension'}
        open={editingDimension !== undefined}
        onOk={handleSave}
        onCancel={() => setEditingId(null)}
      >
        <Form layout="vertical">
          <Form.Item label={isZh ? '显示名' : 'Alias'}>
            <Input
              value={editAlias}
              onChange={(event) => setEditAlias(event.target.value)}
              placeholder={isZh ? '输入维度显示名' : 'Enter dimension alias'}
            />
          </Form.Item>
          <Form.Item label={isZh ? '编码' : 'Encoding'}>
            <Select
              value={editEncoding}
              onChange={(value) => setEditEncoding(value)}
              options={supportedEncodings.map((encoding) => ({
                label: encoding,
                value: encoding,
              }))}
            />
          </Form.Item>
          {editingDimension &&
            isDateField(fieldTypeMap[editingDimension.field]) && (
              <Form.Item label={isZh ? '日期聚合' : 'Date Aggregate'}>
                <Select
                  value={editAggregate}
                  onChange={(value) => setEditAggregate(value)}
                  options={[
                    {
                      label: isZh ? '原始值' : 'Raw Value',
                      value: 'none',
                    },
                    ...DATE_AGGREGATE_OPTIONS,
                  ]}
                />
              </Form.Item>
            )}
        </Form>
      </Modal>
    </>
  );
};

export default DimensionFieldList;
