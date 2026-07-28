import Article from '../models/Article.js';
import Program from '../models/Program.js';
import Event from '../models/Event.js';

// Country models
import AuArticle from '../../Country/Australia/models/Article.js';
import AuProgram from '../../Country/Australia/models/Program.js';
import BdArticle from '../../Country/Bangladesh/models/Article.js';
import BdProgram from '../../Country/Bangladesh/models/Program.js';
import BdEvent from '../../Country/Bangladesh/models/Event.js';
import DkArticle from '../../Country/Denmark/models/Article.js';
import InArticle from '../../Country/India/models/Article.js';
import JpArticle from '../../Country/Japan/models/Article.js';
import NzArticle from '../../Country/NewZealand/models/Article.js';
import SmArticle from '../../Country/Samoa/models/Article.js';
import ZaArticle from '../../Country/SouthAfrica/models/Article.js';
import ThArticle from '../../Country/Thailand/models/Article.js';
import UsArticle from '../../Country/USA/models/Article.js';

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

const COUNTRIES = [
  'Bangladesh', 'Australia', 'NewZealand', 'Japan', 
  'India', 'USA', 'Thailand', 'Denmark', 'Samoa', 'SouthAfrica'
];

const toSeoFriendly = (c) => {
  const map = { 'NewZealand': 'new-zealand', 'SouthAfrica': 'south-africa' };
  return map[c] || c.toLowerCase();
};

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

    // Fetch all Country articles in parallel
    const countryArticleQueries = [
      { model: AuArticle, prefix: 'Australia' },
      { model: BdArticle, prefix: 'Bangladesh' },
      { model: DkArticle, prefix: 'Denmark' },
      { model: InArticle, prefix: 'India' },
      { model: JpArticle, prefix: 'Japan' },
      { model: NzArticle, prefix: 'NewZealand' },
      { model: SmArticle, prefix: 'Samoa' },
      { model: ZaArticle, prefix: 'SouthAfrica' },
      { model: ThArticle, prefix: 'Thailand' },
      { model: UsArticle, prefix: 'USA' },
    ];

    const countryProgramQueries = [
      { model: AuProgram, prefix: 'Australia' },
      { model: BdProgram, prefix: 'Bangladesh' },
    ];

    const countryEventQueries = [
      { model: BdEvent, prefix: 'Bangladesh' },
    ];

    const countryArticleResults = await Promise.all(
      countryArticleQueries.map(async ({ model, prefix }) => {
        try {
          const articles = await model.find({ status: 'published' }).select('slug updatedAt publishDate').lean();
          return articles.map(a => ({ ...a, countryPrefix: prefix }));
        } catch {
          return [];
        }
      })
    );

    const countryProgramResults = await Promise.all(
      countryProgramQueries.map(async ({ model, prefix }) => {
        try {
          const programs = await model.find({}).select('slug updatedAt').lean();
          return programs.map(p => ({ ...p, countryPrefix: prefix }));
        } catch {
          return [];
        }
      })
    );

    const countryEventResults = await Promise.all(
      countryEventQueries.map(async ({ model, prefix }) => {
        try {
          const events = await model.find({ status: 'published' }).select('slug updatedAt eventDate').lean();
          return events.map(e => ({ ...e, countryPrefix: prefix }));
        } catch {
          return [];
        }
      })
    );

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

    // 2. Add Country Static Routes (Lower Priority)
    const PROGRAM_COUNTRIES = ['Bangladesh', 'Australia'];
    COUNTRIES.forEach(country => {
      const seoCountry = toSeoFriendly(country);
      addUrl(`/${seoCountry}`, '0.6', 'weekly');
      addUrl(`/${seoCountry}/articles`, '0.5', 'weekly');
      if (PROGRAM_COUNTRIES.includes(country)) {
        addUrl(`/${seoCountry}/programs`, '0.5', 'weekly');
      }
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

    // 4. Add Country Dynamic Content (Lower Priority)
    for (const countryArticles of countryArticleResults) {
      for (const article of countryArticles) {
        const seoCountry = toSeoFriendly(article.countryPrefix);
        addUrl(`/${seoCountry}/articles/${escapeXml(article.slug)}`, '0.5', 'monthly', article.updatedAt || article.publishDate);
      }
    }

    for (const countryPrograms of countryProgramResults) {
      for (const program of countryPrograms) {
        const seoCountry = toSeoFriendly(program.countryPrefix);
        addUrl(`/${seoCountry}/programs/${escapeXml(program.slug)}`, '0.5', 'monthly', program.updatedAt);
      }
    }

    for (const countryEvents of countryEventResults) {
      for (const event of countryEvents) {
        const seoCountry = toSeoFriendly(event.countryPrefix);
        addUrl(`/${seoCountry}/events/${escapeXml(event.slug)}`, '0.5', 'monthly', event.updatedAt || event.eventDate);
      }
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
