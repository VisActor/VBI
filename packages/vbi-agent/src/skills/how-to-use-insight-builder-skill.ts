export const insightBuilderSkill = `
# How to Use Insight Builder Skill

Use this skill when the user asks to create, inspect, rename, remove, or edit textual business insight content.

The public insight Builder is intentionally small. Open the resource, call <code>setContent(markdownOrText)</code>, and verify with <code>build()</code> or <code>isEmpty()</code>. Do not mutate <code>b.dsl</code> directly when <code>setContent</code> is available.

## vbi_insight input contract

Accepted fields are <code>action</code>, <code>id</code>, <code>name</code>, <code>content</code>, and <code>code</code>.

- <code>action: "create"</code>: creates an insight resource. Optional <code>name</code> and optional initial <code>content</code>.
- <code>action: "get"</code>: reads provider metadata for one insight. Requires <code>id</code>. The tool output strips any <code>dsl</code> field; use <code>run</code> to inspect content through Builder DSL.
- <code>action: "rename"</code>: renames one insight. Requires <code>id</code> and <code>name</code>.
- <code>action: "remove"</code>: removes one insight. Requires <code>id</code>.
- <code>action: "run"</code>: opens an insight Builder and runs JavaScript. Requires <code>code</code>; optional <code>id</code>.

Example: create an insight with initial content.

~~~json
{
  "action": "create",
  "name": "Retention risk summary",
  "content": "High value customers slowed their repurchase pace in the last 30 days."
}
~~~

Example: rename an insight.

~~~json
{
  "action": "rename",
  "id": "insight-id-from-vbi_resource_lookup",
  "name": "Retention action summary"
}
~~~

## Run scripts

For <code>action: "run"</code>, the script receives <code>insight</code>, <code>builder</code>, <code>workspace</code>, <code>json</code>, <code>assert</code>, and <code>console</code>. <code>builder</code> is an alias of <code>insight</code>.

Open with <code>const b = await insight.open()</code> when the tool input has <code>id</code>; use <code>await insight.open("insight-id")</code> only when the script must choose the id.

The opened object is <code>VBIInsightBuilder</code>. Public properties are <code>b.doc</code>, <code>b.dsl</code>, and <code>b.undoManager</code>.

## VBIInsightBuilder interface

- <code>b.getUUID(): string</code>: stable insight uuid. Example: <code>const id = b.getUUID();</code>
- <code>b.setContent(content: string)</code>: sets markdown or text content and returns the builder for chaining.
- <code>b.build(): VBIInsightDSL</code>: returns <code>{ uuid, content, version }</code>. Defaults are <code>content: ""</code> and <code>version: 0</code>.
- <code>b.isEmpty(): boolean</code>: true when content is empty.
- <code>b.encodeStateAsUpdate(targetStateVector?)</code>: returns a Yjs update.
- <code>b.applyUpdate(update, origin?)</code>: applies a Yjs update.
- <code>b.undoManager.undo()</code>, <code>redo()</code>, <code>canUndo()</code>, <code>canRedo()</code>, <code>clear(clearUndoStack?, clearRedoStack?)</code>.

Example: update content and verify the result.

~~~js
const b = await insight.open();
assert(b.isEmpty(), "new insight is expected to be empty before content is written");

b.setContent(
  "High value customers slowed their repurchase pace in the last 30 days. The operations team should prioritize enterprise customers and review discount strategy."
);

const insightDsl = b.build();
assert(
  insightDsl.content.includes("High value customers"),
  "updated insight content must contain the business subject"
);

return json({
  insight: insightDsl,
  empty: b.isEmpty()
});
~~~

Example tool input for that script.

~~~json
{
  "action": "run",
  "id": "insight-id-from-vbi_resource_lookup",
  "code": "const b = await insight.open();\\nb.setContent(\\"High value customers slowed their repurchase pace in the last 30 days.\\");\\nreturn json({ insight: b.build(), empty: b.isEmpty() });"
}
~~~

Example: sync insight content to another insight.

~~~js
const source = await insight.open("source-insight-id");
const target = await insight.open("target-insight-id");
target.applyUpdate(source.encodeStateAsUpdate(), "copy-insight-content");
return json({ target: target.build() });
~~~
`.trim()
