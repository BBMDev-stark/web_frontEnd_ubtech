'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

const fallback = '/images/products/placeholder.svg';

export default function ProductImage({ src, ...props }: Omit<ImageProps, 'onError'>) {
  const [failedSource, setFailedSource] = useState<ImageProps['src'] | null>(null);
  const showFallback = !src || src === failedSource;

  return (
    <Image
      {...props}
      src={showFallback ? fallback : src}
      unoptimized
      onError={showFallback ? undefined : () => setFailedSource(src)}
    />
  );
}
