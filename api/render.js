'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BACKEND_URL = 'https://the-day-news.onrender.com';
const SITE_URL = 'https://thedaynewsglobal.lk';
const SITE_NAME = 'The Day News Global';
const DEFAULT_DESCRIPTION =
  'Stay updated with breaking news, in-depth reports, video programs, and local updates from around the globe.';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

/** Escape special characters for safe HTML attribute injection */
const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/** Simple HTTP/HTTPS GET that returns parsed JSON */
const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 5000 }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
  });
};

/** Build JSON-LD NewsArticle / Event structured data */
const buildJsonLd = (meta, url) => {
  if (meta.type === 'event') {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: meta.title,
      description: meta.description,
      image: meta.image,
      startDate: meta.eventDate,
      location: { '@type': 'Place', name: meta.location || SITE_NAME },
      organizer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      url,
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: meta.title,
    description: meta.description,
    image: [meta.image],
    datePublished: meta.publishDate || meta.updatedAt,
    dateModified: meta.updatedAt,
    author: { '@type': 'Person', name: meta.author || 'The Day News Team' },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  });
};

/** Inject all SEO meta tags into the index.html template */
const injectMeta = (html, meta, url) => {
  const title     = escapeHtml(meta.title ? `${meta.title} | ${SITE_NAME}` : SITE_NAME);
  const desc      = escapeHtml(meta.description || DEFAULT_DESCRIPTION);
  const image     = escapeHtml(meta.image       || DEFAULT_IMAGE);
  const canonical = escapeHtml(url              || SITE_URL);
  const keywords  = escapeHtml(meta.keywords    || 'news, global news, breaking news, The Day News');
  const author    = escapeHtml(meta.author       || 'The Day News Team');
  const ogType    = meta.type === 'event' ? 'website' : 'article';
  const jsonLd    = buildJsonLd(meta, url);

  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="author" content="${author}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${jsonLd}</script>`;

  // Remove the existing generic title & description, then inject ours right after <head>
  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta\s+name="description"[^>]*\/?>/, '')
    .replace('<head>', `<head>${metaTags}`);
};

/** Derive content type and slug from the URL path */
const parseContentFromPath = (urlPath) => {
  // ── Global routes ────────────────────────────────────────────────────────
  let m;

  m = urlPath.match(/^\/articles\/([^/?#]+)/);
  if (m) return { type: 'articles', slug: m[1], country: null };

  m = urlPath.match(/^\/programs\/([^/?#]+)/);
  if (m) return { type: 'programs', slug: m[1], country: null };

  m = urlPath.match(/^\/events\/([^/?#]+)/);
  if (m) return { type: 'events', slug: m[1], country: null };

  // ── Bangladesh (articles + programs + events) ─────────────────────────
  m = urlPath.match(/^\/Bangladesh\/articles\/([^/?#]+)/);
  if (m) return { type: 'articles', slug: m[1], country: 'Bangladesh' };

  m = urlPath.match(/^\/Bangladesh\/programs\/([^/?#]+)/);
  if (m) return { type: 'programs', slug: m[1], country: 'Bangladesh' };

  m = urlPath.match(/^\/Bangladesh\/events\/([^/?#]+)/);
  if (m) return { type: 'events', slug: m[1], country: 'Bangladesh' };

  // ── Australia (articles + programs) ──────────────────────────────────
  m = urlPath.match(/^\/Australia\/articles\/([^/?#]+)/);
  if (m) return { type: 'articles', slug: m[1], country: 'Australia' };

  m = urlPath.match(/^\/Australia\/programs\/([^/?#]+)/);
  if (m) return { type: 'programs', slug: m[1], country: 'Australia' };

  // ── Remaining countries (articles only) ──────────────────────────────
  const ARTICLE_ONLY_COUNTRIES = [
    'NewZealand', 'Japan', 'India', 'USA',
    'Thailand', 'Denmark', 'Samoa', 'SouthAfrica',
  ];
  for (const country of ARTICLE_ONLY_COUNTRIES) {
    m = urlPath.match(new RegExp(`^\\/${country}\\/articles\\/([^/?#]+)`));
    if (m) return { type: 'articles', slug: m[1], country };
  }

  return null;
};

/** Load the built index.html — try several possible paths */
const loadIndexHtml = () => {
  const candidates = [
    path.join(process.cwd(), 'client', 'dist', 'index.html'),
    path.join(process.cwd(), 'dist', 'index.html'),
    path.join(__dirname, '..', 'client', 'dist', 'index.html'),
    path.join(__dirname, '..', 'dist', 'index.html'),
  ];
  for (const p of candidates) {
    try { return fs.readFileSync(p, 'utf-8'); } catch { /* try next */ }
  }
  // Minimal fallback so the React SPA still boots for human users
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head><body><div id="root"></div></body></html>';
};

// ─── Main Handler ────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  try {
    const urlPath  = req.url || '/';
    const pageUrl  = `${SITE_URL}${urlPath.split('?')[0]}`;
    const html     = loadIndexHtml();
    const parsed   = parseContentFromPath(urlPath);

    // Pages we don't handle — just serve plain index.html (SPA takes over)
    if (!parsed) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      return res.status(200).send(html);
    }

    // Build the meta API URL
    const metaPath = parsed.country
      ? `${BACKEND_URL}/api/meta/${parsed.country}/${parsed.type}/${parsed.slug}`
      : `${BACKEND_URL}/api/meta/${parsed.type}/${parsed.slug}`;

    let meta = null;
    try {
      meta = await fetchJson(metaPath);
    } catch {
      // Graceful degradation — serve plain index.html, SPA still works
      meta = null;
    }

    const finalHtml = meta ? injectMeta(html, meta, pageUrl) : html;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Serve from CDN cache for 1 hour, then revalidate silently in background
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(finalHtml);
  } catch (err) {
    console.error('[render] Unhandled error:', err);
    // Never crash the site — always return something the React SPA can boot from
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res
      .status(200)
      .send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head><body><div id="root"></div></body></html>');
  }
};
