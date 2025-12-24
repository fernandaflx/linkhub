import { LinkGroup, Platform } from '@/types/types'

export const mockLinkGroups: LinkGroup[] = [
  {
    id: 'lg-portfolio',
    title: 'Portfolio',
    slug: 'portfolio',
    icon: 'work',
    colorClass:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    links: [
      {
        id: 'lnk-github',
        platform: Platform.GITHUB,
        // label: 'GitHub',
        url: 'https://github.com/seu-usuario',
      },
      {
        id: 'lnk-linkedin',
        platform: Platform.LINKEDIN,
        // label: 'LinkedIn',
        url: 'https://linkedin.com/in/seu-usuario',
      },
      {
        id: 'lnk-website',
        platform: Platform.GITHUB, // ou outra plataforma mais adequada
        // label: 'Website',
        url: 'https://seu-site.dev',
      },
    ],
  },
  {
    id: 'lg-social',
    title: 'Social',
    slug: 'social',
    icon: 'share',
    colorClass:
      'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    links: [
      {
        id: 'lnk-instagram',
        platform: Platform.INSTAGRAM,
        // label: 'Instagram',
        url: 'https://instagram.com/seu-usuario',
      },
      {
        id: 'lnk-twitter',
        platform: Platform.TWITTER,
        // label: 'Twitter / X',
        url: 'https://x.com/seu-usuario',
      },
      {
        id: 'lnk-youtube',
        platform: Platform.YOUTUBE,
        // label: 'YouTube',
        url: 'https://youtube.com/@seu-usuario',
      },
    ],
  },
  {
    id: 'lg-dev',
    title: 'Dev Resources',
    slug: 'dev-resources',
    icon: 'code',
    colorClass:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    links: [
      {
        id: 'lnk-stackoverflow',
        platform: Platform.STACKOVERFLOW,
        // label: 'Stack Overflow',
        url: 'https://stackoverflow.com/users/123456/seu-usuario',
      },
      {
        id: 'lnk-devto',
        platform: Platform.DEVTO,
        // label: 'Dev.to',
        url: 'https://dev.to/seu-usuario',
      },
      {
        id: 'lnk-blog',
        platform: Platform.DEVTO, // ou outra que faça sentido
        // label: 'Tech Blog',
        url: 'https://blog.seu-site.dev',
      },
    ],
  },
  {
    id: 'lg-contact',
    title: 'Contact',
    slug: 'contact',
    icon: 'mail',
    colorClass:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    links: [
      {
        id: 'lnk-email',
        platform: Platform.GITHUB, // placeholder; pode criar um Platform.EMAIL se quiser
        // label: 'Email',
        url: 'mailto:voce@exemplo.com',
      },
      {
        id: 'lnk-whatsapp',
        platform: Platform.FACEBOOK, // placeholder
        // label: 'WhatsApp',
        url: 'https://wa.me/5511999999999',
      },
      {
        id: 'lnk-calendar',
        platform: Platform.GITHUB, // placeholder
        // label: 'Calendly',
        url: 'https://calendly.com/seu-usuario',
      },
    ],
  },
  {
    id: 'lg-personal',
    title: 'Personal',
    slug: 'personal',
    icon: 'favorite',
    colorClass:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    links: [
      {
        id: 'lnk-goodreads',
        platform: Platform.DEVTO, // placeholder
        // label: 'Goodreads',
        url: 'https://goodreads.com/seu-usuario',
      },
      {
        id: 'lnk-letterboxd',
        platform: Platform.YOUTUBE, // placeholder
        // label: 'Letterboxd',
        url: 'https://letterboxd.com/seu-usuario',
      },
      {
        id: 'lnk-spotify',
        platform: Platform.YOUTUBE, // placeholder
        // label: 'Spotify',
        url: 'https://open.spotify.com/user/seu-usuario',
      },
    ],
  },
]
