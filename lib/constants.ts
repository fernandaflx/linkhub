import { Platform } from '@/types/types'

export const PLATFORM_CONFIGS: Record<
  Platform,
  { label: string; icon: string; color: string; placeholder: string }
> = {
  [Platform.GITHUB]: {
    label: 'GitHub',
    icon: 'code',
    color: 'text-gray-900',
    placeholder: 'https://github.com/username',
  },
  [Platform.YOUTUBE]: {
    label: 'YouTube',
    icon: 'smart_display',
    color: 'text-red-500',
    placeholder: 'https://youtube.com/c/username',
  },
  [Platform.LINKEDIN]: {
    label: 'LinkedIn',
    icon: 'business_center',
    color: 'text-blue-600',
    placeholder: 'https://linkedin.com/in/username',
  },
  [Platform.INSTAGRAM]: {
    label: 'Instagram',
    icon: 'camera_alt',
    color: 'text-pink-500',
    placeholder: 'https://instagram.com/username',
  },
  [Platform.TWITTER]: {
    label: 'Twitter',
    icon: 'alternate_email',
    color: 'text-sky-400',
    placeholder: 'https://twitter.com/username',
  },
  [Platform.FACEBOOK]: {
    label: 'Facebook',
    icon: 'facebook',
    color: 'text-blue-700',
    placeholder: 'https://facebook.com/username',
  },
  [Platform.TWITCH]: {
    label: 'Twitch',
    icon: 'videogame_asset',
    color: 'text-purple-600',
    placeholder: 'https://twitch.tv/username',
  },
  [Platform.DEVTO]: {
    label: 'Dev.to',
    icon: 'article',
    color: 'text-black',
    placeholder: 'https://dev.to/username',
  },
  [Platform.CODEWARS]: {
    label: 'Codewars',
    icon: 'terminal',
    color: 'text-red-800',
    placeholder: 'https://codewars.com/users/username',
  },
  [Platform.FREECODECAMP]: {
    label: 'freeCodeCamp',
    icon: 'school',
    color: 'text-green-800',
    placeholder: 'https://freecodecamp.org/username',
  },
  [Platform.GITLAB]: {
    label: 'GitLab',
    icon: 'merge_type',
    color: 'text-orange-600',
    placeholder: 'https://gitlab.com/username',
  },
  [Platform.STACKOVERFLOW]: {
    label: 'Stack Overflow',
    icon: 'help_outline',
    color: 'text-orange-500',
    placeholder: 'https://stackoverflow.com/users/id/username',
  },
}
