// config/platforms.ts
import {
  Github,
  Youtube,
  Linkedin,
  Globe,
  Instagram,
  Twitter,
  // importe outros ícones lucide conforme precisar
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LinkType, Platform } from '@/types/types'

export type PlatformConfig = {
  label: string
  icon: LucideIcon
  placeholder: string
}

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  [Platform.GITHUB]: {
    label: 'GitHub',
    icon: Github,
    placeholder: 'https://github.com/username',
  },
  [Platform.YOUTUBE]: {
    label: 'YouTube',
    icon: Youtube,
    placeholder: 'https://youtube.com/c/username',
  },
  [Platform.LINKEDIN]: {
    label: 'LinkedIn',
    icon: Linkedin,
    placeholder: 'https://linkedin.com/in/username',
  },
  [Platform.WEBSITE]: {
    label: 'Website',
    icon: Globe,
    placeholder: 'https://seu-site.dev',
  },
  [Platform.INSTAGRAM]: {
    label: 'Instagram',
    icon: Instagram,
    placeholder: 'https://instagram.com/username',
  },
  [Platform.TWITTER]: {
    label: 'Twitter / X',
    icon: Twitter,
    placeholder: 'https://x.com/username',
  },
  [Platform.STACKOVERFLOW]: {
    label: 'Stack Overflow',
    icon: Globe,
    placeholder: 'https://stackoverflow.com/users/id/username',
  },
  [Platform.DEVTO]: {
    label: 'Dev.to',
    icon: Globe,
    placeholder: 'https://dev.to/username',
  },
  [Platform.FACEBOOK]: {
    label: 'Facebook',
    icon: Globe,
    placeholder: 'https://facebook.com/username',
  },
  [Platform.TWITCH]: {
    label: 'Twitch',
    icon: Globe,
    placeholder: 'https://twitch.tv/username',
  },
  [Platform.CODEWARS]: {
    label: 'Codewars',
    icon: Globe,
    placeholder: 'https://codewars.com/users/username',
  },
  [Platform.FREECODECAMP]: {
    label: 'freeCodeCamp',
    icon: Globe,
    placeholder: 'https://freecodecamp.org/username',
  },
  [Platform.GITLAB]: {
    label: 'GitLab',
    icon: Globe,
    placeholder: 'https://gitlab.com/username',
  },
}

export const LINK_TYPES = (Object.keys(PLATFORM_CONFIGS) as Platform[]).map(
  (platform) => ({
    value: platform as LinkType,
    label: PLATFORM_CONFIGS[platform].label,
    icon: PLATFORM_CONFIGS[platform].icon,
  })
)
