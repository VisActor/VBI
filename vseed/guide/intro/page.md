# 数据分页

## 基础示例

通过配置 `page` 属性，可以指定图表展示特定维度值的数据。

* `field`: 分页字段。
* `currentValue`: 当前展示的值。

```tsx direction=vertical playground
import { VSeed, Builder, registerAll } from '@visactor/vseed'
import VChart from '@visactor/vchart'
import { useEffect, useRef } from 'react'

registerAll()

const SimplePageDemo = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const vseed: VSeed = {
      chartType: 'bar',
      dataset: [
        { month: 'Jan', sales: 100, year: '2022' },
        { month: 'Feb', sales: 120, year: '2022' },
        { month: 'Mar', sales: 130, year: '2022' },
        { month: 'Jan', sales: 150, year: '2023' },
        { month: 'Feb', sales: 180, year: '2023' },
        { month: 'Mar', sales: 190, year: '2023' },
      ],
      dimensions: [{ id: 'month' }],
      measures: [{ id: 'sales' }],
      page: {
        field: 'year',
        currentValue: '2022',
      },
    }

    const builder = Builder.from(vseed)
    const spec = builder.build()

    const vchart = new VChart(spec, { dom: containerRef.current })
    vchart.renderSync()

    return () => {
      vchart.release()
    }
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 10 }}>当前展示 2022 年数据</div>
      <div ref={containerRef} style={{ width: '100%', height: 300 }} />
    </div>
  )
}

export default SimplePageDemo
```

## 自定义播放器

通过 `page` 属性结合 React 状态管理，可以实现自定义的播放器控制。

```tsx direction=vertical playground
import { useRef, useEffect, useState, memo } from 'react'
import VChart from '@visactor/vchart'
import { ListTable, PivotTable } from '@visactor/vtable'
import { registerAll, VSeed, Builder, isTable, isPivotTable } from '@visactor/vseed'
registerAll()

const Demo = memo(() => {
  const ref = useRef<HTMLDivElement>(null)

  const vseed = {
    chartType: 'table',
    page: {
      field: 'province',
      currentValue: '浙江',
    },
    label: {
      enable: false,
    },
    sort: {
      order: 'asc',
      orderBy: 'customer_type',
    },
    dataset: [
      {
        sales: 147841.624,
        profit: -47982.53600000001,
        province: '浙江',
        customer_type: '公司',
      },
      {
        sales: 219726.89199999993,
        profit: -44532.76799999998,
        province: '四川',
        customer_type: '消费者',
      },
      {
        sales: 198200.26799999998,
        profit: -27816.15199999998,
        province: '江苏',
        customer_type: '公司',
      },
      {
        sales: 672289.4079999998,
        profit: 165998.4480000001,
        province: '广东',
        customer_type: '消费者',
      },
      {
        sales: 140259.67200000002,
        profit: 34161.93199999999,
        province: '江西',
        customer_type: '消费者',
      },
      {
        sales: 53158.33599999999,
        profit: 9246.916000000001,
        province: '陕西',
        customer_type: '小型企业',
      },
      {
        sales: 561529.15,
        profit: 122722.38999999993,
        province: '黑龙江',
        customer_type: '消费者',
      },
      {
        sales: 687618.1200000003,
        profit: 176467.61999999988,
        province: '山东',
        customer_type: '消费者',
      },
      {
        sales: 297415.048,
        profit: 62825.02799999997,
        province: '上海',
        customer_type: '消费者',
      },
      {
        sales: 289444.81999999983,
        profit: 67988.76000000001,
        province: '河北',
        customer_type: '公司',
      },
      {
        sales: 208516.56000000008,
        profit: 56162.54000000002,
        province: '福建',
        customer_type: '公司',
      },
      {
        sales: 342357.0219999997,
        profit: 75962.082,
        province: '安徽',
        customer_type: '消费者',
      },
      {
        sales: 43096.76,
        profit: -6335.840000000001,
        province: '甘肃',
        customer_type: '公司',
      },
      {
        sales: 130678.85599999997,
        profit: -25424.084,
        province: '江苏',
        customer_type: '小型企业',
      },
      {
        sales: 66693.92799999999,
        profit: 4316.368,
        province: '江西',
        customer_type: '小型企业',
      },
      {
        sales: 122349.24800000005,
        profit: -35107.212000000014,
        province: '四川',
        customer_type: '公司',
      },
      {
        sales: 358227.28899999993,
        profit: 80145.28899999998,
        province: '吉林',
        customer_type: '消费者',
      },
      {
        sales: 404229.16799999995,
        profit: -81843.41200000001,
        province: '辽宁',
        customer_type: '消费者',
      },
      {
        sales: 258096.46800000005,
        profit: -47849.45200000001,
        province: '湖北',
        customer_type: '公司',
      },
      {
        sales: 137146.40800000002,
        profit: 32675.887999999995,
        province: '陕西',
        customer_type: '公司',
      },
      {
        sales: 512082.96300000005,
        profit: 114809.02300000003,
        province: '广东',
        customer_type: '公司',
      },
      {
        sales: 388299.3240000001,
        profit: 86599.32400000001,
        province: '河南',
        customer_type: '消费者',
      },
      {
        sales: 500182.6760000004,
        profit: 118908.49600000009,
        province: '山东',
        customer_type: '公司',
      },
      {
        sales: 341513.8649999998,
        profit: 77265.68500000007,
        province: '湖南',
        customer_type: '消费者',
      },
      {
        sales: 233123.22600000008,
        profit: 51707.02599999998,
        province: '黑龙江',
        customer_type: '小型企业',
      },
      {
        sales: 69576.92000000001,
        profit: 15303.259999999997,
        province: '北京',
        customer_type: '小型企业',
      },
      {
        sales: 138525.23999999996,
        profit: 19478.75999999999,
        province: '重庆',
        customer_type: '公司',
      },
      {
        sales: 228866.23199999996,
        profit: -57701.16799999997,
        province: '浙江',
        customer_type: '消费者',
      },
      {
        sales: 267383.42399999994,
        profit: 63891.883999999984,
        province: '陕西',
        customer_type: '消费者',
      },
      {
        sales: 30375.100000000002,
        profit: 9328.76,
        province: '江西',
        customer_type: '公司',
      },
      {
        sales: 152763.212,
        profit: -24982.747999999985,
        province: '辽宁',
        customer_type: '小型企业',
      },
      {
        sales: 16596.86,
        profit: 6437.62,
        province: '青海',
        customer_type: '公司',
      },
      {
        sales: 318756.3960000001,
        profit: -76162.74400000002,
        province: '湖北',
        customer_type: '消费者',
      },
      {
        sales: 321088.0960000001,
        profit: -54362.78400000001,
        province: '江苏',
        customer_type: '消费者',
      },
      {
        sales: 56745.91999999999,
        profit: 17817.94,
        province: '广西',
        customer_type: '公司',
      },
      {
        sales: 269754.072,
        profit: 73708.29200000002,
        province: '福建',
        customer_type: '消费者',
      },
      {
        sales: 69766.20000000001,
        profit: 16662.379999999994,
        province: '天津',
        customer_type: '小型企业',
      },
      {
        sales: 133490.00000000006,
        profit: 33141.5,
        province: '北京',
        customer_type: '公司',
      },
      {
        sales: 237066.52900000004,
        profit: 61232.829000000005,
        province: '河南',
        customer_type: '公司',
      },
      {
        sales: 268557.1419999999,
        profit: 57187.522000000026,
        province: '广东',
        customer_type: '小型企业',
      },
      {
        sales: 173732.24400000004,
        profit: 33409.54399999998,
        province: '重庆',
        customer_type: '消费者',
      },
      {
        sales: 101922.43600000003,
        profit: -28635.124000000014,
        province: '甘肃',
        customer_type: '消费者',
      },
      {
        sales: 234209.42999999996,
        profit: 44159.009999999995,
        province: '湖南',
        customer_type: '公司',
      },
      {
        sales: 75400.38800000004,
        profit: -26045.291999999994,
        province: '浙江',
        customer_type: '小型企业',
      },
      {
        sales: 147192.89200000005,
        profit: 34970.151999999995,
        province: '云南',
        customer_type: '公司',
      },
      {
        sales: 98213.52799999998,
        profit: 24624.348000000005,
        province: '海南',
        customer_type: '消费者',
      },
      {
        sales: 384148.78599999996,
        profit: 82742.646,
        province: '黑龙江',
        customer_type: '公司',
      },
      {
        sales: 153845.93,
        profit: 27573.070000000003,
        province: '天津',
        customer_type: '公司',
      },
      {
        sales: 45618.35599999999,
        profit: 7013.075999999999,
        province: '贵州',
        customer_type: '消费者',
      },
      {
        sales: 398982.1920000001,
        profit: 90086.89200000008,
        province: '山东',
        customer_type: '小型企业',
      },
      {
        sales: 145116.685,
        profit: 35448.245,
        province: '吉林',
        customer_type: '公司',
      },
      {
        sales: 172408.21500000003,
        profit: 46269.89500000002,
        province: '山西',
        customer_type: '公司',
      },
      {
        sales: 305577.356,
        profit: -61212.56400000002,
        province: '辽宁',
        customer_type: '公司',
      },
      {
        sales: 62222.132,
        profit: -14090.607999999997,
        province: '内蒙古',
        customer_type: '小型企业',
      },
      {
        sales: 348074.51000000007,
        profit: 67881.59,
        province: '河北',
        customer_type: '消费者',
      },
      {
        sales: 55580.50399999998,
        profit: -8528.016000000001,
        province: '内蒙古',
        customer_type: '公司',
      },
      {
        sales: 34250.832,
        profit: -7711.228,
        province: '甘肃',
        customer_type: '小型企业',
      },
      {
        sales: 228208.94599999997,
        profit: 51696.526000000005,
        province: '河南',
        customer_type: '小型企业',
      },
      {
        sales: 155650.3759999999,
        profit: -35089.26399999998,
        province: '内蒙古',
        customer_type: '消费者',
      },
      {
        sales: 165429.18000000002,
        profit: 37820.3,
        province: '安徽',
        customer_type: '公司',
      },
      {
        sales: 206080.28000000006,
        profit: 43517.18000000003,
        province: '北京',
        customer_type: '消费者',
      },
      {
        sales: 80865.12,
        profit: 18863.040000000005,
        province: '上海',
        customer_type: '小型企业',
      },
      {
        sales: 185693.78799999994,
        profit: 46341.98800000001,
        province: '云南',
        customer_type: '消费者',
      },
      {
        sales: 326294.49999999994,
        profit: 73468.64,
        province: '天津',
        customer_type: '消费者',
      },
      {
        sales: 284908.2529999999,
        profit: 58712.913,
        province: '广西',
        customer_type: '消费者',
      },
      {
        sales: 121178.98800000001,
        profit: 35246.42799999999,
        province: '安徽',
        customer_type: '小型企业',
      },
      {
        sales: 35999.656,
        profit: 8193.416,
        province: '广西',
        customer_type: '小型企业',
      },
      {
        sales: 58801.45600000001,
        profit: -9847.544,
        province: '四川',
        customer_type: '小型企业',
      },
      {
        sales: 147718.91400000002,
        profit: 35311.234,
        province: '湖南',
        customer_type: '小型企业',
      },
      {
        sales: 48688.863999999994,
        profit: 8323.784,
        province: '贵州',
        customer_type: '公司',
      },
      {
        sales: 184330.89500000008,
        profit: 42236.63499999996,
        province: '山西',
        customer_type: '消费者',
      },
      {
        sales: 136852.597,
        profit: 37464.636999999995,
        province: '吉林',
        customer_type: '小型企业',
      },
      {
        sales: 14852.32,
        profit: 3642.3799999999997,
        province: '宁夏',
        customer_type: '小型企业',
      },
      {
        sales: 49504.44799999999,
        profit: 11543.447999999995,
        province: '重庆',
        customer_type: '小型企业',
      },
      {
        sales: 46722.63399999998,
        profit: 9672.054,
        province: '海南',
        customer_type: '公司',
      },
      {
        sales: 45107.46800000001,
        profit: -8020.152000000001,
        province: '湖北',
        customer_type: '小型企业',
      },
      {
        sales: 153396.07500000007,
        profit: 36161.33499999999,
        province: '河北',
        customer_type: '小型企业',
      },
      {
        sales: 15298.052,
        profit: 953.7920000000001,
        province: '宁夏',
        customer_type: '消费者',
      },
      {
        sales: 204170.39999999994,
        profit: 39962.01999999999,
        province: '上海',
        customer_type: '公司',
      },
      {
        sales: 13834.380000000001,
        profit: 3661.5600000000004,
        province: '贵州',
        customer_type: '小型企业',
      },
      {
        sales: 28647.528000000002,
        profit: 7371.448,
        province: '新疆',
        customer_type: '公司',
      },
      {
        sales: 67139.66,
        profit: 18556.860000000004,
        province: '山西',
        customer_type: '小型企业',
      },
      {
        sales: 24320.681,
        profit: 5425.721,
        province: '海南',
        customer_type: '小型企业',
      },
      {
        sales: 68632.9,
        profit: 12730.899999999996,
        province: '福建',
        customer_type: '小型企业',
      },
      {
        sales: 28039.088,
        profit: 5327.028000000001,
        province: '云南',
        customer_type: '小型企业',
      },
      {
        sales: 40187.67199999999,
        profit: 6972.952,
        province: '新疆',
        customer_type: '消费者',
      },
      {
        sales: 27970.628,
        profit: 3941.448000000001,
        province: '宁夏',
        customer_type: '公司',
      },
      {
        sales: 6487.599999999999,
        profit: 699.58,
        province: '西藏自治区',
        customer_type: '消费者',
      },
      {
        sales: 33266.520000000004,
        profit: 5839.68,
        province: '青海',
        customer_type: '消费者',
      },
      {
        sales: 3326.8199999999997,
        profit: 563.22,
        province: '西藏自治区',
        customer_type: '公司',
      },
      {
        sales: 1261.82,
        profit: 261.66,
        province: '新疆',
        customer_type: '小型企业',
      },
      {
        sales: 200.76,
        profit: 3.78,
        province: '西藏自治区',
        customer_type: '小型企业',
      },
    ],
    theme: 'light',
  }

  const order = Array.from(new Set(vseed.dataset.map((d) => d[vseed?.page.field])))

  // 播放器状态
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = order.indexOf(vseed?.page?.currentValue)
    return idx === -1 ? 0 : idx
  })
  const [current, setCurrent] = useState(order[currentIndex])
  const [isPlaying, setIsPlaying] = useState(false)

  // 同步 current 值
  useEffect(() => {
    setCurrent(order[currentIndex])
  }, [currentIndex])

  // 自动播放逻辑
  useEffect(() => {
    let timer: number
    if (isPlaying) {
      timer = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % order.length)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, order.length])

  // 事件处理
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + order.length) % order.length)
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % order.length)
  const togglePlay = () => setIsPlaying(!isPlaying)

  const tableRef = useRef(null)
  const chartRef = useRef(null)
  useEffect(() => {
    if (!ref.current) {
      return
    }

    const seed: VSeed = {
      ...vseed,
      page: {
        ...(vseed?.page || {}),
        currentValue: current,
      },
    }

    const builder = Builder.from(seed)
    const spec = builder.build()
    console.log(spec)
    if (isTable(seed)) {
      if (tableRef.current) {
        tableRef.current.updateOption(spec)
      } else {
        tableRef.current = new ListTable(ref.current, spec)
      }
    } else if (isPivotTable(seed)) {
      if (tableRef.current) {
        tableRef.current.updateOption(spec)
      } else {
        tableRef.current = new PivotTable(ref.current, spec)
      }
    } else {
      if (chartRef.current) {
        chartRef.current.updateSpec(spec)
      } else {
        chartRef.current = new VChart(spec, { dom: ref.current })
        chartRef.current.renderSync()
      }
    }
  }, [current])

  const btnStyle = {
    border: '1px solid #e2e8f0',
    background: '#fff',
    borderRadius: '6px',
    height: '32px',
    padding: '0 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    transition: 'all 0.2s',
    color: '#333',
  }

  const iconStyle = {
    width: 16,
    height: 16,
    fill: 'currentColor',
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginBottom: 16,
          padding: 16,
          border: '1px solid #eee',
          borderRadius: 8,
          background: '#f8fafc',
        }}
      >
        {/* 第一行：播放控制 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={handlePrev} style={btnStyle} title="Previous">
            <svg viewBox="0 0 24 24" style={iconStyle}>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <select
            style={{
              flex: 1,
              height: '32px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '0 8px',
              outline: 'none',
            }}
            value={currentIndex}
            onChange={(e) => setCurrentIndex(Number(e.target.value))}
          >
            {order.map((d, i) => (
              <option key={i} value={i}>
                {d}
              </option>
            ))}
          </select>

          <button onClick={handleNext} style={btnStyle} title="Next">
            <svg viewBox="0 0 24 24" style={iconStyle}>
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          <button onClick={togglePlay} style={{ ...btnStyle, minWidth: 80 }} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? (
              <>
                <svg viewBox="0 0 24 24" style={{ ...iconStyle, marginRight: 4 }}>
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" style={{ ...iconStyle, marginRight: 4 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </>
            )}
          </button>
        </div>

        {/* 第二行：进度条 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="range"
            min="0"
            max={order.length - 1}
            value={currentIndex}
            onChange={(e) => setCurrentIndex(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
      </div>
      <div ref={ref} style={{ height: 260, width: '100%' }} />
    </div>
  )
})

export default Demo
```
