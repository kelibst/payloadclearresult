import Image from "next/image"

type HomeBannerBlock = {
  title: string
  description: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
}

export const HomeBannerBlock: React.FC<HomeBannerBlock> = (props) => {
  const { title, description, image } = props

  return (
    <div className="my-4">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        <div className="col-span-4 lg:col-span-12">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg">{description}</p>
        </div>
        <div className="col-span-4 lg:col-span-12">
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
      </div>
    </div>
  )
}