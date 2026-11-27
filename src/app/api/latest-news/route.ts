const WORDPRESS_ORIGIN = 'https://cms.ubtechvietnam.edu.vn';
const POSTS_URL = new URL('/wp-json/wp/v2/posts', WORDPRESS_ORIGIN);
POSTS_URL.search = new URLSearchParams({
  per_page: '4',
  orderby: 'date',
  order: 'desc',
  _embed: 'wp:featuredmedia',
  _fields: 'id,link,date,title,_links,_embedded',
}).toString();

type WordPressMedia = {
  source_url?: string;
  media_details?: { sizes?: { medium_large?: { source_url?: string } } };
};

type WordPressPost = {
  id: number;
  date: string | null;
  link: string;
  title: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: WordPressMedia[] };
};

const namedEntities: Record<string, string> = {
  amp: '&', apos: "'", gt: '>', lt: '<', quot: '"', nbsp: ' ',
  ndash: '–', mdash: '—', hellip: '…', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
};

function plainTitle(title: string) {
  return title.replace(/<[^>]*>/g, '').replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, token: string) => {
    if (!token.startsWith('#')) {
      const key = token.toLowerCase();
      return Object.hasOwn(namedEntities, key) ? namedEntities[key] : entity;
    }

    const hex = token[1]?.toLowerCase() === 'x';
    const codePoint = Number.parseInt(token.slice(hex ? 2 : 1), hex ? 16 : 10);
    return codePoint > 0 && codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
  }).trim();
}

export async function GET() {
  try {
    const response = await fetch(POSTS_URL, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`WordPress returned ${response.status}`);

    const entries: WordPressPost[] = await response.json();
    const posts = entries.flatMap((post) => {
      const date = post.date?.slice(0, 10);
      if (!date || Number.isNaN(Date.parse(date)) || !post.link.startsWith(`${WORDPRESS_ORIGIN}/`)) return [];

      const media = post._embedded?.['wp:featuredmedia']?.[0];
      const image = media?.media_details?.sizes?.medium_large?.source_url ?? media?.source_url;
      return [{
        id: post.id,
        date,
        href: post.link,
        title: plainTitle(post.title.rendered),
        image: image?.startsWith('https://') ? image : null,
      }];
    });

    return Response.json(posts);
  } catch {
    return Response.json({ error: 'WordPress news is unavailable' }, { status: 502 });
  }
}
