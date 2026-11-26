import catalogue from './catalogue-images.json';

const paths: Readonly<Record<string, string[] | undefined>> = catalogue.paths;
const lightBackdrops = new Set(catalogue.whiteBackdrops);
const productPath = /^\/images\/(?:products|site)\/[a-z0-9-]+\.(?:webp|png|jpe?g|svg)$/i;
const storefrontHosts = new Set(['www.ubtechvietnam.edu.vn', 'ubtechvietnam.edu.vn']);

export const productImagePlaceholder = '/images/products/placeholder.svg';

export function getBundledProductImages(slug?: string): readonly string[] {
  return slug && Object.hasOwn(paths, slug) ? paths[slug] ?? [] : [];
}

export function localProductImagePath(value: string): string | undefined {
  if (productPath.test(value)) return value;

  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && storefrontHosts.has(url.host) && productPath.test(url.pathname)) {
      return url.pathname;
    }
  } catch {
    // Some older records contain relative paths outside the current image directory.
  }
}

export function hasLightProductBackdrop(path: string) {
  return lightBackdrops.has(path);
}
