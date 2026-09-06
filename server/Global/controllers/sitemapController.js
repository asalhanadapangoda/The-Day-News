import Article from '../models/Article.js';
import Program from '../models/Program.js';
import Event from '../models/Event.js';

const BASE_URL = 'https://thedaynewsglobal.lk';

const STATIC_ROUTES = [
  '',
  '/articles',
  '/programs',
  '/events',
  '/packages',
  '/about',
  '/contact',
  '/search',
];

// Helper to format date as YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
};

// Helper to escape XML special characters
const escapeXml = (str) => {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
};

// @desc    Generate dynamic sitemap.xml with all content (static and dynamic)
// @route   GET /api/sitemap.xml
// @access  Public
const generateSitemap = async (req, res) => {
  try {
    // Fetch all published Global content
    const [globalArticles, globalPrograms, globalEvents] = await Promise.all([
      Article.find({ status: 'published' }).select('slug updatedAt publishDate').lean(),
      Program.find({}).select('slug updatedAt').lean(),
      Event.find({ status: 'published' }).select('slug updatedAt eventDate').lean(),
    ]);

    // Build XML
    let urls = '';

    const addUrl = (url, priority, changefreq, lastmodDate = null) => {
      const lastmod = lastmodDate ? formatDate(lastmodDate) : new Date().toISOString().split('T')[0];
      urls += `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    };

    // 1. Add Global Static Routes (High Priority)
    STATIC_ROUTES.forEach(route => {
      addUrl(route, route === '' ? '1.0' : '0.9', 'daily');
    });

    // 3. Add Global Dynamic Content (High Priority)
    for (const article of globalArticles) {
      addUrl(`/articles/${escapeXml(article.slug)}`, '0.9', 'daily', article.updatedAt || article.publishDate);
    }

    for (const program of globalPrograms) {
      addUrl(`/programs/${escapeXml(program.slug)}`, '0.9', 'daily', program.updatedAt);
    }

    for (const event of globalEvents) {
      addUrl(`/events/${escapeXml(event.slug)}`, '0.9', 'daily', event.updatedAt || event.eventDate);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
};

export { generateSitemap };
