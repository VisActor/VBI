export const vbiSourcesLookupSkill = `
# How to Use VBI Sources Lookup Skill

Use this skill before editing an existing VBI resource when the user gives a human name, partial name, or vague target.

The lookup tool is discovery-only. It never creates resources, removes resources, renames resources, reads full DSL, or mutates Builder state. After you find a stable id, call the matching resource tool: <code>vbi_chart</code> or <code>vbi_insight</code>.

Always prefer ids returned by <code>vbi_resource_lookup</code>. Human names can be duplicated or empty.

## read_skill

Use <code>read_skill</code> to load these teaching skills.

- <code>{ "action": "list" }</code> returns every skill name and title.
- <code>{ "action": "read", "skill": "chart" }</code> returns one skill body.
- Valid <code>skill</code> values are: <code>resource_lookup</code>, <code>chart</code>, <code>insight</code>.
- Only <code>action</code> and optional <code>skill</code> are accepted.

Example: list available skills.

~~~json
{
  "action": "list"
}
~~~

Example: read the chart builder skill before configuring dimensions and measures.

~~~json
{
  "action": "read",
  "skill": "chart"
}
~~~

## vbi_resource_lookup

Input fields:

- <code>resource</code>: optional. One of <code>"all"</code>, <code>"chart"</code>, or <code>"insight"</code>. Default is <code>"all"</code>.
- <code>query</code>: optional string. Case-insensitive substring match against resource id and name.
- <code>limit</code>: optional number. Defaults to 20. Values are floored and clamped to 1 through 100.

Output shape:

- For one resource type: <code>{ resource, items }</code>.
- For <code>"all"</code>: <code>{ charts, insights }</code>.
- Items are <code>VBIResourceSummary</code> objects with at least <code>id</code> and optional <code>name</code>; providers may include fields such as <code>createdAt</code> and <code>updatedAt</code>.

Example: list every resource type before choosing a target.

~~~json
{
  "resource": "all",
  "limit": 20
}
~~~

Example: find chart resources whose id or name contains "revenue".

~~~json
{
  "resource": "chart",
  "query": "revenue",
  "limit": 10
}
~~~

Example workflow for a chart edit:

1. Call <code>vbi_resource_lookup</code> with <code>{ "resource": "chart", "query": "monthly" }</code>.
2. Choose the chart id from the returned summaries.
3. Call <code>vbi_chart</code> with <code>action: "run"</code> and the selected id.
`.trim()
