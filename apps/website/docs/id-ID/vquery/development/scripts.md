# Skrip yang umum digunakan

Untuk menjaga konsistensi dengan Monorepo, **semua skrip harus dijalankan di direktori akar proyek**.

## Skrip Inti (g)

```bash
pnpm run g
```
**Deskripsi Fungsi**: Skrip VQuery dari `g` bertanggung jawab untuk:
1. `build:test`: Kompilasi sumber daya pengujian.
2. `build:docs`: Menghasilkan dokumen API.

## Mengembangkan dan membangun

### Membangun
```bash
pnpm --filter=@visactor/vquery run build
```

## tes

### Jalankan pengujian
VQuery Gunakan Rstest untuk pengujian.
```bash
pnpm --filter=@visactor/vquery run test
```

### Perbarui cuplikan
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Cakupan
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
