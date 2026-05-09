# Prinsip pembentukan kembali data

:::pembentukan kembali data info
VSeed mengusulkan metode pembentukan kembali dimensi umum, yang bertujuan untuk lebih menurunkan ambang batas visualisasi data
:::

Pembentukan ulang data mengacu pada proses mengubah data dari satu bentuk terstruktur ke bentuk terstruktur lainnya. Intinya terletak pada perubahan cara pengorganisasian data (seperti baris, kolom, indeks, hierarki) untuk beradaptasi dengan kebutuhan analisis atau pemrosesan yang berbeda dengan tetap menjaga integritas data.


## Pembentukan kembali dimensi
Bahasa Python dan R memiliki alat yang sudah mendukung pembentukan kembali dimensi
1. Python Pandas menyediakan Python dan Pandas untuk pembentukan ulang data
2. R rapiverse menyediakan R dan `pivot_longer` untuk pembentukan ulang data


## Peningkatan dimensi dan pengurangan dimensi

Promosi dimensi dan reduksi dimensi secara spiritual konsisten dengan gagasan teori kategori (objek, morfisme, dan isomorfisme), tetapi implementasinya tidak sepenuhnya mengikuti teori kategori.
Penekanan khusus:
1. Saat memutakhirkan, informasi "nama metrik" dan "nilai metrik" yang tidak ada akan dibuat "tiba-tiba"
2. Selama reduksi dimensi, informasi "nama metrik" dan "nilai metrik" yang ada dalam data akan "dihapus"

Peningkatan dimensi dapat mengubah data sepenuhnya, namun nama kolom dimensi akan memiliki nilai null, sehingga mendukung pengisian informasi tambahan.
Pengurangan dimensi akan menghilangkan kandungan informasi, sehingga diperlukan penyimpanan tambahan informasi transformasi untuk mencapai transformasi isomorfik yang setruenya, jika tidak, informasi tersebut pasti akan hilang.

![commonDataReshape](/images/commonDataReshape.png)

## Mengelompokkan peningkatan dimensi dan pengurangan dimensi

Mirip dengan peningkatan dimensi biasa dan pengurangan dimensi, terdapat skenario peningkatan atau kehilangan informasi yang serupa. Selain itu, karena adanya pengelompokan, lebih banyak data kosong yang akan dihasilkan.
Arti:
1. Pengelompokan metrik: Meningkatkan dimensi dengan mudah melalui pengelompokan dan memproses data terperinci dengan cepat
2. Kueri multi-grup: Beberapa bagian data terperinci dapat dengan mudah diperoleh melalui beberapa bagian SQL, dan dapat digabungkan menjadi satu bagian data melalui pengelompokan dan reduksi dimensi.

![groupedDataReshape](/images/groupedDataReshape.png)

## Penurunan aturan

### Peningkatan Dimensi

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Ketika beberapa metrik ditingkatkan, jumlah metrik menjadi satu. Setelah satu metrik diupgrade, metriknya tetap 1.
2. Peningkatan dimensi multi dimensi, jika ada satu dimensi lagi maka 0 dimensi juga akan bertambah 1
3. 0 dimensi dan 1 metrik, Anda dapat memperbesar dimensi berulang kali untuk mendapatkan sejumlah dimensi dan 1 metrik (sehingga satu metrik juga dapat menggambar histogram)

:::

### Pengurangan dimensi

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Reduksi dimensi multimetrik, nilai dimensi dan metriknya akan dikalikan kartesius menjadi metrik baru
2. Reduksi dimensi multi dimensi, nilai beberapa dimensi akan dikalikan kartesius menjadi dimensi baru

:::


## Contoh

#### 0 dimensi 1 metrik
![0d1m](/images/0d1m.png)
#### 0 dimensi 3 metrik
![0d3m](/images/0d3m.png)
#### 1 dimensi 1 metrik
![1d1m](/images/1d1m.png)
#### 1 dimensi 2 metrik
![1d2m](/images/1d2m.png)
#### 2 dimensi 1 metrik
![2d1m](/images/2d1m.png)
#### 2 dimensi 2 metrik
![2d2m](/images/2d2m.png)
