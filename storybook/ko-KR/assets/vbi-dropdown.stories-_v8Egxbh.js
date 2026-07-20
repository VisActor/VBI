import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r;e((()=>{t={title:`ui/VbiDropdown`,component:`vbi-dropdown`,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{"popover-mode":{control:`select`,options:[`auto`,`manual`]},trigger:{control:`select`,options:[`click`,`hover`]}}},n={args:{"popover-mode":`auto`,trigger:`click`},render:e=>{let t=document.createElement(`vbi-dropdown`);return Object.entries(e).forEach(([e,n])=>{e.includes(`-`)?t.setAttribute(e,n):t[e]=n}),t.innerHTML=`
      <vbi-button slot="trigger">Open Dropdown</vbi-button>
      <div slot="content" style="padding: 8px; border: 1px solid var(--color-base-300, #ccc); border-radius: var(--radius-box, 4px); background: var(--color-base-100, #fff); color: var(--color-base-content, #000);">
        Dropdown Content
      </div>
    `,t}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    'popover-mode': 'auto',
    trigger: 'click'
  },
  render: args => {
    const el = document.createElement('vbi-dropdown');
    Object.entries(args).forEach(([key, value]) => {
      if (key.includes('-')) {
        el.setAttribute(key, value as string);
      } else {
        ;
        (el as any)[key] = value;
      }
    });
    el.innerHTML = \`
      <vbi-button slot="trigger">Open Dropdown</vbi-button>
      <div slot="content" style="padding: 8px; border: 1px solid var(--color-base-300, #ccc); border-radius: var(--radius-box, 4px); background: var(--color-base-100, #fff); color: var(--color-base-content, #000);">
        Dropdown Content
      </div>
    \`;
    return el;
  }
}`,...n.parameters?.docs?.source}}},r=[`Default`]}))();export{n as Default,r as __namedExportsOrder,t as default};