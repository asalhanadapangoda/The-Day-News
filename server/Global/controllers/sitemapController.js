import Article from '../models/Article.js';
import Program from '../models/Program.js';
import Event from '../models/Event.js';

// Country models
import AuArticle from '../../Country/Australia/models/Article.js';
import AuProgram from '../../Country/Australia/models/Program.js';
import BdArticle from '../../Country/Bangladesh/models/Article.js';
import BdProgram from '../../Country/Bangladesh/models/Program.js';
import DkArticle from '../../Country/Denmark/models/Article.js';
import InArticle from '../../Country/India/models/Article.js';
import JpArticle from '../../Country/Japan/models/Article.js';
import NzArticle from '../../Country/NewZealand/models/Article.js';
import SmArticle from '../../Country/Samoa/models/Article.js';
import ZaArticle from '../../Country/SouthAfrica/models/Article.js';
import ThArticle from '../../Country/Thailand/models/Article.js';
import UsArticle from '../../Country/USA/models/Article.js';

const BASE_URL = 'https://thedaynewsglobal.lk';

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

// @desc    Generate dynamic sitemap.xml with all published content
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

    // Build XML
    let urls = '';

    // Global Articles
    for (const article of globalArticles) {
      urls += `
  <url>
    <loc>${BASE_URL}/articles/${escapeXml(article.slug)}</loc>
    <lastmod>${formatDate(article.updatedAt || article.publishDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Global Programs
    for (const program of globalPrograms) {
      urls += `
  <url>
    <loc>${BASE_URL}/programs/${escapeXml(program.slug)}</loc>
    <lastmod>${formatDate(program.updatedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Global Events
    for (const event of globalEvents) {
      urls += `
  <url>
    <loc>${BASE_URL}/events/${escapeXml(event.slug)}</loc>
    <lastmod>${formatDate(event.updatedAt || event.eventDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Country Articles
    for (const countryArticles of countryArticleResults) {
      for (const article of countryArticles) {
        urls += `
  <url>
    <loc>${BASE_URL}/${article.countryPrefix}/articles/${escapeXml(article.slug)}</loc>
    <lastmod>${formatDate(article.updatedAt || article.publishDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    }

    // Country Programs
    for (const countryPrograms of countryProgramResults) {
      for (const program of countryPrograms) {
        urls += `
  <url>
    <loc>${BASE_URL}/${program.countryPrefix}/programs/${escapeXml(program.slug)}</loc>
    <lastmod>${formatDate(program.updatedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
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
