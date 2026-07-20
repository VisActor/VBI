import{i as e}from"./preload-helper-BdFrVu1K.js";import{i as t,n,o as r,t as i}from"./es-BzhHR-J3.js";var a,o,s;e((()=>{i(),a={title:`ui/VbiMenu`,component:`vbi-menu`,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},variant:{control:`select`,options:[`horizontal`,`vertical`]}}},o={args:{size:`md`,variant:`vertical`,items:[{label:`Main Navigation`,isTitle:!0},{label:`Dashboard`,icon:t,url:`#`,isActive:!0},{label:`Profile`,icon:n,disabled:!0},{label:`Messages`,icon:r,badge:`99+`,url:`#`},{label:`Preferences`,isTitle:!0},{label:`Settings`,icon:t,children:[{label:`Account`},{label:`Privacy`,badge:`New`}]}]},render:e=>{let t=document.createElement(`vbi-menu`);return Object.assign(t,e),t.addEventListener(`vbiMenuSelect`,e=>console.log(`Clicked item:`,e.detail)),t}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    variant: 'vertical',
    items: [{
      label: 'Main Navigation',
      isTitle: true
    }, {
      label: 'Dashboard',
      icon: SettingOutlined,
      url: '#',
      isActive: true
    }, {
      label: 'Profile',
      icon: UserOutlined,
      disabled: true
    }, {
      label: 'Messages',
      icon: MailOutlined,
      badge: '99+',
      url: '#'
    }, {
      label: 'Preferences',
      isTitle: true
    }, {
      label: 'Settings',
      icon: SettingOutlined,
      children: [{
        label: 'Account'
      }, {
        label: 'Privacy',
        badge: 'New'
      }]
    }]
  },
  render: args => {
    const el = document.createElement('vbi-menu');
    Object.assign(el, args);
    el.addEventListener('vbiMenuSelect', (e: any) => console.log('Clicked item:', e.detail));
    return el;
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`]}))();export{o as Default,s as __namedExportsOrder,a as default};