import DocsCRS from '@/components/layouts/DocsCRS'

export const metadata = {
  title: 'Docs - Negative Space UI',
  description:
    'Documentation for Negative Space UI, a React component library focused on accessibility and performance.'
}

export default async function Docs({ children }: { children: React.ReactNode }) {
  return <DocsCRS>{children}</DocsCRS>
}
