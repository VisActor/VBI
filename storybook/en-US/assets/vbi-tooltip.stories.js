import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-tooltip.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiTooltip",
		component: "vbi-tooltip",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
			position: {
				control: "select",
				options: [
					"top",
					"bottom",
					"left",
					"right",
					"top-start",
					"top-end",
					"bottom-start",
					"bottom-end",
					"left-start",
					"left-end",
					"right-start",
					"right-end"
				]
			},
			color: {
				control: "select",
				options: [
					"primary",
					"secondary",
					"accent",
					"info",
					"success",
					"warning",
					"error"
				]
			},
			trigger: {
				control: "select",
				options: [
					"hover",
					"click",
					"manual"
				]
			}
		}
	};
	Default = {
		args: {
			text: "This is a very long tooltip text to demonstrate the placement behavior for start and end positions.",
			position: "top",
			open: false
		},
		render: (args) => {
			const el = document.createElement("vbi-tooltip");
			Object.assign(el, args);
			el.innerHTML = `<vbi-button>Hover me</vbi-button>`;
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    text: 'This is a very long tooltip text to demonstrate the placement behavior for start and end positions.',\n    position: 'top',\n    open: false\n  },\n  render: args => {\n    const el = document.createElement('vbi-tooltip');\n    Object.assign(el, args);\n    el.innerHTML = `<vbi-button>Hover me</vbi-button>`;\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
