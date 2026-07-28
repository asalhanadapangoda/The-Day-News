import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Cookie Policy - The Day News Global</title>
        <meta name="description" content="Cookie Policy for The Day News Global" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-lg">Effective Date: July 28, 2026</p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <p className="text-lg text-gray-200">
              This Cookie Policy explains how The Day News Global uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                What are cookies?
              </h2>
              <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 purple-500 bg-purple-500 rounded-full"></span>
                Why do we use cookies?
              </h2>
              <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our website for advertising, analytics, and other purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">How can I control cookies?</h2>
              <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
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
                  <p className="text-gray-400 mb-2">If you have any questions about our use of cookies, please contact us at:</p>
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

export default CookiePolicy;
