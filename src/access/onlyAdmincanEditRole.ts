// src/access/onlyAdmincanEditRole.ts
import type { AccessArgs } from 'payload';

export const onlyAdmincanEditRole = ({ req: { user }, id, data }: AccessArgs) => {
  if (user?.role === 'admin') {
    return true; // Admins can update everything
  }

  if (user?.id === id) {
    // Users can update their own data, but not the role:
    return typeof data.role === 'undefined'; // Allow update if role is not being changed
  }

  return false; // Otherwise, no access
};
