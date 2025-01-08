import { Block } from "payload";

export const HomeBanner: Block = {
  slug: 'homeBanner',
  interfaceName: 'HomeBannerBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}