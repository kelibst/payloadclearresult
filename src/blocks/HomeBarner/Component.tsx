import { CMSLink } from "@/components/Link"
import { LinkFields } from "@payloadcms/richtext-lexical"
import Image from "next/image"
import classNames from 'classnames'; // Import classNames for conditional class names

export type HomeBannerBlock = {
  title?: string
  description?: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  imagePosition: 'left' | 'right' | 'center';
  contentPosition: 'left' | 'center' | 'right';
  showContent: boolean;
  links: LinkFields[];
}
export const HomeBannerBlock: React.FC<HomeBannerBlock> = (props) => {
  const { title, description, image, imagePosition, contentPosition, showContent, links } = props

  const contentAlignment = `text-${contentPosition} text-white`;

  return (
    <div className={classNames("relative", { "bg-primary text-primary-foreground": imagePosition !== 'center' })}> {/* Conditional background color */}
      {imagePosition === 'center' && ( 
        <Image
          src={image.url}
          alt={image.alt}
          fill
          style={{ objectFit: 'cover' }} // Cover the entire area
        />
      )}
      <div className={classNames("grid grid-cols-1 items-center gap-8", { 
        "md:grid-cols-2": imagePosition !== 'center', // Only two columns if not center
        "md:flex-row-reverse": imagePosition === 'right', // Reverse if right
      })}>
        {imagePosition !== 'center' && ( 
          <div>
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        )}
        <div className={contentAlignment}>
          {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
          {showContent && description && <p className="text-lg">{description}</p>}
          <div className="flex flex-row justify-center gap-8 mt-4">
            {(links || []).map(({ link }, i) => {
              //@ts-expect-error
              return <CMSLink className="text-black" key={i} size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}