// src/access/onlyAdmin.ts
import type { AccessArgs } from 'payload';

export const onlyAdmin = ({ req: { user } }: AccessArgs) => {
  return Boolean(user && user?.role === 'admin');
};