import { Github, Youtube, Linkedin, Globe } from 'lucide-react'

// export enum Platform {
//   GITHUB = 'github',
//   YOUTUBE = 'youtube',
//   LINKEDIN = 'linkedin',
//   INSTAGRAM = 'instagram',
//   TWITTER = 'twitter',
//   FACEBOOK = 'facebook',
//   TWITCH = 'twitch',
//   DEVTO = 'devto',
//   CODEWARS = 'codewars',
//   FREECODECAMP = 'freecodecamp',
//   GITLAB = 'gitlab',
//   STACKOVERFLOW = 'stackoverflow',
// }

// export interface Link {
//   id: string
//   platform: Platform
//   url: string
//   label: string
// }

export interface LinkGroup {
  id: string
  title: string
  slug: string
  icon: string
  links: Link[]
  colorClass: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  bio: string
  profilePicture: string
}

export type AuthState = 'login' | 'signup' | 'authenticated'

export enum Platform {
  GITHUB = 'github',
  YOUTUBE = 'youtube',
  LINKEDIN = 'linkedin',
  WEBSITE = 'website',
  INSTAGRAM = 'INSTAGRAM',
  TWITTER = 'TWITTER',
  STACKOVERFLOW = 'STACKOVERFLOW',
  DEVTO = 'DEVTO',
  FACEBOOK = 'FACEBOOK',
  TWITCH = 'TWITCH',
  CODEWARS = 'CODEWARS',
  FREECODECAMP = 'FREECODECAMP',
  GITLAB = 'GITLAB',
}

export type Link = {
  id: string
  platform: Platform
  url: string
  // label: string
}

export type LinkType = Platform

export const LINK_TYPES = [
  { value: Platform.GITHUB, label: 'GitHub', icon: Github },
  { value: Platform.YOUTUBE, label: 'YouTube', icon: Youtube },
  { value: Platform.LINKEDIN, label: 'LinkedIn', icon: Linkedin },
  { value: Platform.WEBSITE, label: 'Website', icon: Globe },
] as const
