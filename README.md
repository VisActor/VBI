# VBI

Build AI-oriented business intelligence applications with reusable, headless building blocks.

VBI describes charts, dashboards, and insights as serializable DSLs. Its Builders manage analysis configuration, while data connectors and rendering integrations let you bring your own data and UI.

[![CI](https://github.com/VisActor/VBI/actions/workflows/test.yml/badge.svg)](https://github.com/VisActor/VBI/actions/workflows/test.yml)
[![Deploy to GitHub Pages](https://github.com/VisActor/VBI/actions/workflows/deploy.yml/badge.svg)](https://github.com/VisActor/VBI/actions/workflows/deploy.yml)

**[View examples](https://visactor.github.io/VBI/en-US/examples/light-dashboard/) · [Try the playground](https://visactor.github.io/VBI/en-US/vbi/playground) · [Get started](https://visactor.github.io/VBI/en-US/vbi/)**

## Explore examples

- [Dashboard gallery](https://visactor.github.io/VBI/en-US/examples/light-dashboard/): browse interactive dashboards across different scenarios.
- [Chart Builder examples](https://visactor.github.io/VBI/en-US/vbi/examples/chart/): see how to configure chart types, dimensions, measures, and filters.
- [Dashboard Builder examples](https://visactor.github.io/VBI/en-US/vbi/examples/dashboard): combine charts and insights into a dashboard.
- [Standard practice](https://visactor.github.io/VBI/en-US/vbi/practices/standard): explore an interactive analysis interface built on VBI.

## Packages

| Package                                                                        | What it does                                                          | npm                                                                                                                 |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [@visactor/vbi](https://visactor.github.io/VBI/en-US/vbi/)                     | Manages chart, dashboard through headless Builders. | [![npm version](https://img.shields.io/npm/v/@visactor/vbi.svg)](https://www.npmjs.com/package/@visactor/vbi)       |
| [@visactor/vquery](https://visactor.github.io/VBI/en-US/vquery/)               | Lightweight Query Engine                                        | [![npm version](https://img.shields.io/npm/v/@visactor/vquery.svg)](https://www.npmjs.com/package/@visactor/vquery) |
| [@visactor/vseed](https://visactor.github.io/VBI/en-US/vseed/guide/quickStart) | Visualization Engine      | [![npm version](https://img.shields.io/npm/v/@visactor/vseed.svg)](https://www.npmjs.com/package/@visactor/vseed)   |

## Get started

Follow the [VBI quick start](https://visactor.github.io/VBI/en-US/vbi/#quick-start) to connect data, configure a chart with a Builder, and render it. You can also edit a working example in the [playground](https://visactor.github.io/VBI/en-US/vbi/playground).

## Agent skill

Install the VBI skill for coding agents:

```bash
npx skills add visactor/vbi
```
