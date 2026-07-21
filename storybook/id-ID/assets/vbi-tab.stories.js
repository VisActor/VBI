import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-tab.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiTab",
		component: "vbi-tab",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: { size: {
			control: "select",
			options: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl"
			]
		} }
	};
	Default = { args: { items: [
		{
			id: "tab-1",
			label: "Overview",
			active: true
		},
		{
			id: "tab-2",
			label: "Analytics"
		},
		{
			id: "tab-3",
			label: "Settings"
		},
		{
			id: "tab-4",
			label: "Disabled",
			disabled: true
		}
	] } };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    items: [{\n      id: 'tab-1',\n      label: 'Overview',\n      active: true\n    }, {\n      id: 'tab-2',\n      label: 'Analytics'\n    }, {\n      id: 'tab-3',\n      label: 'Settings'\n    }, {\n      id: 'tab-4',\n      label: 'Disabled',\n      disabled: true\n    }]\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
