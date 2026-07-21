import { n as __esmMin } from "./rolldown-runtime.js";
import { c as MailOutlined, i as UserOutlined, o as SettingOutlined, r as init_es } from "./vendor.js";
//#region stories/ui/vbi-menu.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_es();
	meta = {
		title: "ui/VbiMenu",
		component: "vbi-menu",
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
					label: "Main Navigation",
					isTitle: true
				},
				{
					label: "Dashboard",
					icon: SettingOutlined,
					url: "#",
					isActive: true
				},
				{
					label: "Profile",
					icon: UserOutlined,
					disabled: true
				},
				{
					label: "Messages",
					icon: MailOutlined,
					badge: "99+",
					url: "#"
				},
				{
					label: "Preferences",
					isTitle: true
				},
				{
					label: "Settings",
					icon: SettingOutlined,
					children: [{ label: "Account" }, {
						label: "Privacy",
						badge: "New"
					}]
				}
			]
		},
		render: (args) => {
			const el = document.createElement("vbi-menu");
			Object.assign(el, args);
			el.addEventListener("vbiMenuSelect", (e) => console.log("Clicked item:", e.detail));
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    size: 'md',\n    variant: 'vertical',\n    items: [{\n      label: 'Main Navigation',\n      isTitle: true\n    }, {\n      label: 'Dashboard',\n      icon: SettingOutlined,\n      url: '#',\n      isActive: true\n    }, {\n      label: 'Profile',\n      icon: UserOutlined,\n      disabled: true\n    }, {\n      label: 'Messages',\n      icon: MailOutlined,\n      badge: '99+',\n      url: '#'\n    }, {\n      label: 'Preferences',\n      isTitle: true\n    }, {\n      label: 'Settings',\n      icon: SettingOutlined,\n      children: [{\n        label: 'Account'\n      }, {\n        label: 'Privacy',\n        badge: 'New'\n      }]\n    }]\n  },\n  render: args => {\n    const el = document.createElement('vbi-menu');\n    Object.assign(el, args);\n    el.addEventListener('vbiMenuSelect', (e: any) => console.log('Clicked item:', e.detail));\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
