# Radar

:::info{title="Rekomendasi"}
\- Konfigurasi Field Direkomendasikan: `1`Metrik, `1`Dimensi

\- Mendukung Pengembalian Data: Setidaknya.`1`Metrik, `0`Dimensi

:::

:::info{title="Peta Pengkodean"}
Grafik Radar mendukung kanal visual berikut:

`angle`  : Kanal Sudut, Mendukung `beberapa dimensi`, Peta dengan dimensi ke sumbu sudut

`radius` : Kanal Radius, Mendukung `beberapa metrik`, Peta ke radius berdasarkan nilai metrik

`color`  : Kanal Warna, Mendukung `beberapa dimensi`atau `satu metrik`, Warna dimensi untuk membedakan antara seri data, Warna metrik peta linear untuk warna grafis

`tooltip`: Kanal Tip, Mendukung `beberapa dimensi`dan `beberapa metrik`, Tampilkan ketika tetikus melayang di atas titik data

`label`  : Kanal Tab, Mendukung `beberapa dimensi`dan `beberapa metrik`, Tampilkan label data pada titik data

:::

:::note{title="Deskripsi"}
Peta Radar, untuk analisis komparatif dari data multidimensi, menampilkan distribusi numerik dimensi melalui koordinat multi- sumbu

Terapkan adegan:

\- Kinerja gabungan dari data multidimensi

\- Penilaian beberapa objek pada metrik ganda

\- Karakter multi- dimensi dari data tidak tergabung

:::

:::warning{title="Peringatan"}
Kebutuhan data:

\- Setidaknya 1 ruas numerik (pengukuran)

\- Dimensi pertama adalah sumbu dari dimensi peta radar, dan dimensi lain dibandingkan sebagai seri.

\- Mendukung bagi metrik ganda yang akan ditampilkan sebagai seri terpisah

Fungsi terbuka baku:

\- Baku untuk membuka legenda, koordinat radar, data tag, petunjuk, numerik indents Fire!

:::


## chartType

**Tipe:** `"radar"`

:::note{title="Deskripsi"}
Bagan Radar



peta Radar menunjukkan perbandingan data multi- dimensi melalui koordinat multiple- sumbu

:::

**Contoh:**
```ts
'radar'




```
## dataset

**Tipe:** `Record[]`

:::note{title="Deskripsi"}
Dataset



CocokTidyDataStandardisasi dan dikonsolidasikan data set untuk mendefinisikan sumber data dan struktur untuk grafik, Set data yang dimasukkan oleh pengguna tidak memerlukan proses apapun, VSeedDengan fungsi re- rekayasa data yang kuat, Anda akan menciptakan data Anda sendiri., Data peta mawar akhirnya akan diubah menjadi dua dimensi., 1Metrik

:::

**Contoh:**
```ts
[{month:'1Bulan', value:100}, {month:'2Bulan', value:150}, {month:'3Bulan', value:120}]




```
## dimensions

**Tipe:** `RadarDimension[] | undefined`

:::note{title="Deskripsi"}
Dimensi



Dimensi pertama dari peta radar dipetakan ke sudut. Sumbu, Nama dimensi dan metrik yang tersisa(Ketika metrik ganda ada)Gabung, Sebagai contoh.

:::

**Contoh:**
```ts
[{id: 'category', alias: 'Kategori'}]




```
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

**Tipe:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title="Deskripsi"}
Saluran untuk pemetaan dimensi

\- angle: Mendukung pemetaan dimensi ganda ke saluran sudut

\- color: Mendukung pemetaan dimensi ganda ke saluran warna

\- detail: Mendukung pemetaan dimensi ganda ke saluran terrinci

\- tooltip: Mendukung pemetaan dimensi ganda ke saluran petunjuk

\- label: Mendukung pemetaan dimensi ganda untuk melabelinya

\- row: Mendukung pemetaan dimensi ganda ke saluran baris

\- column: Mendukung pemetaan dimensi ganda ke saluran kolom

:::


## measures

**Tipe:** `RadarMeasure[] | undefined`

:::note{title="Deskripsi"}
Metrik



Metrik peta radar otomatis bergabung menjadi satu., Peta ke sumbu Radius, Ketika metrik ganda ada, Nama metrik akan digabung dengan seluruh dimensi, Sebagai contoh.

:::

**Contoh:**
```ts
[{id: 'value', alias: 'Nilai'}]




```
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

**Tipe:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title="Deskripsi"}
Kanal untuk pemetaan metrik

\- radius: Radius dari pemetaan metrik

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
Warna latar belakang bagi grafik



Warna latar belakang dapat warna string, Misalnya:'red', 'blue', Atau mungkin.hex, rgbataurgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Tipe:** `Color | undefined`

:::note{title="Deskripsi"}
Warna



Konfigurasi Warna, Skema warna untuk mendefinisikan bagan, Termasuk Daftar Warna, Peta Warna, Gradien warna.

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
Label



Konfigurasi Tab, Label data yang dipakai untuk mendefinisikan grafik, Termasuk lokasi dari tag data, Format, Styles dll.

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
Legenda



Konfigurasi Legenda, Legenda yang digunakan untuk mendefinisikan grafik, Termasuk lokasi legenda, Format, Styles dll.

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
Informasi Petunjuk



Konfigurasi Tip Info, Tips untuk mendefinisikan bagan, Termasuk lokasi petunjuk, Format, Styles dll.

:::


### enable

**Tipe:** `false | true`

:::note{title="Deskripsi"}
Konfirmasi apakah fungsi informasi aktif

:::


## brush

**Tipe:** `Brush | undefined`

:::note{title="Deskripsi"}
Kotak



Konfigurasi Box untuk dibuka/Tutupbrush Kapabilitas Kotak



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


## animation

**Tipe:** `RadarAnimation | undefined`

:::note{title="Deskripsi"}
Konfigurasi Animasi



Konfigurasi animasi dari grafik, efek opsional pengikatan oleh tipe bagan

:::


### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Aktifkan animasi radar

:::

### params

**Tipe:** `RadarAnimationParams | undefined`

:::note{title="Deskripsi"}
Parameter Animasi Radar

:::


#### appear

**Tipe:** `RadarAppearAnimation | undefined`

:::note{title="Deskripsi"}
Konfigurasi animasi dari grafik radar

:::


##### effects

**Tipe:** `("radial" | "scale")[] | undefined`

:::note{title="Deskripsi"}
Efek entri bagan Radar, arah dukungan dan animasi zoom

:::

##### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah mengaktifkan fase animasi saat ini

:::

##### ease

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Menganimasi fungsi gerak lambat

:::

##### duration

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Durasi animasi dalam milidetik

:::

##### color

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna sorot animasi atau suasana

:::

#### update

**Tipe:** `RadarUpdateAnimation | undefined`

:::note{title="Deskripsi"}
Konfigurasi Bagan Radar Perbarui Animasi

:::


##### effects

**Tipe:** `"growth"[] | undefined`

:::note{title="Deskripsi"}
Efek update bagan Radar untuk mendukung animasi pertumbuhan

:::

##### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah mengaktifkan fase animasi saat ini

:::

##### ease

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Menganimasi fungsi gerak lambat

:::

##### duration

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Durasi animasi dalam milidetik

:::

##### color

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna sorot animasi atau suasana

:::

#### loop

**Tipe:** `RadarAnimationLoop | undefined`

:::note{title="Deskripsi"}
Konfigurasi Animasi Siklus Radar

:::


##### enable

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah mengaktifkan animasi loop

:::

##### interval

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Interval animasi siklus dalam milidetik

:::

##### atmosphere

**Tipe:** `PointAtmosphereConfig | undefined`

:::note{title="Deskripsi"}
Konfigurasi Radar Chart Animation

:::


###### ease

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Menganimasi fungsi gerak lambat akustik

:::

###### color

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Animasi

:::

###### effect

**Tipe:** `PointAtmosphereEffect | undefined`

:::note{title="Deskripsi"}
Efek antropogenik, dukungan untuk thorium, invisibliness dan pernapasan.

:::


## theme

**Tipe:** `Theme | undefined`

:::note{title="Deskripsi"}
Tema bagan, Tema adalah konfigurasi fungsional prioritas rendah, Konfigurasi umum yang mencakup semua tipe bagan, Konfigurasi bagan dibagikan dengan tipe bagan individual



InternallightdandarkDua tema., Pengguna dapat mengaksesBuilderGubahan Tema



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


## pointStyle

**Tipe:** `PointStyle | PointStyle[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi Gaya Meta Pixmap, Gaya pixmap untuk mendefinisikan grafik, Termasuk warna titik grafis, Batas, dll.

Dukung konfigurasi gaya global atau kondisi

Filter Data

Aturselector, Menyediakan Nilaiselector, Data localeselector, Dimensi kondisionalselector, Metrik kondisionalselector Empat kategori kemampuan pencocokan data

Jika tidak dikonfigurasiselector, .

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
## lineStyle

**Tipe:** `LineStyle | LineStyle[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi Gaya Diagram, Linegram Styles untuk Mendefinisikan Charts, Termasuk warna kapal, Transparansi, Tirai, dll.

Dukung konfigurasi gaya global atau kondisi

Filter Data

Aturselector, Menyediakan Nilaiselector, Data localeselector, Dimensi kondisionalselector, Metrik kondisionalselector Empat kategori kemampuan pencocokan data

Jika tidak dikonfigurasiselector, .

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

### lineVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah segmen terlihat

:::

### lineSmooth

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
apakah garis halus

:::

### lineColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna Garis

:::

### lineColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Transparansi Warna Garis

:::

### lineWidth

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Lebar garis

:::

### lineStyle

**Tipe:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Deskripsi"}
Baris Styles

:::

**Contoh:**
```ts
`lineStyle: 'solid'`




```
## areaStyle

**Tipe:** `AreaStyle | AreaStyle[] | undefined`

:::note{title="Deskripsi"}
Konfigurasi Gaya Diagram Area, Diagram Area Gaya untuk mendefinisikan grafik, Termasuk warna diagram area, Transparansi, Batas, dll.

Dukung konfigurasi gaya global atau kondisi

Filter Data

Aturselector, Menyediakan Nilaiselector, Data localeselector, Dimensi kondisionalselector, Metrik kondisionalselector Empat kategori kemampuan pencocokan data

Jika tidak dikonfigurasiselector, .

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

### areaVisible

**Tipe:** `boolean | undefined`

:::note{title="Deskripsi"}
Apakah angka area nampak



Apakah angka area nampak

:::

### areaColor

**Tipe:** `string | undefined`

:::note{title="Deskripsi"}
Warna dari area figure



Warna dari area figure

:::

### areaColorOpacity

**Tipe:** `number | undefined`

:::note{title="Deskripsi"}
Transparansi Warna untuk Karakter Area



Transparansi Warna untuk Karakter Area

:::


## locale

**Tipe:** `Locale | undefined`

:::note{title="Deskripsi"}
Bahasa



Konfigurasi Bahasa Bagan, Dukungan'zh\-CN'dan'en\-US'Dua bahasa, Juga dapat ditangani.intl.setLocale('zh\-CN') Metode Set Bahasa

:::

