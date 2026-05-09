# UndoManager

Manajer undo/redo, menyediakan fungsi undo dan redo berdasarkan YJS, mendukung manajemen tumpukan dan operasi pembersihan riwayat

## Properti

## metode

### constructor

Konstruktor

**definisi**:

```typescript
constructor(scope: any)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `scope` | apapun | - YJS dokumen atau cakupan jenis, digunakan untuk menentukan cakupan pelacakan undo/redo |

### undo

Batalkan modifikasi terakhir

**definisi**:

```typescript
undo(): boolean
```

**Pengembalian**: `boolean`

### redo

Ulangi perubahan yang dibatalkan

**definisi**:

```typescript
redo(): boolean
```

**Pengembalian**: `boolean`

### canUndo

Periksa apakah ada operasi yang tidak dapat dilakukan

**definisi**:

```typescript
canUndo(): boolean
```

**Pengembalian**: `boolean`

### canRedo

Periksa apakah ada operasi yang dapat diulang

**definisi**:

```typescript
canRedo(): boolean
```

**Pengembalian**: `boolean`

### clear

sejarah yang jelas

**definisi**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Pengembalian**: `void`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Apakah akan menghapus tumpukan yang dibatalkan, default true |
| `clearRedoStack` | boolean | - Apakah akan menghapus tumpukan pengulangan, default true |