'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'; // Import from next/image
import type { Page, Partner } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { fetchAllPartners } from './getPartners'

export const HomeImpact: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [partners, setPartners] = useState<Partner[] | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHeaderTheme('dark')
    const fetchPartners = async () => {
      try {
        const fetchedPartners = await fetchAllPartners();
        setPartners(fetchedPartners);
      } catch (error) {
        console.error("Error fetching partners:", error);
        // Handle error, e.g., display an error message
      }
    };
    fetchPartners(); // Call the function!
  }, [setHeaderTheme])

  useEffect(() => {
    if (!partners || partners.length <= 3) return; // No need to scroll if 3 or fewer partners

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000); // Adjust scroll speed here (3000ms = 3 seconds)

    return () => clearInterval(interval);
  }, [partners]);

  useEffect(() => {
    if (!marqueeRef.current || !partners || partners.length <= 3) return;

    const marquee = marqueeRef.current;
    marquee.style.transform = `translateX(-${currentIndex * (100 / partners.length)}%)`; // Use percentage for dynamic width

    // Smooth scrolling transition (optional)
    marquee.style.transition = 'transform 0.5s ease-in-out';


  }, [currentIndex, partners]);

  return (
    <div
    className="relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center parallax-bg"
    style={{ backgroundImage: `url(${media?.url})` }}
  >
    <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark Overlay */}
    <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen text-foreground animate-fadeIn">
      <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight font-pacifico text-white">
        {richText && richText.root.children[0].children[0].text}
      </h1>
      <p className="mt-4 mb-4 text-lg text-white">
        {richText && richText.root.children[1].children[0].text}
      </p>

      {Array.isArray(links) && links.length > 0 && (
        <ul className="flex md:justify-center gap-4">
          {links.map(({ link }, i) => {
            return (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      )}
    </div>
    {partners && partners.length > 0 && (
    <div className="relative z-10 mt-8">
        <h2 className="text-2xl text-white text-center font-bold mb-4">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-4">

          {/* Conditionally render partners */}
          {partners.length > 0 ? (
             partners.map((partner) => (
               <div key={partner.id} className="flex flex-col items-center">
                {partner.logo && <Image src={partner.logo.url} width={200} height={200} alt={partner.name} className="w-24 h-24 mb-2" />}
                <p className="text-white mt-2">{partner.name}</p>
                {partner.website && (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-white">
                    Visit Website
                  </a>
                )}
               </div>
             ))

          ) : (
            <p className="text-white">Loading partners...</p>
          )}

        </div>
      </div>
    )}
  </div>
  )
}
