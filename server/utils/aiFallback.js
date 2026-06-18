export const getFallbackResponse = (userMessage, countryContext = '') => {
  const msg = userMessage.toLowerCase().trim();
  
  // Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/.test(msg) || msg === 'hi' || msg === 'hello') {
    return `Welcome to The Day News Global${countryContext ? ' - ' + countryContext : ''}, your trusted source for news and information. We are 'Your Media Partner in Cyberspace', dedicated to delivering credible and engaging content to our readers.`;
  }

  // Products / Pricing
  if (msg.includes('product') || msg.includes('package') || msg.includes('price') || msg.includes('pricing') || msg.includes('cost') || msg.includes('buy') || msg.includes('book') || msg.includes('fee') || msg.includes('charge') || msg.includes('service') || msg.includes('offer')) {
    return `We offer several media packages tailored to amplify your brand's digital presence.

OUR PACKAGES
- Premium Package: Podcast interview, 3 mid-range videos, photography, voice-cut videos, promo video, web article, and social media posts.
- Platinum Package: Photography, voice-cut videos, promo video, web article, and social media posts.
- Podcast Package: Podcast interview, 2 mid-range videos, social media posts, and web article.
- Photography Package: Full event coverage, high-resolution edited photos, online gallery access, social media posts, and web article.

PRICING AND DETAILS
You can find the pricing and book a package directly on our Products page. If you need a custom media solution, please contact our team for a free consultation.`;
  }

  // Contact / Address
  if (msg.includes('contact') || msg.includes('address') || msg.includes('office') || msg.includes('location') || msg.includes('email') || msg.includes('phone') || msg.includes('call') || msg.includes('message') || msg.includes('support') || msg.includes('map')) {
    return `You can get in touch with our team through any of the following channels.

OUR OFFICES
- Lobby Office: The Third Place, TRACE Expert City, Colombo 10
- Content Studio: Hacker House, Pannipitiya Rd, Battaramulla

CONTACT DETAILS
- Email: contact@thedaynewsglobal.com
- Phone: +1 (555) 123-4567

To send a message directly to our consulting team, please navigate to our Contact page and fill out the contact form.`;
  }

  // News / Articles
  if (msg.includes('news') || msg.includes('article') || msg.includes('story') || msg.includes('stories') || msg.includes('read') || msg.includes('latest') || msg.includes('publish') || msg.includes('headline')) {
    return `We provide continuous coverage of local and global news.

NEWS CATEGORIES
- National News: Local government, economy, and social updates
- International News: Crucial global developments and regional analysis
- Technology and Innovation: Local and international scientific and technological advancements
- Sports: Local and global sports events, match results, and athletics news

Please visit our News or Articles section on the website to read our latest publications and filter articles by category.`;
  }

  // Programs / Episodes
  if (msg.includes('program') || msg.includes('episode') || msg.includes('show') || msg.includes('podcast') || msg.includes('video') || msg.includes('watch') || msg.includes('media')) {
    return `We produce high-quality digital shows and audio-visual podcasts.

OUR DIGITAL SHOWS
Our programs feature interviews with experts, thought leaders, and innovators covering current events, technology, and community development.

To watch or listen to our shows, please navigate to the Programs section of our website, where you can browse all shows and view specific episodes.`;
  }

  // About
  if (msg.includes('about') || msg.includes('who are you') || msg.includes('what is this') || msg.includes('company') || msg.includes('mission') || msg.includes('purpose') || msg.includes('who are') || msg.includes('what is the day news')) {
    return `The Day News Global is a premier, interactive media platform dedicated to the pursuit of knowledge.

OUR MISSION
We empower a global audience to gain meaningful insights through active engagement with diverse perspectives, serving as your strategic media partner in cyberspace.

For more information, please visit our About Us page on the website.`;
  }

  // Default response
  return `Thank you for your question about The Day News Global.

While our advanced AI engine is currently processing inquiries, here is how you can find this information:
- For packages and pricing, please visit our Products page.
- To contact us or send a message, please check our Contact page.
- For latest updates and stories, visit our News or Articles section.
- For video series and podcast episodes, visit our Programs section.

Please let me know if you would like me to guide you to any of these sections!`;
};
