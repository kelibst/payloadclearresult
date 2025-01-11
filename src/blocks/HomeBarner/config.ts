// /media/kelib/79576E35542CB42D/Work/payloadclearresult/src/blocks/HomeBarner/config.ts
import { linkGroup } from "@/fields/linkGroup";
import { Block } from "payload";

export const HomeBanner: Block = {
  slug: 'homeBanner',
  interfaceName: 'HomeBannerBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left', // Default to left
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'contentPosition',
      type: 'select',
      defaultValue: 'left', // Default to left
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'showContent', // Should the title and description be shown?
      type: 'checkbox',
      defaultValue: true, // Default to showing the content
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
