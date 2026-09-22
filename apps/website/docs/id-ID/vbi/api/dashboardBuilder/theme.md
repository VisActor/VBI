# DashboardThemeBuilder

Builder tema Dashboard. Mengelola definisi, preset, langganan dan pendaftaran VSeed; komponen memakai hasil yang telah diresolusi.

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

Mengamati perubahan nama atau definisi melalui perubahan lokal, undo/redo, dan sinkronisasi kolaboratif. Mengembalikan fungsi berhenti berlangganan.

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

Memilih tema. Definisi opsional disimpan dan dipilih dalam satu perubahan tanpa pendaftaran sebelumnya atau perubahan sumber daya grafik.

**Definisi**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**Hasil**: `void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme` | string | - Nama tema tidak kosong |
| `definition?` | VBIDashboardThemeDefinition | - Definisi lengkap opsional yang disimpan di Dashboard ini |

### registerTheme

Mendaftarkan atau memperbarui tema dalam dokumen tanpa memilihnya. Definisi disimpan dan disinkronkan bersama dokumen.

**Definisi**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**Hasil**: `void`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme` | string | - Nama tema tidak kosong |
| `definition` | VBIDashboardThemeDefinition | - Definisi tema lengkap |

### getThemeConfig

Mengembalikan salinan definisi dengan mengutamakan dokumen daripada preset bawaan. Mengembalikan undefined jika tidak ada.

**Definisi**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**Hasil**: `VBIDashboardThemeDefinition \| undefined`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Nama tema, default tema saat ini |

### getThemeDefinitions

Mengembalikan salinan semua definisi tema dalam dokumen. Gunakan observe untuk mengikuti daftar tema yang tersedia.

**Definisi**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**Hasil**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

Mendaftar nama, mode dan palet tema bawaan serta dokumen. Definisi dokumen didahulukan untuk nama yang sama.

**Definisi**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**Hasil**: `VBIDashboardThemeOption[]`

### resolveTheme

Meresolusi tema dan memastikan pendaftaran VSeed dengan nama runtime terisolasi. Nama tidak dikenal memakai light tanpa mengubah dokumen.

**Definisi**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**Hasil**: `VBIDashboardResolvedTheme`

**Parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Nama tema, default pilihan saat ini; dapat digunakan untuk pratinjau sementara tema lain |

### getTheme

Mengambil nama tema, dengan nilai default light.

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
