import React, { useMemo } from 'react'
import { Empty, Tag } from 'antd'

export interface MeasureEncodingInfo {
  encoding: string;
  measures: string[];
}

export interface EncodingPanelProps {
  /** Array of supported encoding channels for this chart type */
  supportedEncodings?: string[];
  /** Array of {encoding, measures} pairs - currently configured encodings */
  encodingInfo?: MeasureEncodingInfo[];
  style?: React.CSSProperties;
}

/**
 * EncodingPanel - Shows available and configured measure encodings
 * Displays all supported encoding channels for the selected chart type,
 * with currently assigned measures shown in each slot
 */
const EncodingPanel: React.FC<EncodingPanelProps> = ({ 
  supportedEncodings = [], 
  encodingInfo = [], 
  style 
}) => {
  const encodingState = useMemo(() => {
    // Create a map of configured encodings
    const configuredMap: Record<string, string[]> = {};
    encodingInfo.forEach((item) => {
      configuredMap[item.encoding] = item.measures;
    });

    // Create state for all supported encodings (configured or empty)
    const state: Record<string, { configured: boolean; measures: string[] }> = {};
    supportedEncodings.forEach((encoding) => {
      state[encoding] = {
        configured: encoding in configuredMap,
        measures: configuredMap[encoding] || [],
      };
    });

    return state;
  }, [supportedEncodings, encodingInfo]);

  const hasSupportedEncodings = supportedEncodings.length > 0;

  if (!hasSupportedEncodings) {
    return (
      <div style={style}>
        <div style={{ fontSize: 12, color: '#999', padding: '8px 12px', fontWeight: 'bold' }}>
          Measure Encoding
        </div>
        <Empty description="No chart selected" style={{ padding: '20px 0' }} />
      </div>
    );
  }

  return (
    <div style={style}>
      <div style={{ fontSize: 12, color: '#999', padding: '8px 12px', fontWeight: 'bold' }}>
        Measure Encoding
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '8px 0' }}>
        {Object.entries(encodingState).map(([encoding, { configured, measures }]) => (
          <div
            key={encoding}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: configured ? '#fafafa' : '#f5f5f5',
              opacity: configured ? 1 : 0.7,
              borderRadius: '2px',
              fontSize: '12px',
            }}
          >
            <span style={{ fontWeight: 'bold', minWidth: '60px', color: '#666' }}>
              {encoding}
            </span>
            <div style={{ flex: 1, display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
              {measures.length > 0 ? (
                measures.map((name) => (
                  <Tag key={name} color="blue" style={{ margin: 0 }}>
                    {name}
                  </Tag>
                ))
              ) : (
                <span style={{ color: '#ccc', fontSize: '11px' }}>Drop measure here</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncodingPanel;
