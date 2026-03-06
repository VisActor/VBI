import React from 'react';
import { PlusOutlined, FontSizeOutlined } from '@ant-design/icons';
import './Shelf.css';

export interface MeasureShelfProps {
  items: string[];
  onAdd?: (field: string) => void;
  existingFields?: string[];
  style?: React.CSSProperties;
}

const MeasureShelf: React.FC<MeasureShelfProps> = ({
  items,
  onAdd,
  existingFields = [],
  style,
}) => {
  const handleAction = (field: string) => {
    if (onAdd && !existingFields.includes(field)) {
      onAdd(field);
    }
  };

  return (
    <div className="shelf" style={style}>
      <div className="shelf-items">
        {items.map((field) => {
          const isExists = existingFields.includes(field);
          return (
            <div
              key={field}
              className="shelf-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/x-vbi-measure-field', field);
                e.dataTransfer.setData('text/plain', field);
                e.dataTransfer.effectAllowed = 'move';
              }}
            >
              <FontSizeOutlined style={{ marginRight: 4 }} />
              <span className="shelf-item-text">{field}</span>
              <button
                className="shelf-item-remove"
                onClick={() => handleAction(field)}
                disabled={isExists}
                style={{
                  opacity: isExists ? 0.3 : undefined,
                  cursor: isExists ? 'not-allowed' : undefined,
                }}
              >
                <PlusOutlined style={{ color: '#e0e0e0' }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeasureShelf;
