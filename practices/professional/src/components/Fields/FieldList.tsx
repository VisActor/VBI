// FieldList.tsx
import React from 'react';
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
  style?: React.CSSProperties;
}

const FieldList: React.FC<FieldListProps> = ({
  title,
  items,
  onAdd,
  onRemove,
  style,
}) => {
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
    <div className="fieldlist" style={style}>
      <div className="fieldlist-title">{title}</div>
      <div className="fieldlist-items">
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
