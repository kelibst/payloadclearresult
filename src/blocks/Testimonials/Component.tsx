// Component.tsx
import { CMSLink } from "@/components/Link"
import { LinkFields } from "@payloadcms/richtext-lexical"
import Image from "next/image"
import classNames from 'classnames';

export type TestimonialsBlock = { // Updated type name
  title?: string
  testimonials?: { // Testimonials array
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
    <section className="py-12 bg-gray-100"> {/* Added section and background */}
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              {testimonial.image?.url && (
                <div className="mb-4">
                  <Image
                    src={testimonial.image.url}
                    alt={testimonial.image.alt || `Testimonial ${index + 1}`}
                    width={testimonial.image.width || 100}
                    height={testimonial.image.height || 100}
                    className="rounded-full mx-auto" // Center the image
                    objectFit="cover"
                  />
                </div>
              )}
              <p className="text-gray-700 text-lg mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-900 font-medium">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
