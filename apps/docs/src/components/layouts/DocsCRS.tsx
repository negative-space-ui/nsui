'use client'

import { Menu } from 'negative-space/nav'

import { ComponentsMap } from '@/consts/components'

import { Header } from '../Header'

export default function DocsCRS({ children }: { children: React.ReactNode }) {
  const items = Object.entries(ComponentsMap).flatMap(([group, components], index) => [
    {
      group: {
        label: group,
        classNames: {
          label: 'text-[var(--secondary)] ' + (index === 0 ? 'mt-0' : 'mt-3')
        }
      }
    },
    ...Object.entries(components).map(([key, component]) => ({
      item: {
        content: component.name,
        href: `/docs/${key.toLowerCase()}`
      }
    }))
  ])

  return (
    <div className="flex gap-6 p-4 pt-14">
      <Header />
      <aside className="h-[calc(100dvh-4.5rem)] overflow-auto">
        <Menu
          gap="0"
          classNames={{
            root: 'w-36 pl-4 py-2'
          }}
          items={items}
        />
      </aside>
      <main className="pl-2">{children}</main>
    </div>
  )
}
