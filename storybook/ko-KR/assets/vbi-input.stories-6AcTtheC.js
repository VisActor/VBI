import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r,i;e((()=>{t={title:`ui/VbiInput`,component:`vbi-input`,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{value:{control:`text`},type:{control:`text`},color:{control:`select`,options:[`primary`,`secondary`,`accent`,`neutral`,`info`,`success`,`warning`,`error`]},size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},variant:{control:`radio`,options:[`default`,`ghost`],mapping:{default:void 0,ghost:`ghost`}}}},n={args:{value:``,placeholder:`Type something...`,type:`text`,color:`primary`,size:`md`}},r={args:{value:``,placeholder:`Enter amount`,type:`text`,color:`primary`,size:`md`},render:e=>{let t=document.createElement(`vbi-input`);return Object.assign(t,e),t.innerHTML=`
      <span slot="prefix" style="color: var(--color-base-content)">$</span>
      <span slot="suffix" style="color: var(--color-base-content)">USD</span>
    `,t}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    placeholder: 'Type something...',
    type: 'text',
    color: 'primary',
    size: 'md'
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    placeholder: 'Enter amount',
    type: 'text',
    color: 'primary',
    size: 'md'
  },
  render: args => {
    const el = document.createElement('vbi-input');
    Object.assign(el, args);
    el.innerHTML = \`
      <span slot="prefix" style="color: var(--color-base-content)">$</span>
      <span slot="suffix" style="color: var(--color-base-content)">USD</span>
    \`;
    return el;
  }
}`,...r.parameters?.docs?.source}}},i=[`Default`,`WithSlots`]}))();export{n as Default,r as WithSlots,i as __namedExportsOrder,t as default};