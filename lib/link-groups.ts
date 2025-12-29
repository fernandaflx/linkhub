import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'
import type { LinkGroupFormState } from '@/components/link-editor/LinkEditor'

const COLLECTION = 'linkGroups'

export async function getLinkGroups(userId: string) {
  const q = query(collection(db, COLLECTION), where('userId', '==', userId))

  const snap = await getDocs(q)

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as LinkGroupFormState),
  }))
}

export async function createLinkGroup(
  userId: string,
  data: LinkGroupFormState
) {
  const ref = await addDoc(collection(db, COLLECTION), {
    userId,
    linkTitle: data.linkTitle,
    linkCategory: data.linkCategory,
    links: data.links,
    createdAt: new Date(),
  })

  return ref.id
}
