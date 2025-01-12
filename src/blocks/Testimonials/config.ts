// /media/kelib/79576E35542CB42D/Work/payloadclearresult/src/blocks/HomeBarner/config.ts
import { Block } from "payload";

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
   {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      fields: [
        {
          name: 'quote',
          type: 'text',
          label: 'Quote',
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
      ],
   }
    
  ],
}
