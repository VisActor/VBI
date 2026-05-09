# Skrip yang umum digunakan

Untuk menjaga konsistensi dengan Monorepo, **semua skrip harus dijalankan di direktori akar proyek**.

## Skrip Inti (g)

`g` (Generator) adalah skrip tambahan yang paling penting dalam pengembangan Generator.

```bash
pnpm run g
```

**Deskripsi fungsi**:
Perintah ini merupakan kombinasi dari `build:test`, `build:docs`, dan `build:api` untuk memastikan sinkronisasi sumber daya di lingkungan pengembangan:
1. **Buat kasus uji**: Parsing Spec `.test.ts` pada `tests/integrations` dan buat file JSON yang sesuai.
2. **Buat dokumen**: Parsing definisi tipe `apps/website` dan perbarui dokumen API di TypeScript.

**Skenario Penggunaan**:
- Setelah memodifikasi logika grafik atau menambahkan tipe grafik baru.
- Setelah memodifikasi definisi tipe TypeScript.
- Sebelum mengirimkan kode.

## Mengembangkan dan membangun

### Mulai lingkungan pengembangan
Mulai juga situs mendengarkan dan dokumentasi VSeed.
```bash
pnpm run dev
```

### Membangun proyek
Bangun pustaka inti VSeed.
```bash
pnpm --filter=@visactor/vseed run build
```

## Tes terkait

### Jalankan semua tes
```bash
pnpm --filter=@visactor/vseed run test
```

### Jalankan pengujian unit
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Jalankan pengujian integrasi
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Perbarui cuplikan pengujian
Jalankan ketika kode Anda berubah menyebabkan snapshot berubah (seperti yang diharapkan):
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Kualitas kode

### Lint Periksa
```bash
pnpm run lint
```

### Pengecekan tipe
```bash
pnpm run typecheck
```
