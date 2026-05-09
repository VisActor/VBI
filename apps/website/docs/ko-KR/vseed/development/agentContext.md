# Agent 개발 컨텍스트 (VSeed)

이 문서는 agent-code와 기여자를 대상으로 하며, VSeed 서브 패키지의 핵심 아키텍처, 데이터 흐름 및 확장 방식을 요약하여 자동화 개발 시 빠르게 전반적인 이해를 할 수 있도록 돕습니다.

> Agent 사용을 위해 설계된 "컨텍스트 인덱스"입니다. 더 자세한 엔지니어링 설명은 `packages/vseed/AGENTS.md`를 참조하세요.

## 1. 목표 및 포지셔닝

VSeed는 **Spec Builder**로, `VSeed DSL`을 `VChart` / `VTable` 렌더링 가능 Spec으로 변환하여 차트의 지능형 생성 및 편집 기능을 지원합니다.

- 입력: `VSeed DSL`
- 출력: `VChart` / `VTable` Spec
- 핵심 프로세스: `AdvancedPipeline` + `SpecPipeline`

## 2. 2단계 Pipeline

1. **AdvancedPipeline**

- 입력: `VSeed DSL`
- 출력: `AdvancedVSeed` (직렬화 가능한 중간 상태)
- 담당: 데이터 리쉐이프, 기본값 추론, 인코딩 모델링, 테마 및 스타일, 분석 구성

2. **SpecPipeline**

- 입력: `AdvancedVSeed`
- 출력: 최종 Spec (직렬화 불가, 직접 렌더링)
- 담당: 중간 상태를 구체적인 VChart / VTable 구성에 매핑

## 3. Builder 진입점

- `Builder.from(vseed).build()`를 사용하여 Spec 생성
- `prepare()`가 dynamicFilter 실행 (필요 시)

소스 코드 진입점:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. 데이터 리쉐이프 (핵심)

- `foldMeasures`: 여러 측정값을 단일 측정값으로 폴딩하여 `foldInfo` 생성
- `unfoldDimensions`: 시각적 채널별로 차원을 병합하여 `unfoldInfo` 생성
- `dataReshapeByEncoding`: 조합 호출 (fold + unfold)

소스 코드 진입점:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. 확장 및 등록

- `registerAll()`: 모든 차트 및 테마 등록
- `registerXxx()`: 단일 차트 유형 파이프라인 등록
- `updateAdvanced()` / `updateSpec()`: 사용자 정의 Pipe 삽입

소스 코드 진입점:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline 설계 원칙

- Pipe는 가능한 한 원자화하고 if/else를 줄임
- Adapter를 통해 조건부 흐름 구성
- 차트 유형은 Pipe 조합으로 결정

참고:
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. 더 완전한 컨텍스트

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

