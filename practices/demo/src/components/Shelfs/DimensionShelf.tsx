import {
  DeleteOutlined,
  CloseOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import { ObserveCallback, VBIDimension } from '@visactor/vbi';
import { Flex, Tag, Tooltip, Popover, Input, Button, Typography } from 'antd';
import { useEffect, useState as useStateHook } from 'react';
import { useVBIStore } from 'src/model';
import './shelfs.css';

const { Text } = Typography;

interface DimensionEditPopoverProps {
  dimension: VBIDimension;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  builder: any;
  onClose: () => void;
}

const DimensionEditPopover = ({
  dimension,
  builder,
  onClose,
}: DimensionEditPopoverProps) => {
  const [editAlias, setEditAlias] = useStateHook(
    dimension.alias || dimension.field,
  );

  const handleRename = () => {
    const newAlias = editAlias.trim();
    builder.doc.transact(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      builder.dimensions.update(dimension.field, (node: any) => {
        node.setAlias(newAlias || dimension.field);
      });
    });
    onClose();
  };

  const handleDelete = () => {
    builder.dimensions.remove(dimension.field);
    onClose();
  };

  return (
    <div style={{ width: 280, padding: 4 }}>
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          字段
        </Text>
        <div style={{ fontWeight: 500 }}>{dimension.field}</div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          显示名称
        </Text>
        <Input
          value={editAlias}
          onChange={(e) => setEditAlias(e.target.value)}
          placeholder="输入显示名称"
          style={{ marginTop: 4 }}
          size="small"
        />
      </div>
      <Flex gap={8}>
        <Button
          type="primary"
          size="small"
          onClick={handleRename}
          style={{ flex: 1 }}
        >
          保存
        </Button>
        <Button size="small" onClick={onClose}>
          取消
        </Button>
      </Flex>
      <Button
        type="text"
        danger
        size="small"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        style={{ width: '100%', marginTop: 8 }}
      >
        删除维度
      </Button>
    </div>
  );
};

export const DimensionShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const [dragOver, setDragOver] = useStateHook(false);

  const [dimensions, setDimensions] = useStateHook<VBIDimension[]>(
    builder.dimensions.toJson(),
  );

  // 拖拽排序相关状态
  const [draggedIndex, setDraggedIndex] = useStateHook<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useStateHook<number | null>(null);

  // Popover key 用于强制重新渲染
  const [popoverKey, setPopoverKey] = useStateHook(0);

  useEffect(() => {
    const updateDimensions: ObserveCallback = () => {
      setDimensions(builder.dimensions.toJson());
    };

    const unobserve = builder.dimensions.observe(updateDimensions);
    return unobserve;
  }, [builder]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!e.dataTransfer.types.includes('application/json')) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.role === 'dimension') {
        if (dimensions.some((d) => d.field === data.name)) {
          return;
        }
        builder.doc.transact(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          builder.dimensions.add(data.name, (node: any) => {
            node.setAlias(data.name);
          });
        });
      }
    } catch (err) {
      console.error('Drop error:', err);
    }
  };

  // 处理 Shelf 内部拖拽排序
  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && index !== draggedIndex) {
      setDragOverIndex(index);
    }
  };

  const handleItemDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleItemDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // 重新排序
    builder.doc.transact(() => {
      const newDimensions = [...dimensions];
      const [removed] = newDimensions.splice(draggedIndex, 1);
      newDimensions.splice(targetIndex, 0, removed);

      // 清除旧的并重新添加
      const yArray = builder.dimensions as unknown as {
        delete: (index: number, count: number) => void;
        length: number;
      };
      while (yArray.length > 0) {
        yArray.delete(0, 1);
      }
      newDimensions.forEach((d) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.dimensions.add(d.field, (node: any) => {
          node.setAlias(d.alias);
        });
      });
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleItemDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const deleteDimension = (field: VBIDimension['field']) => {
    builder.dimensions.remove(field);
  };

  const handlePopoverClose = () => {
    setPopoverKey((prev) => prev + 1);
  };

  const shelfStyle: React.CSSProperties = {
    flexBasis: 300,
    alignItems: 'center',
    ...style,
  };

  return (
    <Flex
      vertical={false}
      gap={4}
      className={`vbi-shelf vbi-shelf--dimension${dragOver ? ' vbi-shelf--dragover' : ''}`}
      style={shelfStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dimensions.length === 0 ? (
        <span className="vbi-shelf-empty">拖拽维度到此处</span>
      ) : (
        dimensions.map((dimension, index) => (
          <Flex
            key={`dimension-item-${dimension.field}-${index}`}
            gap={2}
            align="center"
            draggable
            onDragStart={(e) => handleItemDragStart(e, index)}
            onDragOver={(e) => handleItemDragOver(e, index)}
            onDragLeave={handleItemDragLeave}
            onDrop={(e) => handleItemDrop(e, index)}
            onDragEnd={handleItemDragEnd}
            className={[
              'vbi-shelf-item',
              dragOverIndex === index ? 'vbi-shelf-item--over' : '',
              draggedIndex === index ? 'vbi-shelf-item--dragging' : '',
            ].join(' ')}
          >
            <HolderOutlined className="vbi-shelf-handle" />
            <Popover
              key={popoverKey}
              content={
                <DimensionEditPopover
                  dimension={dimension}
                  builder={builder}
                  onClose={handlePopoverClose}
                />
              }
              trigger="click"
              placement="bottomLeft"
              overlayStyle={{ zIndex: 1050 }}
            >
              <Tooltip
                title={dimension.alias || dimension.field}
                placement="top"
              >
                <Tag
                  closeIcon={<CloseOutlined style={{ fontSize: 10 }} />}
                  onClose={(e) => {
                    e.preventDefault();
                    deleteDimension(dimension.field);
                  }}
                  className="vbi-shelf-tag"
                >
                  {dimension.alias || dimension.field}
                </Tag>
              </Tooltip>
            </Popover>
          </Flex>
        ))
      )}
    </Flex>
  );
};
