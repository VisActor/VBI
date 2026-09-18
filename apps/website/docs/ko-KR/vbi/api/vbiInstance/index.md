# createVBI

독립적인 VBI 인스턴스를 생성합니다.

각 인스턴스는 자체 리소스 레지스트리를 가지므로, 동일한 애플리케이션 안에서 서로 다른 대시보드 또는 테스트 컨텍스트를 격리하는 데 적합합니다.

## 함수 시그니처

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## 매개변수

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | 기본 차트 Builder 설정이며, chart, dashboard에서 생성되는 차트 Builder에 전달됩니다. |

---

# VBI

기본 VBI 인스턴스로, 전역 공유 Builder와 리소스 기능을 직접 사용하는 데 적합합니다.

**타입**: `VBIInstance`

**정의**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

createVBI가 반환하는 VBI 인스턴스로, chart, insight, dashboard 등의 기능에 접근하는 통합 진입점입니다.

## 속성

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | 커넥터 등록, 조회, 해제 API. |
| **resources** | `VBIResourceNamespace` | 차트와 insight 리소스 등록 API로, dashboard가 공유 리소스를 참조하는 데 사용됩니다. |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | Chart Builder 생성 API. |
| **insight** | `VBIInsightNamespace` | Insight Builder 생성 API. |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | Dashboard Builder 생성 API. |
