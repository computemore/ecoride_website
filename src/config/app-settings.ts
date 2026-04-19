export const appSettings = {
  siteName: 'Ecoride',
  siteUrl: 'https://ecoridemw.com',
  supportEmail: 'support@ecoridemw.com',
  addressLines: ['Blantyre City, Victoria Avenue', 'Meridian House, First Floor'],
  phoneNumbers: ['+265 893 236 026', '+265 995 006 101'],
  socialLinks: [
    { label: 'Facebook', href: 'https://www.facebook.com/ecoride' },
    { label: 'Instagram', href: 'https://www.instagram.com/ecoride_mw' },
    { label: 'X', href: 'https://www.twitter.com/ecoride1' },
  ],
  downloadLinks: {
    rider: {
      label: 'Rider',
      href: 'https://play.google.com/store/apps/details?id=com.computemore.ecoride',
    },
    driver: {
      label: 'Driver',
      href: 'https://play.google.com/store/apps/details?id=com.computemore.ecoride.driver',
    },
  },
} as const;