import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service - The Day News Global</title>
        <meta name="description" content="Terms of Service for The Day News Global" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg">Effective Date: July 28, 2026</p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <p className="text-lg text-gray-200">
              By accessing and using The Day News Global, you agree to these Terms of Service.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                Use of Our Website
              </h2>
              <p className="mb-3">You may use this website for personal and lawful purposes only.</p>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>Use the website for illegal activities.</li>
                <li>Attempt to disrupt or damage the website.</li>
                <li>Copy, reproduce, or distribute our content without permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Intellectual Property</h2>
              <p>Unless otherwise stated, all articles, images, graphics, logos, videos, and other content published on The Day News Global are owned by or licensed to us and are protected by copyright laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Third-Party Links</h2>
              <p>Our website may contain links to external websites. We are not responsible for the content, privacy practices, or availability of those websites.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Disclaimer</h2>
              <p>We strive to provide accurate and timely news and information. However, we do not guarantee that all information is complete, accurate, or free from errors.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Limitation of Liability</h2>
              <p>The Day News Global is not responsible for any direct or indirect loss resulting from the use of our website or its content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Changes to These Terms</h2>
              <p>We may update these Terms of Service at any time. Continued use of the website means you accept the updated terms.</p>
            </section>

            <section className="mt-12 pt-8 border-t border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-6">Contact Us</h2>
              <div className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">The Day News Global</h3>
                  <p className="text-gray-400 mb-2">For any questions regarding these Terms, please contact:</p>
                  <a href="mailto:connect@thedaynewsglobal.lk" className="text-blue-400 hover:text-blue-300 transition-colors">
                    connect@thedaynewsglobal.lk
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
