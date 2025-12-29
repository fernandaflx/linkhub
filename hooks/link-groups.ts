'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { LinkGroupFormState } from '@/components/link-editor/LinkEditor'
import { createLinkGroup, getLinkGroups } from '@/lib/link-groups'

const linkGroupsKey = (userId: string) => ['link-groups', userId]

export function useLinkGroups(userId: string | null | undefined) {
  return useQuery({
    queryKey: userId ? linkGroupsKey(userId) : ['link-groups'],
    // queryKey: userId ? linkGroupsKey(userId) : ['link-groups', 'anonymous'],
    queryFn: () => {
      if (!userId) throw new Error('Usuário não autenticado')
      return getLinkGroups(userId)
    },
    enabled: !!userId,
  })
}

export function useCreateLinkGroup(userId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LinkGroupFormState) => {
      if (!userId) throw new Error('Usuário não autenticado.')
      return createLinkGroup(userId, data)
    },
    onSuccess: () => {
      if (!userId) return
      queryClient.invalidateQueries({ queryKey: linkGroupsKey(userId) })
    },
    onError: () => {
      throw new Error('Ocorreu um erro ao listar os grupos de links criados.')
    },
  })
}
