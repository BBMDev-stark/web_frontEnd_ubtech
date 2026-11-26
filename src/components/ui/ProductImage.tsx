'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  getBundledProductImages,
  hasLightProductBackdrop,
  localProductImagePath,
  productImagePlaceholder,
} from '@/lib/catalogue-image-source';

type ProductImageProps = Omit<ImageProps, 'onError'> & {
  productSlug?: string;
  assetIndex?: number;
};

export default function ProductImage({ src, productSlug, assetIndex = 0, className, ...props }: ProductImageProps) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const localPath = typeof src === 'string' ? localProductImagePath(src) : undefined;
  const bundled = getBundledProductImages(productSlug);
  const candidates = [localPath, bundled[assetIndex] ?? bundled[0]];
  const source = candidates.find(path => path && path !== productImagePlaceholder && !failedSources.includes(path))
    ?? productImagePlaceholder;

  return (
    <Image
      {...props}
      src={source}
      className={cn(className, hasLightProductBackdrop(source) && 'mix-blend-multiply')}
      unoptimized
      onError={source === productImagePlaceholder ? undefined : () => setFailedSources(previous => [...previous, source])}
    />
  );
}
