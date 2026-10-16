import { CodeBlock, HomeLayout as DefaultHomeLayout, type HomeLayoutProps } from '@rspress/core/theme-original'

export * from '@rspress/core/theme-original'

export function HomeLayout(props: HomeLayoutProps) {
  return (
    <DefaultHomeLayout
      {...props}
      afterHeroActions={
        <div className='skill-install'>
          <CodeBlock lang='bash'>
            <pre>
              <code>npx skills add visactor/vbi</code>
            </pre>
          </CodeBlock>
        </div>
      }
    />
  )
}
