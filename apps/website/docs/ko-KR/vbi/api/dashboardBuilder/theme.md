# DashboardThemeBuilder

Dashboard 테마 빌더입니다. 설정, 프리셋, 구독 및 VSeed 등록을 관리하며 컴포넌트는 해석된 결과를 사용합니다.

## 메서드

### constructor

**정의**:

```typescript
constructor(dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

로컬 수정, 실행 취소 및 다시 실행, 협업 동기화에 따른 테마 이름과 설정 변경을 구독합니다. 구독 해제 함수를 반환합니다.

**정의**:

```typescript
observe(callback: ObserveCallback): () => void
```

**반환값**: `() => void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `callback` | ObserveCallback | - 테마 변경 콜백 |

### setTheme

테마를 선택합니다. 설정을 전달하면 사전 등록 없이 한 번의 변경으로 저장하고 선택하며 참조된 차트를 수정하지 않습니다.

**정의**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**반환값**: `void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `theme` | string | - 비어 있지 않은 테마 이름 |
| `definition?` | VBIDashboardThemeDefinition | - 이 Dashboard에 저장할 선택적 전체 설정 |

### registerTheme

현재 선택을 바꾸지 않고 문서 내 테마를 등록하거나 갱신합니다. 설정은 문서와 함께 저장되고 동기화됩니다.

**정의**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**반환값**: `void`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `theme` | string | - 비어 있지 않은 테마 이름 |
| `definition` | VBIDashboardThemeDefinition | - 전체 테마 설정 |

### getThemeConfig

문서 설정을 기본 프리셋보다 우선하여 설정의 복사본을 반환합니다. 설정이 없으면 undefined를 반환합니다.

**정의**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**반환값**: `VBIDashboardThemeDefinition \| undefined`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - 테마 이름, 기본값은 현재 테마 |

### getThemeDefinitions

문서 내 모든 테마 설정의 복사본을 반환합니다. observe로 사용 가능한 테마 목록 변경을 구독할 수 있습니다.

**정의**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**반환값**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

기본 및 문서 테마의 이름, 명암 모드와 색상표를 가져옵니다. 이름이 같으면 문서 설정이 우선합니다.

**정의**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**반환값**: `VBIDashboardThemeOption[]`

### resolveTheme

테마를 해석하고 독립된 런타임 이름으로 VSeed 등록을 보장합니다. 알 수 없는 이름은 문서를 수정하지 않고 light로 대체합니다.

**정의**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**반환값**: `VBIDashboardResolvedTheme`

**매개변수**:

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - 테마 이름. 기본값은 현재 선택이며 다른 테마를 일시적으로 미리 볼 수 있습니다 |

### getTheme

테마 이름을 가져옵니다. 기본값은 light입니다.

**정의**:

```typescript
getTheme(): string
```

**반환값**: `string`

### toJSON

테마 이름을 내보냅니다.

**정의**:

```typescript
toJSON(): string
```

**반환값**: `string`
