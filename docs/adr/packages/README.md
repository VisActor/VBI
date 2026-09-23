# docs/adr/packages

This directory centralizes package-level designs, ADRs, plans, and example source files.

- `vbi/`: documentation related to `@visactor/vbi`
- `vquery/`: documentation related to `@visactor/vquery`
- `vseed/`: documentation related to `@visactor/vseed`
- `vbi-react/`: documentation related to `@visactor/vbi-react`
- `vbi-component/`: documentation related to `@visactor/vbi-component`

Organization principles:

- Split directories by package to avoid mixing content with repository-level `adr/`, `skills/`, or `superpowers/`.
- Keep the existing topic directory structure within each package.
- Store package-specific documentation resources, such as example body sources, under the corresponding package directory.
