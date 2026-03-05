/**
 * EncodingBuilder - Extract and manage measure encoding information from VChart spec
 * 
 * This builder analyzes the VChart spec to determine which encoding channels
 * (yAxis, xAxis, color, size, etc.) measures are mapped to.
 */

export interface MeasureEncodingInfo {
  encoding: string; // 'yAxis', 'xAxis', 'color', 'size', 'angle', etc.
  measures: string[]; // List of measure names mapped to this encoding
}

/**
 * Common measure encoding field names in VChart spec
 */
const MEASURE_ENCODING_FIELDS = [
  'yField',
  'xField',
  'angleField',
  'radiusField',
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
 * Map VChart field names to user-friendly encoding channel names
 * Note: All size-related fields (angleField, radiusField, valueField, sizeField) are normalized to 'size'
 */
const FIELD_TO_ENCODING: Record<string, string> = {
  yField: 'yAxis',
  xField: 'xAxis',
  angleField: 'size',     // Normalize angle to size (pie, polar charts)
  radiusField: 'size',    // Normalize radius to size (rose, sunburst charts)
  valueField: 'size',     // Normalize value to size (pie and other charts using magnitude values)
  seriesField: 'series',
  colorField: 'color',
  sizeField: 'size',
  shapeField: 'shape',
  opacityField: 'opacity',
  widthField: 'width',
};

/**
 * Special placeholder value that represents aggregated measures in VChart spec
 */
const MEASURE_VALUE_PLACEHOLDER = '__MeaValue__';

export class EncodingBuilder {
  /**
   * Extract which encoding channels measures are mapped to based on VChart spec
   * @param spec VChart spec object
   * @param measureNames List of measure names to map
   * @returns Array of {encoding, measures} pairs
   * Note: encoding names are normalized (angle/radius → size) for consistency
   */
  getMeasureEncodings(
    spec: any,
    measureNames: string[] = [],
  ): MeasureEncodingInfo[] {
    if (!spec || !measureNames || measureNames.length === 0) {
      return [];
    }

    // Find which field points to the measure value placeholder
    const encodingMap: Record<string, string[]> = {};

    for (const fieldName of MEASURE_ENCODING_FIELDS) {
      if (spec[fieldName] === MEASURE_VALUE_PLACEHOLDER) {
        const encodingName = FIELD_TO_ENCODING[fieldName] || fieldName;
        if (!encodingMap[encodingName]) {
          encodingMap[encodingName] = [];
        }
        encodingMap[encodingName].push(...measureNames);
      }
    }

    // Convert map to array format and deduplicate measures per encoding
    return Object.entries(encodingMap).map(([encoding, measures]) => ({
      encoding,
      measures: Array.from(new Set(measures)), // Remove duplicate measures
    }));
  }

  /**
   * Get encoding information as a record (measure name → encoding channel)
   * @param spec VChart spec object
   * @param measureNames List of measure names
   * @returns Record mapping each measure to its encoding channel, or null if not encoded
   */
  getMeasureEncodingMap(
    spec: any,
    measureNames: string[] = [],
  ): Record<string, string | null> {
    const encodings = this.getMeasureEncodings(spec, measureNames);
    const result: Record<string, string | null> = {};

    // Initialize all measures as null (not encoded to any channel)
    for (const measure of measureNames) {
      result[measure] = null;
    }

    // Assign encoding for measures that have one
    for (const { encoding, measures } of encodings) {
      for (const measure of measures) {
        result[measure] = encoding;
      }
    }

    return result;
  }
}
