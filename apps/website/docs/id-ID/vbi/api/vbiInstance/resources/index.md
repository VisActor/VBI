# VBI.resources

Namespace resource pada instans VBI, digunakan untuk mendaftarkan resource bersama yang dapat direferensikan oleh dashboard.

## Properti

| Properti | Tipe | Deskripsi |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | API pengelolaan resource chart. |
| **insight** | `VBIInsightResourceNamespace` | API pengelolaan resource Insight. |


## Metode

### register

Mendaftarkan resource chart dan insight secara batch.

**Definisi**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**Mengembalikan**: `VBIResourceRegisterResult`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

Menghapus semua resource chart dan insight pada instans VBI saat ini.

**Definisi**:

```typescript
clear(): void
```

**Mengembalikan**: `void`

### snapshot

Mengekspor snapshot DSL resource yang dapat direferensikan oleh instans VBI saat ini.

**Definisi**:

```typescript
snapshot(): VBIResourceSnapshot
```

**Mengembalikan**: `VBIResourceSnapshot`
