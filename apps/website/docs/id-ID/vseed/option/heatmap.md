# Heatmap

:::info{title="Direkomendasikan"}
\- Konfigurasi field yang direkomendasikan: metrik `1`, dimensi `2`

\- Mendukung pembentukan kembali data: setidaknya `1` metrik, `0` dimensi

:::

:::info{title="Pemetaan encoding"}
Peta panas mendukung saluran visual berikut:

`xAxis`: saluran sumbu X, mendukung `beberapa dimensi`, dipetakan ke sumbu X sesuai dengan nilai dimensi

`yAxis`: saluran sumbu Y, mendukung `beberapa dimensi`, dipetakan ke sumbu Y sesuai dengan nilai dimensi

`detail`: Saluran subdivisi, mendukung `beberapa dimensi`, digunakan saat menampilkan lebih banyak data terperinci dalam rangkaian warna yang sama

`color`: saluran warna, mendukung `satu metrik`, dipetakan ke warna sesuai dengan nilai metrik

`tooltip`: Saluran prompt, mendukung `beberapa dimensi` dan `beberapa metrik`, akan ditampilkan ketika mouse mengarahkan mouse ke titik data

`label`: Saluran label, mendukung `beberapa dimensi` dan `beberapa metrik`, akan menampilkan label data pada titik data

:::

:::note{title="Deskripsi"}
Peta panas, yang menampilkan hubungan distribusi dan kekuatan data melalui kedalaman warna matriks dua dimensi

Skenario penggunaan:

\- Tampilan kepadatan dan intensitas data 2D skala besar

\-Analisis korelasi antara klasifikasi dan nilai numerik

\- Perbandingan silang deret waktu dan kategori

:::

:::warning{title="Peringatan"}
Persyaratan data:

\- minimal field 2 dimensi, digunakan untuk menentukan baris dan kolom peta panas

\- setidaknya 1 field numerik (metrik), digunakan untuk memetakan corak warna

\- Jika beberapa metrik didukung, biasanya satu metrik dipilih untuk pemetaan warna

Fitur yang diaktifkan secara default:

\-Legenda, sumbu koordinat, label data, informasi cepat, dan penskalaan numerik diaktifkan secara default.

:::


## chartType

**Tipe:** `"heatmap"`

:::note{title="Deskripsi"}
peta panas



Peta panas, yang menampilkan hubungan distribusi dan kekuatan data melalui kedalaman warna matriks dua dimensi

:::

**Contoh**
```ts
'heatmap'




```
## dataset

**Tipe:** `Record[]`

:::note{title="Deskripsi"}
Kumpulan data



Kumpulan data gabungan yang sesuai dengan spesifikasi TidyData digunakan untuk menentukan sumber data dan struktur bagan. Kumpulan data yang dimasukkan oleh pengguna tidak memerlukan pemrosesan apa pun. VSeed memiliki fungsi pembentukan ulang data yang kuat dan akan membentuk ulang datanya sendiri. Data peta panas tersebut nantinya akan diubah menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
```ts
[{bulan:'Januari', value:100}, {bulan:'Februari', value:150}, {bulan:'Maret', value:120}]




```
## dimensions

**Tipe:** `HeatmapDimension[] | undefined`

:::note{title="Deskripsi"}
Dimensi



Dimensi pertama peta panas dipetakan ke sumbu sudut, dan dimensi lainnya digabungkan dengan nama metrik (bila ada beberapa metrik) dan ditampilkan sebagai item legenda.

:::

**Contoh**
```ts
[{id: 'kategori', alias: 'kategori'}]




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

**Tipe:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title="Deskripsi"}
Saluran pemetaan dimensi

\- xAxis: Mendukung pemetaan beberapa dimensi ke sumbu X

\- yAxis: Mendukung pemetaan beberapa dimensi ke sumbu Y

\- tooltip: Mendukung pemetaan beberapa dimensi untuk meminta saluran

\- label: Mendukung pemetaan beberapa dimensi untuk memberi label saluran

\- row: Mendukung pemetaan beberapa dimensi ke saluran baris

\- column: Mendukung pemetaan beberapa dimensi ke saluran kolom

:::


## measures

**Tipe:** `HeatmapMeasure[] | undefined`

:::note{title="Deskripsi"}
indeks



Metrik peta panas akan secara otomatis digabungkan menjadi satu metrik dan dipetakan ke sumbu radius. Jika terdapat beberapa metrik, nama metrik akan digabungkan dengan dimensi lain dan ditampilkan sebagai item legenda.

:::

**Contoh**
```ts
[{id: 'value', alias: 'nilai numerik'}]




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

**Tipe:** `"color" | "tooltip" | "label" | undefined`

:::note{title="Deskripsi"}
Saluran pemetaan metrik

\- color: warna pemetaan metrik

\- label: label untuk pemetaan metrik

\- tooltip: Tip untuk pemetaan metrik

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
Konfigurasi halaman

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
Warna latar belakang bagan



Warna latar belakang dapat berupa string warna, seperti 'merah', 'biru', atau hex, rgb atau rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Tipe:** `Color | undefined`

:::note{title="Deskripsi"}
warna



Konfigurasi warna, digunakan untuk menentukan skema warna bagan, termasuk daftar warna, pemetaan warna, gradien warna, dll.

:::


### colorScheme

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Skema warna diskrit, skema warna digunakan untuk menentukan warna berbagai elemen dalam bagan

:::

**Contoh**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Skema warna gradien linier, skema warna gradien linier digunakan untuk menentukan warna berbagai elemen dalam bagan

:::

**Contoh**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Tipe:** `Record<string, string> | undefined`

:::note{title="Deskripsi"}
Pemetaan warna, pemetaan warna digunakan untuk memetakan nilai data ke warna tertentu

:::

**Contoh**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Konfigurasi warna positif dan negatif, digunakan untuk menentukan warna nilai positif pada grafik

:::

### negativeColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Konfigurasi warna positif dan negatif, digunakan untuk menentukan warna nilai negatif pada grafik

:::


## label

**Tipe:** `Label | undefined`

:::note{title="Deskripsi"}
Konfigurasi label peta panas digunakan untuk menentukan label data bagan dan secara otomatis mengaktifkan inversi label untuk memastikan keterbacaan label.

:::


### enable

**Tipe:** `false | true`

:::note{title="Deskripsi"}
Apakah fungsi label diaktifkan?

:::

### wrap

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah labelnya membungkus

:::

### showValue

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label menampilkan nilai metrik

Dalam skenario multi-metrik, tidak perlu khawatir mengenai nilai-nilai yang bertentangan dari beberapa metrik, karena semua metrik yang terkait dengan gambar akan diproses oleh `foldMeasures` dan digabungkan menjadi satu metrik, mewakili satu titik data, sehingga tidak akan ada konflik.

Catatan: Label pengkodean memiliki prioritas lebih tinggi. Konfigurasi ini tidak mempengaruhi label pengkodean.

:::

### showValuePercent

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label menampilkan persentase nilai metrik

Dalam skenario multi-metrik, tidak perlu khawatir mengenai nilai-nilai yang bertentangan dari beberapa metrik, karena semua metrik yang terkait dengan gambar akan diproses oleh `foldMeasures` dan digabungkan menjadi satu metrik, mewakili satu titik data, sehingga tidak akan ada konflik.

Catatan: Label pengkodean memiliki prioritas lebih tinggi. Konfigurasi ini tidak mempengaruhi label pengkodean.

:::

### showDimension

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label menampilkan label dimensi

Tampilkan semua label dimensi

Catatan: Label pengkodean memiliki prioritas lebih tinggi. Konfigurasi ini tidak mempengaruhi label pengkodean.

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah nilai tag diformat secara otomatis. Ketika autoFormat adalah true, konfigurasi numFormat menjadi tidak valid.

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Konfigurasi pemformatan nilai tag akan digabungkan dengan `format` di `measure`. `format` di `measure` memiliki prioritas lebih tinggi. numFormat memiliki prioritas lebih rendah daripada autoFormat

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

### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Labeli ukuran font

:::

### labelFontWeight

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Beri label berat font

:::

### labelBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Beri label warna latar belakang

:::

### labelStroke

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Beri label warna guratan

:::

### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Beri label warna font

:::

### labelColorSmartInvert

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label secara otomatis membalik warna font sesuai dengan warna elemen

:::

### labelPosition

**Tipe:** `"inside" | "outside" | undefined`

:::note{title="Deskripsi"}
posisi label

:::

### labelOverlap

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah fungsi anti-tumpang tindih label diaktifkan?

:::

### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
Pemfilteran tag, hubungan kondisional default antara penyeleksi adalah Atau

:::


#### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Field dimensi, dimensions id dari item tertentu

:::

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

**Tipe:** `ChartDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter dinamis (eksekusi kode yang dihasilkan AI)



Menerapkan logika pemfilteran data yang kompleks melalui kode AI yang dihasilkan oleh AI



Kompetensi inti:

\- Mendukung kondisi pemfilteran data yang rumit dan sewenang-wenang

\-Gunakan fungsi utilitas bawaan untuk manipulasi data

\- Jalankan dengan aman di lingkungan browser (Web Worker sandbox)



Persyaratan lingkungan: Hanya lingkungan browser yang didukung, lingkungan Node.js akan menggunakan fallback



Catatan: pemilih dan dynamicFilter tidak dapat digunakan secara bersamaan, dynamicFilter memiliki prioritas lebih tinggi



Konfigurasi filter dinamis bagan



Filter penanda bagan (batang, titik, dll.) melalui kode AI yang dihasilkan oleh AI

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
"Sorot bilah dengan penjualan lebih dari 1000"

"Sorot batang dengan margin keuntungan tertinggi di setiap area"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI menghasilkan kode filter untuk AI



\-hanya dapat menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\-Parameter input: data (array), setiap item berisi kolom __row_index yang menunjukkan nomor baris

\- Harus mengembalikan array indeks baris dan kombinasi field: ``Array<{ __row_index: number, field: string }>``

\- __row_index mewakili nomor baris item data asli, field mewakili field yang perlu disorot.

\- Penggunaan yang dilarang: eval, Function, operasi asinkron, DOM Function, permintaan jaringan

:::

**Contoh**
```ts
Sorot field penjualan item data dengan penjualan lebih besar dari 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data yang paling menguntungkan di setiap area
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Sorot item data yang difilter berdasarkan beberapa kondisi
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



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


## legend

**Tipe:** `ColorLegend | undefined`

:::note{title="Deskripsi"}
legenda



Konfigurasi legenda warna peta panas digunakan untuk menentukan legenda bagan, termasuk lokasi, format, gaya, dll. dari legenda tersebut.

:::


### position

**Tipe:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Deskripsi"}
lokasi legenda

:::

**Contoh**
```ts
position: 'rightTop'



```
### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah fungsi legenda diaktifkan?

:::

**Contoh**
```ts
enable: true



```
### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna font legenda

:::

### labelFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna font legenda

:::

### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font legenda

:::

**Contoh**
```ts
labelFontSize: 10



```
### labelFontWeight

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Berat font legenda

:::

**Contoh**
```ts
labelFontWeight: 400



```
### railBackgroundColor

**Tipe:** `string | undefined`

### handlerBorderColor

**Tipe:** `string | undefined`


## tooltip

**Tipe:** `Tooltip | undefined`

:::note{title="Deskripsi"}
Pesan cepat



Konfigurasi informasi cepat dari peta panas digunakan untuk menentukan informasi cepat dari bagan, termasuk lokasi, format, gaya, dll. dari informasi cepat.

:::


### enable

**Tipe:** `false | true`

:::note{title="Deskripsi"}
Apakah fungsi informasi cepat diaktifkan

:::


## brush

**Tipe:** `Brush | undefined`

:::note{title="Deskripsi"}
Pemilihan bingkai



Konfigurasi pemilihan bingkai, digunakan untuk mengaktifkan/menonaktifkan kemampuan pemilihan bingkai kuas



Konfigurasi pemilihan bingkai bagan

:::


### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan mengaktifkan pemilihan kuas

:::

### brushType

**Tipe:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="Deskripsi"}
jenis kuas



Tentukan bentuk dan arah kotak pemilihan kuas

\- `rect`: Pemilihan bingkai persegi panjang, yang dapat melakukan pemilihan bingkai pada kedua arah sumbu X dan sumbu Y secara bersamaan

\- `polygon`: Pemilihan poligon, klik pada beberapa titik untuk menggambar poligon mana saja yang akan dipilih.

\- `x`: Pemilihan frame arah sumbu X, hanya pemilihan frame pada arah sumbu X, dan tidak ada batasan pada arah sumbu Y.

\- `y`: Pemilihan bingkai arah sumbu Y, hanya pemilihan bingkai pada arah sumbu Y, arah sumbu X tidak dibatasi

:::

### brushMode

**Tipe:** `"single" | "multiple" | undefined`

:::note{title="Deskripsi"}
Mode pemilihan kotak, pilihan tunggal atau pilihan ganda



Tentukan mode pemilihan kuas

\- `single`: Mode pemilihan tunggal, hanya boleh ada satu kotak pemilihan kuas dalam satu waktu

\- `multiple`: Mode multi-pilih, beberapa kotak centang bisa ada secara bersamaan

:::

### removeOnClick

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan mengosongkan kotak setelah pemilihan kotak selesai

:::

### inBrushStyle

**Tipe:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
Gaya data yang dipilih oleh kotak



Tentukan gaya titik data yang dipilih oleh kuas

:::


#### opacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
kegelapan



Opasitas titik data yang dipilih oleh kotak, rentang nilainya adalah 0\-1

:::

#### stroke

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna guratan

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar goresan

:::

### outOfBrushStyle

**Tipe:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
Gaya data yang tidak dipilih oleh kotak



Tentukan gaya titik data yang tidak dipilih oleh kuas

:::


#### opacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
kegelapan



Opacity titik data yang tidak dipilih oleh kotak, rentang nilainya adalah 0\-1

:::

#### stroke

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna guratan

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar goresan

:::


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

