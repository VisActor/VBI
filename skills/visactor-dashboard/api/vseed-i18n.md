# i18n

[API 索引](vseed-index.md)

- [Intl](vseed-i18n.md#intl)
- [a](vseed-i18n.md#a)
- [intl](vseed-i18n.md#intl)

类型引用沿用源码模块名，包的公开导出以索引为准：

```typescript
import type { Locale } from '../types'
```

## Intl

源码：[packages/vseed/src/i18n/i18n.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/i18n/i18n.ts#L5)

关联声明，未从包入口独立导出。

```typescript
declare class Intl {
  canTranslate: (value: string) => boolean
  /**
   * @example i18n`指标名称`
   */
  i18n: (segments: TemplateStringsArray, ...values: Array<number | string>) => string
  setLocale: (locale: Locale) => void
  getLocale: () => Locale
  static getInstance(): Intl
}
```

## a

源码：[packages/vseed/src/i18n/index.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/i18n/index.ts#L3)

包导出：`a`

```typescript
export declare const a = 123
```

## intl

源码：[packages/vseed/src/i18n/i18n.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/i18n/i18n.ts#L40)

包导出：`intl`

```typescript
export declare const intl: Intl
```
