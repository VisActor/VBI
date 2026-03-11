import {
  DeleteOutlined,
  CloseOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import { ObserveCallback, VBIMeasure } from '@visactor/vbi';
import {
  Flex,
  Tag,
  Tooltip,
  Popover,
  Select,
  Input,
  Button,
  Typography,
} from 'antd';
import { useEffect, useState as useStateHook } from 'react';
import { useVBIStore } from 'src/model';
import './shelfs.css';

const { Text } = Typography;
const { Option } = Select;

const AGGREGATE_OPTIONS: Array<{
  key: 'sum' | 'avg' | 'count' | 'max' | 'min';
  label: string;
}> = [
  { key: 'sum', label: '求和' },
  { key: 'avg', label: '平均值' },
  { key: 'count', label: '计数' },
  { key: 'max', label: '最大值' },
  { key: 'min', label: '最小值' },
];

// 获取聚合函数的中文名称
const getAggregateLabel = (func: string): string => {
  const option = AGGREGATE_OPTIONS.find((o) => o.key === func);
  return option ? option.label : func;
};

// 生成显示名称：聚合方式(字段名)
const getDisplayName = (measure: VBIMeasure): string => {
  const func = measure.aggregate?.func || 'sum';
  const field = measure.alias || measure.field;
  return `${getAggregateLabel(func)}(${field})`;
};

interface MeasureEditPopoverProps {
  measure: VBIMeasure;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  builder: any;
  onClose: () => void;
}

const MeasureEditPopover = ({
  measure,
  builder,
  onClose,
}: MeasureEditPopoverProps) => {
  const [editAlias, setEditAlias] = useStateHook(
    measure.alias || measure.field,
  );
  const [editAggregate, setEditAggregate] = useStateHook<
    'sum' | 'avg' | 'count' | 'max' | 'min'
  >(
    (measure.aggregate?.func as 'sum' | 'avg' | 'count' | 'max' | 'min') ||
      'sum',
  );

  const handleAggregateChange = (
    func: 'sum' | 'avg' | 'count' | 'max' | 'min',
  ) => {
    builder.doc.transact(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      builder.measures.update(measure.field, (node: any) => {
        node.setAggregate({ func } as VBIMeasure['aggregate']);
      });
    });
    setEditAggregate(func);
  };

  const handleRename = () => {
    const newAlias = editAlias.trim();
    builder.doc.transact(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      builder.measures.update(measure.field, (node: any) => {
        node.setAlias(newAlias || measure.field);
      });
    });
    onClose();
  };

  const handleDelete = () => {
    builder.measures.remove(measure.field);
    onClose();
  };

  return (
    <div style={{ width: 280, padding: 4 }}>
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          字段
        </Text>
        <div style={{ fontWeight: 500 }}>{measure.field}</div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          聚合方式
        </Text>
        <Select
          value={editAggregate}
          onChange={handleAggregateChange}
          style={{ width: '100%', marginTop: 4 }}
          size="small"
        >
          {AGGREGATE_OPTIONS.map((agg) => (
            <Option key={agg.key} value={agg.key}>
              {agg.label}
            </Option>
          ))}
        </Select>
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
        删除度量
      </Button>
    </div>
  );
};

export const MeasureShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const [dragOver, setDragOver] = useStateHook(false);
  const [measures, setMeasures] = useStateHook<VBIMeasure[]>(
    builder.measures.toJson(),
  );

  // 拖拽排序相关状态
  const [draggedIndex, setDraggedIndex] = useStateHook<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useStateHook<number | null>(null);

  // Popover key 用于强制重新渲染
  const [popoverKey, setPopoverKey] = useStateHook(0);

  useEffect(() => {
    const updateMeasures: ObserveCallback = () => {
      setMeasures(builder.measures.toJson());
    };

    const unobserve = builder.measures.observe(updateMeasures);
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
      if (data.role === 'measure') {
        if (measures.some((m) => m.field === data.name)) {
          return;
        }
        builder.doc.transact(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          builder.measures.add(data.name, (node: any) => {
            node.setAlias(data.name);
            node.setAggregate({ func: 'sum' });
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
      const newMeasures = [...measures];
      const [removed] = newMeasures.splice(draggedIndex, 1);
      newMeasures.splice(targetIndex, 0, removed);

      // 清除旧的并重新添加
      const yArray = builder.measures as unknown as {
        delete: (index: number, count: number) => void;
        length: number;
      };
      while (yArray.length > 0) {
        yArray.delete(0, 1);
      }
      newMeasures.forEach((m) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.measures.add(m.field, (node: any) => {
          node.setAlias(m.alias);
          node.setAggregate(m.aggregate);
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

  const deleteMeasure = (field: VBIMeasure['field']) => {
    builder.measures.remove(field);
  };

  const handlePopoverClose = () => {
    // 通过改变 key 强制重新渲染
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
      className={`vbi-shelf vbi-shelf--measure${dragOver ? ' vbi-shelf--dragover' : ''}`}
      style={shelfStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {measures.length === 0 ? (
        <span className="vbi-shelf-empty">拖拽度量到此处</span>
      ) : (
        measures.map((measure, index) => (
          <Flex
            key={`measure-item-${measure.field}-${index}`}
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
                <MeasureEditPopover
                  measure={measure}
                  builder={builder}
                  onClose={handlePopoverClose}
                />
              }
              trigger="click"
              placement="bottomLeft"
              overlayStyle={{ zIndex: 1050 }}
            >
              <Tooltip title={getDisplayName(measure)} placement="top">
                <Tag
                  closeIcon={<CloseOutlined style={{ fontSize: 10 }} />}
                  onClose={(e) => {
                    e.preventDefault();
                    deleteMeasure(measure.field);
                  }}
                  className="vbi-shelf-tag"
                >
                  {getDisplayName(measure)}
                </Tag>
              </Tooltip>
            </Popover>
          </Flex>
        ))
      )}
    </Flex>
  );
};
