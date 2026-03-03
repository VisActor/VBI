import React, { useMemo } from 'react'
import { Card, Empty, Tag } from 'antd'
import { extractMeasureEncodings } from '../../utils/specUtils'

export interface EncodingPanelProps {
  /** VChart spec object with field mappings */
  spec?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** List of measure names (strings) */
  measures?: string[];
  style?: React.CSSProperties;
}

/**
 * EncodingPanel - Shows how measures are mapped to encoding channels
 * Extracts encoding info from VChart spec
 */
const EncodingPanel: React.FC<EncodingPanelProps> = ({ spec, measures = [], style }) => {
  const encodingGroups = useMemo(() => {
    const encodings = extractMeasureEncodings(spec, measures);
    
    const groups: Record<string, string[]> = {};
    encodings.forEach((item) => {
      groups[item.encoding] = item.measures;
    });

    return groups;
  }, [spec, measures]);

  if (measures.length === 0) {
    return (
      <div style={style}>
        <div className="panel-title">ENCODING</div>
        <Empty description="No measures" style={{ padding: '20px 0' }} />
      </div>
    );
  }

  return (
    <div style={style}>
      <div className="panel-title">ENCODING</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px 0' }}>
        {Object.entries(encodingGroups).map(([encoding, measureNames]) => (
          <Card
            key={encoding}
            size="small"
            title={<span style={{ fontSize: '12px', fontWeight: 'bold' }}>{encoding}</span>}
            style={{ marginBottom: 0 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {measureNames.map((name) => (
                <Tag key={name} color="blue">
                  {name}
                </Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EncodingPanel;
