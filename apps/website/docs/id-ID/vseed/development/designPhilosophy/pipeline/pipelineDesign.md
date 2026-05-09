# desain pipa

:::info Why Pipeline?
1. Pemilihan senior dalam tim
2. Keuntungan dari Pipeline adalah memungkinkan `VSeed` mengontrol proses eksekusi setiap jenis grafik secara independen. Melalui desain yang baik, penerapan setiap jenis bagan dapat dipisahkan dan digunakan kembali sebagian. Setiap jenis tipe bagan dapat memiliki kontrol sempurna atas detail apa pun. Inilah yang Pipeline hadirkan dan yang paling dibutuhkan oleh Pipeline.
3. Sebagai perbandingan, kekurangan mode Pipeline dapat dihindari selama desain. Selama Anda mengurangi ukuran satu `Pipe` dan mengurangi ketergantungan antara `Pipe` saat mendesain `Pipe`, Anda dapat menghindari kekurangan yang disebabkan oleh mode ini.
4. Setelah empat generasi desain dan optimalisasi Pipeline, VSeed sudah memasuki versi kelima, dan kendala yang perlu diatasi telah teratasi.

:::

## Apa itu Pipeline?

Pipeline adalah praktik abstraksi dan rekayasa canggih yang bertujuan menguraikan tugas kompleks menjadi serangkaian langkah kecil yang terhubung dan dijalankan secara berurutan. Konsep desain dan implementasinya sangat dipengaruhi oleh ide inti pemrograman fungsional (FP).

### Keuntungan Pipeline:
- Modularisasi: Implementasi atom, modul diperoleh dengan menggabungkan atom
- Otomatisasi: Cukup tentukan inputnya dan Anda bisa mendapatkan output secara otomatis tanpa memperhatikan implementasi internal.
- Fungsi murni: Tentukan masukan dan Anda akan mendapatkan keluaran yang diharapkan, yang merupakan karakteristik fungsi murni.
- Paralelisme: Secara alami mendukung konkurensi.
- Dapat digunakan kembali: Setiap modul dapat digunakan kembali.
- Testabilitas: Secara teori, setiap modul bersifat independen dan dapat diuji secara individual untuk memastikan kualitas.
- Ketertelusuran: Input dan output dari setiap tahap jelas, sehingga memudahkan untuk menemukan masalah dan memantau status proses.
- Kemampuan untuk disimpan dalam cache: Secara teori, keluaran dari satu `Pipe` dapat di-cache secara terpisah, sehingga penghitungan berulang dapat dihindari dan efisiensi ditingkatkan.

### Kekurangan Pipeline:
- Ketergantungan berurutan: Ketika ada ketergantungan berurutan antar Pipa, maka akan meningkatkan biaya pemahaman, karena Anda perlu memahami tahapan sebelumnya sebelum Anda dapat memahami tahapan selanjutnya. Pemahaman yang lebih dalam tentang keseluruhan proses diperlukan untuk menemukan masalah dengan cepat.
- Biaya debug: Karena Pipeline dijalankan secara berurutan, setelah tahap tertentu gagal, keseluruhan Pipeline akan gagal. Hal ini membuat proses debug menjadi sulit karena Anda perlu menemukan tahap yang gagal dan memperbaikinya.
- Mafalse kinerja: Karena Pipeline dijalankan secara berurutan, output dari setiap tahap harus menunggu selesainya tahap sebelumnya, yang akan menyebabkan masalah kinerja. Apalagi bila waktu eksekusi suatu tahapan tertentu lama, hal ini akan mempengaruhi efisiensi eksekusi keseluruhan Pipeline.
- Pemrograman fungsional: Untuk memahami konsep baru, ada biaya pembelajaran tertentu. Oleh karena itu, prinsip desain dan detail implementasi perlu ditulis dalam panduan kontribusi untuk memfasilitasi pengembang lain memahami dan menggunakannya, dan untuk menutupi kekurangannya.

## Bagaimana cara menulis Pipeline di VSeed?

### Pipe Mode kombinasi

Beberapa Pipa fungsional dapat digabungkan menjadi Pipa fungsional yang lebih besar atau menjadi Pipa yang lebih kompleks.

Dalam VSeed, Pipeline lengkap berhubungan dengan implementasi tipe bagan; dengan mendeskripsikan hubungan kombinasi Pipa, berbagai jenis bagan dapat dibuat. Pada tahap kombinasi Pipeline, tidak perlu memperhatikan implementasi spesifik dari setiap pipa.


#### Perbedaan kombinasi

Misalnya:

Bagan garis dan bagan area memiliki banyak fungsi yang dapat digunakan kembali, seperti label, legenda, sumbu koordinat, dll., namun bagan garis tidak memiliki gaya elemen permukaan, sehingga pipeline menyelesaikan perbedaan di atas dengan menggabungkan fungsi Pipa, tanpa pernyataan if apa pun di seluruh proses.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 仅面积图有面图元样式
  areaStyle,
]
```


### Pipe mode adaptor

Selain mode kombinasi, konstruksi Pipa seringkali memiliki kondisi tertentu. Untuk memenuhi kombinasi Pipa dalam kondisi yang berbeda, sejumlah besar adaptor Pipa digunakan di VSeed

#### Kondisi kombinasi

Misalnya:

Bagan garis memiliki fungsi perspektif. Jika tidak ada perspektif, maka akan dirender oleh VChart dan menghasilkan spesifikasi VChart. Jika terdapat perspektif, perspektif tersebut dirender oleh VTable dan menghasilkan spesifikasi VTable.

Bagan garis perspektif pada dasarnya perlu menggunakan kembali fungsi dasar bagan garis, seperti label, legenda, sumbu koordinat, dll. Oleh karena itu, perlu untuk menyesuaikan Pipa bagan garis ke Pipa bagan garis perspektif melalui mode adaptor.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
] 

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

Singkatnya, setiap adaptor adalah if else, yang dapat mengabstraksi kondisi tersembunyi di dalam pipeline ke dalam adaptor, sehingga if else ditempatkan di tingkat atas, sehingga memperoleh Pipeline dengan ketergantungan yang lebih jelas dan mengurangi biaya pemeliharaan.

### Unit paling dasar dari Pipeline: Fungsi Pipe

VSeed mengharapkan semua jenis bagan berfungsi sebagai unit paling dasar dan menyediakan kemampuan penggunaan kembali dan perluasan yang memadai; buat pipa tipe bagan dari bawah ke atas; setiap Pipa yang berfungsi harus merupakan modul yang independen, dapat diuji, dan dapat digunakan kembali;

Hal yang paling penting adalah bahwa Pipa yang berbeda harus diabstraksi berdasarkan perbedaan fungsional (yaitu, tulis lebih sedikit jika tidak) daripada menulis satu Pipa yang besar dan komprehensif.

#### Fungsi datar Pipa

Misalnya:

Bagan batang, bagan kolom, bagan garis, bagan area, dan bagan sebar semuanya memiliki sumbu X dan sumbu Y. Mereka serupa tetapi sedikit berbeda. Jika Anda menulis pipa sumbu Yang besar dan lengkap, mungkin akan menjadi seperti ini

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折线图、面积图、柱状图有一个离散的轴, 一个连续的轴
    return xy(spec, context) 
  }
  if (isScatter){
    // 散点图有2个连续的轴
    return yy(spec, context) 
  }
  if (isBar){
    // 条形图有一个离散的轴, 一个连续的轴, 但与折线图、面积图、柱状图的轴方向不同
    return yx(spec, context) 
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

Logika di atas diimplementasikan dalam fungsi Pipa untuk memilih pipa sub-fungsi yang berbeda sesuai dengan tipe bagan. Mafalse yang ditimbulkan adalah:
1. Bagaimana cara menggunakan kembali fungsi berulang di xy, yx, dan yy? Sejumlah besar subfungsi yang serupa tetapi berbeda perlu dipanggil berulang kali di pipa subfungsi yang berbeda. Ketergantungan dapat dengan mudah menjadi rumit, sehingga menyebabkan peningkatan biaya pemeliharaan.
2. Saat memodifikasi fungsi diagram garis dan diagram area, diagram batang mudah terlewatkan karena logikanya telah bercabang dua, sehingga perbedaan harus dipertimbangkan saat mengimplementasikan fungsi baru.

Ketika skala seluruh pipa spesifikasi meluas hingga ratusan pipa, penulisan logika seperti ini akan menimbulkan biaya pemeliharaan yang sangat tinggi. Oleh karena itu, kita memerlukan cara yang lebih sederhana untuk memilih pipa sub-fungsi yang berbeda berdasarkan jenis bagan.

Melanjutkan contoh di atas, mengabstraksi perbedaan ke dalam Pipe yang berbeda, merangkum perbedaan dalam fungsi yang lebih terperinci, dan akhirnya menggabungkannya secara langsung di dalam pipeline dapat menghindari masalah di atas.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Pada contoh di atas, pipa sumbu tidak diimplementasikan, namun keempat pipa xBandAxis, yBandAxis, xLinearAxis, dan yLinearAxis digabungkan secara langsung. Hal ini menghindari masalah pemilihan pipa sub-fungsi yang berbeda sesuai dengan jenis bagan di pipa sumbu, sehingga menghindari pembuatan penilaian yang berbeda berdasarkan jenis bagan, sehingga mengurangi penggunaan if else.

Oleh karena itu, percabangan perbedaan tipe grafik harus berada pada Pipeline. Kecuali jika secara ketat diperlukan, tidak perlu memilih sub-fungsi pipa yang berbeda sesuai dengan tipe bagan di Pipeline.

Kombinasi ini sejalan dengan filosofi desain VSeed, yaitu menggunakan kombinasi Pipa fungsional yang lebih datar daripada menggunakan penilaian bersyarat untuk membuat Pipa fungsional yang besar dan komprehensif.


