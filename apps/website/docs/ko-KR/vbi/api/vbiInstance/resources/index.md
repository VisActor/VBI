# VBI.resources

VBI 인스턴스의 리소스 네임스페이스로, dashboard가 참조할 수 있는 공유 리소스를 등록하는 데 사용됩니다.

## 속성

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | 차트 리소스 관리 API. |
| **insight** | `VBIInsightResourceNamespace` | Insight 리소스 관리 API. |


## 메서드

### register

차트와 insight 리소스를 일괄 등록합니다.

**정의**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**반환**: `VBIResourceRegisterResult`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

현재 VBI 인스턴스의 모든 차트와 insight 리소스를 비웁니다.

**정의**:

```typescript
clear(): void
```

**반환**: `void`

### snapshot

현재 VBI 인스턴스가 참조할 수 있는 리소스의 DSL 스냅샷을 내보냅니다.

**정의**:

```typescript
snapshot(): VBIResourceSnapshot
```

**반환**: `VBIResourceSnapshot`
