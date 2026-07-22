import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/chart/vbi-chart-editor.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		component: "vbi-chart-editor",
		title: "chart/VbiChartEditor",
		parameters: { layout: "padded" },
		argTypes: {}
	};
	Default = { render: (args) => {
		const locale = "ja-JP";
		const provider = document.createElement("vbi-config-provider");
		const editor = document.createElement("vbi-chart-editor");
		Object.assign(editor, args);
		provider.addEventListener("vbiBuilderChange", ((e) => {
			e.detail.locale.setLocale(locale);
		}));
		provider.appendChild(editor);
		return provider;
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  render: args => {\n    const locale = import.meta.env.STORYBOOK_LOCALE ?? 'en-US';\n    const provider = document.createElement('vbi-config-provider');\n    const editor = document.createElement('vbi-chart-editor');\n    Object.assign(editor, args);\n    provider.addEventListener('vbiBuilderChange', ((e: CustomEvent) => {\n      e.detail.locale.setLocale(locale);\n    }) as EventListener);\n    provider.appendChild(editor);\n    return provider;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
