// FieldList.tsx
import React, { useState } from 'react';
import {
  DeleteOutlined,
  NumberOutlined,
  FontSizeOutlined,
} from '@ant-design/icons';
import './FieldList.css';

export interface FieldListProps {
  title: string;
  items: string[];
  onAdd?: (field: string) => void;
  onRemove: (field: string) => void;
  onDropDimension?: (field: string) => void;
  style?: React.CSSProperties;
}

const FieldList: React.FC<FieldListProps> = ({
  title,
  items,
  onAdd,
  onRemove,
  onDropDimension,
  style,
}) => {
  const [hoveredDropZone, setHoveredDropZone] = useState(false);
  const getIcon = () => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('dimension')) {
      return <NumberOutlined style={{ marginRight: 4 }} />;
    }
    if (lowerTitle.includes('measure')) {
      return <FontSizeOutlined style={{ marginRight: 4 }} />;
    }
    return null;
  };

  return (
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
        {title}
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
          <div className="fieldlist-empty">No {title.toLowerCase()} added</div>
        )}
        {items.map((field) => (
          <div
            key={field}
            className="fieldlist-item"
            onClick={() => onAdd && onAdd(field)}
          >
            {getIcon()}
            <span className="fieldlist-item-text">{field}</span>
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
        ))}
      </div>
    </div>
  );
};

export default FieldList;
