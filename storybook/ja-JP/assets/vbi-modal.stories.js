import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/ui/vbi-modal.stories.tsx
var meta, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "ui/VbiModal",
		component: "vbi-modal",
		tags: ["autodocs"],
		parameters: { layout: "padded" },
		argTypes: { position: {
			control: "select",
			options: [
				"top",
				"bottom",
				"middle",
				"start",
				"end"
			]
		} }
	};
	Default = {
		args: {
			open: false,
			position: "middle"
		},
		render: (args) => {
			const container = document.createElement("div");
			const btn = document.createElement("vbi-button");
			btn.innerHTML = "Open Modal";
			const modal = document.createElement("vbi-modal");
			modal.id = "default-modal";
			Object.assign(modal, args);
			modal.innerHTML = `
      <h3 style="margin-top: 0;">Modal Title</h3>
      <p>Default modal content goes here.</p>
      <div slot="action" style="display: flex; gap: 8px; justify-content: flex-end;">
        <vbi-button id="close-modal">Close</vbi-button>
        <vbi-button id="confirm-modal" color="primary">Confirm</vbi-button>
      </div>
    `;
			btn.addEventListener("click", () => {
				modal.open = true;
			});
			container.appendChild(btn);
			container.appendChild(modal);
			setTimeout(() => {
				modal.querySelector("#close-modal")?.addEventListener("click", () => {
					modal.open = false;
				});
				modal.querySelector("#confirm-modal")?.addEventListener("click", () => {
					modal.open = false;
				});
			}, 0);
			return container;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    open: false,\n    position: 'middle'\n  },\n  render: args => {\n    const container = document.createElement('div');\n    const btn = document.createElement('vbi-button');\n    btn.innerHTML = 'Open Modal';\n    const modal = document.createElement('vbi-modal') as any;\n    modal.id = 'default-modal';\n    Object.assign(modal, args);\n    modal.innerHTML = `\n      <h3 style=\"margin-top: 0;\">Modal Title</h3>\n      <p>Default modal content goes here.</p>\n      <div slot=\"action\" style=\"display: flex; gap: 8px; justify-content: flex-end;\">\n        <vbi-button id=\"close-modal\">Close</vbi-button>\n        <vbi-button id=\"confirm-modal\" color=\"primary\">Confirm</vbi-button>\n      </div>\n    `;\n    btn.addEventListener('click', () => {\n      modal.open = true;\n    });\n    container.appendChild(btn);\n    container.appendChild(modal);\n\n    // Defer adding event listeners to children until they are parsed\n    setTimeout(() => {\n      modal.querySelector('#close-modal')?.addEventListener('click', () => {\n        modal.open = false;\n      });\n      modal.querySelector('#confirm-modal')?.addEventListener('click', () => {\n        modal.open = false;\n      });\n    }, 0);\n    return container;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
