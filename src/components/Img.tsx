import React, { FC, useState } from 'react'
import Image from 'next/legacy/image'

interface Props {
  src: string
  alt?: string
  className?: string
  maxHeight?: string | number
}

export const Img: FC<Props> = ({ src, alt, className, maxHeight }) => {
  const [paddingTop, setPaddingTop] = useState<string | number>(0)
  src = src || 'https://unsplash.it/g/600/400'

  return (
    <div
      style={{ paddingTop, maxHeight }}
      className={`relative ${className || ''}`}
    >
      <Image
        src={src}
        alt={alt}
        layout='fill'
        objectFit='cover'
        onLoad={(e) => {
          setPaddingTop(maxHeight)
        }}
      />
    </div>
  )
}
