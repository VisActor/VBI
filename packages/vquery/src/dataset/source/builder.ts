import { isUrl } from './url'
import type { DatasetSourceType, DatasetSourceValue, RawDatasetSource } from '../../types'

const MIME_TYPES: Record<DatasetSourceType, string> = {
  csv: 'text/csv',
  json: 'application/json',
}

export class DatasetSourceBuilder {
  private type: DatasetSourceType
  private value: DatasetSourceValue

  constructor(raw: RawDatasetSource) {
    this.type = raw.type
    this.value = raw.rawDataset
  }

  public static from(raw: RawDatasetSource): DatasetSourceBuilder {
    return new DatasetSourceBuilder(raw)
  }

  public async build() {
    const blob = await this.convertToBlob(this.type, this.value)

    return {
      type: this.type,
      blob: blob,
    }
  }

  /**
   * Convert different types of data to Blob
   */
  private async convertToBlob(type: DatasetSourceType, value: DatasetSourceValue): Promise<Blob> {
    if (value instanceof Blob) {
      return value
    }

    if (typeof value === 'string' && isUrl(value)) {
      const response = await fetch(value)
      return await response.blob()
    }

    const mimeType = MIME_TYPES[type]

    if (value instanceof ArrayBuffer) {
      return new Blob([value], { type: mimeType })
    }

    // For TidyDatum[] or other objects, we stringify.
    // For strings, we use as is (fixing the issue where strings were double-stringified in original code).
    const content = typeof value === 'object' ? JSON.stringify(value) : String(value)

    return new Blob([content], { type: mimeType })
  }
}
