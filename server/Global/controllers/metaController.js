import Article from '../models/Article.js';
import Program from '../models/Program.js';
import Event from '../models/Event.js';

// Country article models
import AuArticle from '../../Country/Australia/models/Article.js';
import BdArticle from '../../Country/Bangladesh/models/Article.js';
import DkArticle from '../../Country/Denmark/models/Article.js';
import InArticle from '../../Country/India/models/Article.js';
import JpArticle from '../../Country/Japan/models/Article.js';
import NzArticle from '../../Country/NewZealand/models/Article.js';
import SmArticle from '../../Country/Samoa/models/Article.js';
import ZaArticle from '../../Country/SouthAfrica/models/Article.js';
import ThArticle from '../../Country/Thailand/models/Article.js';
import UsArticle from '../../Country/USA/models/Article.js';

// Country program models (only Bangladesh and Australia have programs)
import AuProgram from '../../Country/Australia/models/Program.js';
import BdProgram from '../../Country/Bangladesh/models/Program.js';

// Country event models (only Bangladesh has events)
import BdEvent from '../../Country/Bangladesh/models/Event.js';

const BASE_URL = 'https://thedaynewsglobal.lk';
const LOGO_URL = 'https://thedaynewsglobal.lk/logo.png';

const COUNTRY_ARTICLE_MODELS = {
  Australia:   AuArticle,
  Bangladesh:  BdArticle,
  Denmark:     DkArticle,
  India:       InArticle,
  Japan:       JpArticle,
  NewZealand:  NzArticle,
  Samoa:       SmArticle,
  SouthAfrica: ZaArticle,
  Thailand:    ThArticle,
  USA:         UsArticle,
};

const COUNTRY_PROGRAM_MODELS = {
  Australia:  AuProgram,
  Bangladesh: BdProgram,
};

const COUNTRY_EVENT_MODELS = {
  Bangladesh: BdEvent,
};

// @desc    Get lightweight metadata for SSR (articles, programs, events)
// @route   GET /api/meta/articles/:slug
// @route   GET /api/meta/programs/:slug
// @route   GET /api/meta/events/:slug
// @route   GET /api/meta/:country/articles/:slug
// @access  Public

const getArticleMeta = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug, status: 'published' })
      .select('title excerpt metaTitle metaDescription metaKeywords metaImage featuredImage author publishDate updatedAt category')
      .populate('category', 'name')
      .lean();

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const title = article.metaTitle || article.title;
    const description = article.metaDescription || article.excerpt || '';
    const image = article.metaImage || article.featuredImage || LOGO_URL;
    const keywords = article.metaKeywords || `news, ${article.category?.name || 'article'}, global, breaking news`;
    const url = `${BASE_URL}/articles/${slug}`;

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords,
      image,
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

const getCountryArticleMeta = async (req, res) => {
  try {
    const { country, slug } = req.params;
    const Model = COUNTRY_ARTICLE_MODELS[country];

    if (!Model) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const article = await Model.findOne({ slug, status: 'published' })
      .select('title excerpt metaTitle metaDescription metaKeywords metaImage featuredImage author publishDate updatedAt')
      .lean();

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const title = article.metaTitle || article.title;
    const description = article.metaDescription || article.excerpt || '';
    const image = article.metaImage || article.featuredImage || LOGO_URL;
    const keywords = article.metaKeywords || `news, ${country}, local news`;
    const url = `${BASE_URL}/${country}/articles/${slug}`;

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords,
      image,
      author: article.author || 'The Day News Team',
      publishDate: article.publishDate,
      updatedAt: article.updatedAt,
      category: country,
      url,
      type: 'article',
    });
  } catch (error) {
    console.error('Country article meta error:', error);
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


const getCountryProgramMeta = async (req, res) => {
  try {
    const { country, slug } = req.params;
    const Model = COUNTRY_PROGRAM_MODELS[country];

    if (!Model) {
      return res.status(404).json({ message: 'Country programs not found' });
    }

    const program = await Model.findOne({ slug })
      .select('title description metaTitle metaDescription metaKeywords metaImage coverImage updatedAt')
      .lean();

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const title       = program.metaTitle       || program.title;
    const description = program.metaDescription || program.description || '';
    const image       = program.metaImage || program.coverImage || LOGO_URL;
    const url         = `${BASE_URL}/${country}/programs/${slug}`;

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords: program.metaKeywords || `program, ${program.title}, ${country}, The Day News`,
      image,
      author:   'The Day News Team',
      updatedAt: program.updatedAt,
      url,
      type:     'website',
    });
  } catch (error) {
    console.error('Country program meta error:', error);
    res.status(500).json({ message: 'Error fetching program metadata' });
  }
};

const getCountryEventMeta = async (req, res) => {
  try {
    const { country, slug } = req.params;
    const Model = COUNTRY_EVENT_MODELS[country];

    if (!Model) {
      return res.status(404).json({ message: 'Country events not found' });
    }

    const event = await Model.findOne({ slug, status: 'published' })
      .select('title tagline metaTitle metaDescription metaKeywords metaImage heroImages eventDate location updatedAt')
      .lean();

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const title       = event.metaTitle       || event.title;
    const description = event.metaDescription || event.tagline || '';
    const image       = event.metaImage
      || (event.heroImages && event.heroImages.length > 0 ? event.heroImages[0] : null)
      || LOGO_URL;
    const url         = `${BASE_URL}/${country}/events/${slug}`;

    res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      title,
      description,
      keywords:  event.metaKeywords || `event, ${event.title}, ${country}, The Day News`,
      image,
      author:    'The Day News Team',
      eventDate: event.eventDate,
      location:  event.location,
      updatedAt: event.updatedAt,
      url,
      type:      'event',
    });
  } catch (error) {
    console.error('Country event meta error:', error);
    res.status(500).json({ message: 'Error fetching event metadata' });
  }
};

export {
  getArticleMeta,
  getCountryArticleMeta,
  getProgramMeta,
  getEventMeta,
  getCountryProgramMeta,
  getCountryEventMeta,
};
