export const applicationOverviewSkill = `
# Application Tool Overview

Use this skill before non-trivial VBI web application operations.

The browser agent has two tools:
- read_skill: list or read lazy application skills.
- vbi_application: run trusted JavaScript against the semantic application API.

The script receives application, VBI, snapshot, waitFor, json, assert, and console. The application argument is a Zustand StoreApi; read current capabilities through application.getState().

Rules:
- Use only application.getState().chart, application.getState().insight, application.getState().layout, application.getState().theme, application.getState().i18n, and application.getState().agent.
- Do not access zustand stores, router internals, DOM nodes, window private fields, localStorage, or provider clients directly.
- Return json(serializableValue) from every script.
- Use snapshot() for a compact serializable state projection.
- Use waitFor(() => condition) when an application command triggers async state changes.
- Builder or DSL changes must go through Builder APIs exposed by application sessions or VBI Builder objects.
- Before changing selectable values, inspect available values through grouped APIs such as application.getState().theme.list(), application.getState().i18n.list(), application.getState().agent.model.list(), and application.getState().layout.sidePanel.listMode().
- Before calling id-based commands such as open, rename, delete, connect, select, addChart, or removePage, derive and verify ids from list(), items, pages, pageSections, or the current snapshot.
- Do not hardcode enum-like values or ids unless the user gave an exact value and the relevant list or state confirms it exists.

Example:

const before = snapshot().theme.mode;
const availableThemes = application.getState().theme.list();
const nextTheme = [...availableThemes.light, ...availableThemes.dark].find((mode) => mode !== before) ?? before;
const beforeLocale = snapshot().i18n.locale;
const availableLocales = application.getState().i18n.list();
const nextLocale = availableLocales.find((locale) => locale !== beforeLocale) ?? beforeLocale;
assert([...availableThemes.light, ...availableThemes.dark].includes(nextTheme), "Theme must be returned by application.getState().theme.list()");
assert(availableLocales.includes(nextLocale), "Locale must be returned by application.getState().i18n.list()");
application.getState().theme.change(nextTheme);
application.getState().i18n.change(nextLocale);
return json({ availableLocales, availableThemes, before, beforeLocale, after: snapshot().theme.mode, afterLocale: snapshot().i18n.locale });
`.trim()
