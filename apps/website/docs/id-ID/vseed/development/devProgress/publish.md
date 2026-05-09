---
title: Rilis
---


# terbitkan

## Hasilkan set perubahan

Untuk menghasilkan perubahan baru, jalankan pnpm changeset di direktori root repositori. File penurunan harga yang dihasilkan di direktori .changeset harus dikomit ke repositori.
```bash
pnpm changeset
```

Setelah membuat perubahan, jalankan git commit
```bash
git add .
git commit -m "chore: commit message"
```

Proses di atas dapat diulang beberapa kali, dan konten dari setiap perubahan akan diakumulasikan hingga versi final dirilis.

## Versi yang diperbarui

Jalankan perintah berikut untuk memperbarui versi dan memperbarui ChangeLog.
```bash
pnpm changeset version
```

Perbarui dependensi dan kunci file
```bash
pnpm install
```

Lakukan perubahan
```bash
git add .
git commit -m "chore: release message"
git push
```

Setelah PR digabungkan ke dalam cabang utama, alur kerja perubahan akan secara otomatis dipicu untuk pengemasan dan penerbitan.