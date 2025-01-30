import type { CollectionConfig } from 'payload'

export const SocialMediaHandle: CollectionConfig = {
  slug: 'social-menida-menu',
  fields: [
    {
      name: 'provider',
      type: 'array',
      label: 'social media providers',
      minRows: 1,
      maxRows: 10,
      interfaceName: 'socialMenu',
      labels: {
        singular: 'social-media-provider',
        plural: 'social-media-providers',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'provider',
        },
        {
          name: 'link',
          type: 'text',
          label: 'url',
        },
      ],
    },
  ],
}
