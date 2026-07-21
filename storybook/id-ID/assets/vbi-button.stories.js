import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-button.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		component: "vbi-button",
		title: "ui/VbiButton",
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
			variant: {
				control: "select",
				options: [
					"ghost",
					"outline",
					"dash",
					"soft",
					"link"
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
			},
			shape: {
				control: "select",
				options: [
					"square",
					"circle",
					"wide",
					"block"
				]
			},
			type: {
				control: "select",
				options: [
					"button",
					"submit",
					"reset"
				]
			}
		}
	};
	Default = { args: { innerHTML: "Test" } };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    innerHTML: 'Test'\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
