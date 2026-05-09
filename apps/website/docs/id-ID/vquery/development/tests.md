# Proses pengujian

`rstest` Gunakan kerangka kerja VQuery untuk pengujian. **Semua perintah harus dijalankan di direktori root. **

## Mekanisme pengujian
Tes VQuery meliputi:
- **Unit**: Fungsi alat dan logika kompiler.
- **contoh**: Menyelesaikan proses pembuatan SQL dan kueri data.

## Perintah umum

### Jalankan semua tes
```bash
pnpm --filter=@visactor/vquery run test
```

### Perbarui cuplikan
Jika SQL menghasilkan perubahan logis seperti yang diharapkan, snapshot perlu diperbarui:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Laporan Cakupan
Hasilkan dan lihat cakupan tes:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
