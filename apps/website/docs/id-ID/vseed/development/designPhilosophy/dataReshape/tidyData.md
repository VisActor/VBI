# TidyData

:::info artinya
TidyData Melalui prinsip inti "variabel adalah kolom dan observasi adalah baris", kompleksitas pembersihan data sangat berkurang, sehingga kami dapat lebih fokus pada masalah bisnis daripada konversi format data.
:::

## kertas

Penulis makalah, `Hadley Wickham`, membahas modul kecil dalam pemrosesan data, pengurutan data, karena kumpulan data yang rapi mudah dioperasikan, dimodelkan dan divisualisasikan, serta memiliki struktur tertentu.

Makalah ini sangat direkomendasikan untuk dibaca, silakan cek: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)


## Penerapan TidyData di VSeed

`dataset` Konfigurasi VSeed di `TidyData` adalah kumpulan data dalam format DSL.

Fitur intinya adalah sebagai berikut:
1. Satu kolom per variabel: Nilai variabel disimpan dalam kolom terpisah, seperti "usia" dan "jenis kelamin".
2. Satu baris untuk setiap pengamatan: Semua nilai variabel setiap objek pengamatan membentuk satu baris, seperti informasi usia dan jenis kelamin seseorang.
3. Satu tabel untuk setiap unit observasi: Berbagai jenis unit observasi (seperti orang, waktu, lokasi) harus disimpan secara terpisah.


Oleh karena itu, hasil kueri `SQL` dapat langsung diteruskan ke konfigurasi `dataset` dari `VSeed`, tanpa pemrosesan data tambahan, untuk analisis dan visualisasi cepat.