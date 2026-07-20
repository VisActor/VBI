import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r;e((()=>{t={title:`ui/VbiTooltip`,component:`vbi-tooltip`,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{position:{control:`select`,options:[`top`,`bottom`,`left`,`right`,`top-start`,`top-end`,`bottom-start`,`bottom-end`,`left-start`,`left-end`,`right-start`,`right-end`]},color:{control:`select`,options:[`primary`,`secondary`,`accent`,`info`,`success`,`warning`,`error`]},trigger:{control:`select`,options:[`hover`,`click`,`manual`]}}},n={args:{text:`Simple tooltip`,position:`top`,open:!1},render:e=>{let t=document.createElement(`vbi-tooltip`);return Object.assign(t,e),t.innerHTML=`<vbi-button>Hover me</vbi-button>`,t}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Simple tooltip',
    position: 'top',
    open: false
  },
  render: args => {
    const el = document.createElement('vbi-tooltip');
    Object.assign(el, args);
    el.innerHTML = \`<vbi-button>Hover me</vbi-button>\`;
    return el;
  }
}`,...n.parameters?.docs?.source}}},r=[`Default`]}))();export{n as Default,r as __namedExportsOrder,t as default};