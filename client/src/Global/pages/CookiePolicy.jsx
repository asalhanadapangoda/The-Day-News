import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <div className="global-page-container tw-max-w-4xl tw-mx-auto tw-py-12 tw-px-4">
      <Helmet>
        <title>Cookie Policy - The Day News Global</title>
        <meta name="description" content="Cookie Policy for The Day News Global" />
      </Helmet>

      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Cookie Policy</h1>
      <p className="tw-text-gray-600 tw-mb-8">Effective Date: July 28, 2026</p>

      <div className="tw-prose tw-prose-lg">
        <p className="tw-mb-6">This Cookie Policy explains how The Day News Global uses cookies and similar technologies to recognize you when you visit our website.</p>
        
        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">What are cookies?</h2>
        <p className="tw-mb-6">Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Why do we use cookies?</h2>
        <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our website for advertising, analytics, and other purposes.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">How can I control cookies?</h2>
        <p className="tw-mb-6">You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Contact Us</h2>
        <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
        <address className="tw-not-italic tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mt-4">
          Email: <a href="mailto:connect@thedaynewsglobal.lk" className="tw-text-blue-600 hover:tw-underline">connect@thedaynewsglobal.lk</a>
        </address>
      </div>
    </div>
  );
};

export default CookiePolicy;
