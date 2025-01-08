import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []

  return (
    <footer className="border-t border-border bg-primary">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" /> 
        </Link>
      {/* <h3 className="text-white dark:text-black">ClearResult Consult</h3> */}
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink 
              className="text-white dark:text-black" 
              key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
