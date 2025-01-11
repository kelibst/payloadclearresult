
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { onlyAdmin } from '@/access/onlyAdmin'

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: {
    create: onlyAdmin,
    read: onlyAdmin,
    update: onlyAdmin,
    delete: onlyAdmin,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      label: 'Partner Website', // User-friendly label
    },


  ],
}

