/* eslint-disable no-unused-vars */
export interface UserProfile {
  id: string
  name: string | null
  email: string | null
  bio?: string | null
  photoUrl?: string | null
  provider: string
}

export enum Platform {
  GITHUB = 'github',
  YOUTUBE = 'youtube',
  LINKEDIN = 'linkedin',
  WEBSITE = 'website',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  STACKOVERFLOW = 'stackoverflow',
  DEVTO = 'devto',
  FACEBOOK = 'facebook',
  TWITCH = 'twitch',
  CODEWARS = 'codewars',
  FREECODECAMP = 'freecodecamp',
  GITLAB = 'gitlab',
}

export type Link = {
  id: string
  platform: Platform
  url: string
}
export interface LinkGroup {
  id: string
  title: string
  slug: string
  icon: string
  links: Link[]
}

export type LinkType = Platform
