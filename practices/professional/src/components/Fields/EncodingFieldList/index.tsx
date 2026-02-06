import React, { useState } from 'react';
import { FontSizeOutlined, NumberOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Form } from 'antd';
import '../FieldList.css';
import { MeasureEncodingType, DimensionEncodingType } from '../../../utils/chartMeasureEncodings';

export interface EncodingFieldListProps {
  encoding: string;
  label: string;
  measureItems?: string[];
  dimensionItems?: string[];
  measures?: Record<string, { alias?: string; aggregate?: { func: string }; encoding?: string }>;
  dimensions?: Record<string, { alias?: string; encoding?: string }>;
  onRemoveMeasure?: (measureAlias: string) => void;
  onRemoveDimension?: (field: string) => void;
  onRenameMeasure?: (field: string, alias: string) => void;
  onChangeAggregateFunc?: (field: string, func: string) => void;
  onDropMeasure?: (measureAlias: string, encoding: MeasureEncodingType) => void;
  onDropDimension?: (field: string, encoding: DimensionEncodingType) => void;
  style?: React.CSSProperties;
}

const EncodingFieldList: React.FC<EncodingFieldListProps> = ({
  encoding,
  label,
  measureItems = [],
  dimensionItems = [],
  measures = {},
  dimensions = {},
  onRemoveMeasure,
  onRemoveDimension,
  onRenameMeasure,
  onChangeAggregateFunc,
  onDropMeasure,
  onDropDimension,
  style,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editAlias, setEditAlias] = useState('');
  const [editAggregate, setEditAggregate] = useState('sum');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragType = e.dataTransfer.getData('dragType');
    const measureAlias = e.dataTransfer.getData('measureAlias');  // or field for dimensions
    const field = e.dataTransfer.getData('field');
    if (dragType === 'measure' && onDropMeasure) {
      // Pass measureAlias for measures (it's the unique identity)
      onDropMeasure(measureAlias || field, encoding as MeasureEncodingType);
    } else if (dragType === 'dimension' && onDropDimension) {
      onDropDimension(field, encoding as DimensionEncodingType);
    }
  };

  const handleEditMeasure = (field: string) => {
    const measure = measures[field];
    setEditingField(field);
    setEditAlias(measure?.alias || field);
    setEditAggregate(measure?.aggregate?.func || 'sum');
  };

  const handleSaveMeasure = () => {
    if (editingField) {
      if (onRenameMeasure && editAlias) {
        onRenameMeasure(editingField, editAlias);
      }
      if (onChangeAggregateFunc) {
        onChangeAggregateFunc(editingField, editAggregate);
      }
      setEditingField(null);
    }
  };

  const isEmpty = measureItems.length === 0 && dimensionItems.length === 0;

  return (
    <>
      <div className="fieldlist" style={style}>
      <div className="fieldlist-title">{label}</div>
      <div
        className="fieldlist-items"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          minHeight: '60px',
          borderTop: '1px solid #333',
          borderBottom: '1px solid #333',
        }}
      >
        {isEmpty && (
          <div className="fieldlist-empty" style={{ fontSize: 12, color: '#666' }}>
            Drop measure or dimension
          </div>
        )}
        {/* 显示 dimension 项 */}
        {dimensionItems.map((field) => {
          const dimension = dimensions[field];
          const displayName = dimension?.alias || field;
          return (
            <div key={`dim-${field}`} className="fieldlist-item">
              <NumberOutlined style={{ marginRight: 4 }} />
              <span className="fieldlist-item-text" title={field}>
                {displayName}
              </span>
              {onRemoveDimension && (
                <button
                  className="fieldlist-item-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveDimension(field);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
        {/* 显示 measure 项 */}
        {measureItems.map((field) => {
          const measure = measures[field];
          const displayName = measure?.alias || field;
          const aggregate = measure?.aggregate?.func || 'sum';
          return (
            <div key={`meas-${field}`} className="fieldlist-item">
              <FontSizeOutlined style={{ marginRight: 4 }} />
              <span className="fieldlist-item-text" title={field}>
                {displayName} ({aggregate})
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {onRenameMeasure && onChangeAggregateFunc && (
                  <button
                    className="fieldlist-item-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditMeasure(field);
                    }}
                    title="Edit"
                    style={{ padding: '2px 6px', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <EditOutlined />
                  </button>
                )}
                {onRemoveMeasure && (
                  <button
                    className="fieldlist-item-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMeasure(field);
                    }}
                    title="Remove"
                    style={{ padding: '2px 6px', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    <DeleteOutlined />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <Modal
      title="Edit Measure"
      open={editingField !== null}
      onOk={handleSaveMeasure}
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
            options={[
              { label: 'Sum', value: 'sum' },
              { label: 'Count', value: 'count' },
              { label: 'Count Distinct', value: 'count_distinct' },
              { label: 'Average', value: 'avg' },
              { label: 'Min', value: 'min' },
              { label: 'Max', value: 'max' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
    </>
  );
};

export default EncodingFieldList;
