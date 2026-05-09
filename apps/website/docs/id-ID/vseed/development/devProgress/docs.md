# dokumen

:::info
Menulis tipe `Typescript` berarti menulis dokumen item konfigurasi secara tidak langsung.
:::

https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartTypeSemua dokumen jenis bagan ada di direktori [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType)

## Secara otomatis membuat dokumentasi

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Harap jangan mengubah isi dokumen secara langsung, karena dapat ditimpa kapan saja.

`build:docs` selesai dalam beberapa detik, jadi tidak ada pembaruan tambahan, setiap pembuatan dokumen menghapus semua dokumen lama dan menghasilkan dokumen baru.

:::