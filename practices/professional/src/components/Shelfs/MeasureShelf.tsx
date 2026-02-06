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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, field: string, type: 'measure') => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('dragType', type);
    e.dataTransfer.setData('field', field);
    // For measures, also set measureAlias (which will be the measure's alias after adding)
    e.dataTransfer.setData('measureAlias', field);  
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
              draggable={true}
              onDragStart={(e) => handleDragStart(e, field, 'measure')}
              style={{
                cursor: 'grab',
                opacity: 1,
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
