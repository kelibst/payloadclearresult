// src/collections/Comments/index.ts
import type { CollectionConfig } from 'payload';
import { authenticated } from '../../access/authenticated';
import { onlyAdmin } from '@/access/onlyAdmin';
import { BlocksFeature, FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { Banner } from '@/blocks/Banner/config';
import { Code } from '@/blocks/Code/config';
import { MediaBlock } from '@/blocks/MediaBlock/config';


export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    create: authenticated, // Allow authenticated users to create comments
    read: authenticated,    // Could be public depending on requirements
    update: onlyAdmin,     // Only admins can update comments
    delete: onlyAdmin,     // Only admins can delete comments
  },
  admin: {
    useAsTitle: 'content', 
  },
  fields: [
    {
      label: "Comment Content",
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts', // Replace 'posts' with your post collection slug
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'approved', 'rejected'],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar'
      },
    }
    // ... other fields as needed
  ],
};
