import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'THE DAY NEWS | Global & Local Stories';
const DEFAULT_DESCRIPTION = 'The Day News - Stay updated with breaking stories, in-depth reports, video programs, and local updates from around the globe.';
const DEFAULT_KEYWORDS = 'news, breaking news, world news, current affairs, programs, media features, articles, local news';

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogTitle,
  ogDescription,
  ogImage = '/logo.png',
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'The Day News Team',
}) => {
  const siteTitle = 'THE DAY NEWS';

  let formattedTitle = DEFAULT_TITLE;
  if (title) {
    formattedTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  }

  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const currentUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || formattedTitle} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || formattedTitle} />
      <meta name="twitter:description" content={ogDescription || metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
