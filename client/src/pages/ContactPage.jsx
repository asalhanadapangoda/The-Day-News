import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    submitTip: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '', submitTip: false });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-10 md:mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-premium-lg">
            Contact Us
          </h1>
        </div>

        {/* Contact Form */}
        <div className="glass-card rounded-organic-lg p-8 md:p-10 lg:p-12 mb-8 md:mb-10 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 text-premium">Send us a message</h2>
          
          {submitted && (
            <div className="glass-blue rounded-organic px-5 py-4 mb-6 text-green-700 border border-green-300/50">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2.5 text-sm md:text-base">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 glass-input rounded-full text-base focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2.5 text-sm md:text-base">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 glass-input rounded-full text-base focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2.5 text-sm md:text-base">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-5 py-3 glass-input rounded-organic text-base focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="submitTip"
                  checked={formData.submitTip}
                  onChange={handleChange}
                  className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-gray-700 text-sm md:text-base">Submit a tip</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3.5 btn-liquid rounded-full text-white font-medium text-base md:text-lg ripple"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="glass-card rounded-organic-lg p-8 md:p-10 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 text-premium">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Follow Us</h3>
              <a
                href="https://www.facebook.com/thedaynewsglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-3 group transition-colors"
              >
                <div className="w-10 h-10 glass-blue rounded-full flex items-center justify-center group-hover:glow-blue-hover transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="font-medium">Facebook Page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

