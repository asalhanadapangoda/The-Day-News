import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <div className="global-page-container tw-max-w-4xl tw-mx-auto tw-py-12 tw-px-4">
      <Helmet>
        <title>Terms of Service - The Day News Global</title>
        <meta name="description" content="Terms of Service for The Day News Global" />
      </Helmet>

      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Terms of Service</h1>
      <p className="tw-text-gray-600 tw-mb-8">Effective Date: July 28, 2026</p>

      <div className="tw-prose tw-prose-lg">
        <p className="tw-mb-6">By accessing and using The Day News Global, you agree to these Terms of Service.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Use of Our Website</h2>
        <p>You may use this website for personal and lawful purposes only.</p>
        <p className="tw-mt-4">You agree not to:</p>
        <ul className="tw-list-disc tw-pl-6 tw-mb-6">
          <li>Use the website for illegal activities.</li>
          <li>Attempt to disrupt or damage the website.</li>
          <li>Copy, reproduce, or distribute our content without permission.</li>
        </ul>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Intellectual Property</h2>
        <p className="tw-mb-6">Unless otherwise stated, all articles, images, graphics, logos, videos, and other content published on The Day News Global are owned by or licensed to us and are protected by copyright laws.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Third-Party Links</h2>
        <p className="tw-mb-6">Our website may contain links to external websites. We are not responsible for the content, privacy practices, or availability of those websites.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Disclaimer</h2>
        <p className="tw-mb-6">We strive to provide accurate and timely news and information. However, we do not guarantee that all information is complete, accurate, or free from errors.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Limitation of Liability</h2>
        <p className="tw-mb-6">The Day News Global is not responsible for any direct or indirect loss resulting from the use of our website or its content.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Changes to These Terms</h2>
        <p className="tw-mb-6">We may update these Terms of Service at any time. Continued use of the website means you accept the updated terms.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Contact Us</h2>
        <p>For any questions regarding these Terms, please contact:</p>
        <address className="tw-not-italic tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mt-4">
          <strong>The Day News Global</strong><br />
          Email: <a href="mailto:connect@thedaynewsglobal.lk" className="tw-text-blue-600 hover:tw-underline">connect@thedaynewsglobal.lk</a>
        </address>
      </div>
    </div>
  );
};

export default TermsOfService;
