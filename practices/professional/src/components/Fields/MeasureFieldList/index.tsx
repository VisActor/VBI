import React, { useState } from 'react';
import { DeleteOutlined, FontSizeOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Form } from 'antd';
import '../FieldList.css';

export interface MeasureFieldListProps {
  items: string[];
  measures?: Record<string, { alias?: string; aggregate?: { func: string } }>;
  onRemove: (field: string) => void;
  onRename?: (field: string, alias: string) => void;
  onChangeAggregate?: (field: string, func: string) => void;
  onDropDimension?: (field: string) => void;
  onDropMeasure?: (field: string) => void;
  style?: React.CSSProperties;
}

const MeasureFieldList: React.FC<MeasureFieldListProps> = ({
  items,
  measures = {},
  onRemove,
  onRename,
  onChangeAggregate,
  onDropDimension,
  onDropMeasure,
  style,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragType = e.dataTransfer.getData('dragType');
    const field = e.dataTransfer.getData('field');
    if (dragType === 'dimension' && onDropDimension) {
      onDropDimension(field);
    } else if (dragType === 'measure' && onDropMeasure) {
      onDropMeasure(field);
    }
  };
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editAlias, setEditAlias] = useState('');
  const [editAggregate, setEditAggregate] = useState('sum');

  const handleEdit = (field: string) => {
    const measure = measures[field];
    setEditingField(field);
    setEditAlias(measure?.alias || field);
    setEditAggregate(measure?.aggregate?.func || 'sum');
  };

  const handleSave = () => {
    if (editingField && onRename) {
      onRename(editingField, editAlias);
    }
    if (editingField && onChangeAggregate) {
      onChangeAggregate(editingField, editAggregate);
    }
    setEditingField(null);
  };

  return (
    <>
      <div className="fieldlist" style={style}>
        <div className="fieldlist-title">MEASURES</div>
        <div
          className="fieldlist-items"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {items.length === 0 && (
            <div className="fieldlist-empty">Drop measures here</div>
          )}
          {items.map((field) => {
            const measure = measures[field];
            const displayName = measure?.alias || field;
            const aggregate = measure?.aggregate?.func || 'sum';
            return (
              <div 
                key={field} 
                className="fieldlist-item"
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'copy';
                  e.dataTransfer.setData('dragType', 'measure');
                  e.dataTransfer.setData('measureAlias', field);  // Use alias as unique identity
                }}
                style={{ cursor: 'grab' }}
              >
                <FontSizeOutlined style={{ marginRight: 4 }} />
                <span className="fieldlist-item-text">
                  {displayName} ({aggregate})
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

export default MeasureFieldList;
