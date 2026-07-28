import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <div className="tw-min-h-screen tw-bg-[#0a0a0a] tw-text-white tw-py-16 tw-px-4 sm:tw-px-6 lg:tw-px-8">
      <Helmet>
        <title>Terms of Service - The Day News Global</title>
        <meta name="description" content="Terms of Service for The Day News Global" />
      </Helmet>

      <div className="tw-max-w-4xl tw-mx-auto">
        <div className="tw-text-center tw-mb-12">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-blue-400 tw-to-purple-500 tw-mb-4">
            Terms of Service
          </h1>
          <p className="tw-text-gray-400 tw-text-lg">Effective Date: July 28, 2026</p>
        </div>

        <div className="tw-bg-[#111111] tw-border tw-border-white/10 tw-rounded-2xl tw-p-8 md:tw-p-12 tw-shadow-2xl">
          <div className="tw-space-y-8 tw-text-gray-300 tw-leading-relaxed">
            
            <p className="tw-text-lg tw-text-gray-200">
              By accessing and using The Day News Global, you agree to these Terms of Service.
            </p>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-flex tw-items-center tw-gap-3">
                <span className="tw-w-2 tw-h-8 tw-bg-blue-500 tw-rounded-full"></span>
                Use of Our Website
              </h2>
              <p className="tw-mb-3">You may use this website for personal and lawful purposes only.</p>
              <p className="tw-mb-3">You agree not to:</p>
              <ul className="tw-list-disc tw-list-inside tw-space-y-2 tw-ml-4 tw-text-gray-400">
                <li>Use the website for illegal activities.</li>
                <li>Attempt to disrupt or damage the website.</li>
                <li>Copy, reproduce, or distribute our content without permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-border-b tw-border-white/10 tw-pb-2">Intellectual Property</h2>
              <p>Unless otherwise stated, all articles, images, graphics, logos, videos, and other content published on The Day News Global are owned by or licensed to us and are protected by copyright laws.</p>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-border-b tw-border-white/10 tw-pb-2">Third-Party Links</h2>
              <p>Our website may contain links to external websites. We are not responsible for the content, privacy practices, or availability of those websites.</p>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-border-b tw-border-white/10 tw-pb-2">Disclaimer</h2>
              <p>We strive to provide accurate and timely news and information. However, we do not guarantee that all information is complete, accurate, or free from errors.</p>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-border-b tw-border-white/10 tw-pb-2">Limitation of Liability</h2>
              <p>The Day News Global is not responsible for any direct or indirect loss resulting from the use of our website or its content.</p>
            </section>

            <section>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-white tw-mb-4 tw-border-b tw-border-white/10 tw-pb-2">Changes to These Terms</h2>
              <p>We may update these Terms of Service at any time. Continued use of the website means you accept the updated terms.</p>
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
                  <p className="tw-text-gray-400 tw-mb-2">For any questions regarding these Terms, please contact:</p>
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

export default TermsOfService;
