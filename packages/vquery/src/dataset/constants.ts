import { DataType, DatasetSourceType } from 'src/types'

export const READ_FUNCTION_MAP: Record<DatasetSourceType, string> = {
  csv: 'read_csv_auto',
  json: 'read_json_auto',
  parquet: 'read_parquet',
}

export const DATA_TYPE_MAP: Record<DataType, string> = {
  number: 'DOUBLE',
  string: 'VARCHAR',
  date: 'DATE',
  datetime: 'TIMESTAMP',
  timestamp: 'TIMESTAMP',
}
