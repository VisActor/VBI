export const resourcesSkill = `
# Resource Application API

Use application.getState().chart and application.getState().insight for resource workflows.

Shared resource commands:
- await application.getState().chart.list()
- await application.getState().chart.create({ name })
- await application.getState().chart.open(id)
- await application.getState().chart.rename({ id, name })
- await application.getState().chart.delete(id)
- application.getState().chart.activate({ userName })
- application.getState().chart.records.search(text)
- application.getState().chart.records.select(ids)
- await application.getState().chart.records.deleteSelected()
- application.getState().chart.editor.connect(id, userName)
- await application.getState().chart.editor.release(id)

Use the same shape for insight:
- application.getState().insight.*

Resource state:
- application.getState().chart.records.loading
- application.getState().chart.records.searchText
- application.getState().chart.records.selectedIds
- application.getState().chart.records.visibleItems
- application.getState().chart.editor.builders

Call list() before open(id), rename({ id, name }), delete(id), editor.connect(id, userName), or records.select(ids).
Use ids returned from list(), not display names, once a resource has been found. Human names may be
empty or duplicated. If selecting from records.visibleItems, activate the resource list first and verify
every selected id is visible or returned by list(). Do not invent ids.

Example:

const items = await application.getState().chart.list();
const target = items.find((item) => item.name?.includes("Revenue"));
assert(target, "No Revenue chart found");
assert(items.some((item) => item.id === target.id), "Chart id must be returned by application.getState().chart.list()");
await application.getState().chart.open(target.id);
application.getState().chart.records.select([target.id]);
return json({ openedChartId: target.id, selectedIds: snapshot().chart.records.selectedIds, routeState: snapshot().chart.records });
`.trim()
