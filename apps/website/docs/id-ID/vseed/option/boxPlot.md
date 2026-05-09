# BoxPlot

:::info{title="Direkomendasikan"}
\- Konfigurasi field yang direkomendasikan: metrik `1`, dimensi `1`

\- Mendukung pembentukan kembali data: setidaknya `1` metrik, `0` dimensi

:::

:::info{title="Pemetaan encoding"}
Boxplot mendukung saluran visual berikut:

`xAxis`: saluran sumbu X, mendukung `beberapa dimensi`, dipetakan ke sumbu X sesuai dengan nilai dimensi

`yAxis`: saluran sumbu Y, mendukung `beberapa metrik`, dipetakan ke sumbu Y sesuai dengan nilai metrik

`color`: saluran warna, mendukung `beberapa dimensi` atau `satu metrik`, warna dimensi digunakan untuk membedakan rangkaian data yang berbeda, warna metrik digunakan untuk memetakan nilai metrik secara linier ke warna grafik

`tooltip`: Saluran prompt, mendukung `beberapa dimensi` dan `beberapa metrik`, akan ditampilkan ketika mouse mengarahkan mouse ke titik data

`label`: Saluran label, mendukung `beberapa dimensi` dan `beberapa metrik`, akan menampilkan label data pada titik data

:::

:::note{title="Deskripsi"}
Plot kotak cocok untuk menampilkan sebaran data. Sumbu X adalah sumbu kategori (data kategori), sumbu Y adalah sumbu numerik (data kontinu), dan kotak-kotak disusun secara vertikal.

Skenario penggunaan:

\- bila nama item data pendek

\- Perlu membandingkan secara visual ukuran numerik dari berbagai kategori

\- Menampilkan tren data deret waktu

:::

:::warning{title="Peringatan"}
Persyaratan data:

\- setidaknya 1 field numerik (metrik)

\- Dimensi pertama akan ditempatkan pada sumbu X, dan dimensi lainnya akan digabungkan dengan nama metrik (bila terdapat beberapa metrik) dan ditampilkan sebagai item legenda

\- Semua metrik akan otomatis digabungkan menjadi satu metrik

Fitur yang diaktifkan secara default:

\-Legenda, sumbu, label data, dan informasi cepat diaktifkan secara default.

:::


## chartType

**Tipe:** `"boxPlot"`

:::note{title="Deskripsi"}
Plot kotak cocok untuk menampilkan sebaran data. Sumbu X adalah sumbu kategori (data kategori), sumbu Y adalah sumbu numerik (data kontinu), dan kotak-kotak disusun secara vertikal.

:::

**Contoh**
```ts
'boxPlot'




```
## dataset

**Tipe:** `Record[]`

:::note{title="Deskripsi"}
Kumpulan data gabungan yang sesuai dengan spesifikasi TidyData digunakan untuk menentukan sumber data dan struktur bagan. Kumpulan data yang dimasukkan oleh pengguna tidak memerlukan pemrosesan apa pun. VSeed memiliki fungsi pembentukan ulang data yang kuat dan akan membentuk ulang datanya sendiri. Data histogram tersebut nantinya akan diubah menjadi 2 dimensi dan 1 metrik.

:::

**Contoh**
```ts
[{category:'A', value:100}, {category:'B', value:200}]




```
## dimensions

**Tipe:** `BoxPlotDimension[] | undefined`

:::note{title="Deskripsi"}
Dimensi pertama plot kotak dipetakan ke sumbu X, dan dimensi lainnya akan digabungkan dengan nama metrik (bila ada beberapa metrik) dan ditampilkan sebagai item legenda

:::

**Contoh**
```ts
[{id: "kategori", alias: "kategori"}]




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

**Tipe:** `"xAxis" | "color" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="Deskripsi"}
Saluran pemetaan dimensi

\- xAxis: Mendukung pemetaan beberapa dimensi ke sumbu X

\- color: Mendukung pemetaan beberapa dimensi ke saluran warna

\- tooltip: Mendukung pemetaan beberapa dimensi untuk meminta saluran

\- label: Mendukung pemetaan beberapa dimensi untuk memberi label saluran

\- row: Mendukung pemetaan beberapa dimensi ke saluran baris

\- column: Mendukung pemetaan beberapa dimensi ke saluran kolom

:::


## measures

**Tipe:** `BoxPlotMeasure[] | undefined`

:::note{title="Deskripsi"}
Seluruh metrik boxplot akan otomatis digabungkan menjadi satu metrik dan dipetakan ke sumbu Y. Jika terdapat beberapa metrik, nama metrik akan digabungkan dengan dimensi lain dan ditampilkan sebagai item legenda.

:::

**Contoh**
```ts
[{id: "value", alias: "Nilai"}]




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

**Tipe:** `"value" | "color" | "tooltip" | "label" | "q1" | "median" | "q3" | "min" | "max" | "outliers" | undefined`

:::note{title="Deskripsi"}
Saluran pemetaan metrik

\- value: Metrik yang sesuai dengan nilai diskrit, digunakan untuk menghitung nilai statistik dan menampilkan plot kotak

\- q1: Pemetaan metrik yang sesuai dengan kuantil ke-25 dari nilai statistik

\- q3: Pemetaan metrik sesuai dengan persentil ke-75 dari nilai statistik

\- min: pemetaan metrik nilai minimum kumis kotak

\- max: Pemetaan metrik nilai maksimum kumis kotak

\- mediadian: pemetaan metrik nilai median statistik

\- outlier: pemetaan metrik outlier

\- detail: Detail pemetaan metrik

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
Warna latar belakang bagan. Warna latar belakang bisa berupa string warna. Defaultnya adalah latar belakang transparan, seperti 'merah', 'biru', atau bisa juga hex, rgb atau rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Tipe:** `Color | undefined`

:::note{title="Deskripsi"}
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
Konfigurasi label digunakan untuk menentukan label data bagan, termasuk posisi, format, gaya, dll. dari label data.

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

**Tipe:** `Legend | undefined`

:::note{title="Deskripsi"}
Konfigurasi legenda digunakan untuk menentukan legenda bagan, termasuk lokasi, format, gaya, dll. dari legenda tersebut.

:::


### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah fungsi legenda diaktifkan?

:::

**Contoh**
```ts
enable: true



```
### border

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah batas legenda diaktifkan

:::

:::warning{title="Peringatan"}
Hanya legenda tersendiri yang berlaku

:::

**Contoh**
```ts
border: true



```
### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna font legenda

:::

### pagerIconColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna ikon paginator

:::

### pagerIconDisableColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Ikon paginator berwarna abu-abu

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
### labelFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna font legenda

:::

### labelFontWeight

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Berat font legenda

:::

**Contoh**
```ts
labelFontWeight: 400



```
### shapeType

**Tipe:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="Deskripsi"}
bentuk legenda

:::

:::warning{title="Peringatan"}
Hanya legenda tersendiri yang berlaku

:::

**Contoh**
```ts
shapeType: 'circle'



```
### position

**Tipe:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Deskripsi"}
lokasi legenda

:::

**Contoh**
```ts
position: 'rightTop'



```
### maxSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Jika jumlah legendanya banyak, jumlah kolom maksimum atau jumlah baris legenda maksimum

Jika posisinya horizontal (bawah, bottomLeft, bottomRight, bl, br, atas, topLeft, topRight, tl, tr), maxSize mengontrol jumlah kolom yang ditampilkan

Jika posisinya vertikal (kiri, leftTop, leftBottom, lt, lb, kanan, rightTop, rightBottom, rt, rb), maxSize mengontrol jumlah garis yang ditampilkan

:::

:::warning{title="Peringatan"}
Hanya legenda tersendiri yang berlaku

:::

**Contoh**
```ts
maxSize: 2




```
## tooltip

**Tipe:** `Tooltip | undefined`

:::note{title="Deskripsi"}
Konfigurasi informasi cepat digunakan untuk menentukan informasi cepat pada bagan, termasuk lokasi, format, gaya, dll. dari informasi cepat.

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


## xAxis

**Tipe:** `XBandAxis | undefined`

:::note{title="Deskripsi"}
sumbu X, sumbu kategori, konfigurasi sumbu X, digunakan untuk menentukan sumbu X pada bagan, termasuk posisi, format, gaya, dll. dari sumbu X.

:::


### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbunya terlihat?

:::

### inverse

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbu ditampilkan dalam arah terbalik, hanya berlaku untuk sumbu numerik

:::

### zero

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan memaksa tampilan nilai 0 pada sumbu koordinat. Ketika min dan max dikonfigurasi, item konfigurasi ini tidak valid dan hanya berpengaruh pada sumbu nilai.

:::

### labelAutoHide

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Label sumbu disembunyikan secara otomatis. Jika dua label tumpang tindih (intervalnya kurang dari autoHideGap), label yang tumpang tindih akan disembunyikan secara otomatis. Hanya efektif untuk sumbu kategori.

:::

### labelAutoHideGap

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Label sumbu, secara otomatis menyembunyikan celahnya. Jika jarak antara dua label teks kurang dari autoHideGap, label yang tumpang tindih akan disembunyikan secara otomatis. Hanya efektif untuk sumbu kategori.

Saat autoHide diaktifkan, gunakan autoHide dan atur ke autoHideSeparation

Ketika autoHide dimatikan, pengambilan sampel digunakan dan diatur pada minGap.

:::

### labelAutoRotate

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Label sumbu, otomatis diputar, bila lebar label melebihi panjang sumbu, label akan otomatis diputar. Hanya efektif untuk sumbu kategori.

:::

### labelAutoRotateAngleRange

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Label sumbu, rentang sudut rotasi otomatis, saat rotasi otomatis diaktifkan, rentang sudut rotasi label. Hanya efektif untuk sumbu kategori.

:::

### labelAutoLimit

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Label sumbu secara otomatis membatasi panjangnya. Jika lebar label melebihi panjang sumbu, bagian berlebihnya diwakili oleh elipsis. Label terlihat setelah mouse diarahkan, dan lebar label secara otomatis dibatasi. Hanya efektif untuk sumbu kategori.

:::

### labelAutoLimitLength

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Label sumbu secara otomatis membatasi panjang maksimum. Jika panjang teks label melebihi panjang maksimum, bagian berlebihnya diwakili oleh elipsis, dan label terlihat setelah mouse diarahkan. Ini hanya berlaku untuk sumbu kategori.

:::

### label

**Tipe:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Deskripsi"}
Label centang sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah labelnya terlihat?

:::

#### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna label

:::

#### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Labeli ukuran font

:::

#### labelFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Beri label berat font

:::

#### labelAngle

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut rotasi label

:::

### line

**Tipe:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbunya terlihat?

:::

#### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna sumbu

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar sumbu

:::

### tick

**Tipe:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Deskripsi"}
skala sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah skalanya terlihat?

:::

#### tickInside

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah timbangannya menghadap ke dalam?

:::

#### tickColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna skala

:::

#### tickSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran skala

:::

### title

**Tipe:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Deskripsi"}
Judul sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah judulnya terlihat?

:::

#### titleText

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Teks judul, default mengikuti konfigurasi field

:::

#### titleColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna judul

:::

#### titleFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font judul

:::

#### titleFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Berat font judul

:::

### grid

**Tipe:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Deskripsi"}
Garis kisi sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

#### gridColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna garis kisi

:::

#### gridWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar garis kisi

:::

#### gridLineDash

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Jenis garis kisi

:::

### animation

**Tipe:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Deskripsi"}
Konfigurasi animasi sumbu X

:::


#### duration

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Durasi animasi

:::

#### easing

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
fungsi pelonggaran animasi

:::


## yAxis

**Tipe:** `YLinearAxis | undefined`

:::note{title="Deskripsi"}
sumbu Y, sumbu nilai, konfigurasi sumbu Y, digunakan untuk menentukan sumbu Y pada bagan, termasuk posisi, format, gaya, dll. dari sumbu Y.

:::


### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbunya terlihat?

:::

### min

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai minimum sumbu, dengan prioritas lebih tinggi dari bagus dan nol

:::

### max

**Tipe:** `number | boolean | undefined`

:::note{title="Deskripsi"}
Nilai maksimum sumbu, prioritasnya lebih tinggi dari bagus dan nol. Jika true, nilai maksimum dihitung secara otomatis berdasarkan rentang data.

:::

### log

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menggunakan sumbu logaritmik, hanya efektif untuk sumbu numerik

:::

### logBase

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Basis sumbu logaritma, hanya berlaku untuk sumbu numerik

:::

### nice

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menyesuaikan interval skala sumbu secara otomatis agar label skala lebih mudah dibaca. Ketika min dan max dikonfigurasi, item konfigurasi ini tidak valid dan hanya berlaku untuk sumbu nilai.

:::

### inverse

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbu ditampilkan dalam arah terbalik, hanya berlaku untuk sumbu numerik

:::

### zero

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan memaksa tampilan nilai 0 pada sumbu koordinat. Ketika min dan max dikonfigurasi, item konfigurasi ini tidak valid dan hanya berpengaruh pada sumbu nilai.

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan memformat label skala sumbu nilai secara otomatis, ini hanya berlaku untuk sumbu nilai. Ketika autoFormat adalah true, konfigurasi numFormat menjadi tidak valid.

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Pemformatan angka pada sumbu nilai, hanya berpengaruh pada sumbu nilai, dan memiliki prioritas lebih rendah dari autoFormat

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

### label

**Tipe:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Deskripsi"}
Label centang sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah labelnya terlihat?

:::

#### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna label

:::

#### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Labeli ukuran font

:::

#### labelFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Beri label berat font

:::

#### labelAngle

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut rotasi label

:::

### line

**Tipe:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbunya terlihat?

:::

#### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna sumbu

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar sumbu

:::

### tick

**Tipe:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Deskripsi"}
skala sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah skalanya terlihat?

:::

#### tickInside

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah timbangannya menghadap ke dalam?

:::

#### tickColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna skala

:::

#### tickSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran skala

:::

### title

**Tipe:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Deskripsi"}
Judul sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah judulnya terlihat?

:::

#### titleText

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Teks judul, default mengikuti konfigurasi field

:::

#### titleColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna judul

:::

#### titleFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font judul

:::

#### titleFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Berat font judul

:::

### grid

**Tipe:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Deskripsi"}
Garis kisi sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

#### gridColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna garis kisi

:::

#### gridWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar garis kisi

:::

#### gridLineDash

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Jenis garis kisi

:::

### animation

**Tipe:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Deskripsi"}
Konfigurasi animasi sumbu Y

:::


#### duration

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Durasi animasi

:::

#### easing

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
fungsi pelonggaran animasi

:::


## sort

**Tipe:** `Sort | undefined`

:::note{title="Deskripsi"}
Konfigurasi penyortiran sumbu X, mendukung penyortiran berdasarkan dimensi atau metrik, dan urutan penyortiran khusus



Konfigurasi penyortiran sumbu kategori, mendukung penyortiran berdasarkan dimensi atau metrik, dan urutan penyortiran khusus

:::

**Contoh**
```ts
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
atau
\- customOrder:['2019', '2020', '2021']




```
### order

**Tipe:** `"asc" | "desc" | undefined`

:::note{title="Deskripsi"}
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'

:::

**Contoh**
```ts
order:'asc'



```
### orderBy

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Field tempat penyortiran bergantung dapat berupa id dimensi atau id metrik

:::

**Contoh**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Sesuaikan urutan pengurutan, yang akan diterapkan langsung ke sumbu kategori

:::


## sortLegend

**Tipe:** `SortLegend | undefined`

:::note{title="Deskripsi"}
Konfigurasi penyortiran legenda, mendukung penyortiran berdasarkan dimensi atau metrik, dan urutan penyortiran khusus



Konfigurasi penyortiran legenda, mendukung penyortiran berdasarkan dimensi atau metrik, dan urutan penyortiran khusus; array yang diurutkan mengikuti urutan dari kiri ke kanan atau atas ke bawah

:::

**Contoh**
```ts
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
atau
\- customOrder:['2019', '2020', '2021']




```
### order

**Tipe:** `"asc" | "desc" | undefined`

:::note{title="Deskripsi"}
Urutan pengurutan, nilai opsional adalah 'asc' atau 'desc'

:::

**Contoh**
```ts
order:'asc'



```
### orderBy

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Field tempat penyortiran bergantung dapat berupa id dimensi atau id metrik

:::

**Contoh**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Sesuaikan urutan pengurutan, yang akan diterapkan langsung ke legenda, naik dari kiri ke kanan atau atas ke bawah, turun dari kanan ke kiri atau bawah ke atas

:::


## theme

**Tipe:** `Theme | undefined`

:::note{title="Deskripsi"}
Tema grafik. Temanya adalah konfigurasi fungsional dengan prioritas lebih rendah. Ini mencakup konfigurasi umum yang dimiliki oleh semua jenis bagan. Konfigurasi bagan dibagikan dengan tipe bagan tipe tunggal. Ada dua tema terang dan gelap bawaan. Pengguna dapat menyesuaikan tema melalui Builder



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


## crosshairRect

**Tipe:** `CrosshairRect | undefined`

:::note{title="Deskripsi"}
Konfigurasi kotak prompt vertikal digunakan untuk menentukan kotak prompt vertikal pada bagan, termasuk warna kotak prompt vertikal, gaya label, dll.



Konfigurasi area persegi panjang crosshair adalah jenis konfigurasi yang digunakan untuk menampilkan area persegi panjang crosshair dalam grafik

:::


### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan area persegi panjang crosshair

:::

### rectColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna area persegi panjang garis crosshair

:::

### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna label area persegi panjang crosshair

:::

### labelVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan label area persegi panjang crosshair

:::

### labelBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang label area persegi panjang garis crosshair

:::


## boxPlotStyle

**Tipe:** `BoxPlotStyle | BoxPlotStyle[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi gaya kotak plot kotak mendukung granularitas global atau pemilih agar dapat diterapkan.

:::


### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
pemilih data



Jika pemilih dikonfigurasi, empat jenis kemampuan pencocokan data disediakan: pemilih numerik, pemilih data locale, pemilih dimensi bersyarat, dan pemilih indeks bersyarat.

Jika pemilih tidak dikonfigurasi, gaya akan berlaku secara global.

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




```
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

### boxVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah primitif boxPlot terlihat?

:::

### boxColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
boxPlot warna primitif

:::

### boxColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
transparansi warna primitif boxPlot

:::

### boxBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna batas elemen boxPlot

:::

### boxBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar batas elemen boxPlot

:::

### boxBorderOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
transparansi perbatasan primitif boxPlot

:::

### boxCornerRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fillet kotak

:::

### medianBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna garis median

:::

### whiskerBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna garis kotak dan kumis

:::


## outlierStyle

**Tipe:** `OutlierStyle | OutlierStyle[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi gaya titik pengecualian, mendukung granularitas global atau pemilih agar dapat diterapkan

:::


### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
pemilih data



Jika pemilih dikonfigurasi, empat jenis kemampuan pencocokan data disediakan: pemilih numerik, pemilih data locale, pemilih dimensi bersyarat, dan pemilih indeks bersyarat.

Jika pemilih tidak dikonfigurasi, gaya akan berlaku secara global.

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




```
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

### pointVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah intinya terlihat?

:::

### pointSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
ukuran titik



ukuran titik

:::

### pointColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Titik warna primitif



Titik warna primitif

:::

### pointColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Titik transparansi warna primitif



Titik transparansi warna primitif

:::

### pointBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas elemen titik



Warna batas elemen titik

:::

### pointBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas primitif titik



Lebar batas primitif titik

:::

### pointBorderStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
Arahkan gaya perbatasan primitif



Arahkan gaya perbatasan primitif

:::

**Contoh**
```ts
solid

dashed

dotted




```
## whiskers

**Tipe:** `number | number[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi panjang kumis untuk histogram, mendukung nilai skalar dan array dengan panjang 2

Jika nilainya berupa skalar, gunakan kumis * IQR untuk menghitung batas atas dan bawah

Jika nilainya berupa larik 2 elemen, kumis[0] harus berada di antara [0, 0,25), yang menunjukkan bahwa nilai batas bawah mengambil persentil yang sesuai;

kumis[1] harus berada di antara (0,75, 1], yang menunjukkan bahwa nilai batas atas mengambil persentil yang sesuai;

:::


## annotationPoint

**Tipe:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi titik label, berdasarkan data yang dipilih, menentukan titik label pada bagan, termasuk posisi, format, gaya, dll. dari titik label.

:::


### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
Pemilih titik label, digunakan untuk memilih titik data.

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

### measureId

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Menentukan metrik id yang menjadi milik titik label. Dalam beberapa skenario measure, ini dapat dikombinasikan dengan pemilih untuk secara unik menemukan titik pelabelan yang sesuai dengan metrik target.

:::

### dynamicFilter

**Tipe:** `ChartDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter dinamis (eksekusi kode yang dihasilkan AI)



Menerapkan logika pemfilteran data yang kompleks melalui kode AI yang dihasilkan oleh AI

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan penyeleksi statis



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

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks beranotasi

:::

**Contoh**
```ts
'Teks anotasi'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna teks

:::

**Contoh**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font teks

:::

**Contoh**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Berat font teks

:::

**Contoh**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan teks, umumnya diatur ke kanan, teks ditampilkan di sebelah kiri titik label, memastikan bahwa teks tersebut ditampilkan di area bagan yang terlihat

Disarankan untuk mengaturnya ke 'kanan', yang memastikan bahwa teks berada di sebelah kiri titik label

kanan: Teks berada di sisi kiri titik label, dan tepi kanan teks sejajar dengan titik label.

kiri: Teks berada di sisi kanan titik label, dan tepi kiri teks sejajar dengan titik label

center: Teks berada di tengah titik label, dan bagian tengah teks sejajar dengan titik label

:::

**Contoh**
```ts
Teks 'kanan' berada di sebelah kiri titik label



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan vertikal teks. Umumnya, diatur ke atas, teks ditampilkan di bagian bawah titik label, memastikan bahwa teks tersebut ditampilkan di area grafik yang terlihat

Disarankan untuk mengaturnya ke 'atas' untuk memastikan bahwa teks ditampilkan sepenuhnya di area grafik yang terlihat

atas: Teks berada di bagian bawah titik label, dan tepi atas teks sejajar dengan titik label

tengah: Teks berada di tengah titik label, dan bagian tengah teks sejajar dengan titik label

bawah: Teks berada di bagian atas titik label, dan tepi bawah teks sejajar dengan titik label

:::

**Contoh**
```ts
Teks 'atas' ada di bagian bawah titik label



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
latar belakang terlihat

:::

**Contoh**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar batas latar belakang

:::

**Contoh**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
batas latar belakang sudut membulat

:::

**Contoh**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
bantalan latar belakang

:::

**Contoh**
```ts
4



```
### offsetY

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Jarak piksel offset keseluruhan dari titik pelabelan pada arah Y. Ketika titik pelabelan berada di atas grafik (saat nilainya besar), disarankan untuk mengaturnya ke nilai positif. Jika titik pelabelan berada di bawah grafik (saat nilainya kecil), disarankan untuk menyetelnya ke nilai negatif.

Nilai negatif akan menggeser keseluruhan ke atas. Misalnya, jika disetel ke \-10, seluruh komponen titik label, termasuk teks dan latar belakang teks, akan digeser ke atas sebesar 10 piksel.

Nilai positif akan menggeser keseluruhan ke bawah. Misalnya, jika disetel ke 10, seluruh komponen titik label, termasuk teks dan latar belakang teks, akan digeser ke bawah sebesar 10 piksel.

:::

**Contoh**
```ts
offsetY: 5, titik pelabelan digeser ke bawah sebanyak 5 piksel secara keseluruhan



```
### offsetX

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Jarak piksel offset keseluruhan dari titik pelabelan pada arah X. Jika titik pelabelan berada di sisi kiri bagan (titik awal sumbu kategori), disarankan untuk menyetelnya ke nilai positif. Jika titik pelabelan berada di sisi kanan bagan (titik akhir sumbu kategori), disarankan untuk menyetelnya ke nilai negatif.

Nilai negatif akan menggeser keseluruhan ke kiri. Misalnya, jika disetel ke \-10, seluruh komponen titik label, termasuk teks dan latar belakang teks, akan digeser ke kiri sebesar 10 piksel.

Nilai positif akan menggeser keseluruhan ke kanan. Misalnya, jika disetel ke 10, seluruh komponen titik label, termasuk teks dan latar belakang teks, akan digeser ke kanan sebesar 10 piksel.

:::

**Contoh**
```ts
offsetX: 5, seluruh titik label digeser ke kanan sebesar 5 piksel




```
## annotationVerticalLine

**Tipe:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="Deskripsi"}
Garis label nilai dimensi, ditampilkan dalam arah vertikal, dapat mengatur posisi, gaya, dll. dari garis label

:::


### xValue

**Tipe:** `string | number | (string | number)[] | undefined`

:::note{title="Deskripsi"}
Nilai x tetap, digunakan untuk menandai garis vertikal. Jika sumbu kategori berada pada arah x, Anda dapat memasukkan nilai dimensi. Jika sumbu nilai berada pada arah x, Anda dapat memasukkan nilai tertentu.

:::

### dynamicFilter

**Tipe:** `ValueDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter dinamis (eksekusi kode yang dihasilkan AI)



Hitung secara dinamis nilai garis dimensi melalui kode AI yang dihasilkan oleh AI

Cocok untuk penentuan posisi garis label secara dinamis berdasarkan data, seperti rata-rata, maksimum, kuantil, lini bisnis, dll.



Hanya mendukung lingkungan browser (memerlukan Web Worker)

:::


#### type

**Tipe:** `"value"`

#### description

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Deskripsi kebutuhan pemfilteran pengguna (bahasa alami)

:::

**Contoh**
```ts
"Dapatkan nilai dengan volume penjualan tertinggi sebagai acuan lini label"

"Hitung penjualan rata-rata untuk lini pelabelan"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI menghasilkan kode filter untuk AI



\-hanya dapat menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter masukan: data (array)

\- Harus mengembalikan satu nilai atau string: number | string

\-Skenario penggunaan: nilai dinamis yang diperlukan untuk memberi label pada garis (garis horizontal, garis vertikal)

\- Penggunaan yang dilarang: eval, Function, operasi asinkron, DOM Function, permintaan jaringan

:::

**Contoh**
```ts
Dapatkan nilai penjualan maksimum sebagai nilai garis label
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Hitung nilai rata-rata untuk garis pelabelan
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Dapatkan kuantil sebagai garis label
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Hitung nilai target berdasarkan kondisi
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Solusi penurunan versi ketika eksekusi kode gagal atau lingkungan tidak mendukungnya

:::

#### result

**Tipe:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Deskripsi"}
Memfilter hasil eksekusi secara dinamis (field runtime)



Tulis dalam tahap persiapan(), hanya baca saat runtime

:::


##### success

**Tipe:** `false | true`

##### data

**Tipe:** `string | number | undefined`

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks beranotasi

:::

**Contoh**
```ts
'Teks anotasi'



```
### textPosition

**Tipe:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Deskripsi"}
Posisi teks, posisi label pada garis dimensi (posisi relatif label terhadap garis).

:::

**Contoh**
```ts
'outsideEnd'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna teks

:::

**Contoh**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font teks

:::

**Contoh**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Berat font teks

:::

**Contoh**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan teks, secara umum, tidak perlu diatur

Disarankan untuk mengaturnya ke 'kanan', yang memastikan bahwa teks berada di sisi kiri garis label

kanan: Teks berada di sisi kiri garis panduan, dan tepi kanan teks sejajar dengan garis label (vertikal)

kiri: Teks berada di sisi kanan garis panduan, dan tepi kiri teks sejajar dengan garis label (vertikal)

tengah: Teks berada di tengah garis panduan, dan bagian tengah teks sejajar dengan garis dimensi (vertikal)

:::

**Contoh**
```ts
'right'



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan teks secara vertikal. Umumnya, tidak diperlukan pengaturan.

Disarankan untuk mengaturnya ke 'atas' untuk memastikan bahwa teks ditampilkan sepenuhnya di area grafik yang terlihat

atas: Teks berada di bagian bawah garis panduan, dan tepi atas teks sejajar (vertikal) dengan titik akhir garis dimensi

tengah: Teks berada di tengah garis panduan, dan bagian tengah teks sejajar (vertikal) dengan titik akhir garis dimensi

bawah: Teks berada di bagian atas garis panduan, dan tepi bawah teks sejajar (vertikal) dengan titik akhir garis dimensi

:::

**Contoh**
```ts
'top'



```
### lineVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Garis terlihat

:::

**Contoh**
```ts
true



```
### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna garis

:::

**Contoh**
```ts
'red'



```
### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar garis

:::

**Contoh**
```ts
2



```
### lineStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
gaya garis

:::

**Contoh**
```ts
'solid'



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
latar belakang terlihat

:::

**Contoh**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar batas latar belakang

:::

**Contoh**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
batas latar belakang sudut membulat

:::

**Contoh**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
bantalan latar belakang

:::

**Contoh**
```ts
4




```
## annotationHorizontalLine

**Tipe:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="Deskripsi"}
Garis label numerik (termasuk garis rata-rata, garis nilai maksimum, garis nilai minimum, dll.) ditampilkan dalam arah horizontal. Posisi dan gaya garis label dapat diatur. Jika Anda perlu menggambar garis label yang sesuai dengan nilai seperti garis rata-rata, silakan gunakan konfigurasi ini.

:::


### yValue

**Tipe:** `string | number | (string | number)[] | undefined`

:::note{title="Deskripsi"}
Nilai y tetap, digunakan untuk menandai garis horizontal. Jika sumbu kategori berada pada arah y, Anda dapat memasukkan nilai dimensi. Jika sumbu nilai berada pada arah y, Anda dapat memasukkan nilai tertentu.

:::

### dynamicFilter

**Tipe:** `ValueDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter dinamis (eksekusi kode yang dihasilkan AI)



Hitung secara dinamis nilai garis dimensi melalui kode AI yang dihasilkan oleh AI

Cocok untuk penentuan posisi garis label secara dinamis berdasarkan data, seperti rata-rata, maksimum, kuantil, lini bisnis, dll.



Hanya mendukung lingkungan browser (memerlukan Web Worker)

:::


#### type

**Tipe:** `"value"`

#### description

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Deskripsi kebutuhan pemfilteran pengguna (bahasa alami)

:::

**Contoh**
```ts
"Dapatkan nilai dengan volume penjualan tertinggi sebagai acuan lini label"

"Hitung penjualan rata-rata untuk lini pelabelan"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI menghasilkan kode filter untuk AI



\-hanya dapat menggunakan fungsi utilitas bawaan (diakses melalui _ atau R)

\- Parameter masukan: data (array)

\- Harus mengembalikan satu nilai atau string: number | string

\-Skenario penggunaan: nilai dinamis yang diperlukan untuk memberi label pada garis (garis horizontal, garis vertikal)

\- Penggunaan yang dilarang: eval, Function, operasi asinkron, DOM Function, permintaan jaringan

:::

**Contoh**
```ts
Dapatkan nilai penjualan maksimum sebagai nilai garis label
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Hitung nilai rata-rata untuk garis pelabelan
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Dapatkan kuantil sebagai garis label
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Hitung nilai target berdasarkan kondisi
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Solusi penurunan versi ketika eksekusi kode gagal atau lingkungan tidak mendukungnya

:::

#### result

**Tipe:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Deskripsi"}
Memfilter hasil eksekusi secara dinamis (field runtime)



Tulis dalam tahap persiapan(), hanya baca saat runtime

:::


##### success

**Tipe:** `false | true`

##### data

**Tipe:** `string | number | undefined`

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks beranotasi

:::

**Contoh**
```ts
'Teks anotasi'



```
### textPosition

**Tipe:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Deskripsi"}
posisi teks



Posisi label pada garis dimensi (posisi relatif label terhadap garis).

:::

**Contoh**
```ts
'outsideEnd'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna teks

:::

**Contoh**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font teks

:::

**Contoh**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Berat font teks

:::

**Contoh**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan teks, secara umum, tidak perlu diatur

Disarankan untuk mengaturnya ke 'kanan', yang memastikan bahwa teks berada di sisi kiri garis label

kanan: Teks berada di sebelah kiri garis panduan, dan tepi kanan teks sejajar dengan titik akhir garis dimensi (horizontal)

kiri: Teks berada di sisi kanan garis panduan, dan tepi kiri teks sejajar dengan titik akhir garis dimensi (horizontal)

tengah: Teks berada di tengah garis panduan, dan bagian tengah teks sejajar dengan titik akhir garis dimensi (horizontal)

:::

**Contoh**
```ts
'right'



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan teks secara vertikal. Umumnya, tidak diperlukan pengaturan.

Disarankan untuk mengaturnya ke 'atas' untuk memastikan bahwa teks ditampilkan sepenuhnya di area grafik yang terlihat

atas: Teks berada di bagian bawah garis panduan, dan tepi atas teks sejajar dengan garis label (horizontal)

tengah: Teks berada di tengah garis panduan, dan bagian tengah teks sejajar dengan garis label (horizontal).

bawah: Teks berada di atas garis panduan, dan tepi bawah teks sejajar dengan garis label (horizontal)

:::

**Contoh**
```ts
'top'



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
latar belakang terlihat

:::

**Contoh**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar batas latar belakang



lebar batas latar belakang

:::

**Contoh**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
batas latar belakang sudut membulat

:::

**Contoh**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
bantalan latar belakang

:::

**Contoh**
```ts
4



```
### lineVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Garis terlihat



Garis terlihat

:::

**Contoh**
```ts
true



```
### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna garis

:::

**Contoh**
```ts
'red'



```
### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar garis

:::

**Contoh**
```ts
2



```
### lineStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
gaya garis

:::

**Contoh**
```ts
'solid'



```
### splitLine

**Tipe:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="Deskripsi"}
Apakah akan mengaktifkan fungsi membagi jalur utama menjadi dua bagian

:::


#### positiveColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Bagian yang lebih besar dari nilai yang ditandai, warna utama yang sesuai

:::

#### negativeColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Bagian yang lebih kecil dari nilai yang ditandai, warna utama yang sesuai

:::


## annotationArea

**Tipe:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi area anotasi, berdasarkan data yang dipilih, menentukan area anotasi bagan, termasuk lokasi, gaya, dll. dari area anotasi.

:::


### selector

**Tipe:** `AreaSelector | AreaSelectors | undefined`

:::note{title="Deskripsi"}
Tergantung pada data yang dipilih, pelabelan data dilakukan.

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

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks beranotasi

:::

**Contoh**
```ts
'Teks anotasi'



```
### textPosition

**Tipe:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="Deskripsi"}
posisi teks

:::

**Contoh**
```ts
'top'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna teks

:::

**Contoh**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran font teks

:::

**Contoh**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Berat font teks

:::

**Contoh**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan teks, umumnya diatur ke kanan, teks ditampilkan di tengah area label, memastikan teks ditampilkan di area grafik yang terlihat

Disarankan untuk mengaturnya ke 'tengah', yang memastikan bahwa teks berada di tengah area anotasi.

kanan: Teks berada di sisi kiri area anotasi, dan tepi kanan teks sejajar dengan area anotasi.

kiri: Teks berada di sisi kanan area anotasi, dan tepi kiri teks sejajar dengan area anotasi.

tengah: Teks berada di tengah area anotasi, dan bagian tengah teks sejajar dengan area anotasi.

:::

**Contoh**
```ts
Teks 'tengah' berada di tengah area anotasi



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan vertikal teks. Umumnya, diatur ke atas, teks ditampilkan di bagian bawah area label, memastikan bahwa teks tersebut ditampilkan di area grafik yang terlihat

Disarankan untuk mengaturnya ke 'atas' untuk memastikan bahwa teks ditampilkan sepenuhnya di area grafik yang terlihat

atas: Teks berada di bagian bawah area label, dan tepi atas teks sejajar dengan area label.

tengah: Teks berada di tengah area anotasi, dan bagian tengah teks sejajar dengan area anotasi.

bawah: Teks berada di bagian atas area label, dan tepi bawah teks sejajar dengan area label.

:::

**Contoh**
```ts
Teks 'atas' ada di bagian bawah area anotasi



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
latar belakang terlihat

:::

**Contoh**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
warna latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang



Warna batas latar belakang

:::

**Contoh**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
lebar batas latar belakang

:::

**Contoh**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
batas latar belakang sudut membulat



batas latar belakang sudut membulat

:::

**Contoh**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
bantalan latar belakang

:::

**Contoh**
```ts
4



```
### areaColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna area area label

:::

**Contoh**
```ts
'red'



```
### areaColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Transparansi warna area area label

:::

**Contoh**
```ts
0.5



```
### areaBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas area label

:::

**Contoh**
```ts
'red'



```
### areaBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas area label

:::

**Contoh**
```ts
2



```
### areaBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Label area berbatasan dengan sudut membulat

:::

**Contoh**
```ts
4



```
### areaLineDash

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Gaya garis batas area label

:::

**Contoh**
```ts
[2, 2]



```
### outerPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Margin area label

:::

**Contoh**
```ts
0




```
## dimensionLinkage

**Tipe:** `DimensionLinkage | undefined`

:::note{title="Deskripsi"}
Ketika grafik mengaktifkan fungsi perspektif atau kombinasi metrik, apakah akan mengaktifkan fungsi tautan dimensi

Saat mengarahkan kursor ke nilai dimensi tertentu, data dengan nilai dimensi yang sama di diagram lain akan disorot



Konfigurasi keterkaitan dimensi bagan perspektif

:::


### enable

**Tipe:** `false | true`

:::note{title="Deskripsi"}
Apakah akan mengaktifkan tautan dimensi tabel perspektif

:::

### showTooltip

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan informasi tooltip untuk subbagan yang sesuai dengan semua dimensi

:::

### showLabel

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan menampilkan label yang sesuai dengan crosshair

:::


## locale

**Tipe:** `Locale | undefined`

:::note{title="Deskripsi"}
Konfigurasi bahasa bagan, mendukung bahasa 'zh\-CN' dan 'en\-US'. Selain itu, Anda dapat memanggil metode intl.setLocale('zh\-CN') untuk mengatur bahasa

:::


## boxMaxWidth

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Lebar maksimum plot kotak dapat ditetapkan sebagai nilai piksel absolut atau persentase (misalnya '10%')

:::


## boxGapInGroup

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Jarak antar grup dalam plot kotak yang dikelompokkan dapat diatur ke nilai piksel absolut atau persentase (misalnya '10%').

:::

