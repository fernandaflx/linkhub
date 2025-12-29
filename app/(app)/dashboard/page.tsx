'use client'
import LinkGroupsGrid from '@/components/ListLinks'
import { mockLinkGroups } from '@/components/ListLinks/mock'


export default function Dashboard() {
  return (
    <>
      <div className='my-8'>
        <h1 className="text-3xl font-bold mb-2">Meus grupos de links</h1>
        <p>Gerencie suas coleções de links e compartilhe com o mundo.</p>
      </div>

      <LinkGroupsGrid groups={mockLinkGroups} />
    </>
  )
}
