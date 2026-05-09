# アーキテクチャ設計

VSeed はセマンティックな設定に基づくチャート生成器であり、ユーザーの意図と下位のレンダリングエンジン（VChart/VTable）をつなぐことを目的としています。

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## 中核概念

### 1. パイプラインアーキテクチャ (Pipeline Architecture)
VSeed はパイプライン方式でチャート Spec を段階的に構築します。プロセス全体は主に 2 つの段階に分かれます。

- **AdvancedPipeline**: 
  - 入力: 初期 `VSeed` オブジェクト。
  - 責務: データリシェイプ (Data Reshape)、テーマ適用、デフォルト設定の推論。
  - 出力: `AdvancedVSeed` (中間状態テンプレート)。
  
- **SpecPipeline**:
  - 入力: `AdvancedVSeed`。
  - 責務: 中間状態テンプレートを具体的な VChart/VTable 設定項目へ変換。
  - 出力: 最終的にレンダリング可能な Spec。

### 2. Builder パターン
`VSeedBuilder` クラスは中核となる調整役であり、Context の管理、プラグインの登録、パイプラインの実行を担当します。

### 3. プラグインによる拡張 (Extensibility)
VSeed の中核機能（サポートするチャートタイプなど）は、すべてプラグイン登録の仕組みで実現されています。
- **Chart Type Registration**: 各チャートタイプ（例: `bar`, `line`）は登録プラグインです。
- **Theme Registration**: カスタムテーマの登録をサポートします。

 
