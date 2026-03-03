/**
 * Extract measure encoding information from VChart spec
 */
export interface MeasureEncodingInfo {
  encoding: string; // 'yAxis', 'xAxis', 'angle', etc.
  measures: string[]; // List of measure names
}

/**
 * Common measure encoding field names in VChart spec
 */
const MEASURE_ENCODING_FIELDS = [
  'yField',
  'xField',
  'angleField',
  'valueField',
  'seriesField',
  'colorField',
  'sizeField',
  'shapeField',
  'opacityField',
  'widthField',
  'q1Field',
  'medianField',
  'q3Field',
  'minField',
  'maxField',
  'outliersField',
];

/**
 * Map VChart field names to user-friendly encoding names
 */
const FIELD_TO_ENCODING: Record<string, string> = {
  yField: 'yAxis',
  xField: 'xAxis',
  angleField: 'angle',
  valueField: 'value',
  seriesField: 'series',
  colorField: 'color',
  sizeField: 'size',
  shapeField: 'shape',
  opacityField: 'opacity',
  widthField: 'width',
};

/**
 * Extract which encoding channel measures are mapped to
 * @param spec VChart spec object
 * @param vseedMeasures List of measure names from vseed
 * @returns Array of {encoding, measures}
 */
export function extractMeasureEncodings(
  spec: any,
  measureNames: string[] = [],
): MeasureEncodingInfo[] {
  if (!spec) {
    return [];
  }

  // Find which field points to '__MeaValue__' (the measure values placeholder)
  const measureEncodings: MeasureEncodingInfo[] = [];

  for (const fieldName of MEASURE_ENCODING_FIELDS) {
    if (spec[fieldName] === '__MeaValue__') {
      const encodingName = FIELD_TO_ENCODING[fieldName] || fieldName;

      if (measureNames.length > 0) {
        measureEncodings.push({
          encoding: encodingName,
          measures: measureNames,
        });
      }
      break; // Only one field can point to __MeaValue__
    }
  }

  return measureEncodings;
}
