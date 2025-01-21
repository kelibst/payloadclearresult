import type { AccessArgs } from 'payload';

export const adminOrEditor = ({ req: { user }, id }: AccessArgs) => {
  if (user?.role === 'admin' || user?.role === 'editor') {
    return true;
  }
  return false
};
