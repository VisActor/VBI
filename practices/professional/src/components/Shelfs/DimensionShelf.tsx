import React from 'react';
import { PlusOutlined, NumberOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import './Shelf.css';

export interface DimensionShelfProps {
  items: string[];
  onAddDimension?: (field: string) => void;
  onAddMeasure?: (field: string) => void;
  existingFields?: string[];
  style?: React.CSSProperties;
}

const DimensionShelf: React.FC<DimensionShelfProps> = ({
  items,
  onAddDimension,
  onAddMeasure,
  existingFields = [],
  style,
}) => {
  const handleAddField = (field: string, type: 'dimension' | 'measure') => {
    if (type === 'dimension' && onAddDimension) {
      onAddDimension(field);
    } else if (type === 'measure' && onAddMeasure) {
      onAddMeasure(field);
    }
  };

  const createMenuItems = (field: string): MenuProps['items'] => [
    {
      key: 'dimension',
      label: 'Add as Dimension',
      onClick: () => handleAddField(field, 'dimension'),
    },
    {
      key: 'measure',
      label: 'Add as Measure',
      onClick: () => handleAddField(field, 'measure'),
    },
  ];

  return (
    <div className="shelf" style={style}>
      <div className="shelf-items">
        {items.map((field) => {
          const isExists = existingFields.includes(field);
          return (
            <div key={field} className="shelf-item">
              <NumberOutlined style={{ marginRight: 4 }} />
              <span className="shelf-item-text">{field}</span>
              <Dropdown
                menu={{ items: createMenuItems(field) }}
                disabled={isExists}
              >
                <button
                  className="shelf-item-remove"
                  disabled={isExists}
                  style={{
                    opacity: isExists ? 0.3 : undefined,
                    cursor: isExists ? 'not-allowed' : 'pointer',
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <PlusOutlined style={{ color: '#e0e0e0' }} />
                </button>
              </Dropdown>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DimensionShelf;
