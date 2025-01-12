import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, title }) => {
  return (
    <div className="py-16 text-center lg:py-20 bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground">
      <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      {richText && <RichText className="my-4" data={richText} enableGutter={false} />}
      <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
      </div>
    </div>
  )
}
