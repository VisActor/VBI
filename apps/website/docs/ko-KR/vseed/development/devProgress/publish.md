---
title: 릴리스
---


# 릴리스

## changeset 생성

새로운 changesets를 생성하려면 저장소의 루트 디렉토리에서 pnpm changeset을 실행하세요. .changeset 디렉토리에 생성된 markdown 파일은 저장소에 커밋되어야 합니다.
```bash
pnpm changeset
```

changeset 생성 후 git commit 실행
```bash
git add .
git commit -m "chore: commit message"
```

위 과정은 여러 번 반복할 수 있으며, 각 changeset의 내용은 최종 버전 릴리스에 누적됩니다.

## 버전 업데이트

다음 명령을 실행하여 버전을 업데이트하고 ChangeLog를 갱신합니다.
```bash
pnpm changeset version
```

의존성 및 lock file 업데이트
```bash
pnpm install
```

변경 사항 커밋
```bash
git add .
git commit -m "chore: release message"
git push
```

PR이 main 브랜치에 병합되면 changesets workflow가 자동으로 트리거되어 패키징 및 릴리스 작업이 수행됩니다.