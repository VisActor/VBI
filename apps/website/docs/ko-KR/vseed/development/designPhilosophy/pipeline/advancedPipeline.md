# 고급 Pipeline

## 고급 pipeline

`advanced pipeline`은 vseed DSL을 입력받아 advancedVSeed DSL을 출력합니다

`advancedVSeed`는 그래픽 문법을 기반으로 설계된 데이터 구조로, 차트와 테이블을 통일적으로 설명하는 데 사용되며 비즈니스와 차트 라이브러리 간의 브릿지 역할을 합니다.


`advancedVSeed` 자체도 완전히 직렬화 가능하므로 Node.js 환경에서 구축한 후 HTTP를 통해 spec pipeline으로 전송하고 프론트엔드에서 차트를 렌더링할 수 있습니다.

