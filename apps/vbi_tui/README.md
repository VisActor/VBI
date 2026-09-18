# vbi_tui

TUI shell for VBI Agent workflows.

The reusable Pi Agent Core runtime and Builder tools live in `packages/vbi-agent`.
Provider workspace adapters live in `apps/vbi_provider`. This app only wires them to:

- Pi TUI
- `@earendil-works/pi-ai`
- `@visactor/headless-bi-provider`
- VBI Agent workspace

## Usage

```bash
pnpm run tui
pnpm run tui -- -p "turn this chart into a line chart"
```

Environment:

```bash
AGENT_API_KEY=...
AGENT_PROVIDER=deepseek
AGENT_MODEL=deepseek-v4-flash
AGENT_BASE_URL=https://api.deepseek.com
VBI_API_BASE_URL=http://localhost:3030/api/v1
```

Flags:

- `--task`: initial task
- `--model`: model override
- `--provider`: Pi-AI provider override
- `--api-base-url`: provider API base URL

TUI commands:

- `/model`: open the model selector
- `/model deepseek-flash`: switch directly to DeepSeek V4 Flash
- `/model deepseek-pro`: switch directly to DeepSeek V4 Pro
- `/tokens`: show current token usage
- `/clear`: clear transcript and reset agent context
- `/help`: show available slash commands
- `/exit`: exit VBI Agent

Tools:

- `read_skill`: lists and reads the built-in VBI teaching skills
- `vbi_resource_lookup`: searches chart and insight ids
- `vbi_chart`: chart resource CRUD, references, and `run` scripts against the chart Builder workspace
- `vbi_insight`: insight resource CRUD, references, and `run` scripts against the insight Builder workspace
