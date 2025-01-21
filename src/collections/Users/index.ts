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
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: false, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    // More options are available
  },
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
      options: ['male', 'female'],
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
  ],
  timestamps: true,
};
