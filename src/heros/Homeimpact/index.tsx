'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HomeImpact: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

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
  </div>
  )
}
