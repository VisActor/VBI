import React, { useState } from 'react';
import {
  DeleteOutlined,
  FontSizeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Modal, Input, Select, Form } from 'antd';
import '../FieldList.css';

export interface MeasureFieldListProps {
  items: string[];
  measures?: Record<
    string,
    { alias?: string; aggregate?: { func: string; quantile?: number } }
  >;
  dimensionMeasures?: string[];
  onRemove: (field: string) => void;
  onRename?: (field: string, newAlias: string) => void;
  onChangeAggregate?: (field: string, func: string, quantile?: number) => void;
  onDropDimension?: (field: string) => void;
  style?: React.CSSProperties;
}

// 所有 11 种聚合方式的选项
const ALL_AGGREGATE_OPTIONS = [
  { label: 'Sum', value: 'sum' },
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'count_distinct' },
  { label: 'Average', value: 'avg' },
  { label: 'Min', value: 'min' },
  { label: 'Max', value: 'max' },
  { label: 'Variance', value: 'variance' },
  { label: 'Variance Pop', value: 'variancePop' },
  { label: 'Std Dev', value: 'stddev' },
  { label: 'Median', value: 'median' },
  { label: 'Quantile', value: 'quantile' },
];

// Dimension 字段只能用 count 聚合
const DIMENSION_AGGREGATE_OPTIONS = [
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'count_distinct' },
];

const MeasureFieldList: React.FC<MeasureFieldListProps> = ({
  items,
  measures = {},
  dimensionMeasures = [],
  onRemove,
  onRename,
  onChangeAggregate,
  onDropDimension,
  style,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editAlias, setEditAlias] = useState('');
  const [editAggregate, setEditAggregate] = useState('sum');
  const [editQuantile, setEditQuantile] = useState(0.5);
  const [hoveredDropZone, setHoveredDropZone] = useState(false);

  const handleEdit = (field: string) => {
    const measure = measures[field];
    setEditingField(field);
    setEditAlias(measure?.alias || field);

    // 如果这个字段来自 dimension，聚合函数只能是 count 或 count_distinct
    const isDimensionMeasure = dimensionMeasures.includes(field);
    let defaultFunc = measure?.aggregate?.func || 'sum';
    if (
      isDimensionMeasure &&
      !['count', 'count_distinct'].includes(defaultFunc)
    ) {
      defaultFunc = 'count';
    }
    setEditAggregate(defaultFunc);
    setEditQuantile(measure?.aggregate?.quantile || 0.5);
  };

  const handleSave = () => {
    if (editingField) {
      // 先修改聚合函数
      if (onChangeAggregate) {
        const quantile =
          editAggregate === 'quantile' ? editQuantile : undefined;
        onChangeAggregate(editingField, editAggregate, quantile);
      }
      // 如果修改了别名，再进行重命名
      const oldAlias = measures[editingField]?.alias || editingField;
      if (onRename && editAlias !== oldAlias) {
        onRename(editingField, editAlias);
      }
    }

    // 使用setTimeout确保状态更新完成后再关闭Modal
    setTimeout(() => {
      setEditingField(null);
    }, 0);
  };

  return (
    <>
      <div
        className="fieldlist"
        style={style}
        onDragOver={(e) => {
          if (!onDropDimension) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          setHoveredDropZone(true);
        }}
        onDragLeave={() => {
          setHoveredDropZone(false);
        }}
        onDrop={(e) => {
          if (!onDropDimension) return;
          e.preventDefault();
          const field = e.dataTransfer.getData('application/x-vbi-dimension-field') ||
                        e.dataTransfer.getData('text/plain');
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
          MEASURES
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
            <div className="fieldlist-empty">No measures added</div>
          )}
          {items.map((field) => {
            const measure = measures[field];
            const displayName = measure?.alias || field;
            const aggregateFunc = measure?.aggregate?.func || 'sum';
            return (
              <div
                key={field}
                className="fieldlist-item"
                style={{ cursor: 'grab' }}
              >
                <FontSizeOutlined style={{ marginRight: 4 }} />
                <span className="fieldlist-item-text">
                  {displayName} ({aggregateFunc})
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    className="fieldlist-item-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(field);
                    }}
                    title="Edit"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="fieldlist-item-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(field);
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
        title="Edit Measure"
        open={editingField !== null}
        onOk={handleSave}
        onCancel={() => setEditingField(null)}
      >
        <Form layout="vertical">
          <Form.Item label="Alias">
            <Input
              value={editAlias}
              onChange={(e) => setEditAlias(e.target.value)}
              placeholder="Enter measure alias"
            />
          </Form.Item>
          <Form.Item label="Aggregate Function">
            <Select
              value={editAggregate}
              onChange={setEditAggregate}
              options={
                editingField && dimensionMeasures.includes(editingField)
                  ? DIMENSION_AGGREGATE_OPTIONS
                  : ALL_AGGREGATE_OPTIONS
              }
            />
          </Form.Item>
          {editAggregate === 'quantile' && (
            <Form.Item label="Quantile (0-1)">
              <Input
                type="number"
                min={0}
                max={1}
                step={0.1}
                value={editQuantile}
                onChange={(e) => setEditQuantile(parseFloat(e.target.value))}
                placeholder="0.5"
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default MeasureFieldList;
