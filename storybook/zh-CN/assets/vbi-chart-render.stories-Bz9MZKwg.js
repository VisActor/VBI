import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r,i;e((()=>{t={title:`chart/VbiChartRender`,component:`vbi-chart-render`,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{vseed:{control:`object`,description:`The VSeed configuration object used to render the chart or table`}}},n={chartType:`column`,dataset:[{month:`Monday`,sales:22},{month:`Tuesday`,sales:13},{month:`Wednesday`,sales:25},{month:`Thursday`,sales:29},{month:`Friday`,sales:38}],config:{column:{xField:`month`,yField:`sales`}}},r={args:{vseed:n},render:e=>{let t=document.createElement(`vbi-chart-render`);return Object.assign(t,e),t.style.height=`300px`,t.style.width=`100%`,t.style.display=`block`,t}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    vseed: mockVSeed
  },
  render: args => {
    const el = document.createElement('vbi-chart-render');
    Object.assign(el, args);
    el.style.height = '300px';
    el.style.width = '100%';
    el.style.display = 'block';
    return el;
  }
}`,...r.parameters?.docs?.source}}},i=[`Default`]}))();export{r as Default,i as __namedExportsOrder,t as default};