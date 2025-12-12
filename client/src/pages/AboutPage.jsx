const AboutPage = () => {
  return (
    <div className="min-h-screen py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-premium-lg">
            About THE DAY NEWS
          </h1>
        </div>

        {/* Mission Statement */}
        <section className="mb-12 md:mb-16">
          <div className="glass-card rounded-organic-lg p-8 md:p-10 lg:p-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-premium">Our Mission</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              At THE DAY NEWS, we are committed to delivering accurate, timely, and insightful news
              coverage to keep you informed about the events that matter most. Our mission is to
              provide a platform where truth meets clarity, and information empowers action.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Through our daily news coverage and engaging podcast series, we strive to bridge the
              gap between complex global events and your understanding, making news accessible,
              relevant, and meaningful.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center text-premium">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Example team member - you can add more */}
            <div className="glass-card rounded-organic-lg p-6 md:p-8 text-center animate-fade-in">
              <div className="w-24 h-24 md:w-28 md:h-28 gradient-blue rounded-full mx-auto mb-4 shadow-lg glow-blue"></div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 text-premium">Team Member</h3>
              <p className="text-gray-600">Editor-in-Chief</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>

        {/* Contribute Section */}
        <section className="glass-card rounded-organic-lg p-8 md:p-10 lg:p-12 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-premium">Want to Contribute?</h2>
          <p className="text-gray-700 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            We welcome contributions, tips, and story ideas from our community. Help us bring
            important stories to light.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3.5 btn-liquid rounded-full text-white font-medium text-base md:text-lg ripple"
          >
            Submit a Tip or Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

