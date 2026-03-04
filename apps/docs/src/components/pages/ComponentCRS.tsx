'use client'

import { Link } from 'negative-space/nav'
import { Heading } from 'negative-space/typography'
import { useParams } from 'next/navigation'

import { ComponentsMap } from '@/consts/components'

export default function ComponentCRS() {
  const params = useParams()

  const raw = params.slug
  const slug = typeof raw === 'string' ? raw : raw?.[0]
  if (!slug) return null

  let foundGroup: string | null = null
  let component: { name: string } | null = null

  for (const [group, components] of Object.entries(ComponentsMap)) {
    const match = Object.entries(components).find(
      ([key]) => key.toLowerCase() === slug.toLowerCase()
    )

    if (match) {
      foundGroup = group
      component = match[1]
      break
    }
  }

  if (!component || !foundGroup) return null

  return (
    <div>
      <Heading className="text-3xl">{component.name}</Heading>
      <Link className="secondary" href={`/kits/${foundGroup}`}>
        {'< '}
        {foundGroup}
      </Link>
    </div>
  )
}
