# RaceScatter

:::note{title="Deskripsi"}
Diagram sebar dinamis (Race Scatter Chart)

Cocok untuk menampilkan distribusi data dari waktu ke waktu, mengindikasikan nilai bagi kedua metrik dengan lokasi dari titik data

Skenario penggunaan:

\- Analisis karakteristik distribusi data dalam ruang dua dimensi dan demonstrasi dinamika mereka dari waktu ke waktu

\- Tampilkan korelasi antara beberapa variabel dari waktu ke waktu

\- Perhatikan lintasan gerak dari titik data dalam ruang 2D

:::

:::note{title="Note"}
Diagram sebar dinamis:

\- Sumbu X dan Sumbu Y adalah sumbu numerik (data kontinu) yang mendukung pemetaan beberapa metrik

\- Mendukung tampilan dinamis dari perubahan data dengan mengendalikan dimensi waktu melalui pemutar

\- Mendemonstrasikan dinamika data dengan memvisualisasikan perubahan dalam lokasi titik data

:::


## chartType

**Tipe:** `"raceScatter"`

:::note{title="Deskripsi"}
Peta break- up dinamis untuk menampilkan distribusi data dari waktu ke waktu

:::


## dataset

**Tipe:** `Record[]`

:::note{title="Deskripsi"}
Sumber data, cocokTidyDataDataset standar

:::


## dimensions

**Tipe:** `RaceScatterDimension[] | undefined`

:::note{title="Deskripsi"}
Dimensi yang dipakai untuk membedakan antara seri data dan tampilan legenda

:::


### id

**Tipe:** `string`

:::note{title="Deskripsi"}
ID field yang sesuai dengan dimensi

:::

### alias

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Lebar alias

:::

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

**Tipe:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title="Deskripsi"}
Kanal untuk pemetaan dimensi dalam grafik sread- point

\- color: Mendukung pemetaan dimensi ganda ke saluran warna

\- detail: Mendukung pemetaan dimensi ganda ke saluran terrinci

\- tooltip: Mendukung pemetaan dimensi ganda ke saluran petunjuk

\- label: Mendukung pemetaan dimensi ganda untuk melabelinya

\- row: Mendukung pemetaan dimensi ganda ke saluran baris

\- column: Mendukung pemetaan dimensi ganda ke saluran kolom

\- player: Mendukung pemetaan dimensi ganda ke saluran pemutar

:::


## measures

**Tipe:** `ScatterMeasure[] | undefined`

:::note{title="Deskripsi"}
Metrik, yang membutuhkan setidaknya dua peta terpisahSumbu X dan Sumbu Y

:::


### id

**Tipe:** `string`

:::note{title="Deskripsi"}
Metrikid, Aku tidak bisa mengulanginya.

:::

### alias

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Alias metrik, Izinkan pengulangan, Ketika tidak selesai, alias Yaid

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

**Tipe:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title="Deskripsi"}
Kanal untuk pemetaan metrik

\- xAxis: Peta MetrikxSumbu

\- yAxis: Peta MetrikySumbu

\- size: Ukuran peta metrik

\- color: Warna peta metrik

\- label: Label untuk pemetaan metrik

\- tooltip: Petunjuk untuk pemetaan metrik

:::

### parentId

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Dalam konfigurasi metrik datar, Bangun Grup Metrik Pohon, parentIdUntuk grup metrik indukid, Untuk membangun pohon metrik

:::

:::tip{title="Tip"}
Konfigurasi pohon metrik berada dalam dua bentuk, Metode pertama adalah konfigurasi langsung.childrenpohon metrik, Mode dua adalah konfigurasi.parentIdDaftar metrik rata, Kedua metode tidak dapat dikonfigurasi secara bersamaan

:::


## player

**Tipe:** `Player | undefined`

:::note{title="Deskripsi"}
Konfigurasi Pemutar, untuk menentukan dimensi waktu, adalah konfigurasi inti dari peta penyebaran dinamis

Pemutakhiran dinamis data dicapai dengan mengendalikan dimensi waktu oleh pemutar



Konfigurasi Pemutar, Untuk menentukan nama ruas untuk diputar, Ini harus dimensi.

:::

:::warning{title="Peringatan"}
Fitur ini tidak didukungtable, pivotTable, dualAxis, histogram, boxPlot Jenis bagan, Jangan mendukung penggunaan kombinasi metrik pembukaan dan baris yang ditampilkan

:::


### maxCount

**Tipe:** `number | false | undefined`

:::note{title="Deskripsi"}
Jumlah maksimum dari playout, Data di atas jumlah tersebut akan dipotong, Atur sebagaifalse Berarti tak terbatas

:::

### interval

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Interval putar, Satuanms

:::

### autoPlay

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah bermain otomatis

:::

### loop

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah Loop

:::

### position

**Tipe:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title="Deskripsi"}
Lokasi Pemutar

:::

### railColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna trek kemajuan pemutar

:::

### fontFamily

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Fonta Teks Pemutar

:::

### fontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Fonta teks pemutar

:::

### trackColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna proses trek untuk pemutar

:::

### sliderHandleColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna slider proses pemutar

:::

### sliderHandleBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas geser proses pemutar

:::

### startButtonColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna tombol start pemutar

:::

### pauseButtonColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna tombol Pause pemutar

:::

### backwardButtonColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna tombol Belakang pemutar

:::

### forwardButtonColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Tombol Depan Pemutar

:::


## sort

**Tipe:** `Sort | undefined`

:::note{title="Deskripsi"}
Urutkan Konfigurasi, untuk mengontrol pengurutan dimensi



Mengurutkan Konfigurasi Sumbu, Dukung pengurutan sesuai dengan dimensi atau metrik, dan pengurutan ubahan

:::

**Contoh:**
```ts
\- order:'asc'
\- orderBy:'date'
atau
\- customOrder:['2019', '2020', '2021']




```
### order

**Tipe:** `"asc" | "desc" | undefined`

:::note{title="Deskripsi"}
Urutkan Urutan, Nilai opsional sebagai'asc' atau'desc'

:::

**Contoh:**
```ts
order:'asc'



```
### orderBy

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Urutkan ruas ketergantungan, Bisa jadi dimensi.idatau metrikid

:::

**Contoh:**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Urutan Ubahan, Perintah ini akan diterapkan langsung ke kategori Axis

:::


## page

**Tipe:** `Page | undefined`

:::note{title="Deskripsi"}
Page break konfigurasi untuk memproses layar data yang lebih besar

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
Konfigurasi Warna Latar Belakang

:::


## size

**Tipe:** `number | number[] | undefined`

:::note{title="Deskripsi"}
Ukuran metrik sprawl, Untuk mendefinisikan ukuran atau ukuran dari titik data dalam scatterchart

\- Jika ukuran adalah sebuah angka, Seperti sepuluh., Tampilkan kisaran tetap dari 10 titik data

\- Jika ukuran adalah sebuah Grup nomor 2-length, Misalnya:[10, 40], Menandakan bahwa ukuran titik data antara 10 dan 40

\- dansizeRangeHasrat., Prioritas di bawahsize

:::


## sizeRange

**Tipe:** `number | number[] | undefined`

:::note{title="Deskripsi"}
Menyebarkan skala metrik, Untuk menentukan ukuran titik data dalam scatterchart,

\- Jika ukuran adalah sebuah Grup nomor 2-length, Misalnya:[10, 40], Menandakan bahwa ukuran titik data antara 10 dan 40

\- Jika ukuran adalah sebuah angka, Seperti sepuluh., Tampilkan kisaran tetap dari 10 titik data

\- dansizeRangeHasrat., Prioritas di atassize

:::


## color

**Tipe:** `Color | undefined`

:::note{title="Deskripsi"}
Warna konfigurasi untuk membedakan dimensi yang berbeda atau metrik

:::


### colorScheme

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Skema Warna Terpisah, Skema warna untuk mendefinisikan warna dari elemen yang berbeda dalam bagan

:::

**Contoh:**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Tipe:** `string[] | undefined`

:::note{title="Deskripsi"}
Gradiasi Linear Skema Warna, Gradiasi Linear Warna Skema untuk mendefinisikan warna elemen yang berbeda dalam bagan

:::

**Contoh:**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Tipe:** `Record<string, string> | undefined`

:::note{title="Deskripsi"}
Peta Warna, Warna pemetaan untuk memetakan nilai data ke warna tertentu

:::

**Contoh:**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Konfigurasi warna positif dan negatif, Warna yang digunakan untuk mendefinisikan nilai positif dalam grafik

:::

### negativeColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Konfigurasi warna positif dan negatif, Warna untuk mendefinisikan nilai negatif dalam grafik

:::


## label

**Tipe:** `Label | undefined`

:::note{title="Deskripsi"}
Konfigurasi Tab untuk menampilkan label data pada titik data

:::


### enable

**Tipe:** `false | true`

:::note{title="Deskripsi"}
Apakah fungsi tab aktif

:::

### wrap

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah memecahkan label

:::

### showValue

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Menentukan apakah label menunjukkan nilai metrik

Beberapa metrik, Tidak perlu khawatir tentang nilai konflik untuk beberapa metrik., Karena semua metrik pemetaan terkait., Itu semua akan berlalu.`foldMeasures`Proses, Gabung ke sebuah metrik, merupakan titik data, Jadi tidak ada kontradiksi.

Perhatian.: encodingYa.labelPrioritas lebih tinggi, Konfigurasi ini tidak mempengaruhiencodingYa.label

:::

### showValuePercent

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Persentase label yang menampilkan nilai metrik

Beberapa metrik, Tidak perlu khawatir tentang nilai konflik untuk beberapa metrik., Karena semua metrik pemetaan terkait., Itu semua akan berlalu.`foldMeasures`Proses, Gabung ke sebuah metrik, merupakan titik data, Jadi tidak ada kontradiksi.

Perhatian.: encodingYa.labelPrioritas lebih tinggi, Konfigurasi ini tidak mempengaruhiencodingYa.label

:::

### showDimension

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label menampilkan label dimensi

Tampilkan semua label dimensi

Perhatian.: encodingYa.labelPrioritas lebih tinggi, Konfigurasi ini tidak mempengaruhiencodingYa.label

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Menentukan apakah nilai label otomatis diformat, autoFormat Yatrue Waktu, numFormat Atur Tak Valid

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Konfigurasi Pemformatan Tab Numerik, dan `measure` Sedang`format` Gabung, `measure` Sedang`format` Prioritas lebih tinggi.numFormat Prioritas di bawahautoFormat

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

### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Fonta Tab

:::

### labelFontWeight

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Thread Fonta Tag

:::

### labelBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Latar Belakang Tab

:::

### labelStroke

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna perbatasan tab

:::

### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Fonta Tab

:::

### labelColorSmartInvert

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label secara otomatis mengubah warna fonta menurut warna grafik

:::

### labelPosition

**Tipe:** `"inside" | "outside" | undefined`

:::note{title="Deskripsi"}
Posisi Tab

:::

### labelOverlap

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah proteksi label terhadap tumpang tindih diaktifkan

:::

### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
Filter Tab, BakuselectorsHubungan kondisional adalahOr

:::


#### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Ruas Dimensi, dimensions Yakinid

:::

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

**Tipe:** `ChartDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter DinamisAIHasilkan eksekusi kode)



Lewat.AI DihasilkanJavaScript Kode mencapai logika penyaring data kompleks



Persamaan inti:

\- Mendukung kondisi penyaring data yang rumit

\- Gunakan Fungsi Alat Internal untuk Operasi Data

\- Eksekusi aman di lingkungan perambanWeb Worker Sandbox)



Kebutuhan lingkungan: Hanya lingkungan peramban yang didukung.Node.js Lingkungan akan digunakanfallback



Perhatian.: selector dandynamicFilter Kita tidak bisa menggunakannya pada saat yang sama.dynamicFilter Prioritas lebih tinggi



Konfigurasi Filter Dinamis Bagan



Lewat.AI DihasilkanJavaScript Kode mencapai penyaringan tanda bagan (posting, titik, dll)

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
"Kolom yang disorot dengan volume penjualan lebih besar dari 1.000"

"Sorot kutub paling menguntungkan di setiap wilayah."



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI DihasilkanJavaScript Kode Penyaring



\- Hanya fungsi utilitas internal yang dapat digunakan (melalui_ atauR Kunjungan)

\- Parameter masukan: data (array)，Masing-masingitem Organisasi__row_index Fields untuk Nomor Baris

\- Cacah baris dan ruas harus dikembalikan Grup: ```Array<{ __row_index: number, field: string }>```

\- __row_index Ini berarti nomor baris dari entri data asli.field Ekspress kebutuhan untuk daerah profil-tinggi

\- Larangan penggunaan: eval, Function, Langkah, DOM API, Permintaan Jaringan

:::

**Contoh:**
```ts
Penjualan data yang disorot lebih dari 1.000sales Ruas
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data paling menguntungkan per wilayah
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

Tandai multiple kondisi masukan data yang disaring
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


## legend

**Tipe:** `Legend | undefined`

:::note{title="Deskripsi"}
Konfigurasi Legenda

:::


### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah fungsi Legenda diaktifkan atau tidak

:::

**Contoh:**
```ts
enable: true



```
### border

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah membuka Batas Legenda

:::

:::warning{title="Peringatan"}
Hanya mendiskreditkan legenda yang berlaku

:::

**Contoh:**
```ts
border: true



```
### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Fonta Legenda

:::

### pagerIconColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Breaker HalamaniconWarna

:::

### pagerIconDisableColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Breaker HalamaniconWarna Abu-abu

:::

### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Fonta Legenda

:::

**Contoh:**
```ts
labelFontSize: 10



```
### labelFontColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Fonta Legenda

:::

### labelFontWeight

**Tipe:** `string | number | undefined`

:::note{title="Deskripsi"}
Legenda

:::

**Contoh:**
```ts
labelFontWeight: 400



```
### shapeType

**Tipe:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="Deskripsi"}
Bentuk Legenda

:::

:::warning{title="Peringatan"}
Hanya mendiskreditkan legenda yang berlaku

:::

**Contoh:**
```ts
shapeType: 'circle'



```
### position

**Tipe:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Deskripsi"}
Lokasi Legenda

:::

**Contoh:**
```ts
position: 'rightTop'



```
### maxSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ketika sejumlah besar legenda ada, Jumlah maksimum dari kolom atau baris legenda

JikapositionUntuk Arah Horisontal(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSizeKontrol jumlah kolom yang ditampilkan

`JikapositionVertikal(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSizeMengendalikan jumlah baris yang ditampilkan`

:::

:::warning{title="Peringatan"}
Hanya mendiskreditkan legenda yang berlaku

:::

**Contoh:**
```ts
maxSize: 2




```
## tooltip

**Tipe:** `Tooltip | undefined`

:::note{title="Deskripsi"}
Konfirmasi informasi Prompt untuk menampilkan rincian ketika tetikus hovers

:::


### enable

**Tipe:** `false | true`

:::note{title="Deskripsi"}
Konfirmasi apakah fungsi informasi aktif

:::


## brush

**Tipe:** `Brush | undefined`

:::note{title="Deskripsi"}
Konfigurasi Box untuk mendukung interaksi kotak



Konfigurasi Kotak Bagan

:::


### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah membukabrushKotak

:::

### brushType

**Tipe:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="Deskripsi"}
brushTipe



Mendefinisikan bentuk dan orientasi kotak kuas

\- `rect`: kotak persegi panjang, tersediaSumbu X danYKedua arah poros diperiksa secara bersamaan.

\- `polygon`: Pemeriksaan polygon, menggambar poligon apapun dengan mengklik beberapa titik

\- `x`: XKotak orientasi sumbu dipilih, hanyaXIni adalah cross-check.Sumbu Ynya tak terbatas.

\- `y`: YKotak orientasi sumbu dipilih, hanyaYIni adalah cross-check.Sumbu Xnya tak terbatas.

:::

### brushMode

**Tipe:** `"single" | "multiple" | undefined`

:::note{title="Deskripsi"}
Mode kotak, single atau multiple



Tentukan mode sikat

\- `single`: Mode tunggal, hanya satu kotak sikat pada suatu waktu

\- `multiple`: Mode pemilihan berganda dengan kotak kuas ganda

:::

### removeOnClick

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Periksa apakah membuka kotak pada akhir

:::

### inBrushStyle

**Tipe:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
Gaya Data Yang Dipilih dalam Kotak



Menentukan gaya dari titik data yang dipilih

:::


#### opacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Opasitas



Opasitas dari titik data yang dipilih, jangkauan 0\-1

:::

#### stroke

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Tepi

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar marginal

:::

### outOfBrushStyle

**Tipe:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
Gaya Data Tak Dipilih



Gaya definisi untuk titik data tidak dipilih

:::


#### opacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Opasitas



Opasitas dari titik data tidak dipilih, jangkauan 0\-1

:::

#### stroke

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Tepi

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar marginal

:::


## xAxis

**Tipe:** `XLinearAxis | undefined`

:::note{title="Deskripsi"}
XKonfigurasi sumbu, menampilkan nilai metrik pertama untuk sumbu numerik

:::


### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbu nampak

:::

### min

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai minimum dari sumbu, Prioritas di atasnice danzero

:::

### max

**Tipe:** `number | boolean | undefined`

:::note{title="Deskripsi"}
Nilai maksimal dari sumbu, Prioritas di atasnice danzero, Jikatrue, Otomatis menghitung nilai maksimum berdasarkan jangkauan data

:::

### log

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah memakai sumbu logaritmik, Hanya valid untuk sumbu numerik

:::

### logBase

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bawah sumbu logaritma, Hanya valid untuk sumbu numerik

:::

### nice

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah secara otomatis menyesuaikan jarak tic sumbu untuk membuat label tic lebih mudah Baca itu., Ketika dikonfigurasi.min danmax, Entri konfigurasi tak valid, Hanya valid untuk sumbu numerik

:::

### inverse

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan membalikkan sumbu atau tidak, Hanya valid untuk sumbu numerik

:::

### zero

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah memaksa nilai 0 pada sumbu, Ketika dikonfigurasi.min danmax, Entri konfigurasi tak valid, Hanya valid untuk sumbu numerik

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah secara otomatis format label tic dari sumbu numerik, Hanya valid untuk sumbu numerik, autoFormat Yatrue Waktu, numFormat Atur Tak Valid

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik dari sumbu numerik, Hanya valid untuk sumbu numerik, Prioritas di bawahautoFormat

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

### label

**Tipe:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Deskripsi"}
XTab Skala Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label nampak

:::

#### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Tab

:::

#### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Fonta Tab

:::

#### labelFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Thread Fonta Tag

:::

#### labelAngle

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut rotasi tab

:::

### line

**Tipe:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
Sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbu terlihat atau tidak

:::

#### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Sumbu

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar poros

:::

### tick

**Tipe:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Deskripsi"}
XSkala Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah skala terlihat

:::

#### tickInside

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah skala berada di dalam

:::

#### tickColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Skala

:::

#### tickSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Skala

:::

### title

**Tipe:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Deskripsi"}
XJudul Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah judul nampak

:::

#### titleText

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Teks judul, Konfigurasi Kolom Ikuti Baku

:::

#### titleColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Judul

:::

#### titleFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Fonta Judul

:::

#### titleFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Fonta judul tebal

:::

### grid

**Tipe:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Deskripsi"}
XGaris Kisi Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

#### gridColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Garis Grid

:::

#### gridWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar kisi

:::

#### gridLineDash

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Jenis Garis Grid

:::

### animation

**Tipe:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Deskripsi"}
YKonfigurasi Sumbang Animasi

:::


#### duration

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Durasi animasi

:::

#### easing

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Animasieasing Fungsi

:::


## yAxis

**Tipe:** `YLinearAxis | undefined`

:::note{title="Deskripsi"}
YKonfigurasi sumbu, menampilkan nilai metrik kedua untuk sumbu numerik

:::


### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbu nampak

:::

### min

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Nilai minimum dari sumbu, Prioritas di atasnice danzero

:::

### max

**Tipe:** `number | boolean | undefined`

:::note{title="Deskripsi"}
Nilai maksimal dari sumbu, Prioritas di atasnice danzero, Jikatrue, Otomatis menghitung nilai maksimum berdasarkan jangkauan data

:::

### log

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah memakai sumbu logaritmik, Hanya valid untuk sumbu numerik

:::

### logBase

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bawah sumbu logaritma, Hanya valid untuk sumbu numerik

:::

### nice

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah secara otomatis menyesuaikan jarak tic sumbu untuk membuat label tic lebih mudah Baca itu., Ketika dikonfigurasi.min danmax, Entri konfigurasi tak valid, Hanya valid untuk sumbu numerik

:::

### inverse

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah akan membalikkan sumbu atau tidak, Hanya valid untuk sumbu numerik

:::

### zero

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah memaksa nilai 0 pada sumbu, Ketika dikonfigurasi.min danmax, Entri konfigurasi tak valid, Hanya valid untuk sumbu numerik

:::

### autoFormat

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah secara otomatis format label tic dari sumbu numerik, Hanya valid untuk sumbu numerik, autoFormat Yatrue Waktu, numFormat Atur Tak Valid

:::

### numFormat

**Tipe:** `NumFormat | undefined`

:::note{title="Deskripsi"}
Pemformatan numerik dari sumbu numerik, Hanya valid untuk sumbu numerik, Prioritas di bawahautoFormat

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

### label

**Tipe:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Deskripsi"}
XTab Skala Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah label nampak

:::

#### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Tab

:::

#### labelFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Fonta Tab

:::

#### labelFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Thread Fonta Tag

:::

#### labelAngle

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut rotasi tab

:::

### line

**Tipe:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Deskripsi"}
Sumbu X

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah sumbu terlihat atau tidak

:::

#### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Sumbu

:::

#### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar poros

:::

### tick

**Tipe:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Deskripsi"}
XSkala Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah skala terlihat

:::

#### tickInside

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah skala berada di dalam

:::

#### tickColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Skala

:::

#### tickSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Skala

:::

### title

**Tipe:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Deskripsi"}
XJudul Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah judul nampak

:::

#### titleText

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Teks judul, Konfigurasi Kolom Ikuti Baku

:::

#### titleColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Judul

:::

#### titleFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Fonta Judul

:::

#### titleFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Fonta judul tebal

:::

### grid

**Tipe:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Deskripsi"}
XGaris Kisi Sumbu

:::


#### visible

**Tipe:** `boolean | undefined`

#### gridColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Garis Grid

:::

#### gridWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar kisi

:::

#### gridLineDash

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Jenis Garis Grid

:::

### animation

**Tipe:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Deskripsi"}
YKonfigurasi Sumbang Animasi

:::


#### duration

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Durasi animasi

:::

#### easing

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Animasieasing Fungsi

:::


## crosshairLine

**Tipe:** `CrosshairLine | undefined`

:::note{title="Deskripsi"}
Konfigurasi Crossline untuk menampilkan lokasi data yang tepat



Cross- Star Konfigurasi adalah tipe konfigurasi yang digunakan untuk menampilkan cross- Starlines (baris ujung) dalam grafik

:::


### visible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah baris bintang-silang ditampilkan

:::

### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Bintang Cross-

:::

### labelColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Cross- Star Tag

:::

### labelVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah menampilkan tag bintang-silang

:::

### labelBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar bintang silang

:::


## theme

**Tipe:** `Theme | undefined`

:::note{title="Deskripsi"}
Konfigurasi Tema



Tema



Internallight、dark Dua tema., Tema baru dapat diadopsi.registerThemeTema kustom.

:::


### length

**Tipe:** `number`

### brand

**Tipe:** `brand`


## pointStyle

**Tipe:** `PointStyle | PointStyle[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi gaya titik data, yang mendukung konfigurasi gaya global atau kondisi untuk gaya tunggal atau array

:::


### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
Pemilih Data



Aturselector, Menyediakan Nilaiselector, Data localeselector, Dimensi kondisionalselector, Metrik kondisionalselector Empat kategori kemampuan pencocokan data

Jika tidak dikonfigurasiselector, .

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




```
#### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Ruas Dimensi, dimensions Yakinid

:::

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

**Tipe:** `ChartDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter DinamisAIHasilkan eksekusi kode)



Lewat.AI DihasilkanJavaScript Kode mencapai logika penyaring data kompleks

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan selector statis.



Persamaan inti:

\- Mendukung kondisi penyaring data yang rumit

\- Gunakan Fungsi Alat Internal untuk Operasi Data

\- Eksekusi aman di lingkungan perambanWeb Worker Sandbox)



Kebutuhan lingkungan: Hanya lingkungan peramban yang didukung.Node.js Lingkungan akan digunakanfallback



Perhatian.: selector dandynamicFilter Kita tidak bisa menggunakannya pada saat yang sama.dynamicFilter Prioritas lebih tinggi



Konfigurasi Filter Dinamis Bagan



Lewat.AI DihasilkanJavaScript Kode mencapai penyaringan tanda bagan (posting, titik, dll)

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
"Kolom yang disorot dengan volume penjualan lebih besar dari 1.000"

"Sorot kutub paling menguntungkan di setiap wilayah."



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI DihasilkanJavaScript Kode Penyaring



\- Hanya fungsi utilitas internal yang dapat digunakan (melalui_ atauR Kunjungan)

\- Parameter masukan: data (array)，Masing-masingitem Organisasi__row_index Fields untuk Nomor Baris

\- Cacah baris dan ruas harus dikembalikan Grup: ```Array<{ __row_index: number, field: string }>```

\- __row_index Ini berarti nomor baris dari entri data asli.field Ekspress kebutuhan untuk daerah profil-tinggi

\- Larangan penggunaan: eval, Function, Langkah, DOM API, Permintaan Jaringan

:::

**Contoh:**
```ts
Penjualan data yang disorot lebih dari 1.000sales Ruas
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data paling menguntungkan per wilayah
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

Tandai multiple kondisi masukan data yang disaring
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

### pointVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Titik Terlihat

:::

### pointSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran Titik



Ukuran Titik

:::

### pointColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Bitmap



Warna Bitmap

:::

### pointColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Pointchart Warna Transparansi



Pointchart Warna Transparansi

:::

### pointBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Batas Pixmap



Warna Batas Pixmap

:::

### pointBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar Batas Pixel



Lebar Batas Pixel

:::

### pointBorderStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
Gaya Batas Pixmap



Gaya Batas Pixmap

:::

**Contoh:**
```ts
solid

dashed

dotted




```
## annotationPoint

**Tipe:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi penunjuk untuk menambahkan tag ke titik data tertentu

:::


### selector

**Tipe:** `Selector | Selectors | undefined`

:::note{title="Deskripsi"}
Pemilih Penunjuk, Memilih titik data.

:::


#### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Ruas Dimensi, dimensions Yakinid

:::

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

### measureId

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Metrik dimana titik ditugaskanid。Di Dho.measure Di bawah TKP, denganselector Grup adalah satu-satunya lokasi untuk metrik target.

:::

### dynamicFilter

**Tipe:** `ChartDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter DinamisAIHasilkan eksekusi kode)



Lewat.AI DihasilkanJavaScript Kode mencapai logika penyaring data kompleks

Cocok untuk Top N, analisis statistik, kondisi kompleks, dan skenario lain yang sulit diungkapkan dengan selector statis.



Persamaan inti:

\- Mendukung kondisi penyaring data yang rumit

\- Gunakan Fungsi Alat Internal untuk Operasi Data

\- Eksekusi aman di lingkungan perambanWeb Worker Sandbox)



Kebutuhan lingkungan: Hanya lingkungan peramban yang didukung.Node.js Lingkungan akan digunakanfallback



Perhatian.: selector dandynamicFilter Kita tidak bisa menggunakannya pada saat yang sama.dynamicFilter Prioritas lebih tinggi



Konfigurasi Filter Dinamis Bagan



Lewat.AI DihasilkanJavaScript Kode mencapai penyaringan tanda bagan (posting, titik, dll)

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
"Kolom yang disorot dengan volume penjualan lebih besar dari 1.000"

"Sorot kutub paling menguntungkan di setiap wilayah."



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI DihasilkanJavaScript Kode Penyaring



\- Hanya fungsi utilitas internal yang dapat digunakan (melalui_ atauR Kunjungan)

\- Parameter masukan: data (array)，Masing-masingitem Organisasi__row_index Fields untuk Nomor Baris

\- Cacah baris dan ruas harus dikembalikan Grup: ```Array<{ __row_index: number, field: string }>```

\- __row_index Ini berarti nomor baris dari entri data asli.field Ekspress kebutuhan untuk daerah profil-tinggi

\- Larangan penggunaan: eval, Function, Langkah, DOM API, Permintaan Jaringan

:::

**Contoh:**
```ts
Penjualan data yang disorot lebih dari 1.000sales Ruas
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Sorot item data paling menguntungkan per wilayah
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

Tandai multiple kondisi masukan data yang disaring
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

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks Ditugaskan

:::

**Contoh:**
```ts
'Teks Komentar'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Teks

:::

**Contoh:**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fonta teks

:::

**Contoh:**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bobot fonta teks

:::

**Contoh:**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan Teks, Umum, Atur Sebagairight, Teks yang ditampilkan di kiri dari titik, Pastikan area yang terlihat dalam grafik

Disarankan sebagai'right', Ini memastikan bahwa teks adalah pada sisi kiri titik.

right: Teks di kiri dari penunjuk, Titik rata di tepi kanan teks

left: Teks di sebelah kanan dari penunjuk, Titik rata di sisi kiri teks

center: Teks di tengah titik, Titik Rata Tengah Teks

:::

**Contoh:**
```ts
'right' Teks di kiri dari penunjuk



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan Vertikal Teks, Umum, Atur Sebagaitop, Teks yang ditampilkan di bawah titik, Pastikan area yang terlihat dalam grafik

Disarankan sebagai'top', Ini menjamin bahwa teks sepenuhnya ditampilkan dalam daerah yang terlihat dari bagan

top: Teks di bagian bawah titik, Rata titik di ujung atas teks

middle: Teks di tengah titik, Titik Rata Tengah Teks

bottom: Teks di Puncak Titik, Titik rata di ujung bawah teks

:::

**Contoh:**
```ts
'top' Teks di bagian bawah titik



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Latar belakang terlihat

:::

**Contoh:**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas latar belakang

:::

**Contoh:**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut perbatasan latar belakang

:::

**Contoh:**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Marjin Latar Belakang

:::

**Contoh:**
```ts
4



```
### offsetY

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Intinya adalah di sini.YJarak piksel offset dalam arah, Ketika penunjuk berada di atas bagan(Ketika nilainya lebih besar)Waktu, Saran untuk diatur ke positif, Titik di bawah bagan(Ketika nilai lebih kecil)Waktu, Saran pengaturan nilai negatif.

Nilai negatif ofset up secara keseluruhan, Sebagai contoh, diatur ke\-10, Komponen penunjuk seluruh termasuk teks, latar belakang teks, Pindahkan 10 piksel bersamaan

Nilai positif ofset turun secara keseluruhan, Set ke 10, misalnya, Komponen penunjuk seluruh termasuk teks, latar belakang teks, Pindahkan 10 piksel ke bawah bersama

:::

**Contoh:**
```ts
offsetY: 5, Point secara keseluruhan ofset bawah 5 piksel



```
### offsetX

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Intinya adalah di sini.XJarak piksel offset dalam arah, Ketika penunjuk tersisa dari bagan(Katalog sumbu awal titik)Waktu, Saran untuk diatur ke positif, Arahkan ke kanan bagan(Sumbu Endpoint)Waktu, Saran pengaturan nilai negatif.

Nilai negatif bergerak ke kiri secara keseluruhan, Sebagai contoh, diatur ke\-10, Komponen penunjuk seluruh termasuk teks, latar belakang teks, Pindahkan 10 piksel ke kiri bersamaan

Nilai positif bergeser ke kanan secara keseluruhan, Set ke 10, misalnya, Komponen penunjuk seluruh termasuk teks, latar belakang teks, Pindahkan 10 piksel ke kanan bersama-sama

:::

**Contoh:**
```ts
offsetX: 5, Arahkan secara keseluruhan ke lima kanan. Su




```
## annotationVerticalLine

**Tipe:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="Deskripsi"}
Baris label numerik, baris label vertikal, label spesifikXNilai Sumbu

:::


### xValue

**Tipe:** `string | number | (string | number)[] | undefined`

:::note{title="Deskripsi"}
TetapxNilai, Untuk melabeli baris vertikal, Sumbu padaxArah, Bisa memasuki sebuah dimensi, sumbu numerik dixArah, Anda dapat memasukkan nilai tertentu.

:::

### dynamicFilter

**Tipe:** `ValueDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter DinamisAIHasilkan eksekusi kode)



Lewat.AI DihasilkanJavaScript Kode secara dinamis menghitung nilai label

Applies untuk kebutuhan untuk menentukan posisi baris dalam hubungan dengan dinamika data, misalnya, rata-rata, maksimum, fraksional, garis bisnis, dll.



Hanya mendukung lingkungan peramban (diperlukan)Web Worker）

:::


#### type

**Tipe:** `"value"`

#### description

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Filter pengguna perlu deskripsi (bahasa alami)

:::

**Contoh:**
```ts
"Dapatkan nilai penjualan tertinggi sebagai referensi untuk label"

"Menghitung rata-rata penjualan untuk baris label"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI DihasilkanJavaScript Kode Penyaring



\- Hanya fungsi utilitas internal yang dapat digunakan (melalui_ atauR Kunjungan)

\- Parameter masukan: data (array)

\- Anda harus mengembalikan satu nilai atau string: number | string

\- Aplikasi dari adegan: nilai dinamis diperlukan untuk baris label (horisontal, vertikal)

\- Larangan penggunaan: eval, Function, Langkah, DOM API, Permintaan Jaringan

:::

**Contoh:**
```ts
Dapatkan nilai penjualan maksimum sebagai nilai baris
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Hitung rata-rata untuk baris label
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Ambil bit sebagai kursor
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Hitung nilai target dengan kondisi
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
Kode mengeksekusi skema penjatuhan ketika gagal atau lingkungan tidak mendukungnya

:::

#### result

**Tipe:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Deskripsi"}
Hasil eksekusi penyaring dinamis (ruas jangka-periode)



`prepare() Menulis panggung, baca-saja saat berjalan`

:::


##### success

**Tipe:** `false | true`

##### data

**Tipe:** `string | number | undefined`

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks Ditugaskan

:::

**Contoh:**
```ts
'Teks Komentar'



```
### textPosition

**Tipe:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Deskripsi"}
Posisi Teks, Posisi label dari label (posisi relatif dari label relatif terhadap baris).

:::

**Contoh:**
```ts
'outsideEnd'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Teks

:::

**Contoh:**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fonta teks

:::

**Contoh:**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bobot fonta teks

:::

**Contoh:**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan Teks, Umum, Tak Ada Pengaturan

Disarankan sebagai'right', Ini memastikan bahwa teks adalah pada sisi kiri dari baris label.

right: Teks di kiri dari baris referensi, Aligning sisi kanan teks(Vertikal)Rata

left: Teks di sebelah kanan dari baris referensi, Rata ujung kiri teks(Vertikal)Rata

center: Teks di tengah dari baris referensi, Perataan Tengah Teks(Vertikal)Rata

:::

**Contoh:**
```ts
'right'



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan Vertikal Teks, Umum, Tak Ada Pengaturan

Disarankan sebagai'top', Ini menjamin bahwa teks sepenuhnya ditampilkan dalam daerah yang terlihat dari bagan

top: Teks di bagian bawah dari baris referensi, Mengatur tepi atas teks(Vertikal)Endpoint dari baris yang diindikasikan

middle: Teks di tengah dari baris referensi, Perataan Tengah Teks(Vertikal)Endpoint dari baris yang diindikasikan

bottom: Teks di bagian atas dari baris referensi, Mengatur tepi bawah teks(Vertikal)Endpoint dari baris yang diindikasikan

:::

**Contoh:**
```ts
'top'



```
### lineVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Baris Terlihat

:::

**Contoh:**
```ts
true



```
### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Garis

:::

**Contoh:**
```ts
'red'



```
### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar garis

:::

**Contoh:**
```ts
2



```
### lineStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
Baris Styles

:::

**Contoh:**
```ts
'solid'



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Latar belakang terlihat

:::

**Contoh:**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas latar belakang

:::

**Contoh:**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut perbatasan latar belakang

:::

**Contoh:**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Marjin Latar Belakang

:::

**Contoh:**
```ts
4




```
## annotationHorizontalLine

**Tipe:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="Deskripsi"}
Baris label numerik, baris label horisontal, label spesifikYNilai Sumbu

:::


### yValue

**Tipe:** `string | number | (string | number)[] | undefined`

:::note{title="Deskripsi"}
TetapyNilai, Untuk menunjukkan garis horisontal, Sumbu padayArah, Bisa memasuki sebuah dimensi, sumbu numerik diyArah, Anda dapat memasukkan nilai tertentu.

:::

### dynamicFilter

**Tipe:** `ValueDynamicFilter | undefined`

:::note{title="Deskripsi"}
Filter DinamisAIHasilkan eksekusi kode)



Lewat.AI DihasilkanJavaScript Kode secara dinamis menghitung nilai label

Applies untuk kebutuhan untuk menentukan posisi baris dalam hubungan dengan dinamika data, misalnya, rata-rata, maksimum, fraksional, garis bisnis, dll.



Hanya mendukung lingkungan peramban (diperlukan)Web Worker）

:::


#### type

**Tipe:** `"value"`

#### description

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Filter pengguna perlu deskripsi (bahasa alami)

:::

**Contoh:**
```ts
"Dapatkan nilai penjualan tertinggi sebagai referensi untuk label"

"Menghitung rata-rata penjualan untuk baris label"



```
#### code

**Tipe:** `string`

:::note{title="Deskripsi"}
AI DihasilkanJavaScript Kode Penyaring



\- Hanya fungsi utilitas internal yang dapat digunakan (melalui_ atauR Kunjungan)

\- Parameter masukan: data (array)

\- Anda harus mengembalikan satu nilai atau string: number | string

\- Aplikasi dari adegan: nilai dinamis diperlukan untuk baris label (horisontal, vertikal)

\- Larangan penggunaan: eval, Function, Langkah, DOM API, Permintaan Jaringan

:::

**Contoh:**
```ts
Dapatkan nilai penjualan maksimum sebagai nilai baris
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Hitung rata-rata untuk baris label
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Ambil bit sebagai kursor
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Hitung nilai target dengan kondisi
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
Kode mengeksekusi skema penjatuhan ketika gagal atau lingkungan tidak mendukungnya

:::

#### result

**Tipe:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Deskripsi"}
Hasil eksekusi penyaring dinamis (ruas jangka-periode)



`prepare() Menulis panggung, baca-saja saat berjalan`

:::


##### success

**Tipe:** `false | true`

##### data

**Tipe:** `string | number | undefined`

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks Ditugaskan

:::

**Contoh:**
```ts
'Teks Komentar'



```
### textPosition

**Tipe:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Deskripsi"}
Posisi Teks



Posisi label dari label (posisi relatif dari label relatif terhadap baris).

:::

**Contoh:**
```ts
'outsideEnd'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Teks

:::

**Contoh:**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fonta teks

:::

**Contoh:**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bobot fonta teks

:::

**Contoh:**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan Teks, Umum, Tak Ada Pengaturan

Disarankan sebagai'right', Ini memastikan bahwa teks adalah pada sisi kiri dari baris label.

right: Teks di kiri dari baris referensi, Aligning sisi kanan teks(Horisontal)Endpoint dari baris yang diindikasikan

left: Teks di sebelah kanan dari baris referensi, Rata ujung kiri teks(Horisontal)Endpoint dari baris yang diindikasikan

center: Teks di tengah dari baris referensi, Perataan Tengah Teks(Horisontal)Endpoint dari baris yang diindikasikan

:::

**Contoh:**
```ts
'right'



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan Vertikal Teks, Umum, Tak Ada Pengaturan

Disarankan sebagai'top', Ini menjamin bahwa teks sepenuhnya ditampilkan dalam daerah yang terlihat dari bagan

top: Teks di bagian bawah dari baris referensi, Mengatur tepi atas teks(Horisontal)Rata

middle: Teks di tengah dari baris referensi, Perataan Tengah Teks(Horisontal)Rata

bottom: Teks di bagian atas dari baris referensi, Mengatur tepi bawah teks(Horisontal)Rata

:::

**Contoh:**
```ts
'top'



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Latar belakang terlihat

:::

**Contoh:**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas latar belakang



Lebar batas latar belakang

:::

**Contoh:**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut perbatasan latar belakang

:::

**Contoh:**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Marjin Latar Belakang

:::

**Contoh:**
```ts
4



```
### lineVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Baris Terlihat



Baris Terlihat

:::

**Contoh:**
```ts
true



```
### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Garis

:::

**Contoh:**
```ts
'red'



```
### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar garis

:::

**Contoh:**
```ts
2



```
### lineStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
Baris Styles

:::

**Contoh:**
```ts
'solid'



```
### splitLine

**Tipe:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="Deskripsi"}
Apakah membuka fungsi untuk memisahkan baris utama menjadi dua segmen

:::


#### positiveColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Bagian yang lebih besar dari nilai yang ditunjukkan, warna utama

:::

#### negativeColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Bagian kurang dari nilai yang ditunjukkan, warna utama yang sesuai

:::


## annotationArea

**Tipe:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="Deskripsi"}
Tandai konfigurasi area untuk menyoroti jangkauan data spesifik

:::


### selector

**Tipe:** `AreaSelector | AreaSelectors | undefined`

:::note{title="Deskripsi"}
Reliance pada data terpilih, Buat data tag.

:::


#### field

**Tipe:** `string`

:::note{title="Deskripsi"}
Ruas Dimensi, dimensions Yakinid

:::

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

### text

**Tipe:** `string | string[] | undefined`

:::note{title="Deskripsi"}
Teks Ditugaskan

:::

**Contoh:**
```ts
'Teks Komentar'



```
### textPosition

**Tipe:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="Deskripsi"}
Posisi Teks

:::

**Contoh:**
```ts
'top'



```
### textColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Teks

:::

**Contoh:**
```ts
'red'



```
### textFontSize

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Ukuran fonta teks

:::

**Contoh:**
```ts
12



```
### textFontWeight

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Bobot fonta teks

:::

**Contoh:**
```ts
400



```
### textAlign

**Tipe:** `"left" | "right" | "center" | undefined`

:::note{title="Deskripsi"}
Perataan Teks, Umum, Atur Sebagairight, Teks yang ditampilkan di tengah area label, Pastikan area yang terlihat dalam grafik

Disarankan sebagai'center', Ini memastikan bahwa teks berada di tengah-tengah daerah yang ditunjukkan.

right: Teks di kiri dari area yang ditunjukkan, Area rata di tepi kanan teks

left: Teks di sebelah kanan dari area yang ditunjukkan, Align ujung kiri teks ke daerah yang diindikasikan

center: Teks di tengah area yang ditunjukkan, Area Perataan Tengah Teks

:::

**Contoh:**
```ts
'center' Teks di tengah daerah yang diindikasikan



```
### textBaseline

**Tipe:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Deskripsi"}
Perataan Vertikal Teks, Umum, Atur Sebagaitop, Teks yang ditampilkan di bagian bawah area yang ditunjukkan, Pastikan area yang terlihat dalam grafik

Disarankan sebagai'top', Ini menjamin bahwa teks sepenuhnya ditampilkan dalam daerah yang terlihat dari bagan

top: Teks di bagian bawah area yang ditunjukkan, Align ujung atas teks ke daerah yang diindikasikan

middle: Teks di tengah area yang ditunjukkan, Area Perataan Tengah Teks

bottom: Teks di bagian atas area yang ditunjukkan, Sejajarkan area di ujung bawah teks

:::

**Contoh:**
```ts
'top' Teks di bagian bawah area yang ditunjukkan



```
### textBackgroundVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Latar belakang terlihat

:::

**Contoh:**
```ts
true



```
### textBackgroundColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna batas latar belakang



Warna batas latar belakang

:::

**Contoh:**
```ts
'red'



```
### textBackgroundBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas latar belakang

:::

**Contoh:**
```ts
2



```
### textBackgroundBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Sudut perbatasan latar belakang



Sudut perbatasan latar belakang

:::

**Contoh:**
```ts
4



```
### textBackgroundPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Marjin Latar Belakang

:::

**Contoh:**
```ts
4



```
### areaColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Regional Mark

:::

**Contoh:**
```ts
'red'



```
### areaColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Warna daerah ini adalah derajat transparan

:::

**Contoh:**
```ts
0.5



```
### areaBorderColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Batas Daerah

:::

**Contoh:**
```ts
'red'



```
### areaBorderWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar batas daerah

:::

**Contoh:**
```ts
2



```
### areaBorderRadius

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Arahkan sudut perbatasan wilayah

:::

**Contoh:**
```ts
4



```
### areaLineDash

**Tipe:** `number[] | undefined`

:::note{title="Deskripsi"}
Tipe baris untuk menandai batas wilayah

:::

**Contoh:**
```ts
[2, 2]



```
### outerPadding

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Batas wilayah garis luar

:::

**Contoh:**
```ts
0




```
## locale

**Tipe:** `Locale | undefined`

:::note{title="Deskripsi"}
Konfigurasi Bahasa

:::

