"use server"
import { type Partner } from '@/payload-types';
import { getPayload } from 'payload';
import config from '@payload-config'

export const fetchAllPartners = async (): Promise<Partner[]> => {
    const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'partners',
    depth: 1, // Adjust depth as needed
  });
  return docs;
};

