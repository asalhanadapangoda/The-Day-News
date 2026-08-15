export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const pathname = req.url.split('?')[0];

    // 1. Fetch metadata from Render backend
    // Since this is a serverless function, we hit the production backend directly
    const metaApiUrl = `https://the-day-news.onrender.com/api/meta${pathname}`;
    const metaResponse = await fetch(metaApiUrl);
    
    // 2. Fetch the base static index.html from the current Vercel deployment
    // (Hitting the root avoids triggering this same render function, preventing loops)
    const htmlResponse = await fetch(`${baseUrl}/`);
    let html = await htmlResponse.text();

    if (!metaResponse.ok) {
      // If backend fails or article not found, just serve the basic index.html
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    const meta = await metaResponse.json();

    // 3. Construct dynamic Open Graph tags
    const ogTags = `
      <title>${meta.title}</title>
      <meta name="description" content="${meta.description}" />
      <meta name="keywords" content="${meta.keywords}" />
      <meta property="og:title" content="${meta.title}" />
      <meta property="og:description" content="${meta.description}" />
      <meta property="og:image" content="${meta.image}" />
      <meta property="og:url" content="${meta.url}" />
      <meta property="og:type" content="${meta.type || 'website'}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${meta.title}" />
      <meta name="twitter:description" content="${meta.description}" />
      <meta name="twitter:image" content="${meta.image}" />
    `;

    // 4. Inject into HTML
    // Remove the default static title to prevent conflicts
    html = html.replace(/<title>.*?<\/title>/i, '');
    
    // Inject our new tags right before the closing head tag
    html = html.replace('</head>', `${ogTags}\n</head>`);

    // 5. Serve the fully hydrated HTML with caching
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);

  } catch (error) {
    console.error('Render function error:', error);
    res.status(500).send('Internal Server Error');
  }
}
