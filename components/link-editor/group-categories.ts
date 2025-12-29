import {
  Globe2,
  BriefcaseBusiness,
  User,
  FolderGit2,
  BookOpen,
  Wrench,
  FileText,
  MoreHorizontal,
} from 'lucide-react'

export type GroupCategoriesValue =
  | 'social'
  | 'work'
  | 'personal'
  | 'projects'
  | 'study'
  | 'tools'
  | 'content'
  | 'other'

export type GroupCategoriesOption = {
  label: string
  value: GroupCategoriesValue
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const GroupCategories: readonly GroupCategoriesOption[] = [
  {
    label: 'Redes sociais',
    value: 'social',
    icon: Globe2,
  },
  {
    label: 'Profissional / Trabalho',
    value: 'work',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Pessoal',
    value: 'personal',
    icon: User,
  },
  {
    label: 'Projetos / Portfólio',
    value: 'projects',
    icon: FolderGit2,
  },
  {
    label: 'Estudos',
    value: 'study',
    icon: BookOpen,
  },
  {
    label: 'Ferramentas',
    value: 'tools',
    icon: Wrench,
  },
  {
    label: 'Conteúdo',
    value: 'content',
    icon: FileText,
  },
  {
    label: 'Outros',
    value: 'other',
    icon: MoreHorizontal,
  },
] as const
