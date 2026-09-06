import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

const DOMAIN = 'https://thedaynewsglobal.lk';

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

async function generateSitemap() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thedaynews');
  console.log('Connected!');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  const addUrl = (url, priority, changefreq) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  };

  console.log('Adding static routes...');
  STATIC_ROUTES.forEach(route => {
    addUrl(route, route === '' ? '1.0' : '0.9', 'daily');
  });

  console.log('Fetching dynamic content...');
  
  // Load Global Models dynamically
  const Article = (await import('./Global/models/Article.js')).default;
  const Program = (await import('./Global/models/Program.js')).default;
  const Event = (await import('./Global/models/Event.js')).default;

  const globalArticles = await Article.find({ status: 'published' }).select('slug');
  globalArticles.forEach(article => addUrl(`/articles/${article.slug}`, '0.9', 'daily'));

  const globalPrograms = await Program.find().select('slug');
  globalPrograms.forEach(program => addUrl(`/programs/${program.slug}`, '0.9', 'daily'));

  const globalEvents = await Event.find({ status: 'published' }).select('slug');
  globalEvents.forEach(event => addUrl(`/events/${event.slug}`, '0.9', 'daily'));

  xml += `</urlset>`;

  const outputPath = path.join(__dirname, '../client/public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`Sitemap generated successfully at ${outputPath}`);
  
  mongoose.connection.close();
}

generateSitemap().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
