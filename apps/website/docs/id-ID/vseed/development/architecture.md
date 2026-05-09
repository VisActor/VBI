# Desain arsitektur

VChart/VTable adalah pembuat bagan berdasarkan konfigurasi semantik, yang dirancang untuk menghubungkan maksud pengguna dan mesin rendering yang mendasarinya (VSeed).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## Konsep inti

### 1. Arsitektur saluran pipa (Pipeline Architecture)
VSeed menggunakan mode saluran untuk membuat bagan Spec secara bertahap. Keseluruhan proses dibagi menjadi dua tahap utama:

- **AdvancedPipeline**: 
- Masukan: objek `VSeed` awal.
- Tanggung jawab: Pembentukan ulang data (Data Reshape), menerapkan tema, menyimpulkan konfigurasi default.
- Output: `AdvancedVSeed` (template perantara).
  
- **SpecPipeline**:
- Masukkan: `AdvancedVSeed`.
- Tanggung jawab: Mengubah templat perantara menjadi item konfigurasi VChart/VTable tertentu.
- Keluaran: Spec yang dapat dirender akhir.

### 2. Modus Builder
Kelas `VSeedBuilder` adalah koordinator inti, yang bertanggung jawab mengelola Context, mendaftarkan plug-in, dan mengeksekusi pipeline.

### 3. Ekstensi plugin (Extensibility)
Kemampuan inti VSeed (seperti jenis bagan yang didukung) sepenuhnya diterapkan melalui mekanisme pendaftaran plug-in.
- **Chart Type Registration**: Setiap jenis bagan (mis. Chart, Type) adalah plugin terdaftar.
- **Theme Registration**: Mendukung pendaftaran tema khusus.

 