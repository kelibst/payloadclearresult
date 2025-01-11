// src/collections/Users/index.ts
import type { CollectionConfig } from 'payload';
import { authenticated } from '../../access/authenticated';
import { onlyAdmin } from '@/access/onlyAdmin';
import { Profiles } from '../profiles';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: onlyAdmin,
    admin: onlyAdmin,
  },
  admin: {
    useAsTitle: 'email', // or other preferred field
  },
  auth: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'subscriber'],
      access: {
        update: onlyAdmin,
      },
      required: true,
      defaultValue: 'subscriber',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      name: 'gender',
      type: 'select',
      options: ['male', 'female', 'other'],
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
  ],
  timestamps: true,
};
