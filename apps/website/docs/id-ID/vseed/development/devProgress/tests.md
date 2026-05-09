# Proses pengujian

VSeed mengadopsi proses pengembangan berbasis pengujian yang ketat. **Semua perintah pengujian harus dijalankan di direktori root proyek. **

## Klasifikasi pengujian

### 1. Uji Unit (Unit Tests)
- **Sasaran**: Menguji fungsi alat independen, logika node Pipeline.
- **Lokasi**: `packages/vseed/tests/unit`
- **Berlari**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Pengujian integrasi (Integration Tests)
- **Sasaran**: Menguji proses pembuatan bagan secara lengkap (VSeed Spec -> VChart Spec).
- **Mekanisme**: Berdasarkan data. Buat kasus pengujian dan bandingkan snapshot secara otomatis dengan membaca file JSON pada `packages/vseed/tests/integrations`.
- **Berlari**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Alur Kerja Inti (Workflow)

### Langkah 1: Jalankan pengujian
Selama pengembangan, jalankan pengujian yang relevan secara berkala untuk memverifikasi logika.
```bash
# 运行所有测试
pnpm --filter=@visactor/vseed run test
```

### Langkah 2: Proses perubahan snapshot
Jika kode diubah sehingga keluaran Spec berubah (misalnya, Bug diperbaiki atau Feature ditambahkan):
1. Periksa keluaran konsol Diff untuk mengonfirmasi apakah perubahannya sesuai yang diharapkan.
2. Jika sudah sesuai yang diharapkan, jalankan perintah update:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Langkah 3: Pemeriksaan Cakupan
Sebelum melakukan kode, disarankan untuk memeriksa cakupan pengujian.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Catatan
- **Dibuat secara otomatis**: File `.test.ts` untuk pengujian integrasi dibuat oleh skrip `g`, **Jangan mengubahnya secara manual**.
- **Kasus penggunaan baru**: Untuk menambahkan pengujian integrasi baru, cukup tambahkan file konfigurasi `pnpm run g` baru di direktori kategori yang sesuai pada `packages/vseed/tests/integrations`, lalu jalankan JSON.
