import { Flex, Spin, Card, Button, Tooltip } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
import { VSeedRender } from 'src/components/Render';
import { MeasuresList } from 'src/components/Fields/MeasuresList';
import { DimensionsList } from 'src/components/Fields/DimensionsList';
import { VBIBuilder } from '@visactor/vbi';
import { ChartTypeSelector } from 'src/components/ChartType';

import {
  MeasureShelf,
  DimensionShelf,
  WhereShelf,
  HavingShelf,
} from 'src/components/Shelfs';
import { useVBIStore } from 'src/model';
import { useEffect, useState, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';

interface APPProps {
  builder?: VBIBuilder;
}

export const APP = (props: APPProps) => {
  const { initialize, initialized, builder } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
      builder: state.builder,
    })),
  );

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // 更新撤销/重做按钮状态
  const updateUndoRedoState = useCallback(() => {
    if (builder?.undoManager) {
      setCanUndo(builder.undoManager.canUndo());
      setCanRedo(builder.undoManager.canRedo());
    }
  }, [builder]);

  useEffect(() => {
    updateUndoRedoState();
    if (builder?.doc) {
      const handleUpdate = () => updateUndoRedoState();
      builder.doc.on('update', handleUpdate);
      return () => builder.doc.off('update', handleUpdate);
    }
  }, [builder, updateUndoRedoState]);

  const handleUndo = () => builder?.undoManager?.undo();
  const handleRedo = () => builder?.undoManager?.redo();

  useEffect(() => {
    return initialize(props.builder);
  }, []);

  if (!initialized) {
    return <Spin tip="Initializing..." fullscreen />;
  }

  return (
    <Flex
      vertical={false}
      onClick={() => {
        console.group(`selected vbi`);
        console.log('state', useVBIStore.getState());
        console.groupEnd();
      }}
      style={{
        height: '100%',
        gap: 12,
        padding: 12,
        background: '#f5f5f5',
      }}
    >
      {/* 左侧：字段列表 */}
      <Flex vertical={true} gap={12} style={{ flexBasis: 220 }}>
        <ChartTypeSelector style={{ flexBasis: 32, minHeight: 0 }} />
        <DimensionsList style={{ flex: 1, minHeight: 0 }} />
        <MeasuresList style={{ flex: 1, minHeight: 0 }} />
      </Flex>

      {/* 右侧：Shelfs + 图表 */}
      <Flex vertical={true} gap={12} style={{ flexGrow: 1 }}>
        {/* 工具栏：图表类型 + Undo/Redo */}
        <Flex vertical={false} justify="space-between" align="center">
          <div style={{ fontWeight: 600, color: '#333', fontSize: 13 }}>
            图表配置
          </div>
          <Flex gap={8}>
            <Tooltip title="撤销 (Ctrl+Z)">
              <Button
                type="text"
                icon={<UndoOutlined />}
                onClick={handleUndo}
                disabled={!canUndo}
                style={{
                  color: canUndo ? '#666' : '#ccc',
                }}
              />
            </Tooltip>
            <Tooltip title="重做 (Ctrl+Y)">
              <Button
                type="text"
                icon={<RedoOutlined />}
                onClick={handleRedo}
                disabled={!canRedo}
                style={{
                  color: canRedo ? '#666' : '#ccc',
                }}
              />
            </Tooltip>
          </Flex>
        </Flex>

        {/* Shelfs 区域 */}
        <Card
          style={{ borderRadius: 8 }}
          styles={{
            body: {
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            },
          }}
        >
          <Flex align="center">
            <div
              style={{
                width: 70,
                fontWeight: 600,
                fontSize: 12,
                color: '#1890ff',
              }}
            >
              维度
            </div>
            <DimensionShelf style={{ flex: 1, minHeight: 0 }} />
          </Flex>
          <Flex align="center">
            <div
              style={{
                width: 70,
                fontWeight: 600,
                fontSize: 12,
                color: '#52c41a',
              }}
            >
              度量
            </div>
            <MeasureShelf style={{ flex: 1, minHeight: 0 }} />
          </Flex>
          <Flex align="center">
            <div
              style={{
                width: 70,
                fontWeight: 600,
                fontSize: 12,
                color: '#fa8c16',
              }}
            >
              明细筛选
            </div>
            <WhereShelf style={{ flex: 1, minHeight: 0 }} />
          </Flex>
          <Flex align="center">
            <div
              style={{
                width: 70,
                fontWeight: 600,
                fontSize: 12,
                color: '#722ed1',
              }}
            >
              结果筛选
            </div>
            <HavingShelf style={{ flex: 1, minHeight: 0 }} />
          </Flex>
        </Card>

        {/* 图表区域 */}
        <ChartWrapper />
      </Flex>
    </Flex>
  );
};

const ChartWrapper = () => {
  const vseed = useVBIStore((state) => state.vseed);
  const loading = useVBIStore((state) => state.loading);
  return (
    <Card
      loading={loading}
      style={{ borderRadius: 8, flex: 1 }}
      styles={{
        root: {
          height: '100%',
        },
        body: {
          padding: 12,
          height: '100%',
        },
      }}
    >
      {vseed && <VSeedRender vseed={vseed} />}
    </Card>
  );
};
