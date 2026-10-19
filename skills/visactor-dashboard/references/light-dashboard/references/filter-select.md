# 定制 Select 实现

视觉、选型与数据作用域见[筛选器标准实践](filter.md)。本例用于单文件 HTML 的少量至中等数量单选项，采用 `details + summary + button`；沿用原生展开语义与按钮键盘行为，不声明 `listbox` 或 `combobox`。需要可搜索大列表、多选或已有宿主组件时，复用相应可访问组件。

## 结构与样式

以下数值仅示意「分组 · 数值 单位」的排版。实际列表由当前范围的查询结果生成，用 `textContent` 设置标签。每个实例使用唯一的 `id`；`data-label` 是触发器选中后的短标签，`data-value` 是真实筛选值，不从可见文案反解析。

```html
<details class="filter-select">
  <summary aria-controls="contact-options" aria-label="本轮联系次数：全部联系次数">
    <span data-select-label>全部联系次数</span>
    <span class="select-chevron" aria-hidden="true"></span>
  </summary>
  <div id="contact-options" class="select-options" role="group" aria-label="本轮联系次数">
    <button type="button" data-value="" data-label="全部联系次数" aria-pressed="true">全部联系次数</button>
    <button type="button" data-value="once" data-label="1 次" aria-pressed="false">1 次 · 2,561 份</button>
    <button type="button" data-value="twice" data-label="2 次" aria-pressed="false">2 次 · 1,401 份</button>
    <button type="button" data-value="three-four" data-label="3–4 次" aria-pressed="false">3–4 次 · 935 份</button>
    <button type="button" data-value="five-eight" data-label="5–8 次" aria-pressed="false">5–8 次 · 310 份</button>
    <button type="button" data-value="nine-plus" data-label="9–63 次" aria-pressed="false">9–63 次 · 82 份</button>
  </div>
</details>
```

```css
.filter-select {
  position: relative;
  min-width: 0;
  max-width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted, #526173);
  font-size: 13px;
}
.filter-select > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 36px;
  box-sizing: border-box;
  padding: 7px 12px;
  border: 1px solid var(--filter-line, #e2e7ed);
  border-radius: 8px;
  background: var(--filter-active, #fff);
  list-style: none;
  cursor: pointer;
}
.filter-select > summary::-webkit-details-marker {
  display: none;
}
.filter-select [data-select-label] {
  overflow-wrap: anywhere;
}
.select-chevron {
  flex: none;
  width: 6px;
  height: 6px;
  margin: -3px 2px 0 4px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
}
.filter-select[open] .select-chevron {
  transform: translateY(3px) rotate(225deg);
}
.select-options {
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  display: grid;
  gap: 4px;
  width: 280px;
  max-height: 280px;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 6px;
  border: 1px solid var(--filter-line, #e2e7ed);
  border-radius: 10px;
  background: var(--filter-active, #fff);
  box-shadow: 0 8px 30px #1520301a;
}
.select-options button {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 36px;
  padding: 8px 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition:
    background-color 150ms,
    color 150ms;
}
.select-options button::after {
  content: '✓';
  margin-left: auto;
  opacity: 0;
}
.select-options button:hover {
  background: var(--filter-hover, #f3f6f9);
}
.select-options button[aria-pressed='true'] {
  background: var(--filter-selected, #eaf1f7);
  color: var(--ink, #263440);
}
.select-options button[aria-pressed='true']::after {
  opacity: 1;
}
.filter-select > summary:focus-visible,
.select-options button:focus-visible {
  outline: 2px solid var(--accent, #6c8eb5);
  outline-offset: 2px;
}
.select-options button:disabled {
  cursor: default;
  opacity: 0.5;
}
@media (pointer: coarse) {
  .filter-select > summary,
  .select-options button {
    min-height: 44px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .select-options button {
    transition: none;
  }
}
```

平铺与 Select 同时出现时，将两者总高度对齐；有长标签时预留触发器宽度，避免选中后推挤相邻控件。若分析工具栏已显示选择与清除标签，可将 summary 固定为「选择本轮联系次数」，但仍同步按钮的 `aria-pressed`。

## 绑定与关闭

下面的绑定只管理展示、焦点与选择意图。`onChange(value)` 接入页面已有 Builder 与刷新流程；通过返回的 `setValue(value)` 从已确认的状态回填 UI，图表点选与状态恢复也走同一入口。示例不包含查询逻辑；异步提交期间的忙碌、失败与旧结果处理遵循[组合与联动](../../visual-query/references/composition.md)。

```javascript
function bindSelect(root, { value, onChange }) {
  const summary = root.querySelector('summary')
  const label = root.querySelector('[data-select-label]')
  const panel = root.querySelector('.select-options')
  const scope = root.closest('dialog') || document
  const controller = new AbortController()
  const { signal } = controller
  const options = () => [...panel.querySelectorAll('button[data-value]:not(:disabled)')]
  let current = value

  function close(restoreFocus = false) {
    root.open = false
    if (restoreFocus) summary.focus({ preventScroll: true })
  }
  function setValue(next) {
    current = next
    for (const button of panel.querySelectorAll('button[data-value]')) {
      const selected = button.dataset.value === next
      button.setAttribute('aria-pressed', String(selected))
      if (selected) {
        label.textContent = button.dataset.label
        summary.setAttribute('aria-label', `${panel.getAttribute('aria-label')}：${button.dataset.label}`)
      }
    }
  }
  function place() {
    if (!root.open) return
    const anchor = root.getBoundingClientRect()
    const bounds = root.closest('dialog')?.getBoundingClientRect()
    const left = Math.max(0, bounds?.left ?? 0) + 8
    const right = Math.min(innerWidth, bounds?.right ?? innerWidth) - 8
    const top = Math.max(0, bounds?.top ?? 0) + 8
    const bottom = Math.min(innerHeight, bounds?.bottom ?? innerHeight) - 8
    const width = Math.min(Math.max(280, anchor.width), right - left)
    panel.style.width = `${width}px`
    panel.style.left = `${Math.max(left, Math.min(anchor.right - width, right - width)) - anchor.left}px`
    const below = bottom - anchor.bottom - 6
    const above = anchor.top - top - 6
    const upward = below < Math.min(280, panel.scrollHeight) && above > below
    panel.style.maxHeight = `${Math.max(0, Math.min(280, upward ? above : below))}px`
    panel.style.top = upward ? 'auto' : 'calc(100% + 6px)'
    panel.style.bottom = upward ? 'calc(100% + 6px)' : 'auto'
  }
  root.addEventListener(
    'toggle',
    () => {
      if (!root.open) return
      for (const other of scope.querySelectorAll('.filter-select[open]')) {
        if (other !== root) other.open = false
      }
      place()
    },
    { signal },
  )
  panel.addEventListener(
    'click',
    (event) => {
      const button = event.target.closest('button[data-value]')
      if (!button || button.disabled) return
      close(true)
      if (button.dataset.value !== current) onChange(button.dataset.value)
    },
    { signal },
  )
  root.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && root.open) {
        event.preventDefault()
        event.stopPropagation()
        close(true)
        return
      }
      const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
      if (!keys.includes(event.key)) return
      event.preventDefault()
      root.open = true
      place()
      const buttons = options()
      if (!buttons.length) return
      const index = buttons.indexOf(document.activeElement)
      const selected = buttons.findIndex((button) => button.dataset.value === current)
      let next = index < 0 ? Math.max(0, selected) : index + (event.key === 'ArrowUp' ? -1 : 1)
      if (event.key === 'Home') next = 0
      if (event.key === 'End') next = buttons.length - 1
      buttons[Math.max(0, Math.min(buttons.length - 1, next))].focus()
    },
    { signal },
  )
  document.addEventListener(
    'pointerdown',
    (event) => {
      if (root.open && !root.contains(event.target)) close()
    },
    { signal },
  )
  root.addEventListener(
    'focusout',
    (event) => {
      if (!root.contains(event.relatedTarget)) close()
    },
    { signal },
  )
  window.addEventListener('resize', place, { signal })
  document.addEventListener('scroll', place, { capture: true, signal })
  setValue(value)
  return {
    setValue,
    destroy() {
      controller.abort()
      close()
    },
  }
}
```

`place()` 演示普通文档或对话框内的边界计算、向上翻转与内部滚动，前提是祖先不会裁剪浮层、也没有改变坐标系的缩放变换。宿主存在滚动裁剪或变换时使用其浮层定位组件，边界取实际可见容器；弹层留在模态对话框的交互层。动态替换选项后重新回填已确认状态并定位，关闭宿主时调用 `destroy()`。

验收需覆盖鼠标、键盘与触屏：只 hover 不提交，整行点击提交一次；选中、焦点与 hover 可区分；Escape 关闭列表后对话框仍打开；点外部不抢焦点；在窄屏和靠近底部时浮层可读、可滚动，主内容位置保持稳定。
