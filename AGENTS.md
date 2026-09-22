# AGENTS.md

This file provides guidance to Coding Agent when working with code in this repository.

## Repository Structure

```
VBI/
├── .agents/skills/                 # Agent skills and development guidance
├── apps/                           # Documentation site only
│   └── website/                    # Official documentation, examples, and playground
├── packages/                       # Package-level implementations
│   ├── vbi/                        # Configuration layer for VBIChartDSL, Builder, and collaborative editing
│   ├── vbi-agent/                  # Builder Agent runtime and tool protocol
│   ├── vbi-component/              # Shared component layer for VBI
│   ├── vquery/                     # Query layer for QueryDSL-to-SQL and data querying
│   ├── vseed/                      # Rendering layer for VSeedDSL-to-VChart/VTable specs
│   └── vbi-react/                  # React adapter and integration layer
├── practices/                      # Practice examples at different complexity levels
│   ├── standard/                   # Standard example
│   ├── minimalist/                 # Minimal implementation example
│   ├── professional/               # More business-oriented complete example
│   ├── streamlined/                # Streamlined structure example
│   └── vbi-react-starter/          # React Starter example
├── docs/                           # Repository documentation and historical context
│   ├── adr/                        # Unified entry for historical decisions, theme designs, and practice records
│   │   ├── repository/             # Repository-level architecture and decisions
│   │   ├── packages/               # Package-level historical documentation
│   │   └── practices/              # Practice-level historical documentation
│   ├── skills/                     # Agent-facing reference material
│   └── superpowers/                # Other topic-specific documentation
├── tools/                          # Development helper scripts and tools
├── README.md                       # Project overview and usage instructions
├── AGENTS.md                       # Coding Agent collaboration instructions
└── CLAUDE.md                       # Claude Code collaboration instructions
```

## Project Scope

VBI focuses on reusable packages and agent skills. `apps/` contains only the
documentation website; `practices/` contains package integration examples.
Standalone product applications and their deployment infrastructure are outside
this repository's scope.

## Development Guidelines

Repository-level development guidelines are maintained in
`.agents/skills/development/SKILL.md`.

Coding, refactoring, software entropy control, generated artifact handling, source
of truth decisions, and validation gates all follow the development skill. Local
`AGENTS.md` files only provide directory-specific additions and do not override the
development skill.
