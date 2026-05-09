# Agent 開発コンテキスト（VSeed）

このドキュメントは agent-code とコントリビューター向けに、VSeed サブパッケージの中核アーキテクチャ、データフロー、拡張方法をまとめたものです。自動化された開発時に全体像をすばやく把握できるようにします。

> これは Agent が利用するために設計された「コンテキスト索引」です。より詳細なエンジニアリング説明は `packages/vseed/AGENTS.md` を参照してください。

## 1. 目標と位置づけ

VSeed は **Spec Builder** であり、`VSeed DSL` を `VChart` / `VTable` がレンダリング可能な Spec に変換し、チャートの知的な生成と編集を支えます。

- 入力：`VSeed DSL`
- 出力：`VChart` / `VTable` Spec
- 中核フロー：`AdvancedPipeline` + `SpecPipeline`

## 2. 2 段階 Pipeline

1. **AdvancedPipeline**

- 入力：`VSeed DSL`
- 出力：`AdvancedVSeed`（シリアライズ可能な中間状態）
- 責務：データリシェイプ、デフォルト推論、エンコーディングモデリング、テーマとスタイル、分析設定

2. **SpecPipeline**

- 入力：`AdvancedVSeed`
- 出力：最終 Spec（シリアライズ不可、直接レンダリング）
- 責務：中間状態を具体的な VChart / VTable 設定へマッピング

## 3. Builder エントリ

- `Builder.from(vseed).build()` を使って Spec を生成
- 必要に応じて `prepare()` で dynamicFilter を実行

ソースコードの入口：
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. データリシェイプ（中核）

- `foldMeasures`：複数のメジャーを単一メジャーへ折りたたみ、`foldInfo` を生成
- `unfoldDimensions`：視覚チャネルごとにディメンションを結合し、`unfoldInfo` を生成
- `dataReshapeByEncoding`：組み合わせ呼び出し（fold + unfold）

ソースコードの入口：
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. 拡張と登録

- `registerAll()`：すべてのチャートとテーマを登録
- `registerXxx()`：単一チャートタイプの pipeline を登録
- `updateAdvanced()` / `updateSpec()`：カスタム Pipe を挿入

ソースコードの入口：
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline の設計原則

- Pipe はできるだけ原子的にし、if/else を減らす
- Adapter で条件付きフローを組み合わせる
- チャートタイプは Pipe の組み合わせで決める

参考：
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. より完全なコンテキスト

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`
