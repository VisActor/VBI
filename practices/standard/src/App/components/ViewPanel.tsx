import { Empty, Flex, Space, Spin, Typography, theme } from 'antd'
import { VSeedRender } from '../../components/Render'
import { useConfiguredVSeed } from '../../hooks'
import { useTranslation } from '../../i18n'
import { useVBIStore } from '../../model'

export const ViewPanel = ({ border }: { border: boolean }) => {
  const vseed = useVBIStore((state) => state.vseed)
  const configuredVSeed = useConfiguredVSeed(vseed)
  const loading = useVBIStore((state) => state.loading)
  const builder = useVBIStore((state) => state.builder)
  const isEmptyDsl = builder.isEmpty()
  const { token } = theme.useToken()
  const { t } = useTranslation()

  return (
    <div className='demo-app-view-shell'>
      <Spin spinning={loading} wrapperClassName='demo-app-view-spinner'>
        <div
          className='demo-app-view-frame'
          style={{
            borderRadius: border ? token.borderRadiusOuter : 0,
            border: border ? `1px solid ${token.colorBorderSecondary}` : 0,
          }}
        >
          {isEmptyDsl ? (
            <Flex vertical align='center' justify='center' className='demo-app-view-empty'>
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
          ) : configuredVSeed ? (
            <div className='demo-app-view-renderer'>
              <VSeedRender vseed={configuredVSeed} />
            </div>
          ) : null}
        </div>
      </Spin>
    </div>
  )
}
