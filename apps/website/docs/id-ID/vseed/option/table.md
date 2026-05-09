# Table

:::info{title="Rekomendasi"}
\- Konfigurasi Field Direkomendasikan: `apa pun`Metrik, `apa pun`Dimensi

\- Mendukung Pengembalian Data: Setidaknya.`apa pun`Metrik, `apa pun`Dimensi

:::

:::info{title="Peta Pengkodean"}
Hanya mendukung dimensi konfigurasi dan metrik pohon, BakuencodingHadir.column

:::

:::note{title="Deskripsi"}
Tabel, dapat diterapkan pada tampilan data yang rinci, dengan baris yang jelas untuk memfasilitasi tampilan nilai tertentu

Terapkan adegan:

\- Data rinci perlu ditampilkan

\- Butir data perlu akurat cocok

\- Tampilkan properti data multi- dimensi

:::

:::warning{title="Peringatan"}
Kebutuhan data:

\- Setidaknya 1 dimensi field

\- Setidaknya 1 ruas pengukuran

\- Medan dimensi akan menjadi kepala kolom dari tabel

Fungsi terbuka baku:

\- Baku untuk membuka pengurutan, penyaringan, page break

:::


## chartType

**Tipe:** `"table"`

:::note{title="Deskripsi"}
Komponen tabel standar untuk menampilkan data rinci

:::

**Contoh:**
```ts
'table'




```
## dataset

**Tipe:** `Record[]`

:::note{title="Deskripsi"}
CocokTidyDataStandardisasi dan dikonsolidasikan data set untuk mendefinisikan sumber data dan struktur untuk grafik, Set data yang dimasukkan oleh pengguna tidak memerlukan proses apapun, Ruas sesuai kolom, Sebuah rekaman sesuai dengan garis.

:::

**Contoh:**
```ts
[{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]




```
## dimensions

**Tipe:** `DimensionTree | undefined`

:::note{title="Deskripsi"}
Kolom untuk setiap dimensi tabel

:::

**Contoh:**
```ts
[{id: "name", alias: "Nama"}]




```
### id

**Tipe:** `string`

### alias

**Tipe:** `string | undefined`

### timeFormat

**Tipe:** `TimeFormat | undefined`

:::note{title="Deskripsi"}
Konfigurasi Pemformatan Waktu Dimensi

:::


#### type

**Tipe:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Deskripsi"}
Ukuran partikel waktu, tanggal tampilan akurasi

:::

### encoding

**Tipe:** `"row" | "column" | undefined`

:::note{title="Deskripsi"}
Saluran untuk pemetaan dimensi

\- row: Mendukung pemetaan dimensi ganda ke saluran baris

\- column: Mendukung pemetaan dimensi ganda ke saluran kolom

:::

### children

**Tipe:** `(TableDimension | DimensionGroup)[] | undefined`


#### id

**Tipe:** `string`

#### alias

**Tipe:** `string | undefined`

#### timeFormat

**Tipe:** `TimeFormat | undefined`

:::note{title="Deskripsi"}
Konfigurasi Pemformatan Waktu Dimensi

:::


##### type

**Tipe:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Deskripsi"}
Ukuran partikel waktu, tanggal tampilan akurasi

:::

#### encoding

**Tipe:** `"row" | "column" | undefined`

:::note{title="Deskripsi"}
Saluran untuk pemetaan dimensi

\- row: Mendukung pemetaan dimensi ganda ke saluran baris

\- column: Mendukung pemetaan dimensi ganda ke saluran kolom

:::


## measures

**Tipe:** `MeasureTree | undefined`

:::note{title="Deskripsi"}
Setiap metrik dalam tabel harus digaris, Dan itu wajar untuk mendukung set metrik.

:::

**Contoh:**
```ts
[{id: "value", alias: "Nilai"}]




```
### id

**Tipe:** `string`

:::note{title="Deskripsi"}
Kelompok metrikid, Aku tidak bisa mengulanginya.

:::

### alias

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Kelompok metrik, Izinkan pengulangan, Ketika tidak selesai, alias Yaid

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik otomatis, awal baku, prioritas tertinggi

Kapan?autoFormat=true (Dan demi rombongan yang menggiring dengan sebenar-benarnya) demi para malaikat yang menggiring atau mengarak awan.numFormat Semua Konfigurasi

Setelah dibuka, label data bagan, informasi petunjuk akan secara otomatis memilih format yang sesuai menurut nilai metrik dan lingkungan bahasa

Memformat aturan: Nilai Desimal, terbukacompact notation，Minimal desimal 0-bit, maksimal 2-bit desimal, otomatis bulat, disediakan oleh perambanIntl.NumberFormat Berhasil

Misalnya::

\- localeYazh\-CN: 749740.264 → 74.4510.000

\- localeYaen\-US: 749740.264 → 744.5K

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik dari metrik yang telah disyaratkan secara otomatis akan diterapkanlabel、tooltip

Catatan: Untuk menggunakan format gubahan, pengaturan yang tampak diperlukanautoFormat=false，Jika tidak...autoFormat Timpa konfigurasi ini

:::


#### type

**Tipe:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Deskripsi"}
Tipe Pemformatan Nomor, Nilai dukungan(Desimal)、Persentase(%)、ribuan(‰)、Modus ilmiah

:::

#### ratio

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Rasio pemformatan nilai, Bukan untuk 0

:::

**Contoh:**
```ts
\- 100000 Ubah ke 100.000, ratio:10000, symbol:"10.000"
\- 100000 Ubah ke 10K, ratio:1000, symbol:"K"



```
#### symbol

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Simbol Pemformatan Numerik, Misalnya%,‰

:::

**Contoh:**
```ts
\- 100000 Ubah ke 100.000, ratio:10000, symbol:"10.000"
\- 100000 Ubah ke 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Pemotongan Numerik Ribuan Pemisah

:::

#### suffix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
akhiran format numerik

:::

#### prefix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Format prefiks numerik

:::

#### fractionDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lokasi desimal format numerik, Disediakan dengan PerambanIntl.NumberFormat SedangminimumFractionDigits danmaximumFractionDigits Memformat, Prioritas di bawahsignificantDigits

:::

**Contoh:**
```ts
\- 1234.5678 Ubah ke 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.57., fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Format numerik bit valid, Disediakan dengan PerambanIntl.NumberFormat SedangminimumSignificantDigits danmaximumSignificantDigits Memformat, Prioritas di atasfractionDigits

:::

**Contoh:**
```ts
\- 1234.5678 Ubah ke 1000, significantDigits:1
\- 1234.5678 Ubah ke 1200, significantDigits:2
\- 1234.5678 Ubah ke 1230, significantDigits:3
\- 1234.5678 Ubah ke 1234, significantDigits:4
\- 1234.5678 Ubah ke 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.57., significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Tipe:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Deskripsi"}
Nilai memformat prioritas bulat, Semuanya sudah diatur.significantDigits danfractionDigits Prioritas Dibulatkan, Disediakan dengan PerambanIntl.NumberFormat Memformat, StandarIntl.NumberFormat SedangroundingPriority

:::

**Contoh:**
```ts
\- 1234.5678 Ubah ke 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 Ubah ke 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Tipe:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Deskripsi"}
Nilai format mode pembulatan, Disediakan dengan PerambanIntl.NumberFormat Memformat, StandarIntl.NumberFormat SedangroundingMode

:::

### format

**Tipe:** `NumFormat | undefined`


#### type

**Tipe:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Deskripsi"}
Tipe Pemformatan Nomor, Nilai dukungan(Desimal)、Persentase(%)、ribuan(‰)、Modus ilmiah

:::

#### ratio

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Rasio pemformatan nilai, Bukan untuk 0

:::

**Contoh:**
```ts
\- 100000 Ubah ke 100.000, ratio:10000, symbol:"10.000"
\- 100000 Ubah ke 10K, ratio:1000, symbol:"K"



```
#### symbol

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Simbol Pemformatan Numerik, Misalnya%,‰

:::

**Contoh:**
```ts
\- 100000 Ubah ke 100.000, ratio:10000, symbol:"10.000"
\- 100000 Ubah ke 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Pemotongan Numerik Ribuan Pemisah

:::

#### suffix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
akhiran format numerik

:::

#### prefix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Format prefiks numerik

:::

#### fractionDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lokasi desimal format numerik, Disediakan dengan PerambanIntl.NumberFormat SedangminimumFractionDigits danmaximumFractionDigits Memformat, Prioritas di bawahsignificantDigits

:::

**Contoh:**
```ts
\- 1234.5678 Ubah ke 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.57., fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Format numerik bit valid, Disediakan dengan PerambanIntl.NumberFormat SedangminimumSignificantDigits danmaximumSignificantDigits Memformat, Prioritas di atasfractionDigits

:::

**Contoh:**
```ts
\- 1234.5678 Ubah ke 1000, significantDigits:1
\- 1234.5678 Ubah ke 1200, significantDigits:2
\- 1234.5678 Ubah ke 1230, significantDigits:3
\- 1234.5678 Ubah ke 1234, significantDigits:4
\- 1234.5678 Ubah ke 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.57., significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 Ubah ke 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Tipe:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Deskripsi"}
Nilai memformat prioritas bulat, Semuanya sudah diatur.significantDigits danfractionDigits Prioritas Dibulatkan, Disediakan dengan PerambanIntl.NumberFormat Memformat, StandarIntl.NumberFormat SedangroundingPriority

:::

**Contoh:**
```ts
\- 1234.5678 Ubah ke 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 Ubah ke 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Tipe:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Deskripsi"}
Nilai format mode pembulatan, Disediakan dengan PerambanIntl.NumberFormat Memformat, StandarIntl.NumberFormat SedangroundingMode

:::

### encoding

**Tipe:** `"column" | undefined`

:::note{title="Deskripsi"}
Kanal untuk pemetaan metrik

\- column: Kolom metrik

:::

### parentId

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Dalam konfigurasi metrik datar, Bangun Grup Metrik Pohon, parentIdUntuk grup metrik indukid, Untuk membangun pohon metrik

:::

:::tip{title="Tip"}
Konfigurasi pohon metrik berada dalam dua bentuk, Metode pertama adalah konfigurasi langsung.childrenpohon metrik, Mode dua adalah konfigurasi.parentIdDaftar metrik rata, Kedua metode tidak dapat dikonfigurasi secara bersamaan

:::

### children

**Tipe:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title="Deskripsi"}
Sub-metrik atau metrik dalam grup metrik

:::


## page

**Tipe:** `Page | undefined`

:::note{title="Deskripsi"}
Konfigurasi Istirahat Halaman, Nama ruas untuk menentukan istirahat halaman, Ini harus dimensi.

:::


### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Kolom Pecahan Halaman, Nama ruas untuk menentukan istirahat halaman, Ini harus dimensi.

:::

### currentValue

**Tipe:** `string`

:::note{title="Deskripsi"}
Nilai Istirahat Halaman Saat Ini, Nilai dasar untuk menspesifikasikan halaman kini

:::

**Contoh:**
```ts
'2023\-01\-01'




```
## backgroundColor

**Tipe:** `BackgroundColor`

:::note{title="Deskripsi"}
Warna latar belakang dapat warna string, Misalnya:'red', 'blue', Atau mungkin.hex, rgbataurgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Batas untuk Tabel

:::


## bodyFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fonta dari tubuh tabel

:::


## bodyFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna fonta untuk tubuh tabel

:::


## bodyBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang dari tubuh tabel

:::


## headerFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fonta untuk tajuk daftar

:::


## headerFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna fonta untuk tajuk daftar

:::


## headerBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang untuk tajuk daftar

:::


## hoverHeaderBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang ketika tetikus melayang di atas sel di atas daftar, Sel yang menyoroti tetikus

:::


## hoverHeaderInlineBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Ketika tetikus melayang di bagian atas daftar, Warna latar belakang dari seluruh baris sel, Baris untuk lokasi penandaan tetikus

:::


## selectedBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Batas bagi Sel Terpilih, Untuk menyoroti sel yang dipilih

:::


## selectedBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang sel yang dipilih, Untuk menyoroti sel yang dipilih

:::


## bodyCellStyle

**Tipe:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="Deskripsi"}
Set gaya khusus untuk sel dalam tubuh tabel

:::


### selector

**Tipe:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="Deskripsi"}
Pemilih Data



Aturselector, Menyediakan Nilaiselector, Data localeselector, Dimensi kondisionalselector, Metrik kondisionalselector Empat kategori kemampuan pencocokan data

Jika tidak dikonfigurasiselector, .



Perhatian.: selector dandynamicFilter Kita tidak bisa menggunakannya pada saat yang sama.dynamicFilter Prioritas lebih tinggi

:::

**Contoh:**
```ts
Pemilih Numerik
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

Pemilih Data Locale
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Pemilih Dimensi Kondisional
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Pemilih Metrik Kondisional
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}

Filter Field Bar
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Tipe:** `string | string[]`

:::note{title="Deskripsi"}
nama field, yang dapat berupa sebuah daerah tunggal atau multiple field array

:::

**Contoh:**
```ts
Ruas Tunggal
field: 'sales'

Beberapa field
field: ['sales', 'profit', 'revenue']



```
#### operator

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

\- not in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

:::

#### op

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

\- not in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

same as operator

:::

#### value

**Tipe:** `string | number | (string | number)[]`

:::note{title="Deskripsi"}
Pilih nilai dari ruas dimensi sedang dari entri data, Array dukungan

:::

### dynamicFilter

**Tipe:** `TableDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter Dinamis (driver kode)



Lewat.AI DihasilkanJavaScript Kode mencapai logika penyaring data kompleks

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan selector statis.



Persamaan inti:

\- Mendukung kondisi penyaring data yang rumit

\- Gunakan Fungsi Alat Internal untuk Operasi Data

\- Eksekusi aman di lingkungan perambanWeb Worker Sandbox)



Kebutuhan lingkungan: Hanya lingkungan peramban yang didukung.Node.js Lingkungan akan digunakanfallback



Perhatian.: selector dandynamicFilter Kita tidak bisa menggunakannya pada saat yang sama.dynamicFilter Prioritas lebih tinggi



Konfigurasi Filter Dinamis Tabel



Lewat.AI DihasilkanJavaScript Kode mencapai sebuah pengait akurat dari tingkat sel tabel Pilih

:::


#### type

**Tipe:** `"row-with-field"`

#### description

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Filter pengguna perlu deskripsi (bahasa alami)

:::

**Contoh:**
```ts
"Sel dengan tinggi profile penjualan lebih dari 1.000"

"Tandai sel dengan nilai maksimum di setiap baris"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI DihasilkanJavaScript Kode Penyaring



\- Hanya fungsi utilitas internal yang dapat digunakan (melalui_ atauR Kunjungan)

\- Parameter masukan: data (array)，Masing-masingitem Organisasi_index Fields untuk Nomor Baris

\- Array pemilih sel harus dikembalikan: ```Array<{ __row_index: number, field: string }>```

\- field Ya"*" Tampilkan seluruh penyorotan baris

\- Larangan penggunaan: eval, Function, Langkah, DOM API, Permintaan Jaringan

:::

**Contoh:**
```ts
Top N Filter
dynamicFilter = {
type: 'row\-with\-field',
description: 'Ketiga produk teratas dengan penjualan tertinggi',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
`_.map(result, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filter multi- kondisional
dynamicFilter = {
type: 'row\-with\-field',
description: 'Produk dengan marjin laba yang tinggi lebih dari 20% dan penjualan lebih dari 5.000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filter Relatif
dynamicFilter = {   *
type: 'row\-with\-field',
description: 'Produk dengan profil tertinggi dengan penjualan yang lebih tinggi dari rata-rata',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filter Grup
dynamicFilter = {
type: 'row\-with\-field',
description: 'Produk dengan penjualan tertinggi di setiap wilayah',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
`_.map(topByRegion, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Sorot Baris
dynamicFilter = {
description: 'Seluruh baris dengan penjualan laba tertinggi',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
`return matched.map(item => ({`
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



```
#### fallback

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
Kode mengeksekusi skema penjatuhan ketika gagal atau lingkungan tidak mendukungnya

:::


##### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Ruas Dimensi, dimensions Yakinid

:::

##### operator

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

\- not in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

:::

##### op

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

\- not in: Pilih nilai dari daerah dimensi sedang dalam entri datavalue entri data di

same as operator

:::

##### value

**Tipe:** `string | number | (string | number)[]`

:::note{title="Deskripsi"}
Pilih nilai dari ruas dimensi sedang dari entri data, Array dukungan

:::

#### result

**Tipe:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Deskripsi"}
Hasil eksekusi penyaring dinamis (ruas jangka-periode)



`prepare() Menulis panggung, baca-saja saat berjalan`

:::


##### success

**Tipe:** `false | true`

##### data

**Tipe:** `T[] | undefined`

##### error

**Tipe:** `string | undefined`

### backgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Latar Sel

:::

### enableBackgroundColorScale

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah membuka konfigurasi latar belakang panggung (color scale）

:::

### backgroundColorScale

**Tipe:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="Deskripsi"}
Warna Latar SelscalePeta, prioritas di atasbackgroundColor

:::


#### minValue

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Minimal, tidak dikonfigurasi secara baku minimum dalam kolom data saat ini

:::

#### maxValue

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Max. Baku ketika tidak dikonfigurasi adalah nilai maksimum dalam kolom data saat ini

:::

#### minColor

**Tipe:** `string`

:::note{title="Deskripsi"}
Warna untuk nilai minimum

:::

#### maxColor

**Tipe:** `string`

:::note{title="Deskripsi"}
Warna dengan nilai maksimum

:::

### enableProgressBar

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah membuka batang data latar belakang (sebuah batang untuk menampilkan ukuran sel saat ini) dan tidak secara baku

:::

### barPositiveColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Background data bar warna ketika sel saat ini positif

:::

### barNegativeColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batang data latar belakang dengan nilai negatif

:::

### barMin

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bilah kemajuan minimum



Otomatis menghitung nilai minimum kolom ketika tidak dikonfigurasi

:::

### barMax

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai batang proses maksimum



Otomatis menghitung nilai maksimum kolom ketika tidak dikonfigurasi

:::

### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna teks sel

:::

### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Teks Sel

:::

### borderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Batas Sel

:::

### borderLineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran batas sel

:::


## totals

**Tipe:** `TotalType | undefined`

:::note{title="Deskripsi"}
Tampilkan tipe baris bersama, hanya untuk kolom pengukur

\- 'sum': Tampilkan baris dan permintaan

\- 'avg': Tampilkan baris rata-rata

\- 'max': Tampilkan baris nilai maksimum

\- 'min': Tampilkan baris nilai minimum

\- 'count': Tampilkan baris hitungan



Tipe Baris Ringkasan Tabel

\- 'sum': Damai.

\- 'avg': Rata-rata

\- 'max': Maksimum

\- 'min': Min

\- 'count': Cacah

:::

**Contoh:**
```ts
'sum'




```
## theme

**Tipe:** `Theme | undefined`

:::note{title="Deskripsi"}
Tema bagan, Tema adalah konfigurasi fungsional prioritas rendah, Konfigurasi umum yang mencakup semua tipe bagan, Konfigurasi bagan dibagikan dengan tipe bagan individual, InternallightdandarkDua tema., Pengguna dapat mengaksesBuilderGubahan Tema



Tema



Internallight、dark Dua tema., Tema baru dapat diadopsi.registerThemeTema kustom.

:::

**Contoh:**
```ts
'dark'

'light'

'customThemeName'




```
### length

**Tipe:** `number`

### brand

**Tipe:** `brand`


## locale

**Tipe:** `Locale | undefined`

:::note{title="Deskripsi"}
Konfigurasi Bahasa Bagan, Dukungan'zh\-CN'dan'en\-US'Dua bahasa, Juga dapat ditangani.intl.setLocale('zh\-CN') Metode Set Bahasa

:::

