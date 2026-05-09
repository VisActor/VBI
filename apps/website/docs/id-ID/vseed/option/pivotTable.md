# PivotTable

:::info{title="Direkomendasikan"}
\- Konfigurasi field yang direkomendasikan: metrik `1`, dimensi `1`

\- Mendukung pembentukan kembali data: setidaknya `1` metrik, `0` dimensi

:::

:::info{title="Pemetaan encoding"}
Tabel pivot mendukung saluran visual berikut:

`row`: dimensi baris, mendukung `beberapa dimensi`, mengelompokkan baris berdasarkan nilai dimensi

`column`: Dimensi kolom, mendukung `beberapa dimensi`, mengelompokkan kolom berdasarkan nilai dimensi

`detail`: saluran subdivisi, mendukung `beberapa metrik`, menampilkan nilai metrik dalam sel

:::

:::note{title="Deskripsi"}
Tabel pivot cocok untuk skenario analisis silang data multidimensi, dan dapat secara fleksibel mengonfigurasi dimensi baris dan kolom serta metode penghitungan metrik.

Skenario penggunaan:

\-Analisis statistik data multidimensi yang kompleks

\-Pengeboran data dan tampilan agregasi

\-Pembuatan laporan bisnis dan eksplorasi data

:::

:::warning{title="Peringatan"}
Persyaratan data:

\- minimal 1 dimensi baris atau 1 dimensi kolom atau 1 metrik

\- data harus dikumpulkan

\- data dapat dikelompokkan

Fitur yang diaktifkan secara default:

\- Secara default, pengurutan baris dan kolom, pemfilteran data, perhitungan agregasi, subtotal/total diaktifkan.

:::


## chartType

**Tipe:** `"pivotTable"`

:::note{title="Deskripsi"}
Tabel pivot, cocok untuk skenario analisis silang data multidimensi

:::

**Contoh**
```ts
'pivotTable'




```
## dataset

**Tipe:** `Record[]`

:::note{title="Deskripsi"}
Kumpulan data gabungan yang mematuhi spesifikasi TidyData digunakan untuk menentukan sumber data dan struktur bagan. Kumpulan data yang dimasukkan oleh pengguna tidak memerlukan pemrosesan apa pun. VSeed memiliki fungsi pembentukan ulang data yang kuat dan akan membentuk ulang datanya sendiri. Data tabel pivot pada akhirnya akan diubah menjadi struktur pohon yang sesuai, dan pengguna tidak perlu melakukan pemrosesan data manual.

:::

**Contoh**
```ts
[{region:'Tiongkok Timur', produk:'A', penjualan:1000}, {region:'Tiongkok Timur', produk:'B', penjualan:1500}]




```
## dimensions

**Tipe:** `TableDimension[] | undefined`

:::note{title="Deskripsi"}
Dimensi baris dan kolom pada tabel pivot akan secara otomatis mengolah data menjadi struktur pohon dan memetakannya ke sumbu baris dan kolom.

:::

**Contoh**
```ts
[{id: 'wilayah', alias: 'wilayah', isRow: id}, {id: 'produk', alias: 'produk', isColumn: alias}]




```
### id

**Tipe:** `string`

:::note{title="Deskripsi"}
Id field yang sesuai dengan dimensi

:::

### alias

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
alias dimensi

:::

### timeFormat

**Tipe:** `TimeFormat | undefined`

:::note{title="Deskripsi"}
Konfigurasi pemformatan waktu dimensi

:::


#### type

**Tipe:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Deskripsi"}
Perincian waktu menentukan keakuratan tampilan tanggal

:::

### encoding

**Tipe:** `"row" | "column" | undefined`

:::note{title="Deskripsi"}
Saluran pemetaan dimensi

\- row: Mendukung pemetaan beberapa dimensi ke saluran baris

\- column: Mendukung pemetaan beberapa dimensi ke saluran kolom

:::


## measures

**Tipe:** `TableMeasure[] | undefined`

:::note{title="Deskripsi"}
Tabel pivot mendukung metrik multidimensi

:::

**Contoh**
```ts
[{id: 'penjualan', alias: 'Penjualan', agregasi: 'sum'}]




```
### id

**Tipe:** `string`

:::note{title="Deskripsi"}
ID metrik, tidak dapat diulang

:::

### alias

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Alias ​​metrik, duplikat diperbolehkan, bila tidak diisi, alias adalah id

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik otomatis, yang diaktifkan secara default, memiliki prioritas tertinggi

Ketika autoFormat=true, semua konfigurasi numFormat akan ditimpa

Setelah menyalakannya, label data dan informasi cepat pada bagan akan secara otomatis memilih metode pemformatan yang sesuai berdasarkan nilai metrik dan locale.

Aturan pemformatan: Nilai desimal, aktifkan compact notation, minimal 0 desimal, maksimal 2 desimal, pembulatan otomatis, gunakan Intl.NumberFormat yang disediakan browser.

Misalnya:

\-locale adalah zh\-CN: 749740,264 → 744,500

\-locale adalah en\-US: 749740.264 → 744.5K

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Pemformatan nilai metrik khusus akan diterapkan secara otomatis ke label, tooltip

CATATAN: Untuk menggunakan pemformatan khusus, autoFormat=false harus disetel secara eksplisit, jika tidak, autoFormat akan menimpa konfigurasi ini

:::


#### type

**Tipe:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Deskripsi"}
Jenis pemformatan angka, nilai numerik pendukung (desimal), persentase (%), seperseribu (‰), dan notasi ilmiah

:::

#### ratio

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Rasio pemformatan numerik, tidak boleh 0

:::

**Contoh**
```ts
\- 100.000 diubah menjadi 100.000, rasio:10.000, simbol: "10k"
\- 100000 dikonversi ke 10K, rasio:1000, simbol: "K"



```
#### symbol

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Simbol pemformatan numerik, seperti %, ‰

:::

**Contoh**
```ts
\- 100.000 diubah menjadi 100.000, rasio:10.000, simbol: "10k"
\- 100000 dikonversi ke 10K, rasio:1000, simbol: "K"



```
#### thousandSeparator

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Pemisah ribuan pemformatan numerik

:::

#### suffix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Akhiran format numerik

:::

#### prefix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Awalan pemformatan numerik

:::

#### fractionDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Tempat desimal pemformatan numerik, gunakan minimumFractionDigits dan maximumFractionDigits di Intl.NumberFormat yang disediakan oleh browser untuk pemformatan, dengan prioritas lebih rendah dari significantDigits

:::

**Contoh**
```ts
\- 1234.5678 dikonversi ke 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik bit yang valid, gunakan minimumSignificantDigits dan maximumSignificantDigits dalam Intl.NumberFormat yang disediakan oleh browser untuk pemformatan, dengan prioritas lebih tinggi daripada fractionDigits

:::

**Contoh**
```ts
\- 1234.5678 dikonversi ke 1000, significantDigits:1
\- 1234.5678 dikonversi ke 1200, significantDigits:2
\- 1234.5678 dikonversi ke 1230, significantDigits:3
\- 1234.5678 dikonversi ke 1234, significantDigits:4
\- 1234.5678 dikonversi ke 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Tipe:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Deskripsi"}
Prioritas pembulatan pemformatan numerik, menangani prioritas pembulatan ketika significantDigits dan fractionDigits disetel secara bersamaan, menggunakan significantDigits yang disediakan oleh browser untuk pemformatan, aturannya sama dengan roundingPriority di fractionDigits

:::

**Contoh**
```ts
\- 1234.5678 dikonversi ke 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi ke 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Tipe:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Deskripsi"}
Mode pembulatan pemformatan numerik, gunakan Intl.NumberFormat yang disediakan oleh browser untuk pemformatan, aturannya sama dengan roundingMode di Intl.NumberFormat

:::

### format

**Tipe:** `NumFormat | undefined`


#### type

**Tipe:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Deskripsi"}
Jenis pemformatan angka, nilai numerik pendukung (desimal), persentase (%), seperseribu (‰), dan notasi ilmiah

:::

#### ratio

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Rasio pemformatan numerik, tidak boleh 0

:::

**Contoh**
```ts
\- 100.000 diubah menjadi 100.000, rasio:10.000, simbol: "10k"
\- 100000 dikonversi ke 10K, rasio:1000, simbol: "K"



```
#### symbol

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Simbol pemformatan numerik, seperti %, ‰

:::

**Contoh**
```ts
\- 100.000 diubah menjadi 100.000, rasio:10.000, simbol: "10k"
\- 100000 dikonversi ke 10K, rasio:1000, simbol: "K"



```
#### thousandSeparator

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Pemisah ribuan pemformatan numerik

:::

#### suffix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Akhiran format numerik

:::

#### prefix

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Awalan pemformatan numerik

:::

#### fractionDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Tempat desimal pemformatan numerik, gunakan minimumFractionDigits dan maximumFractionDigits di Intl.NumberFormat yang disediakan oleh browser untuk pemformatan, dengan prioritas lebih rendah dari significantDigits

:::

**Contoh**
```ts
\- 1234.5678 dikonversi ke 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik bit yang valid, gunakan minimumSignificantDigits dan maximumSignificantDigits dalam Intl.NumberFormat yang disediakan oleh browser untuk pemformatan, dengan prioritas lebih tinggi daripada fractionDigits

:::

**Contoh**
```ts
\- 1234.5678 dikonversi ke 1000, significantDigits:1
\- 1234.5678 dikonversi ke 1200, significantDigits:2
\- 1234.5678 dikonversi ke 1230, significantDigits:3
\- 1234.5678 dikonversi ke 1234, significantDigits:4
\- 1234.5678 dikonversi ke 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 dikonversi ke 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Tipe:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Deskripsi"}
Prioritas pembulatan pemformatan numerik, menangani prioritas pembulatan ketika significantDigits dan fractionDigits disetel secara bersamaan, menggunakan significantDigits yang disediakan oleh browser untuk pemformatan, aturannya sama dengan roundingPriority di fractionDigits

:::

**Contoh**
```ts
\- 1234.5678 dikonversi ke 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 dikonversi ke 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Tipe:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Deskripsi"}
Mode pembulatan pemformatan numerik, gunakan Intl.NumberFormat yang disediakan oleh browser untuk pemformatan, aturannya sama dengan roundingMode di Intl.NumberFormat

:::

### encoding

**Tipe:** `"column" | undefined`

:::note{title="Deskripsi"}
Saluran pemetaan metrik

\- column: kolom metrik

:::

### parentId

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Buatlah kelompok metrik berbentuk pohon dalam bentuk konfigurasi metrik datar. parentId menunjuk ke id grup metrik induk, yang digunakan untuk membangun pohon metrik.

:::

:::tip{title="Tip"}
Ada dua cara untuk mengkonfigurasi pohon metrik. Cara pertama adalah dengan mengkonfigurasi pohon metrik secara langsung dengan anak-anak. Cara kedua adalah dengan mengkonfigurasi daftar metrik datar parentId. Kedua cara tersebut tidak dapat dikonfigurasi secara bersamaan.

:::


## page

**Tipe:** `Page | undefined`

:::note{title="Deskripsi"}
Konfigurasi paging, yang digunakan untuk menentukan nama field paging, harus berupa dimensi

:::


### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Field halaman, yang digunakan untuk menentukan nama field halaman, harus berupa dimensi

:::

### currentValue

**Tipe:** `string`

:::note{title="Deskripsi"}
Nilai halaman saat ini, digunakan untuk menentukan nilai dasar halaman saat ini

:::

**Contoh**
```ts
'2023\-01\-01'




```
## backgroundColor

**Tipe:** `BackgroundColor`

:::note{title="Deskripsi"}
Warna latar belakang dapat berupa string warna, seperti 'merah', 'biru', atau hex, rgb atau rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna batas tabel

:::


## bodyFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font badan tabel

:::


## bodyFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna font isi tabel

:::


## bodyBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang badan tabel

:::


## headerFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font header baris dan header kolom

:::


## headerFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna font header baris dan header kolom

:::


## headerBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang header baris dan header kolom

:::


## hoverHeaderBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang saat mouse diarahkan ke sel pada header baris atau kolom. Ini digunakan untuk menyorot sel tempat baris dan kolom tempat mouse berada berpotongan.

:::


## hoverHeaderInlineBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Saat mouse diarahkan ke sel di awal baris atau kolom, ini digunakan untuk menyorot semua sel di baris dan kolom tempat mouse berada.

:::


## selectedBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas sel yang dipilih, digunakan untuk menyorot sel yang dipilih

:::


## selectedBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang sel yang dipilih, digunakan untuk menyorot sel yang dipilih

:::


## bodyCellStyle

**Tipe:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="Deskripsi"}
Tetapkan gaya khusus untuk sel di bagian isi tabel

:::


### selector

**Tipe:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="Deskripsi"}
pemilih data



Jika pemilih dikonfigurasi, empat jenis kemampuan pencocokan data disediakan: pemilih numerik, pemilih data locale, pemilih dimensi bersyarat, dan pemilih indeks bersyarat.

Jika pemilih tidak dikonfigurasi, gaya akan berlaku secara global.



Catatan: pemilih dan dynamicFilter tidak dapat digunakan secara bersamaan, dynamicFilter memiliki prioritas lebih tinggi

:::

**Contoh**
```ts
Pemilih numerik
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

pemilih data locale
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Pemilih dimensi bersyarat
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

Pemilih metrik bersyarat
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

Filter kolom field
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
Nama field, yang dapat berupa field tunggal atau larik yang terdiri dari beberapa field

:::

**Contoh**
```ts
field tunggal
field: 'sales'

beberapa field
field: ['sales', 'profit', 'revenue']



```
#### operator

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in : Pilih item data yang nilai field dimensinya berada di value

\- tidak masuk: Pilih item data yang nilai field dimensinya tidak ada di value

:::

#### op

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in : Pilih item data yang nilai field dimensinya berada di value

\- tidak masuk: Pilih item data yang nilai field dimensinya tidak ada di value

same as operator

:::

#### value

**Tipe:** `string | number | (string | number)[]`

:::note{title="Deskripsi"}
Pilih nilai field dimensi dalam item data, array pendukung

:::

### dynamicFilter

**Tipe:** `TableDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter dinamis (didorong oleh kode)



Menerapkan logika pemfilteran data yang kompleks melalui kode AI yang dihasilkan oleh AI

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan penyeleksi statis



Kompetensi inti:

\- Mendukung kondisi pemfilteran data yang rumit dan sewenang-wenang

\-Gunakan fungsi utilitas bawaan untuk manipulasi data

\- Jalankan dengan aman di lingkungan browser (Web Worker sandbox)



Persyaratan lingkungan: Hanya lingkungan browser yang didukung, lingkungan Node.js akan menggunakan fallback



Catatan: pemilih dan dynamicFilter tidak dapat digunakan secara bersamaan, dynamicFilter memiliki prioritas lebih tinggi



Konfigurasi filter dinamis tabel



Pemfilteran yang tepat pada tingkat sel tabel dicapai melalui kode AI yang dihasilkan oleh AI

:::


#### type

**Tipe:** `"row-with-field"`

#### description

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Deskripsi kebutuhan pemfilteran pengguna (bahasa alami)

:::

**Contoh**
```ts
"Sorot sel dengan penjualan lebih dari 1000"

"Sorot sel dengan nilai terbesar di setiap baris"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI menghasilkan kode filter untuk AI



\-hanya dapat menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\-Parameter input: data (array), setiap item berisi kolom _index yang menunjukkan nomor baris

\- Harus mengembalikan array pemilih sel: ``Array<{ __row_index: number, field: string }>``

\- Jika field adalah "*", itu berarti seluruh baris disorot.

\- Penggunaan yang dilarang: eval, Function, operasi asinkron, DOM Function, permintaan jaringan

:::

**Contoh**
```ts
Top N Penyaring
dynamicFilter = {
type: 'row\-with\-field',
deskripsi: 'Sorot 3 produk teratas dengan penjualan tertinggi',
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

Filter berdasarkan beberapa kondisi
dynamicFilter = {
type: 'row\-with\-field',
deskripsi: 'Sorot produk dengan margin keuntungan lebih besar dari 20% dan penjualan melebihi 5.000',
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

Filter nilai relatif
dynamicFilter = {   *
type: 'row\-with\-field',
deskripsi: 'Sorot produk dengan penjualan di atas rata-rata',
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

Filter grup
dynamicFilter = {
type: 'row\-with\-field',
keterangan: 'Produk dengan penjualan tertinggi di setiap wilayah',
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

Sorot seluruh baris
dynamicFilter = {
deskripsi: 'Sorot seluruh baris di mana penjualan lebih besar daripada keuntungan',
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
Solusi penurunan versi ketika eksekusi kode gagal atau lingkungan tidak mendukungnya

:::


##### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Field dimensi, dimensions id dari item tertentu

:::

##### operator

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in : Pilih item data yang nilai field dimensinya berada di value

\- tidak masuk: Pilih item data yang nilai field dimensinya tidak ada di value

:::

##### op

**Tipe:** `"in" | "not in" | undefined`

:::note{title="Deskripsi"}
Operator

\- in : Pilih item data yang nilai field dimensinya berada di value

\- tidak masuk: Pilih item data yang nilai field dimensinya tidak ada di value

same as operator

:::

##### value

**Tipe:** `string | number | (string | number)[]`

:::note{title="Deskripsi"}
Pilih nilai field dimensi dalam item data, array pendukung

:::

#### result

**Tipe:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Deskripsi"}
Memfilter hasil eksekusi secara dinamis (field runtime)



Tulis dalam tahap persiapan(), hanya baca saat runtime

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
Warna latar belakang sel

:::

### enableBackgroundColorScale

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan mengaktifkan konfigurasi skala warna latar belakang (skala color)

:::

### backgroundColorScale

**Tipe:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="Deskripsi"}
Pemetaan skala warna latar belakang sel, prioritasnya lebih tinggi dari warna latar belakang

:::


#### minValue

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai minimal. Jika tidak dikonfigurasi, nilai defaultnya adalah nilai minimum di kolom data saat ini.

:::

#### maxValue

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai maksimum. Jika tidak dikonfigurasi, nilai defaultnya adalah nilai maksimum di kolom data saat ini.

:::

#### minColor

**Tipe:** `string`

:::note{title="Deskripsi"}
Warna sesuai dengan nilai minimum

:::

#### maxColor

**Tipe:** `string`

:::note{title="Deskripsi"}
Warna sesuai dengan nilai maksimum

:::

### enableProgressBar

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan mengaktifkan fungsi bilah data latar belakang (bilah untuk menampilkan ukuran sel saat ini). Ini tidak diaktifkan secara default.

:::

### barPositiveColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna bilah data latar belakang saat sel saat ini adalah angka positif

:::

### barNegativeColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna bilah data latar belakang saat nilainya negatif

:::

### barMin

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai minimum bilah kemajuan



Secara otomatis menghitung nilai minimum kolom ketika tidak dikonfigurasi

:::

### barMax

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai maksimum bilah kemajuan



Secara otomatis menghitung nilai maksimum kolom ketika tidak dikonfigurasi

:::

### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna teks sel

:::

### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran teks sel

:::

### borderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas sel

:::

### borderLineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar garis batas sel

:::


## indicatorsAsCol

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah metrik ditampilkan sebagai kolom. Ketika true, metrik diperluas ke arah kolom. Ketika false, metrik diperluas ke arah baris.

:::

**Contoh**
```ts
true




```
## totals

**Tipe:** `PivotTableTotals | undefined`

:::note{title="Deskripsi"}
Konfigurasi total dan subtotal untuk tabel pivot



Konfigurasi subtotal total untuk tabel pivot

:::

**Contoh**
```ts
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




```
### row

**Tipe:** `RowOrColumnTotalConfig | undefined`

:::note{title="Deskripsi"}
Konfigurasi subtotal total baris



Konfigurasi subtotal total baris atau kolom

:::


#### showGrandTotals

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan total (total baris/kolom)

:::

#### showSubTotals

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan subtotal

:::

#### subTotalsDimensions

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Dimensi subtotal, yaitu dimensi yang digunakan untuk mengelompokkan subtotal

:::

**Contoh**
```ts
['category', 'region']



```
### column

**Tipe:** `RowOrColumnTotalConfig | undefined`

:::note{title="Deskripsi"}
Konfigurasi subtotal total untuk kolom



Konfigurasi subtotal total baris atau kolom

:::


#### showGrandTotals

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan total (total baris/kolom)

:::

#### showSubTotals

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan subtotal

:::

#### subTotalsDimensions

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Dimensi subtotal, yaitu dimensi yang digunakan untuk mengelompokkan subtotal

:::

**Contoh**
```ts
['category', 'region']




```
## theme

**Tipe:** `Theme | undefined`

:::note{title="Deskripsi"}
Tema bagan. Tema adalah konfigurasi fungsional dengan prioritas lebih rendah yang berisi konfigurasi umum yang umum untuk semua tipe bagan dan konfigurasi bagan yang umum untuk tipe bagan kelas tunggal.



Ada dua tema bawaan: terang dan gelap. Pengguna dapat menyesuaikan tema melalui Builder



tema



Ada dua tema bawaan light dan dark. Tema baru dapat dikustomisasi melalui registerTheme.

:::

**Contoh**
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
bahasa



Konfigurasi bahasa bagan, mendukung bahasa 'zh\-CN' dan 'en\-US'. Selain itu, Anda dapat memanggil metode intl.setLocale('zh\-CN') untuk mengatur bahasa

:::

