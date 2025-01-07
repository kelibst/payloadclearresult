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
    if (!partners || partners.length <= 2) return; // No scrolling if 2 or fewer partners

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000); // Adjust scroll speed

    return () => clearInterval(interval);
  }, [partners]);

  useEffect(() => {
    if (!marqueeRef.current || !partners || partners.length <= 2) return;
    const marquee = marqueeRef.current;
    marquee.style.transform = `translateX(-${currentIndex * 50}%)`; // 50% for 2 partners
    marquee.style.transition = 'transform 0.5s ease-in-out'; // Transition effect
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
      <div className="relative z-10 mt-8 overflow-hidden">
        <h2 className="text-2xl text-white text-center font-bold mb-4">
          Our Partners
        </h2>
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out" // Apply transition here
          ref={marqueeRef}
          style={{ transform: `translateX(-${currentIndex * (partners.length > 2 ? (100/partners.length) * 2 : 50)}%)`}}
        >
          {partners.slice(0, partners.length <=2 ? partners.length : 6).map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center w-[calc(100%/2)] shrink-0" // 50% width for 2 partners
            >
              {partner.logo && (
                <Image
                  src={partner.logo.url}
                  width={100}
                  height={100}
                  alt={partner.name}
                  className="w-24 h-24 mb-2 object-contain"
                />
              )}
              <p className="text-white mt-2">{partner.name}</p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  )
}
