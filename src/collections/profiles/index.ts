// src/collections/Profiles/index.ts
import { CollectionConfig } from 'payload';
import { authenticated } from '@/access/authenticated';
import { adminOrSelf } from '@/access/adminOrself';
import { onlyAdmin } from '@/access/onlyAdmin';

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  access: {
    read: authenticated,
    create: authenticated,
    update: adminOrSelf,
    delete: onlyAdmin// Only admin can delete
  },
  fields: [
    {
      name: 'user', // Reference to the User
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true, // Ensure only one profile per user
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
    // ... any other profile fields
  ],
};

