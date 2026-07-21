import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-checkbox.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiCheckbox",
		component: "vbi-checkbox",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
			color: {
				control: "select",
				options: [
					"primary",
					"secondary",
					"accent",
					"neutral",
					"info",
					"success",
					"warning",
					"error"
				]
			},
			size: {
				control: "select",
				options: [
					"xs",
					"sm",
					"md",
					"lg",
					"xl"
				]
			}
		}
	};
	Default = { args: {
		color: "primary",
		size: "md"
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    color: 'primary',\n    size: 'md'\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
