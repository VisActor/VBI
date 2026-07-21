import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-config-provider.stories.tsx
var lightTheme, darkTheme, meta, DefaultLight, DarkMode, CustomTheme, __namedExportsOrder;
//#endregion
__esmMin((() => {
	lightTheme = { tokens: {
		colorBase100: "#ffffff",
		colorBaseContent: "#000000",
		radiusBox: "4px"
	} };
	darkTheme = { tokens: {
		colorBase100: "#000000",
		colorBaseContent: "#ffffff",
		radiusBox: "4px"
	} };
	meta = {
		title: "ui/VbiConfigProvider",
		component: "vbi-config-provider",
		tags: ["autodocs"],
		parameters: { layout: "padded" },
		argTypes: { theme: { control: "object" } },
		args: { theme: lightTheme }
	};
	DefaultLight = {
		args: { theme: lightTheme },
		render: (args) => {
			const el = document.createElement("vbi-config-provider");
			Object.assign(el, args);
			el.innerHTML = `
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Light Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    `;
			return el;
		}
	};
	DarkMode = {
		args: { theme: darkTheme },
		render: (args) => {
			const el = document.createElement("vbi-config-provider");
			Object.assign(el, args);
			el.innerHTML = `
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Dark Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    `;
			return el;
		}
	};
	CustomTheme = {
		args: { theme: { tokens: {
			colorBase100: "oklch(20% 0.1 140)",
			colorBaseContent: "oklch(95% 0.05 140)",
			radiusBox: "2rem"
		} } },
		render: (args) => {
			const el = document.createElement("vbi-config-provider");
			Object.assign(el, args);
			el.innerHTML = `
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Custom Theme)</h3>
        <p style="margin: 0 0 1.5rem 0;">Custom background and extra rounded corners.</p>
      </div>
    `;
			return el;
		}
	};
	DefaultLight.parameters = {
		...DefaultLight.parameters,
		docs: {
			...DefaultLight.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    theme: lightTheme\n  },\n  render: args => {\n    const el = document.createElement('vbi-config-provider');\n    Object.assign(el, args);\n    el.innerHTML = `\n      <div style=\"padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);\">\n        <h3 style=\"margin: 0 0 1rem 0;\">Config Provider (Light Mode)</h3>\n        <p style=\"margin: 0 0 1.5rem 0;\">This area is themed using the Config Provider.</p>\n      </div>\n    `;\n    return el;\n  }\n}",
				...DefaultLight.parameters?.docs?.source
			}
		}
	};
	DarkMode.parameters = {
		...DarkMode.parameters,
		docs: {
			...DarkMode.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    theme: darkTheme\n  },\n  render: args => {\n    const el = document.createElement('vbi-config-provider');\n    Object.assign(el, args);\n    el.innerHTML = `\n      <div style=\"padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);\">\n        <h3 style=\"margin: 0 0 1rem 0;\">Config Provider (Dark Mode)</h3>\n        <p style=\"margin: 0 0 1.5rem 0;\">This area is themed using the Config Provider.</p>\n      </div>\n    `;\n    return el;\n  }\n}",
				...DarkMode.parameters?.docs?.source
			}
		}
	};
	CustomTheme.parameters = {
		...CustomTheme.parameters,
		docs: {
			...CustomTheme.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    theme: {\n      tokens: {\n        colorBase100: 'oklch(20% 0.1 140)',\n        // Dark forest green background\n        colorBaseContent: 'oklch(95% 0.05 140)',\n        radiusBox: '2rem'\n      }\n    }\n  },\n  render: args => {\n    const el = document.createElement('vbi-config-provider');\n    Object.assign(el, args);\n    el.innerHTML = `\n      <div style=\"padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);\">\n        <h3 style=\"margin: 0 0 1rem 0;\">Config Provider (Custom Theme)</h3>\n        <p style=\"margin: 0 0 1.5rem 0;\">Custom background and extra rounded corners.</p>\n      </div>\n    `;\n    return el;\n  }\n}",
				...CustomTheme.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = [
		"DefaultLight",
		"DarkMode",
		"CustomTheme"
	];
}))();
export { CustomTheme, DarkMode, DefaultLight, __namedExportsOrder, meta as default };
