import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <div className="tw-min-h-screen tw-bg-[#0a0a0a] tw-text-white tw-py-16 tw-px-4 sm:tw-px-6 lg:tw-px-8">
      <Helmet>
        <title>Cookie Policy - The Day News Global</title>
        <meta name="description" content="Cookie Policy for The Day News Global" />
      </Helmet>

      <div className="tw-max-w-4xl tw-mx-auto">
        <div className="tw-text-center tw-mb-12">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-500 tw-mb-4">
            Cookie Policy
          </h1>
          <p className="tw-text-gray-400 tw-text-lg">Effective Date: July 28, 2026</p>
        </div>

        <div className="tw-bg-[#111111] tw-border tw-border-white/10 tw-rounded-2xl tw-p-8 md:tw-p-12 tw-shadow-2xl">
          <div className="tw-space-y-8 tw-text-gray-300 tw-leading-relaxed">
            
            <p className="tw-text-lg tw-text-gray-200">
              This Cookie Policy explains how The Day News Global uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-flex tw-items-center tw-gap-3">
                <span className="tw-w-2 tw-h-8 tw-bg-blue-500 tw-rounded-full"></span>
                What are cookies?
              </h2>
              <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-flex tw-items-center tw-gap-3">
                <span className="tw-w-2 tw-h-8 tw-purple-500 tw-bg-purple-500 tw-rounded-full"></span>
                Why do we use cookies?
              </h2>
              <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our website for advertising, analytics, and other purposes.</p>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-border-b tw-border-white/10 tw-pb-2">How can I control cookies?</h2>
              <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
            </section>

            <section className="tw-mt-12 tw-pt-8 tw-border-t tw-border-white/10">
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-6">Contact Us</h2>
              <div className="tw-bg-[#1a1a1a] tw-border tw-border-white/5 tw-p-6 tw-rounded-xl tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-gap-6">
                <div className="tw-flex-shrink-0 tw-w-16 tw-h-16 tw-bg-blue-500/10 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                  <svg className="tw-w-8 tw-h-8 tw-text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="tw-text-white tw-font-medium tw-text-lg tw-mb-1">The Day News Global</h3>
                  <p className="tw-text-gray-400 tw-mb-2">If you have any questions about our use of cookies, please contact us at:</p>
                  <a href="mailto:connect@thedaynewsglobal.lk" className="tw-text-blue-400 hover:tw-text-blue-300 tw-transition-colors">
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
