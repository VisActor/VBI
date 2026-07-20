import{i as e}from"./preload-helper-BdFrVu1K.js";var t,n,r;e((()=>{t={title:`ui/VbiModal`,component:`vbi-modal`,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{position:{control:`select`,options:[`top`,`bottom`,`middle`,`start`,`end`]}}},n={args:{open:!1,position:`middle`},render:e=>{let t=document.createElement(`div`),n=document.createElement(`vbi-button`);n.innerHTML=`Open Modal`;let r=document.createElement(`vbi-modal`);return r.id=`default-modal`,Object.assign(r,e),r.innerHTML=`
      <h3 style="margin-top: 0;">Modal Title</h3>
      <p>Default modal content goes here.</p>
      <div slot="action" style="display: flex; gap: 8px; justify-content: flex-end;">
        <vbi-button id="close-modal">Close</vbi-button>
        <vbi-button id="confirm-modal" color="primary">Confirm</vbi-button>
      </div>
    `,n.addEventListener(`click`,()=>{r.open=!0}),t.appendChild(n),t.appendChild(r),setTimeout(()=>{r.querySelector(`#close-modal`)?.addEventListener(`click`,()=>{r.open=!1}),r.querySelector(`#confirm-modal`)?.addEventListener(`click`,()=>{r.open=!1})},0),t}},n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    position: 'middle'
  },
  render: args => {
    const container = document.createElement('div');
    const btn = document.createElement('vbi-button');
    btn.innerHTML = 'Open Modal';
    const modal = document.createElement('vbi-modal') as any;
    modal.id = 'default-modal';
    Object.assign(modal, args);
    modal.innerHTML = \`
      <h3 style="margin-top: 0;">Modal Title</h3>
      <p>Default modal content goes here.</p>
      <div slot="action" style="display: flex; gap: 8px; justify-content: flex-end;">
        <vbi-button id="close-modal">Close</vbi-button>
        <vbi-button id="confirm-modal" color="primary">Confirm</vbi-button>
      </div>
    \`;
    btn.addEventListener('click', () => {
      modal.open = true;
    });
    container.appendChild(btn);
    container.appendChild(modal);

    // Defer adding event listeners to children until they are parsed
    setTimeout(() => {
      modal.querySelector('#close-modal')?.addEventListener('click', () => {
        modal.open = false;
      });
      modal.querySelector('#confirm-modal')?.addEventListener('click', () => {
        modal.open = false;
      });
    }, 0);
    return container;
  }
}`,...n.parameters?.docs?.source}}},r=[`Default`]}))();export{n as Default,r as __namedExportsOrder,t as default};