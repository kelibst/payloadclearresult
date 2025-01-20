import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import Link from 'next/link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, title }) => {
  return (
    <div className="py-16 text-center lg:py-20 bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground">
      <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      {richText && <RichText className="my-4" data={richText} enableGutter={false} />}
      <div className="flex justify-center gap-4">
          {(links || []).map(({ link }, i) => {
            return <Link className='mt-6 px-8 py-4 bg-accent text-black rounded-lg font-bold hover:bg-accent-dark' key={i} href={link?.url || ""}>{link?.label}</Link>
          })}
      </div>
    </div>
  )
}
