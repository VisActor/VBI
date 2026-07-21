import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-dropdown.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiDropdown",
		component: "vbi-dropdown",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
			"popover-mode": {
				control: "select",
				options: ["auto", "manual"]
			},
			trigger: {
				control: "select",
				options: ["click", "hover"]
			},
			placement: {
				control: "select",
				options: [
					"top",
					"top-start",
					"top-end",
					"bottom",
					"bottom-start",
					"bottom-end",
					"left",
					"left-start",
					"left-end",
					"right",
					"right-start",
					"right-end"
				]
			}
		}
	};
	Default = {
		args: {
			"popover-mode": "auto",
			trigger: "click"
		},
		render: (args) => {
			const el = document.createElement("vbi-dropdown");
			Object.entries(args).forEach(([key, value]) => {
				if (key.includes("-")) el.setAttribute(key, value);
				else el[key] = value;
			});
			el.innerHTML = `
      <vbi-button slot="trigger">Open Dropdown</vbi-button>
      <div slot="content" style="width: 200px; padding: 8px; border: 1px solid var(--color-base-300, #ccc); border-radius: var(--radius-box, 4px); background: var(--color-base-100, #fff); color: var(--color-base-content, #000);">
        Dropdown Content
      </div>
    `;
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    'popover-mode': 'auto',\n    trigger: 'click'\n  },\n  render: args => {\n    const el = document.createElement('vbi-dropdown');\n    Object.entries(args).forEach(([key, value]) => {\n      if (key.includes('-')) {\n        el.setAttribute(key, value as string);\n      } else {\n        ;\n        (el as any)[key] = value;\n      }\n    });\n    el.innerHTML = `\n      <vbi-button slot=\"trigger\">Open Dropdown</vbi-button>\n      <div slot=\"content\" style=\"width: 200px; padding: 8px; border: 1px solid var(--color-base-300, #ccc); border-radius: var(--radius-box, 4px); background: var(--color-base-100, #fff); color: var(--color-base-content, #000);\">\n        Dropdown Content\n      </div>\n    `;\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
