# 빠른 시작

## 환경 준비

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> `package.json`에서 `packageManager`를 `pnpm@10.13.1`로 설정하면 `corepack`이 자동으로 해당 버전을 설치합니다.
```bash title="pnpm"
corepack enable pnpm
```

pnpm 버전을 확인합니다. 예상 버전은 10.26.1입니다.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## 프로젝트 시작

사이트를 실행하면 vseed를 동시에 개발 및 디버깅할 수 있습니다.
```bash title="개발"
pnpm install

pnpm dev
```

빌드
```bash title="빌드"
pnpm build 
```

`rsdoctor`를 사용하여 빌드 결과물 분석
```bash title="분석"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
