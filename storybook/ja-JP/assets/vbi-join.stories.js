import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-join.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiJoin",
		component: "vbi-join",
		tags: ["autodocs"],
		parameters: { layout: "centered" }
	};
	Default = {
		args: {},
		render: (args) => {
			const el = document.createElement("vbi-join");
			Object.assign(el, args);
			el.innerHTML = `
      <vbi-button>Button</vbi-button>
      <vbi-button>Button</vbi-button>
      <vbi-button>Button</vbi-button>
    `;
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {},\n  render: args => {\n    const el = document.createElement('vbi-join');\n    Object.assign(el, args);\n    el.innerHTML = `\n      <vbi-button>Button</vbi-button>\n      <vbi-button>Button</vbi-button>\n      <vbi-button>Button</vbi-button>\n    `;\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
