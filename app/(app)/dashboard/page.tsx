'use client'
import LinkGroupsGrid from '@/components/ListLinks'
import { mockLinkGroups } from '@/components/ListLinks/mock'

export default function Dashboard() {
  return (
    <>
      <div className='my-8'>
        <h1 className="text-3xl font-bold mb-2">My Link Groups</h1>
        <p >Manage your collections of links and share them with the world.</p>
      </div>
      <LinkGroupsGrid groups={mockLinkGroups} />
    </>
  )
}
