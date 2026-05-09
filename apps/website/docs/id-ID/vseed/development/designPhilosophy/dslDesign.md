# DSL Desain

:::info artinya

VSeed bersifat deklaratif DSL

- DSL Desain adalah seni mengungkapkan masalah domain dan dapat menyederhanakan masalah kompleks secara efektif.
- DSL Jadikan pengkodean sealami menulis dalam bahasa ibu Anda bagi mereka yang memahaminya. Saat Anda sudah familiar dengan VSeed, merender diagram semudah menulis bahasa alami.
- Hal yang sama berlaku untuk `VChart`, `VTable`


:::

:::tip

`DSL deklaratif` Fokus pada "apa adanya" (What). Jelaskan seperti apa hasil atau keadaan akhir yang diinginkan, tanpa mempedulikan langkah-langkah spesifik di dalam komputer untuk mencapai keadaan tersebut.


`DSL imperatif` Ikuti "Cara" (How). Berikan serangkaian instruksi langkah demi langkah yang jelas untuk memberi tahu komputer cara mencapai status target langkah demi langkah.
:::

## VSeed Pengorbanan

1. Fokus domain (Focus)

Korbankan sifat umum tertentu dan fokus pada pemecahan masalah di field tertentu. Oleh karena itu, tujuan inti dari VSeed bukanlah untuk memenuhi semua kebutuhan tipe bagan secara mendalam, tetapi untuk fokus pada konversi data sebelum tipe bagan. Fitur lainnya, seperti tema, interaksi, animasi, dll.

2. Tingkat abstraksi (Abstraction Level)

`VSeed` memberikan tingkat abstraksi yang lebih tinggi, memungkinkan pengguna untuk fokus pada penyelesaian masalah daripada memperhatikan detail implementasi yang mendasarinya. Hal ini meningkatkan efisiensi pembangunan. Misalnya untuk berpindah tipe chart, cukup mengubah parameternya tanpa harus memperhatikan detail cara peralihannya.

3. Kendala adalah kelebihan (Constraint adalah Advantage)

`VSeed` menekankan batasan, menerima `VSeed DSL`, dan mengeluarkan `VTable` atau `VChart` dari `spec`, yang memungkinkan pengguna mengontrol fungsi bagan tunggal dengan lebih fleksibel. `VSeed` bukan kotak hitam.

Oleh karena itu `VSeed` dapat dengan mudah dianggap sebagai VSeed, tanpa merusak fungsi asli dari `Spec Builder` atau `VTable`, semua `VChart`, `VChart` Pengguna dapat dengan cepat mengakses `VTable` dalam platform yang ada