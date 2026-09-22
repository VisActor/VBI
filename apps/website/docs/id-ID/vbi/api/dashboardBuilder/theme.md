# DashboardThemeBuilder

Builder tema Dashboard menyimpan nama tema; perender mendaftarkan dan menentukan gayanya.

## Metode

### constructor

**Definisi**:

```typescript
constructor(dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

Memantau perubahan tema lokal, pembatalan, dan kolaboratif; mengembalikan fungsi untuk berhenti berlangganan.

**Definisi**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Hasil**: `() => void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `callback` | ObserveCallback | - Callback perubahan tema |

### setTheme

Menetapkan light, dark, atau tema khusus terdaftar tanpa mengubah sumber daya grafik yang dirujuk.

**Definisi**:

```typescript
setTheme(theme: string): void
```

**Hasil**: `void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme` | string | - Nama tema yang tidak kosong |

### getTheme

Mendapatkan nama tema, dengan nilai bawaan light.

**Definisi**:

```typescript
getTheme(): string
```

**Hasil**: `string`

### toJSON

Mengekspor nama tema.

**Definisi**:

```typescript
toJSON(): string
```

**Hasil**: `string`