import { Empty, Flex, Space, Typography, theme } from 'antd'
import { CompatCard as Card } from '../../components/antdCompat'
import { VSeedRender } from '../../components/Render'
import { useConfiguredVSeed } from '../../hooks'
import { useTranslation } from '../../i18n'
import { useVBIStore } from '../../model'

export const ChartPanel = () => {
  const vseed = useVBIStore((state) => state.vseed)
  const configuredVSeed = useConfiguredVSeed(vseed)
  const loading = useVBIStore((state) => state.loading)
  const error = useVBIStore((state) => state.error)
  const builder = useVBIStore((state) => state.builder)
  const isEmptyDsl = builder.isEmpty()
  const { token } = theme.useToken()
  const { t } = useTranslation()

  return (
    <Card
      loading={loading}
      style={{
        minWidth: 0,
      }}
      styles={{
        root: {
          height: '100%',
          minWidth: 0,
        },
        body: {
          padding: 8,
          height: '100%',
          minWidth: 0,
        },
      }}
    >
      {error ? (
        <Typography.Text role='alert' type='danger'>
          {error}
        </Typography.Text>
      ) : isEmptyDsl ? (
        <Flex
          vertical
          align='center'
          justify='center'
          style={{
            height: '100%',
            minHeight: 300,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Space orientation='vertical' size={2}>
                <Typography.Text strong>{t('appEmptyTitle')}</Typography.Text>
                <Typography.Text type='secondary'>{t('appEmptyDescription')}</Typography.Text>
              </Space>
            }
          />
        </Flex>
      ) : (
        configuredVSeed && <VSeedRender vseed={configuredVSeed} />
      )}
    </Card>
  )
}
