---
'@visactor/vseed': minor
---

Add `cornerRadius` to bar, column, histogram, dual-axis, and racing charts, with per-mark rounding enabled by default to support smooth updates.

`stackCornerRadius` is now a boolean switch for whole-stack clipping. Move numeric or array values previously assigned to `stackCornerRadius` into `cornerRadius`, and set `stackCornerRadius: true` when whole-stack rounding is required. In that mode, `cornerRadius` takes precedence over `barStyle.barRadius`.
