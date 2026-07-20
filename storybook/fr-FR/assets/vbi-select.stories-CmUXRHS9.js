import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r,i;e((()=>{t={title:`ui/VbiSelect`,component:`vbi-select`,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{color:{control:`select`,options:[`primary`,`secondary`,`accent`,`success`,`warning`,`info`,`error`,`neutral`,`ghost`]},size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]}}},n={args:{placeholder:`Select option...`,options:[{label:`Option 1`,value:1},{label:`Option 2`,value:2},{label:`Option 3 (Disabled)`,value:3,disabled:!0},{label:`Option 4`,value:4}]}},r={render:()=>{let e=[{label:`Option 1`,value:1},{label:`Option 2`,value:2}],t=document.createElement(`div`);return t.style.display=`flex`,t.style.flexDirection=`column`,t.style.gap=`12px`,t.style.alignItems=`flex-start`,[`xs`,`sm`,`md`,`lg`,`xl`].forEach(n=>{let r=document.createElement(`vbi-select`);r.size=n,r.placeholder=`Size (${n})`,r.options=e,t.appendChild(r)}),t}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Select option...',
    options: [{
      label: 'Option 1',
      value: 1
    }, {
      label: 'Option 2',
      value: 2
    }, {
      label: 'Option 3 (Disabled)',
      value: 3,
      disabled: true
    }, {
      label: 'Option 4',
      value: 4
    }]
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const opts = [{
      label: 'Option 1',
      value: 1
    }, {
      label: 'Option 2',
      value: 2
    }];
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '12px';
    container.style.alignItems = 'flex-start';
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    sizes.forEach(size => {
      const select = document.createElement('vbi-select') as any;
      select.size = size;
      select.placeholder = \`Size (\${size})\`;
      select.options = opts;
      container.appendChild(select);
    });
    return container;
  }
}`,...r.parameters?.docs?.source}}},i=[`Default`,`Sizes`]}))();export{n as Default,r as Sizes,i as __namedExportsOrder,t as default};