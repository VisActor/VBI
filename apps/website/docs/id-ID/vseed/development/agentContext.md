# Agent konteks pengembangan (Agent)

Dokumen ini ditujukan untuk kode agen dan kontributor. Ini merangkum arsitektur inti, aliran data, dan metode ekstensi dari sub-paket VSeed, sehingga dapat dengan cepat membangun pemahaman global selama pengembangan otomatis.

> Ini adalah "indeks konteks" yang dirancang untuk digunakan dengan Agent. Untuk deskripsi proyek yang lebih rinci, silakan merujuk ke: Agent.

## 1. Sasaran dan positioning

`VSeed DSL` adalah **`VChart` `VTable`}**, yang mengonversi VSeed menjadi Spec / Builder Spec yang dapat dirender, mendukung kemampuan membuat dan mengedit bagan secara cerdas.

- Masukan: `VSeed DSL`
- Keluaran: `VChart` / `VTable` Spec
- Proses inti: `AdvancedPipeline` + `SpecPipeline`

## 2. Dua tahap Pipeline

1. **AdvancedPipeline**

- Masukan: `VSeed DSL`
- Output: `AdvancedVSeed` (keadaan peralihan yang dapat diserialkan)
- Bertanggung jawab untuk: pembentukan kembali data, inferensi default, pemodelan pengkodean, tema dan gaya, konfigurasi analisis

2. **SpecPipeline**

- Masukan: `AdvancedVSeed`
- Output: final Spec (tidak dapat diserialkan, dirender secara langsung)
- Bertanggung jawab untuk: memetakan keadaan peralihan ke konfigurasi VChart / VTable tertentu

## 3. Builder Pintu masuk

- Gunakan `Builder.from(vseed).build()` untuk menghasilkan Spec
- `prepare()` jalankan dynamicFilter (jika perlu)

Entri kode sumber:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Pembentukan kembali data (inti)

- `foldMeasures`: Beberapa metrik diciutkan menjadi satu metrik, menghasilkan `foldInfo`
- `unfoldDimensions`: gabungkan dimensi berdasarkan saluran visual untuk menghasilkan `unfoldInfo`
- `dataReshapeByEncoding`: panggilan gabungan (lipat + buka)

Entri kode sumber:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Perpanjangan dan pendaftaran

- `registerAll()`: Daftarkan semua grafik dan topik
- `registerXxx()`: Daftarkan alur tipe bagan tunggal
- `updateAdvanced()` / `updateSpec()`: Masukkan Pipe khusus

Entri kode sumber:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline Prinsip Desain

- Pipe harus se-atom mungkin dan mengurangi Pipe
- Gabungkan proses bersyarat melalui Adapter
- Tipe grafik ditentukan oleh kombinasi Pipe

lihat:
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Konteks lebih lengkap

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

