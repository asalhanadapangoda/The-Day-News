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

const COUNTRIES = [
  'Bangladesh', 'Australia', 'NewZealand', 'Japan', 
  'India', 'USA', 'Thailand', 'Denmark', 'Samoa', 'SouthAfrica'
];

async function generateSitemap() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thedaynews');
  console.log('Connected!');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  const addUrl = (url, priority, changefreq) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  };

  console.log('Adding static routes...');
  STATIC_ROUTES.forEach(route => {
    addUrl(route, route === '' ? '1.0' : '0.9', 'daily');
  });

  COUNTRIES.forEach(country => {
    addUrl(`/${country}`, '0.6', 'weekly');
    addUrl(`/${country}/articles`, '0.5', 'weekly');
    addUrl(`/${country}/programs`, '0.5', 'weekly');
  });

  console.log('Fetching dynamic content...');
  
  // Load Global Models dynamically
  const Article = (await import('./Global/models/Article.js')).default;
  const Program = (await import('./Global/models/Program.js')).default;
  const Event = (await import('./Global/models/Event.js')).default;

  const globalArticles = await Article.find({ isPublished: true }).select('_id');
  globalArticles.forEach(article => addUrl(`/articles/${article._id}`, '0.9', 'daily'));

  const globalPrograms = await Program.find().select('_id');
  globalPrograms.forEach(program => addUrl(`/programs/${program._id}`, '0.9', 'daily'));

  const globalEvents = await Event.find().select('_id');
  globalEvents.forEach(event => addUrl(`/events/${event._id}`, '0.9', 'daily'));

  for (const country of COUNTRIES) {
    try {
      if (fs.existsSync(path.join(__dirname, `./Country/${country}/models/Article.js`))) {
        const CArticle = (await import(`./Country/${country}/models/Article.js`)).default;
        const articles = await CArticle.find({ isPublished: true }).select('_id');
        articles.forEach(a => addUrl(`/${country}/articles/${a._id}`, '0.5', 'monthly'));
      }
    } catch(e) { console.log(`Skipping articles for ${country}`); }

    try {
      if (fs.existsSync(path.join(__dirname, `./Country/${country}/models/Program.js`))) {
        const CProgram = (await import(`./Country/${country}/models/Program.js`)).default;
        const programs = await CProgram.find().select('_id');
        programs.forEach(p => addUrl(`/${country}/programs/${p._id}`, '0.5', 'monthly'));
      }
    } catch(e) { console.log(`Skipping programs for ${country}`); }
  }

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
