import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-input.stories.tsx
var meta, Default, WithSlots, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiInput",
		component: "vbi-input",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
			value: { control: "text" },
			type: { control: "text" },
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
			},
			variant: {
				control: "radio",
				options: ["default", "ghost"],
				mapping: {
					default: void 0,
					ghost: "ghost"
				}
			}
		}
	};
	Default = { args: {
		value: "",
		placeholder: "Type something...",
		type: "text",
		color: "primary",
		size: "md"
	} };
	WithSlots = {
		args: {
			value: "",
			placeholder: "Enter amount",
			type: "text",
			color: "primary",
			size: "md"
		},
		render: (args) => {
			const el = document.createElement("vbi-input");
			Object.assign(el, args);
			el.innerHTML = `
      <span slot="prefix" style="color: var(--color-base-content)">$</span>
      <span slot="suffix" style="color: var(--color-base-content)">USD</span>
    `;
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    value: '',\n    placeholder: 'Type something...',\n    type: 'text',\n    color: 'primary',\n    size: 'md'\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	WithSlots.parameters = {
		...WithSlots.parameters,
		docs: {
			...WithSlots.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    value: '',\n    placeholder: 'Enter amount',\n    type: 'text',\n    color: 'primary',\n    size: 'md'\n  },\n  render: args => {\n    const el = document.createElement('vbi-input');\n    Object.assign(el, args);\n    el.innerHTML = `\n      <span slot=\"prefix\" style=\"color: var(--color-base-content)\">$</span>\n      <span slot=\"suffix\" style=\"color: var(--color-base-content)\">USD</span>\n    `;\n    return el;\n  }\n}",
				...WithSlots.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default", "WithSlots"];
}))();
export { Default, WithSlots, __namedExportsOrder, meta as default };
