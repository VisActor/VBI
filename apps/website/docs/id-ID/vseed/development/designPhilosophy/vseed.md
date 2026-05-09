# VSeed

:::info Ringkasan satu kalimat
Ia menerima kebutuhan bisnis yang fleksibel ke atas, membatasi formulir akses data ke bawah, mengatur data dengan cara yang terpadu, dan menyederhanakan yang rumit.
:::

## Apa itu VSeed?

`VSeed` adalah alat visualisasi untuk analisis data. Ini berfokus pada penyediaan kemampuan konversi data yang sangat konsisten antara berbagai jenis bagan. Ini juga menyediakan beberapa fungsi out-of-the-box untuk memenuhi kebutuhan analisis data yang ringan.

## Apa kelebihan dari VSeed

> Pertama-tama, ini sangat mudah digunakan. Kedua, ini sangat fleksibel. Terakhir, ada banyak paket di VSeed. Anda perlu memahami bagaimana VSeed melakukan pembentukan ulang data agar dapat menerapkannya dengan sempurna.

1. Cara paling intuitif untuk berpindah grafik [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Bagan perspektif yang paling mudah digunakan [Demo](/vseed/guide/intro/pivotAndCombine)
3. Kemampuan pembentukan ulang data yang kuat, tanpa pemrosesan data apa pun, sejumlah dimensi, metrik, dan jenis bagan apa pun dapat dihasilkan [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed DSL` sepenuhnya dapat diserialkan dan karenanya mendukung transmisi lintas platform Demo [Demo](/vseed/guide/intro/crossPlatformRender)
5. Tersedia langsung: seperti format numerik, internasionalisasi, tema terang dan gelap, gaya yang umum digunakan, dll. [Demo](/vseed/guide/intro/internationalization)
6. Performa pemrosesan data yang sangat baik, mendukung pemrosesan data di ujung `Web` dan visualisasi di ujung Demo [Demo](/vseed/guide/intro/separateBuild)

## Apa kerugian dari VSeed

1. `VSeed` tidak bertanggung jawab untuk menyempurnakan setiap detail dari satu bagan. Kebutuhan tersebut akan disediakan oleh `VChart` dan `VTable`. `VSeed` hanya menyediakan kemampuan untuk memodifikasi `spec` secara fleksibel. Pengguna dapat secara fleksibel memodifikasi setiap detail grafik sesuai dengan kebutuhannya.
2. Hanya kumpulan data yang memenuhi spesifikasi `tidyData` yang dapat divisualisasikan dengan `VSeed`. Kumpulan data non-standar tidak diterima oleh `VSeed`.
3. Berdasarkan konstruksi ekologi `VisActor`, pengguna perlu memahami konsep dasar `VChart` dan `VTable`

## Apa prinsip dari VSeed?

1. `VSeed` harus mendukung serialisasi
2. `VSeed` tidak perlu memberikan terlalu banyak kemampuan penataan gaya dan harus fokus pada pemrosesan hubungan antara bagan dan data.
3. `VSeed` harus merangkum fungsi-fungsi umum yang umum digunakan dalam field analisis, seperti format numerik, internasionalisasi, tema, gaya umum, dan fungsi umum, sehingga dapat langsung digunakan.
4. Kebutuhan penyesuaian yang lebih fleksibel harus disesuaikan oleh pengguna. Oleh karena itu, VSeed hanya menyediakan satu Spec Builder ke dunia luar, yang digunakan untuk membangun spesifikasi VChart dan VTable.
- Pengguna dapat secara fleksibel mengontrol VChart Instance dan VTable Instance.
- Pengguna dapat secara fleksibel mengubah spesifikasi VChart dan VTable sesuai kebutuhan mereka sendiri.


## Mengapa mendesain VSeed?

1. `VChart` tidak akan pernah bisa beralih ke `VTable` dengan mulus, dan sebaliknya. Menghadapi permintaan seperti itu, enkapsulasi abstrak lapisan atas pasti akan muncul.
2. Pengguna yang menggunakan `VChart` dan `VTable` harus memproses sendiri datanya. Pekerjaan ini akan terulang ratusan atau ribuan kali tanpa disengaja. `VSeed` ingin mengurangi kompleksitas pemrosesan data dalam skenario umum dan mengurangi pekerjaan berulang.
3. Ambang batas penggunaan `VChart` dan `VTable` dapat diturunkan hingga batas tertentu, misalnya menggunakan `VTable` untuk merender `PivotChart`.
4. `VSeed` pada akhirnya dapat berkembang menjadi sub-modul `HeadlessBI` untuk membuat alat analisis data umum.