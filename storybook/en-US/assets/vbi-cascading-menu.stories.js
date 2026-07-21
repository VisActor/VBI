import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-cascading-menu.stories.tsx
var meta, Default, WithSlots, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiCascadingMenu",
		component: "vbi-cascading-menu",
		tags: ["autodocs"],
		parameters: { layout: "centered" },
		argTypes: {
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
				control: "select",
				options: ["horizontal", "vertical"]
			}
		}
	};
	Default = {
		args: {
			size: "md",
			variant: "vertical",
			items: [
				{
					label: "Dashboard",
					isActive: true
				},
				{
					label: "Profile",
					disabled: true
				},
				{
					label: "Messages",
					children: [{ label: "Inbox" }, { label: "Sent" }]
				},
				{
					label: "Settings",
					children: [{
						label: "Account",
						children: [{ label: "Personal Info" }, { label: "Security" }]
					}, { label: "Privacy" }]
				}
			]
		},
		render: (args) => {
			const el = document.createElement("vbi-cascading-menu");
			Object.assign(el, args);
			el.addEventListener("vbiCascadingMenuSelect", (e) => console.log("Clicked item:", e.detail));
			return el;
		}
	};
	WithSlots = {
		args: {
			size: "md",
			variant: "vertical",
			items: [
				{ label: "Dashboard" },
				{ slot: "custom-profile" },
				{
					label: "Settings",
					children: [{ slot: "custom-account" }, { label: "Privacy" }]
				}
			]
		},
		render: (args) => {
			const el = document.createElement("vbi-cascading-menu");
			Object.assign(el, args);
			el.addEventListener("vbiCascadingMenuSelect", (e) => console.log("Clicked item:", e.detail));
			el.innerHTML = `
      <div slot="custom-profile" style="display: flex; align-items: center; gap: 8px; padding: 4px 0;">
        <div style="line-height: 1.2;">
          <strong>John Doe</strong>
          <div style="font-size: 10px;">admin@example.com</div>
        </div>
      </div>
      <div slot="custom-account" style="display: flex; align-items: center; gap: 8px; color: var(--color-primary);">
        <span>🛡️</span>
        <span>Security & Account</span>
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
				originalSource: "{\n  args: {\n    size: 'md',\n    variant: 'vertical',\n    items: [{\n      label: 'Dashboard',\n      isActive: true\n    }, {\n      label: 'Profile',\n      disabled: true\n    }, {\n      label: 'Messages',\n      children: [{\n        label: 'Inbox'\n      }, {\n        label: 'Sent'\n      }]\n    }, {\n      label: 'Settings',\n      children: [{\n        label: 'Account',\n        children: [{\n          label: 'Personal Info'\n        }, {\n          label: 'Security'\n        }]\n      }, {\n        label: 'Privacy'\n      }]\n    }]\n  },\n  render: args => {\n    const el = document.createElement('vbi-cascading-menu');\n    Object.assign(el, args);\n    el.addEventListener('vbiCascadingMenuSelect', (e: any) => console.log('Clicked item:', e.detail));\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	WithSlots.parameters = {
		...WithSlots.parameters,
		docs: {
			...WithSlots.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    size: 'md',\n    variant: 'vertical',\n    items: [{\n      label: 'Dashboard'\n    }, {\n      slot: 'custom-profile'\n    }, {\n      label: 'Settings',\n      children: [{\n        slot: 'custom-account'\n      }, {\n        label: 'Privacy'\n      }]\n    }]\n  },\n  render: args => {\n    const el = document.createElement('vbi-cascading-menu');\n    Object.assign(el, args);\n    el.addEventListener('vbiCascadingMenuSelect', (e: any) => console.log('Clicked item:', e.detail));\n    el.innerHTML = `\n      <div slot=\"custom-profile\" style=\"display: flex; align-items: center; gap: 8px; padding: 4px 0;\">\n        <div style=\"line-height: 1.2;\">\n          <strong>John Doe</strong>\n          <div style=\"font-size: 10px;\">admin@example.com</div>\n        </div>\n      </div>\n      <div slot=\"custom-account\" style=\"display: flex; align-items: center; gap: 8px; color: var(--color-primary);\">\n        <span>🛡️</span>\n        <span>Security & Account</span>\n      </div>\n    `;\n    return el;\n  }\n}",
				...WithSlots.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default", "WithSlots"];
}))();
export { Default, WithSlots, __namedExportsOrder, meta as default };
