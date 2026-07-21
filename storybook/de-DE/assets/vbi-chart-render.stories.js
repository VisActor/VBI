import { n as __esmMin } from "./rolldown-runtime.js";
//#region stories/chart/vbi-chart-render.stories.tsx
var meta, mockVSeed, Default, __namedExportsOrder;
//#endregion
__esmMin((() => {
	meta = {
		title: "chart/VbiChartRender",
		component: "vbi-chart-render",
		tags: ["autodocs"],
		parameters: { layout: "padded" },
		argTypes: { vseed: {
			control: "object",
			description: "The VSeed configuration object used to render the chart or table"
		} }
	};
	mockVSeed = {
		chartType: "column",
		dataset: [
			{
				month: "Monday",
				sales: 22
			},
			{
				month: "Tuesday",
				sales: 13
			},
			{
				month: "Wednesday",
				sales: 25
			},
			{
				month: "Thursday",
				sales: 29
			},
			{
				month: "Friday",
				sales: 38
			}
		],
		config: { column: {
			xField: "month",
			yField: "sales"
		} }
	};
	Default = {
		args: { vseed: mockVSeed },
		render: (args) => {
			const el = document.createElement("vbi-chart-render");
			Object.assign(el, args);
			el.style.height = "300px";
			el.style.width = "100%";
			el.style.display = "block";
			return el;
		}
	};
	Default.parameters = {
		...Default.parameters,
		docs: {
			...Default.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    vseed: mockVSeed\n  },\n  render: args => {\n    const el = document.createElement('vbi-chart-render');\n    Object.assign(el, args);\n    el.style.height = '300px';\n    el.style.width = '100%';\n    el.style.display = 'block';\n    return el;\n  }\n}",
				...Default.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Default"];
}))();
export { Default, __namedExportsOrder, meta as default };
