import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-loading.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiLoading",
		component: "vbi-loading",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
			type: {
				control: "select",
				options: [
					"spinner",
					"dots",
					"ring",
					"ball",
					"bars",
					"infinity"
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
			}
		}
	};
	Default = { args: {
		type: "spinner",
		size: "md",
		color: "primary"
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    type: 'spinner',\n    size: 'md',\n    color: 'primary'\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
