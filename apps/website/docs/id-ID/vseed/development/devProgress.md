# Proses pengembangan

## Mulai proyek

```bash title=Menjalankan Proyek
pnpm install && pnpm dev
``` 

## Pahami persyaratan dan tulis kodenya

Ini adalah proses yang rumit, tetapi secara umum ada tiga hal:
1. Masukkan dengan jelas, `vseed`
2. Keluaran eksplisit, `vseed` diubah menjadi `advancedVSeed`, atau `advancedVSeed` diubah menjadi `spec`
3. Tulis kode untuk memastikan bahwa masukan baru memiliki keluaran yang diharapkan

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`, dapat di-debug dan dikembangkan.

:::

## Buat kasus uji baru

Jika perlu, Anda dapat mempertimbangkan untuk membuat test case baru

:::tip
Ketika cakupannya berkurang, kasus uji baru perlu dibuat

:::

Di direktori `packages/vseed/tests/*`, buat `testName.json` baru dan tulis vseed DSL.

melaksanakan

```bash title=Membuat Kasus Uji
pnpm build:canvasTest
```

## Jalankan pengujian unit dan perbarui cakupan

```bash title=Menjalankan Unit Test dan Memperbarui Coverage
pnpm test:coverage
```

Pastikan 3 hal
1. Semua tes lulus
2. Perubahan snapshot sesuai dengan ekspektasi
3. Tidak ada penurunan cakupan

> Perubahan cakupan akan otomatis terupdate ke README.md

## Perbarui dokumen item konfigurasi

Jika definisi TypeScript dari tipe bagan diubah, harap perbarui dokumen item konfigurasi.

:::tip
Semua definisi tipe pada `packages/vseed/src/types/chartType` sesuai dengan dokumen item konfigurasi setiap bagan. Jika ada perubahan, pastikan untuk memperbaruinya.

:::

```bash title=Memperbarui Dokumentasi Opsi Konfigurasi
pnpm build:docs
```

## Publikasikan dan Kirim

```bash title=Mendeskripsikan Perubahan
pnpm changeset
```

Setelah menjalankan perintah `pnpm changeset`, pilih untuk melakukan operasi berikut sesuai dengan petunjuknya
1. Pilih paket yang ingin diubah. Umumnya hanya vseed
2. Ikuti versi semantik dan pilih jenis perubahan. Biasanya, tekan tombol Enter dua kali berturut-turut. Setelah melewatkan `major` dan `minor`, pilih `patch`.
2. Masukkan deskripsi perubahan, misalnya: `fix: chart render error caused by only one measure`

::: saran tip
Fungsi atau perbaikan bug terkait dengan `changeset`, sesuai dengan `commit`

Satu `Pull Request`, sama dengan satu `issue`

Satu `Pull Request`, berhubungan dengan beberapa fungsi atau beberapa Perbaikan Bug, berhubungan dengan beberapa `changeset`, berhubungan dengan beberapa `commit`

:::

## kirim

```bash title=Commit Semua Konten
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
