# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Jalankan kode filter dinamis secara asinkron. Dipanggil sebelum build() untuk mengeksekusi kode di dynamicFilter. Metode idempoten, beberapa panggilan tidak akan terulang

### build

```ts
build<T = S>(): T
```

Hasilkan konfigurasi bagan akhir (Spec). Ini adalah metode inti yang paling umum digunakan. Jika konfigurasi berisi kode dynamicFilter, Anda perlu memanggil prep() terlebih dahulu

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Konversikan konfigurasi tingkat menengah (AdvancedAdvancedVSeed) ke Spec final. Gunakan hanya ketika Anda perlu menyesuaikan konfigurasi tingkat menengah secara mendalam

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Hasilkan konfigurasi lapisan tengah (AdvancedAdvancedVSeed), yang merupakan templat bagan. Lebih detail dari VSeed asli, memperlihatkan lebih banyak detail grafik

### getColorItems

```ts
getColorItems(): __type[]
```

Dapatkan informasi lapangan yang melibatkan warna dalam data. Legenda atau filter warna yang biasa digunakan untuk menghasilkan grafik UI

### getColorIdMap

```ts
getColorIdMap(): Record
```

Dapatkan tabel pemetaan detail untuk field warna. Key adalah warnanya ID, Value adalah informasi detailnya

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Dapatkan pemetaan dari colorId ke nilai warna akhir dalam peta warna diskrit

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Metode internal] Dapatkan alur konstruksi templat dari jenis bagan yang ditentukan, yang digunakan untuk men-debug proses konversi dari VSeed ke AdvancedAdvancedVSeed

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Metode internal] Dapatkan pipeline build Spec dari jenis bagan yang ditentukan, yang digunakan untuk men-debug proses konversi dari AdvancedAdvancedVSeed ke Spec

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Dapatkan konfigurasi topik yang ditentukan. Jika themeKey tidak diteruskan, topik 'light' akan dikembalikan secara default.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Dapatkan semua konfigurasi tema terdaftar

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Metode pabrik statis untuk membuat instance Builder dengan mudah

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Metode ekstensi] Daftarkan pipa konstruksi templat dari tipe bagan baru

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Metode Ekstensi] Daftarkan pipa build Spec untuk tipe bagan baru

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Metode ekstensi] Ubah logika konstruksi templat bagan yang ada dan masukkan Pipe khusus untuk memengaruhi AdvancedPipe yang dihasilkan

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Metode ekstensi] Ubah logika konstruksi Spec dari bagan yang ada dan masukkan Pipe khusus untuk memengaruhi Pipe akhir yang dihasilkan

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Metode ekstensi] Daftarkan tema khusus

## Properties

### get locale

```ts
get locale()
```

Dapatkan locale yang saat ini digunakan oleh Builder

### get vseed

```ts
get vseed()
```

Dapatkan data masukan VSeed saat ini

### set vseed

```ts
set vseed(value)
```

Perbarui data masukan VSeed. Status cache dari persiapan() akan dihapus setelah pembaruan.

### get isPrepared

```ts
get isPrepared()
```

Dapatkan status persiapan()

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Setel status persiapan()

### get advancedVSeed

```ts
get advancedVSeed()
```

Dapatkan objek konfigurasi perantara AdvancedAdvancedVSeed saat ini

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Setel objek konfigurasi perantara AdvancedAdvancedVSeed. Biasanya digunakan untuk menyimpan cache atau menggunakan kembali konfigurasi perantara yang ada

### get spec

```ts
get spec()
```

Dapatkan objek akhir Spec yang dihasilkan saat ini

### set spec

```ts
set spec(value)
```

Setel objek Spec. Biasanya digunakan untuk cache

### get performance

```ts
get performance()
```

Dapatkan statistik kinerja selama proses pembangunan. Termasuk waktu yang dihabiskan dalam setiap tahapan (satuan: ms)

### set performance

```ts
set performance(value)
```

Tetapkan statistik kinerja

