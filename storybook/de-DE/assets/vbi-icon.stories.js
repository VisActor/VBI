import { n as __esmMin } from "./rolldown-runtime.js";
import { r as init_es, u as LikeFilled } from "./vendor.js";
//#region stories/ui/vbi-icon.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_es();
	meta = {
		title: "ui/VbiIcon",
		component: "vbi-icon",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: { color: { control: "color" } }
	};
	Default = {
		args: {
			icon: LikeFilled,
			size: 24,
			color: "var(--color-primary)"
		},
		render: (args) => {
			const el = document.createElement("vbi-icon");
			Object.assign(el, args);
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    icon: LikeFilled,\n    size: 24,\n    color: 'var(--color-primary)'\n  },\n  render: args => {\n    const el = document.createElement('vbi-icon');\n    Object.assign(el, args);\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
