import Article from '../models/Article.js';
import Program from '../models/Program.js';
import Event from '../models/Event.js';

const BASE_URL = 'https://thedaynewsglobal.lk';
const LOGO_URL = 'https://thedaynewsglobal.lk/logo.png';

// @route   GET /api/meta/articles/:slug
// @route   GET /api/meta/programs/:slug
// @route   GET /api/meta/events/:slug
// @access  Public

const getArticleMeta = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug, status: 'published' })
      .select('title excerpt content metaTitle metaDescription metaKeywords metaImage featuredImage author publishDate updatedAt category')
      .populate('category', 'name')
      .lean();

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const title = article.metaTitle || article.title;
    const description = article.metaDescription || article.excerpt || '';
    const image = article.metaImage || article.featuredImage || LOGO_URL;
    const keywords = article.metaKeywords || `news, ${article.category?.name || 'article'}, global`;
    const url = `${BASE_URL}/articles/${slug}`;
    // Strip HTML tags to give crawlers plain text body content
    const bodyText = (article.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords,
      image,
      bodyText,
      author: article.author || 'The Day News Team',
      publishDate: article.publishDate,
      updatedAt: article.updatedAt,
      category: article.category?.name || 'News',
      url,
      type: 'article',
    });
  } catch (error) {
    console.error('Article meta error:', error);
    res.status(500).json({ message: 'Error fetching article metadata' });
  }
};


const getProgramMeta = async (req, res) => {
  try {
    const { slug } = req.params;
    const program = await Program.findOne({ slug })
      .select('title description metaTitle metaDescription metaKeywords metaImage coverImage updatedAt')
      .lean();

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const title = program.metaTitle || program.title;
    const description = program.metaDescription || program.description || '';
    const image = program.metaImage || program.coverImage || LOGO_URL;
    const url = `${BASE_URL}/programs/${slug}`;

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords: program.metaKeywords || `program, show, ${program.title}, The Day News`,
      image,
      author: 'The Day News Team',
      updatedAt: program.updatedAt,
      url,
      type: 'website',
    });
  } catch (error) {
    console.error('Program meta error:', error);
    res.status(500).json({ message: 'Error fetching program metadata' });
  }
};

const getEventMeta = async (req, res) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug, status: 'published' })
      .select('title tagline metaTitle metaDescription metaKeywords metaImage heroImages eventDate location updatedAt')
      .lean();

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const title       = event.metaTitle       || event.title;
    const description = event.metaDescription || event.tagline || '';
    // Prefer explicit metaImage, then first heroImage, then site logo
    const image       = event.metaImage
      || (event.heroImages && event.heroImages.length > 0 ? event.heroImages[0] : null)
      || LOGO_URL;
    const url         = `${BASE_URL}/events/${slug}`;

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords:    event.metaKeywords || `event, ${event.title}, The Day News`,
      image,
      author:      'The Day News Team',
      eventDate:   event.eventDate,
      location:    event.location,
      updatedAt:   event.updatedAt,
      url,
      type:        'event',
    });
  } catch (error) {
    console.error('Event meta error:', error);
    res.status(500).json({ message: 'Error fetching event metadata' });
  }
};


export {
  getArticleMeta,
  getProgramMeta,
  getEventMeta,
};
