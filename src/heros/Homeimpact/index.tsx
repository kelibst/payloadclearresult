'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import type { Page, Partner } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { fetchAllPartners } from './getPartners'
import { InfiniteSlider } from '@/components/core/infinite-slider';


export const HomeImpact: React.FC<Page['hero']> = ({ links, media, richText, heroTitle, heroDescription }) => { 
  const { setHeaderTheme } = useHeaderTheme()
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    setHeaderTheme('dark');
    const fetchPartners = async () => {
      try {
        const fetchedPartners = await fetchAllPartners();
        setPartners(fetchedPartners);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, [setHeaderTheme]);
  console.log(richText, heroTitle, 'richText');

  return (
    <div className="relative">
      <div
        className="relative flex flex-col items-center justify-center w-full h-screen bg-cover parallax-bg"
        style={{ backgroundImage: `url(${media?.url})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen text-foreground animate-fadeIn">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight font-pacifico text-white">
            {heroTitle && heroTitle}
          </h1>
          <p className="mt-4 mb-4 text-lg text-white">
            {heroDescription && heroDescription}
          </p>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {partners && partners.length > 0 && (
        <div className="w-full pt-4">
          {/* <h2 className="text-2xl text-center font-bold mb-4">Our Partners</h2> */}
          <InfiniteSlider gap={10} className="my-4"> {/* Adjust height as needed */}
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-center shrink-0 w-auto mx-3"> {/* Adjust width as needed */}
                {partner.logo && (
                  <Image
                    src={partner.logo.url}
                    alt={partner.name}
                    width={60} // Adjust size
                    height={60} // Adjust size
                    className="object-contain"
                  />
                )}
                <p className="text-sm text-center">{partner.name}</p>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      )}
    </div>
  )
}
