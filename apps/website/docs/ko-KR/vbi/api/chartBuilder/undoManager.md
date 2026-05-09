# UndoManager

실행 취소/다시 실행 관리자, YJS 기반의 실행 취소 및 다시 실행 기능 제공, 스택 관리 및 기록 지우기 지원

## 속성

## 메서드

### constructor

생성자

**정의**:

```typescript
constructor(scope: any)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `scope` | any | - YJS 문서 또는 타입 스코프, 실행 취소/다시 실행의 추적 범위를 정의하는 데 사용 |

### undo

마지막 수정 실행 취소

**정의**:

```typescript
undo(): boolean
```

**반환**: `boolean`

### redo

취소된 수정 다시 실행

**정의**:

```typescript
redo(): boolean
```

**반환**: `boolean`

### canUndo

실행 취소 가능한 작업이 있는지 확인

**정의**:

```typescript
canUndo(): boolean
```

**반환**: `boolean`

### canRedo

다시 실행 가능한 작업이 있는지 확인

**정의**:

```typescript
canRedo(): boolean
```

**반환**: `boolean`

### clear

기록 지우기

**정의**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**반환**: `void`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `clearUndoStack` | boolean | - 실행 취소 스택을 지울지 여부, 기본값 true |
| `clearRedoStack` | boolean | - 다시 실행 스택을 지울지 여부, 기본값 true |