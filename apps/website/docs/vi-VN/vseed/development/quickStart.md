# Bắt đầu nhanh

## Chuẩn bị môi trường

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> Định cấu hình `packageManager`trong `package.json`thành `pnpm@10.13.1`và `corepack`sẽ tự động cài đặt phiên bản này
```bash title="pnpm"
corepack enable pnpm
```

Đã kiểm tra phiên bản pnpm, dự kiến là 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Bắt đầu dự án

Khởi động trang web, đồng thời phát triển và gỡ lỗi vseed
```bash title="Phát triển"
pnpm install

pnpm dev
```

Build
```bash title="Build"
pnpm build 
```

Sử dụng `rsdoctor`để phân tích sản phẩm
```bash title="Phân tích"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
