# UndoManager

Undo/Redo マネージャー。YJS ベースの取り消しとやり直し機能を提供し、スタック管理と履歴クリア操作に対応します。

## プロパティ

## メソッド

### constructor

コンストラクタ

**定義**:

```typescript
constructor(scope: any)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `scope` | any | - YJS ドキュメントまたは型スコープ。Undo/Redo の追跡範囲を定義するために使用します |

### undo

直前の変更を取り消します

**定義**:

```typescript
undo(): boolean
```

**戻り値**: `boolean`

### redo

取り消した変更をやり直します

**定義**:

```typescript
redo(): boolean
```

**戻り値**: `boolean`

### canUndo

取り消し可能な操作があるか確認します

**定義**:

```typescript
canUndo(): boolean
```

**戻り値**: `boolean`

### canRedo

やり直し可能な操作があるか確認します

**定義**:

```typescript
canRedo(): boolean
```

**戻り値**: `boolean`

### clear

履歴をクリアします

**定義**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**戻り値**: `void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Undo スタックをクリアするかどうか。デフォルトは true |
| `clearRedoStack` | boolean | - Redo スタックをクリアするかどうか。デフォルトは true |
