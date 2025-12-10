const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About THE DAY NEWS</h1>

        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At THE DAY NEWS, we are committed to delivering accurate, timely, and insightful news
            coverage to keep you informed about the events that matter most. Our mission is to
            provide a platform where truth meets clarity, and information empowers action.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Through our daily news coverage and engaging podcast series, we strive to bridge the
            gap between complex global events and your understanding, making news accessible,
            relevant, and meaningful.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example team member - you can add more */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center text-gray-800">Team Member</h3>
              <p className="text-gray-600 text-center">Editor-in-Chief</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>

        {/* Contribute Section */}
        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Want to Contribute?</h2>
          <p className="text-gray-700 mb-6">
            We welcome contributions, tips, and story ideas from our community. Help us bring
            important stories to light.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit a Tip or Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

