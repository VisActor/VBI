# 아키텍처 설계

VSeed는 의미론적 구성을 기반으로 한 차트 생성기로, 사용자 의도와 하위 렌더링 엔진(VChart/VTable)을 연결하는 것을 목표로 합니다.

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## 핵심 개념

### 1. 파이프라인 아키텍처 (Pipeline Architecture)
VSeed는 파이프라인 패턴을 사용하여 차트 Spec을 단계적으로 구축합니다. 전체 프로세스는 두 가지 주요 단계로 나뉩니다:

- **AdvancedPipeline**: 
  - 입력: 초기 `VSeed` 객체.
  - 역할: 데이터 리쉐이프 (Data Reshape), 테마 적용, 기본 구성 추론.
  - 출력: `AdvancedVSeed` (중간 상태 템플릿).
  
- **SpecPipeline**:
  - 입력: `AdvancedVSeed`.
  - 역할: 중간 상태 템플릿을 구체적인 VChart/VTable 구성 항목으로 변환.
  - 출력: 최종 렌더링 가능 Spec.

### 2. Builder 패턴
`VSeedBuilder` 클래스는 핵심 조정자로, Context 관리, 플러그인 등록 및 파이프라인 실행을 담당합니다.

### 3. 플러그인 기반 확장 (Extensibility)
VSeed의 핵심 기능(예: 지원되는 차트 유형)은 완전히 플러그인 등록 메커니즘을 통해 구현됩니다.
- **Chart Type Registration**: 각 차트 유형(예: `bar`, `line`)은 등록된 플러그인입니다.
- **Theme Registration**: 사용자 정의 테마 등록을 지원합니다.

 