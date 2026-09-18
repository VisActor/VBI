# createVBI

Membuat instans VBI yang independen.

Setiap instans memiliki registry resource sendiri, cocok untuk mengisolasi dashboard atau konteks pengujian yang berbeda dalam aplikasi yang sama.

## Tanda Tangan Fungsi

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## Parameter

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | Konfigurasi default chart Builder, diteruskan ke chart Builder yang dibuat di chart dan dashboard. |

---

# VBI

Instans VBI default, cocok untuk langsung menggunakan kemampuan Builder dan resource yang dibagikan secara global.

**Tipe**: `VBIInstance`

**Definisi**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

Instans VBI yang dikembalikan oleh createVBI, sebagai titik masuk terpadu untuk mengakses kemampuan chart, insight, dashboard, dan lainnya.

## Properti

| Properti | Tipe | Deskripsi |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | API registrasi, pengambilan, dan pelepasan connector. |
| **resources** | `VBIResourceNamespace` | API registrasi resource chart dan insight, digunakan oleh dashboard untuk mereferensikan resource bersama. |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | API pembuatan Chart Builder. |
| **insight** | `VBIInsightNamespace` | API pembuatan Insight Builder. |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | API pembuatan Dashboard Builder. |
