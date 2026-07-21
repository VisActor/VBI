import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-select.stories.tsx
var meta, Default, Sizes, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiSelect",
		component: "vbi-select",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
			color: {
				control: "select",
				options: [
					"primary",
					"secondary",
					"accent",
					"success",
					"warning",
					"info",
					"error",
					"neutral",
					"ghost"
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
		placeholder: "Select option...",
		options: [
			{
				label: "Option 1",
				value: 1
			},
			{
				label: "Option 2",
				value: 2
			},
			{
				label: "Option 3 (Disabled)",
				value: 3,
				disabled: true
			},
			{
				label: "Option 4",
				value: 4
			}
		]
	} };
	Sizes = { render: () => {
		const opts = [{
			label: "Option 1",
			value: 1
		}, {
			label: "Option 2",
			value: 2
		}];
		const container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexDirection = "column";
		container.style.gap = "12px";
		container.style.alignItems = "flex-start";
		[
			"xs",
			"sm",
			"md",
			"lg",
			"xl"
		].forEach((size) => {
			const select = document.createElement("vbi-select");
			select.size = size;
			select.placeholder = `Size (${size})`;
			select.options = opts;
			container.appendChild(select);
		});
		return container;
	} };
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    placeholder: 'Select option...',\n    options: [{\n      label: 'Option 1',\n      value: 1\n    }, {\n      label: 'Option 2',\n      value: 2\n    }, {\n      label: 'Option 3 (Disabled)',\n      value: 3,\n      disabled: true\n    }, {\n      label: 'Option 4',\n      value: 4\n    }]\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	Sizes.parameters = {
		...Sizes.parameters,
		docs: {
			...Sizes.parameters?.docs,
			source: {
				originalSource: "{\n  render: () => {\n    const opts = [{\n      label: 'Option 1',\n      value: 1\n    }, {\n      label: 'Option 2',\n      value: 2\n    }];\n    const container = document.createElement('div');\n    container.style.display = 'flex';\n    container.style.flexDirection = 'column';\n    container.style.gap = '12px';\n    container.style.alignItems = 'flex-start';\n    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];\n    sizes.forEach(size => {\n      const select = document.createElement('vbi-select') as any;\n      select.size = size;\n      select.placeholder = `Size (${size})`;\n      select.options = opts;\n      container.appendChild(select);\n    });\n    return container;\n  }\n}",
				...Sizes.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default", "Sizes"];
}))();
export { Default, Sizes, __namedExportsOrder, meta as default };
