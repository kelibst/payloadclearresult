'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'


export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, heroTitle, heroDescription }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme]) // Add setHeaderTheme to dependency array
//@ts-expect-error
  const imageUrl = media?.url || ''; // Get image URL safely

  return (
    <section
      className="relative bg-primary text-primary-foreground min-h-[40vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
      data-theme="dark"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <div className="container z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center text-white"> {/* Added text-white */}
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight font-pacifico">
            {heroTitle}
          </h1>
          <p className="mt-4 mb-4 text-lg">
            {heroDescription} 
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
    </section>
  )
}
