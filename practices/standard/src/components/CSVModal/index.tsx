import { InboxOutlined } from '@ant-design/icons'
import type { DatasetColumn, DataType } from '@visactor/vquery'
import { Button, Input, message, Modal, Select, Space, Table, Typography, Upload } from 'antd'
import React, { useState, type ChangeEvent } from 'react'
import { useTranslation } from '../../i18n'
import { inferSchema, rowsToDataset } from '../../utils/dataset'
import type { LocalRow } from '../../utils/localConnector'
import { parseCsv } from '../../utils/parseCsv'

const { Dragger } = Upload
const { Text } = Typography

type DataTypeOption = {
  label: string
  value: DataType
}

interface CSVModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: (data: LocalRow[], schema: DatasetColumn[]) => void
}

export const CSVModal: React.FC<CSVModalProps> = ({ open, onCancel, onConfirm }) => {
  const { t } = useTranslation()
  const [step, setStep] = useState<1 | 2>(1)
  const [headers, setHeaders] = useState<string[]>([])
  const [rawRows, setRawRows] = useState<string[][]>([])
  const [schema, setSchema] = useState<DatasetColumn[]>([])

  const handleUpload = async (file: File) => {
    try {
      const text = await file.text()
      const [headerRow = [], ...dataRows] = parseCsv(text)

      if (headerRow.length === 0) {
        message.error(t('csvModalErrorEmpty'))
        return false
      }

      setHeaders(headerRow)
      setRawRows(dataRows)
      setSchema(inferSchema(headerRow, dataRows))
      setStep(2)
    } catch (error) {
      console.error('Failed to parse CSV:', error)
      message.error(t('csvModalErrorParse'))
    }
    return false // Prevent auto upload
  }

  const handleConfirm = () => {
    const data = rowsToDataset(headers, rawRows, schema)
    onConfirm(data, schema)
    handleReset()
  }

  const handleReset = () => {
    setStep(1)
    setHeaders([])
    setRawRows([])
    setSchema([])
    onCancel()
  }

  const columns = [
    {
      title: t('csvModalColOriginal'),
      dataIndex: 'name',
      key: 'original',
      render: (_text: string, _record: DatasetColumn, index: number) => <Text code>{headers[index]}</Text>,
    },
    {
      title: t('csvModalColCustom'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: DatasetColumn, index: number) => (
        <Input
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newSchema = [...schema]
            newSchema[index] = { ...newSchema[index], name: e.target.value }
            setSchema(newSchema)
          }}
        />
      ),
    },
    {
      title: t('csvModalColType'),
      dataIndex: 'type',
      key: 'type',
      render: (text: DatasetColumn['type'], record: DatasetColumn, index: number) => (
        <Select<DataType>
          value={text}
          style={{ width: 120 }}
          onChange={(value) => {
            const newSchema = [...schema]
            newSchema[index] = { ...newSchema[index], type: value }
            setSchema(newSchema)
          }}
          options={
            [
              { label: t('csvModalTypeString'), value: 'string' },
              { label: t('csvModalTypeNumber'), value: 'number' },
              { label: t('csvModalTypeDate'), value: 'date' },
              { label: t('csvModalTypeDateTime'), value: 'datetime' },
              { label: t('csvModalTypeTimestamp'), value: 'timestamp' },
            ] satisfies DataTypeOption[]
          }
        />
      ),
    },
  ]

  return (
    <Modal
      title={step === 1 ? t('csvModalTitleUpload') : t('csvModalTitleSchema')}
      open={open}
      onCancel={handleReset}
      width={step === 1 ? 400 : 800}
      footer={
        step === 2 ? (
          <Space>
            <Button onClick={() => setStep(1)}>{t('csvModalBtnBack')}</Button>
            <Button type='primary' onClick={handleConfirm}>
              {t('csvModalBtnConfirm')}
            </Button>
          </Space>
        ) : null
      }
    >
      {step === 1 ? (
        <Dragger multiple={false} beforeUpload={handleUpload} accept='.csv' showUploadList={false}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>{t('csvModalDraggerText')}</p>
          <p className='ant-upload-hint'>{t('csvModalDraggerHint')}</p>
        </Dragger>
      ) : (
        <Table dataSource={schema} columns={columns} rowKey='name' pagination={false} scroll={{ y: 400 }} />
      )}
    </Modal>
  )
}
