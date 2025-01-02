// src/access/adminOrSelf.ts
import type { AccessArgs } from 'payload';

export const adminOrSelf = ({ req: { user }, id }: AccessArgs) => {
  if (user?.role === 'admin') {
    return true;
  }
  return user?.id === id; // only if a document ID is present
};
