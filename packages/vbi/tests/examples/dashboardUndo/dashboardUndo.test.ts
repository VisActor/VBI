import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('dashboard / DashboardUndo', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('undo-redo-dashboard', async () => {
    const LocalVBI = createVBI()
    const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    insightBuilder.setContent('撤销删除操作后，组件和所有断点布局一起恢复。')
    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '仪表盘撤销与重做' },
    })
    dashboardBuilder.transact(() => {
      dashboardBuilder.theme.setTheme('dark')
      dashboardBuilder.insight.add((widget) =>
        widget
          .setInsightId(insightBuilder)
          .setTitle('可恢复的经营洞察')
          .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 4 }, md: { x: 0, y: 0, w: 6, h: 4 } }),
      )
    })
    if (!dashboardBuilder.undoManager.undo() || !dashboardBuilder.isEmpty()) {
      throw new Error('撤销必须同时还原组件与布局')
    }
    if (!dashboardBuilder.undoManager.redo()) throw new Error('重做失败')
    const [widget] = dashboardBuilder.insight.toJSON()
    dashboardBuilder.insight.remove(widget.id)
    dashboardBuilder.undoManager.undo()

    const dashboardDSL = dashboardBuilder.build()
    expect(dashboardDSL).toMatchInlineSnapshot(`
      {
        "breakpoints": {
          "lg": 992,
          "md": 768,
          "sm": 576,
          "xl": 1200,
          "xs": 0,
          "xxl": 1600,
        },
        "layout": {
          "lg": [
            {
              "h": 4,
              "id": "id-3",
              "w": 8,
              "widgetId": "id-1",
              "x": 0,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 4,
              "id": "id-4",
              "w": 6,
              "widgetId": "id-1",
              "x": 0,
              "y": 0,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "dark",
          "title": "仪表盘撤销与重做",
        },
        "uuid": "uuid-2",
        "version": 0,
        "widgets": [
          {
            "description": "",
            "id": "id-1",
            "insightId": "uuid-1",
            "title": "可恢复的经营洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
