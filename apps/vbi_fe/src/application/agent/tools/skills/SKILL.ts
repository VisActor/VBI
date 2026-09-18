export const vbiApplicationSkill = `
# VBI Application Skill

Use this skill before operating the VBI web application through the browser agent tools.

Available tools:
- read_skill: read this entrypoint or one focused reference.
- vbi_application: run trusted JavaScript against the semantic VBI application API.

Workflow:
1. Call read_skill with { "action": "list" } first.
2. Choose the focused reference that matches the task.
3. Call read_skill with { "action": "read", "skill": "<reference_name>" } before writing vbi_application code.
4. Use only application, VBI, snapshot, waitFor, json, assert, and console inside vbi_application scripts.
5. Return json(serializableValue) from every vbi_application script.

Core rules:
- The application argument is a Zustand StoreApi. Read current capabilities with application.getState(), then call semantic domain commands from that state.
- Durable behavior must go through the semantic application API instead of private stores, router internals, DOM nodes, localStorage, or provider clients.
- Before changing selectable values, inspect available values through list-style APIs such as application.getState().theme.list(), application.getState().i18n.list(), application.getState().agent.model.list(), application.getState().agent.model.listThinking(), application.getState().layout.sidePanel.listMode(), and application.getState().layout.workspacePlacement.list().
- Before calling id-based commands such as open, rename, delete, connect, select, addChart, or removePage, derive and verify ids from list(), items, pages, pageSections, or the current snapshot.
- Do not hardcode enum-like values or ids unless the user gave an exact value and the relevant list or state confirms it exists.
- Builder or DSL changes must go through Builder APIs exposed by application sessions or VBI Builder objects.

References:
- application_overview: Tool usage rules, snapshot/waitFor/json patterns, and cross-domain safety checks.
- resources: application.getState().chart and application.getState().insight resource workflows.
- layout_preferences: application.getState().layout, application.getState().theme, and application.getState().i18n preferences.
- agent: application.getState().agent conversation, model, thinking, and panel operations.
- builder_api: VBI namespace and Builder API operations from vbi_application.

Reference names are stable API for read_skill.action === "read". Prefer reading the narrowest
reference needed for the task, then execute the smallest application script that proves the change.
`.trim()
