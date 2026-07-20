import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r,i;e((()=>{t={title:`ui/VbiCascadingMenu`,component:`vbi-cascading-menu`,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},variant:{control:`select`,options:[`horizontal`,`vertical`]}}},n={args:{size:`md`,variant:`vertical`,items:[{label:`Dashboard`,isActive:!0},{label:`Profile`,disabled:!0},{label:`Messages`,children:[{label:`Inbox`},{label:`Sent`}]},{label:`Settings`,children:[{label:`Account`,children:[{label:`Personal Info`},{label:`Security`}]},{label:`Privacy`}]}]},render:e=>{let t=document.createElement(`vbi-cascading-menu`);return Object.assign(t,e),t.addEventListener(`vbiCascadingMenuSelect`,e=>console.log(`Clicked item:`,e.detail)),t}},r={args:{size:`md`,variant:`vertical`,items:[{label:`Dashboard`},{slot:`custom-profile`},{label:`Settings`,children:[{slot:`custom-account`},{label:`Privacy`}]}]},render:e=>{let t=document.createElement(`vbi-cascading-menu`);return Object.assign(t,e),t.addEventListener(`vbiCascadingMenuSelect`,e=>console.log(`Clicked item:`,e.detail)),t.innerHTML=`
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
    `,t}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    variant: 'vertical',
    items: [{
      label: 'Dashboard',
      isActive: true
    }, {
      label: 'Profile',
      disabled: true
    }, {
      label: 'Messages',
      children: [{
        label: 'Inbox'
      }, {
        label: 'Sent'
      }]
    }, {
      label: 'Settings',
      children: [{
        label: 'Account',
        children: [{
          label: 'Personal Info'
        }, {
          label: 'Security'
        }]
      }, {
        label: 'Privacy'
      }]
    }]
  },
  render: args => {
    const el = document.createElement('vbi-cascading-menu');
    Object.assign(el, args);
    el.addEventListener('vbiCascadingMenuSelect', (e: any) => console.log('Clicked item:', e.detail));
    return el;
  }
}`,...n.parameters?.docs?.source}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    variant: 'vertical',
    items: [{
      label: 'Dashboard'
    }, {
      slot: 'custom-profile'
    }, {
      label: 'Settings',
      children: [{
        slot: 'custom-account'
      }, {
        label: 'Privacy'
      }]
    }]
  },
  render: args => {
    const el = document.createElement('vbi-cascading-menu');
    Object.assign(el, args);
    el.addEventListener('vbiCascadingMenuSelect', (e: any) => console.log('Clicked item:', e.detail));
    el.innerHTML = \`
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
    \`;
    return el;
  }
}`,...r.parameters?.docs?.source}}},i=[`Default`,`WithSlots`]}))();export{n as Default,r as WithSlots,i as __namedExportsOrder,t as default};