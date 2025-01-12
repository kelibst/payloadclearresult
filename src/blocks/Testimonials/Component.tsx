// Component.tsx
import { CMSLink } from '@/components/Link'
import { LinkFields } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import classNames from 'classnames'

export type TestimonialsBlock = {
  // Updated type name
  title?: string
  testimonials?: {
    // Testimonials array
    quote: string
    author: string
    image: {
      url: string
      alt?: string
      width?: number
      height?: number
    }
  }[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlock> = (props) => {
  const { title, testimonials } = props

  return (
    
<section className="py-8 lg:py-12">
  <div className="mx-auto px-8">
    {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Use grid for consistent spacing */}
      {testimonials?.map((testimonial, index) => (
        <div
          key={index}
          className="max-w-[600px] rounded-lg shadow-lg p-6 transition-shadow duration-300 hover:shadow-xl relative overflow-hidden" // Added hover effect and overflow hidden
        >
           {/* Added a pseudo-element for a subtle hover background effect */}
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-5"></div>

          <p className="text-lg mb-4 italic">{testimonial.quote}</p>
          <div className="flex justify-end items-center gap-4"> {/* Align items to the right and center */}
            <div className="flex justify-center items-end"> {/* Container for author info */}
                <p className="font-medium text-right">-{testimonial.author}</p> {/* Align author name to the right */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden mt-2"> {/* Fixed size for image, overflow hidden */}
                  <Image
                    src={testimonial.image.url}
                    alt={testimonial.image.alt || ''}
                    fill // Fill the container
                    sizes="100vw" // Prevent layout shift
                    className="rounded-full object-cover" // Ensure image covers circle
                    priority // Optimize loading
                  />
                  </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}
