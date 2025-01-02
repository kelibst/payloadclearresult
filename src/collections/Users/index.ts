// src/collections/Users/index.ts
import type { CollectionConfig } from 'payload';
import { authenticated } from '../../access/authenticated';
import { onlyAdmin } from '@/access/onlyAdmin';
import { adminOrSelf } from '@/access/adminOrself';



export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: onlyAdmin,
    read: authenticated,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['firstName', 'email'], // You might want to adjust these
    useAsTitle: 'firstName',  // Consider using 'firstName' or 'lastName' if more appropriate
  },
  auth: true,
  fields: [
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
    // Email field (likely already exists, included for completeness)
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },
    {
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      name: 'gender',
      type: 'select', // Or 'radio', 'text' depending on your needs
      options: [ // Example options
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Subscriber',
          value: 'subscriber',
        },
      ],
      access: {
        update: onlyAdmin, // Only admins can update the 'role' field
      },
      required: true,
      defaultValue: 'subscriber',
      admin: {
        position: 'sidebar',
      },
    },

  ],
  timestamps: true,
};

