# 문서

:::info
`TypeScript` 타입을 작성하는 것은 간접적으로 설정 항목 문서를 작성하는 것입니다.
:::

VSeed의 모든 차트 유형 문서는 [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) 디렉토리에 있습니다.

## 자동 문서 빌드

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
문서 내용을 직접 수정하지 마십시오. 언제든지 덮어쓰여질 수 있습니다.

`build:docs`는 몇 초 내에 완료되므로 증분 업데이트를 구현하지 않았습니다. 문서를 빌드할 때마다 모든 기존 문서가 삭제되고 새 문서가 생성됩니다.

:::