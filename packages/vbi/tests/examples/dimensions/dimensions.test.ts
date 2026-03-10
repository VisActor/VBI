import { VBI, VBIBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

describe('Dimensions', () => {
  beforeAll(async () => {
    registerDemoConnector()
  })

  it('add-dimension', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [],
      measures: [],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.dimensions.add('product_type', (node) => {
        node.setAlias('产品类型')
      })
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "产品类型",
            "field": "product_type",
          },
        ],
        "havingFilters": [],
        "limit": 20,
        "locale": "zh-CN",
        "measures": [],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "product_type",
        ],
        "limit": 20,
        "select": [
          {
            "alias": "产品类型",
            "field": "product_type",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "产品类型": "办公用品",
          },
          {
            "产品类型": "技术",
          },
          {
            "产品类型": "家具",
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('add-multiple-dimensions', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [],
      measures: [],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.dimensions.add('product_type', (n) => n.setAlias('产品类型')).add('province', (n) => n.setAlias('省份'))
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "产品类型",
            "field": "product_type",
          },
          {
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 20,
        "locale": "zh-CN",
        "measures": [],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "product_type",
          "province",
        ],
        "limit": 20,
        "select": [
          {
            "alias": "产品类型",
            "field": "product_type",
          },
          {
            "alias": "省份",
            "field": "province",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "产品类型": "办公用品",
            "省份": "浙江",
          },
          {
            "产品类型": "办公用品",
            "省份": "四川",
          },
          {
            "产品类型": "办公用品",
            "省份": "江苏",
          },
          {
            "产品类型": "办公用品",
            "省份": "广东",
          },
          {
            "产品类型": "技术",
            "省份": "江西",
          },
          {
            "产品类型": "办公用品",
            "省份": "江西",
          },
          {
            "产品类型": "家具",
            "省份": "江西",
          },
          {
            "产品类型": "技术",
            "省份": "陕西",
          },
          {
            "产品类型": "技术",
            "省份": "黑龙江",
          },
          {
            "产品类型": "办公用品",
            "省份": "山东",
          },
          {
            "产品类型": "技术",
            "省份": "山东",
          },
          {
            "产品类型": "技术",
            "省份": "上海",
          },
          {
            "产品类型": "办公用品",
            "省份": "上海",
          },
          {
            "产品类型": "家具",
            "省份": "浙江",
          },
          {
            "产品类型": "技术",
            "省份": "浙江",
          },
          {
            "产品类型": "办公用品",
            "省份": "河北",
          },
          {
            "产品类型": "家具",
            "省份": "河北",
          },
          {
            "产品类型": "家具",
            "省份": "上海",
          },
          {
            "产品类型": "办公用品",
            "省份": "福建",
          },
          {
            "产品类型": "办公用品",
            "省份": "安徽",
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('remove-dimension', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [
        {
          field: 'product_type',
          alias: '产品类型',
        },
        {
          field: 'province',
          alias: '省份',
        },
      ],
      measures: [],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.dimensions.remove('product_type')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 20,
        "locale": "zh-CN",
        "measures": [],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "province",
        ],
        "limit": 20,
        "select": [
          {
            "alias": "省份",
            "field": "province",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "省份": "浙江",
          },
          {
            "省份": "四川",
          },
          {
            "省份": "江苏",
          },
          {
            "省份": "广东",
          },
          {
            "省份": "江西",
          },
          {
            "省份": "陕西",
          },
          {
            "省份": "黑龙江",
          },
          {
            "省份": "山东",
          },
          {
            "省份": "上海",
          },
          {
            "省份": "河北",
          },
          {
            "省份": "福建",
          },
          {
            "省份": "安徽",
          },
          {
            "省份": "甘肃",
          },
          {
            "省份": "吉林",
          },
          {
            "省份": "辽宁",
          },
          {
            "省份": "湖北",
          },
          {
            "省份": "河南",
          },
          {
            "省份": "湖南",
          },
          {
            "省份": "北京",
          },
          {
            "省份": "重庆",
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('update-dimension', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [
        {
          field: 'product_type',
          alias: '原产品类型',
        },
      ],
      measures: [],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.dimensions.update('product_type', (n) => n.setAlias('新产品类型'))
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "新产品类型",
            "field": "product_type",
          },
        ],
        "havingFilters": [],
        "limit": 20,
        "locale": "zh-CN",
        "measures": [],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "product_type",
        ],
        "limit": 20,
        "select": [
          {
            "alias": "新产品类型",
            "field": "product_type",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "新产品类型": "办公用品",
          },
          {
            "新产品类型": "技术",
          },
          {
            "新产品类型": "家具",
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })
})
