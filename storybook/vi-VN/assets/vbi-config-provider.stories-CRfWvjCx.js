import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r,i,a,o,s;e((()=>{t={tokens:{colorBase100:`#ffffff`,colorBaseContent:`#000000`,radiusBox:`4px`}},n={tokens:{colorBase100:`#000000`,colorBaseContent:`#ffffff`,radiusBox:`4px`}},r={title:`ui/VbiConfigProvider`,component:`vbi-config-provider`,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{theme:{control:`object`}},args:{theme:t}},i={args:{theme:t},render:e=>{let t=document.createElement(`vbi-config-provider`);return Object.assign(t,e),t.innerHTML=`
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Light Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    `,t}},a={args:{theme:n},render:e=>{let t=document.createElement(`vbi-config-provider`);return Object.assign(t,e),t.innerHTML=`
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Dark Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    `,t}},o={args:{theme:{tokens:{colorBase100:`oklch(20% 0.1 140)`,colorBaseContent:`oklch(95% 0.05 140)`,radiusBox:`2rem`}}},render:e=>{let t=document.createElement(`vbi-config-provider`);return Object.assign(t,e),t.innerHTML=`
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Custom Theme)</h3>
        <p style="margin: 0 0 1.5rem 0;">Custom background and extra rounded corners.</p>
      </div>
    `,t}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    theme: lightTheme
  },
  render: args => {
    const el = document.createElement('vbi-config-provider');
    Object.assign(el, args);
    el.innerHTML = \`
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Light Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    \`;
    return el;
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    theme: darkTheme
  },
  render: args => {
    const el = document.createElement('vbi-config-provider');
    Object.assign(el, args);
    el.innerHTML = \`
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Dark Mode)</h3>
        <p style="margin: 0 0 1.5rem 0;">This area is themed using the Config Provider.</p>
      </div>
    \`;
    return el;
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    theme: {
      tokens: {
        colorBase100: 'oklch(20% 0.1 140)',
        // Dark forest green background
        colorBaseContent: 'oklch(95% 0.05 140)',
        radiusBox: '2rem'
      }
    }
  },
  render: args => {
    const el = document.createElement('vbi-config-provider');
    Object.assign(el, args);
    el.innerHTML = \`
      <div style="padding: 2rem; background: var(--color-base-100); color: var(--color-base-content); border-radius: var(--radius-box);">
        <h3 style="margin: 0 0 1rem 0;">Config Provider (Custom Theme)</h3>
        <p style="margin: 0 0 1.5rem 0;">Custom background and extra rounded corners.</p>
      </div>
    \`;
    return el;
  }
}`,...o.parameters?.docs?.source}}},s=[`DefaultLight`,`DarkMode`,`CustomTheme`]}))();export{o as CustomTheme,a as DarkMode,i as DefaultLight,s as __namedExportsOrder,r as default};