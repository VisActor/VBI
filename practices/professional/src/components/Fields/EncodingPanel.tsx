import React, { useMemo, useState } from 'react'
import { Empty, Tag } from 'antd'

type EncodingChannel = 'yAxis' | 'xAxis' | 'color' | 'label' | 'tooltip' | 'size'

export interface MeasureEncodingInfo {
  encoding: string;
  measures: string[];
}

export interface EncodingPanelProps {
  /** Array of supported encoding channels for this chart type */
  supportedEncodings?: EncodingChannel[];
  /** Array of {encoding, measures} pairs - currently configured encodings */
  encodingInfo?: MeasureEncodingInfo[];
  /** Handle dropping a measure field into an encoding channel */
  onDropMeasureToEncoding?: (field: string, encoding: EncodingChannel) => void;
  /** Handle dropping a dimension field into an encoding channel (as a measure) */
  onDropDimensionToEncoding?: (field: string, encoding: EncodingChannel) => void;
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
  onDropMeasureToEncoding,
  onDropDimensionToEncoding,
  style 
}) => {
  const [hoveredEncoding, setHoveredEncoding] = useState<string | null>(null);

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
            onDragOver={(e) => {
              if (!onDropMeasureToEncoding) {
                return;
              }
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              setHoveredEncoding(encoding);
            }}
            onDragLeave={() => {
              setHoveredEncoding((prev) => (prev === encoding ? null : prev));
            }}
            onDrop={(e) => {
              if (!onDropMeasureToEncoding && !onDropDimensionToEncoding) {
                return;
              }
              e.preventDefault();
              // Try to get measure field first
              let field = e.dataTransfer.getData('application/x-vbi-measure-field');
              let isMeasure = !!field;
              
              // If no measure, try dimension field
              if (!field) {
                field = e.dataTransfer.getData('application/x-vbi-dimension-field');
                isMeasure = false;
              }
              
              // Fallback to plain text
              if (!field) {
                field = e.dataTransfer.getData('text/plain');
              }
              
              if (field) {
                if (isMeasure && onDropMeasureToEncoding) {
                  onDropMeasureToEncoding(field, encoding as EncodingChannel);
                } else if (!isMeasure && onDropDimensionToEncoding) {
                  onDropDimensionToEncoding(field, encoding as EncodingChannel);
                }
              }
              setHoveredEncoding(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor:
                hoveredEncoding === encoding ? '#e6f4ff' : configured ? '#fafafa' : '#f5f5f5',
              opacity: configured ? 1 : 0.7,
              borderRadius: '2px',
              fontSize: '12px',
              border:
                hoveredEncoding === encoding ? '1px dashed #1677ff' : '1px solid transparent',
              transition: 'all 0.12s ease',
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
