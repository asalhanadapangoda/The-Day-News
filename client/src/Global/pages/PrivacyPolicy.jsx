import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="global-page-container tw-max-w-4xl tw-mx-auto tw-py-12 tw-px-4">
      <Helmet>
        <title>Privacy Policy - The Day News Global</title>
        <meta name="description" content="Privacy Policy for The Day News Global" />
      </Helmet>

      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Privacy Policy</h1>
      <p className="tw-text-gray-600 tw-mb-8">Effective Date: July 28, 2026</p>

      <div className="tw-prose tw-prose-lg">
        <p>Welcome to The Day News Global. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Information We Collect</h2>
        <p>We may collect:</p>
        <ul className="tw-list-disc tw-pl-6 tw-mb-6">
          <li>Your name and email address when you contact us or subscribe to our newsletter.</li>
          <li>Technical information such as your IP address, browser type, device information, and pages visited.</li>
          <li>Information collected through cookies and analytics tools.</li>
        </ul>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="tw-list-disc tw-pl-6 tw-mb-6">
          <li>Provide and improve our news services.</li>
          <li>Respond to your inquiries.</li>
          <li>Send newsletters or updates if you subscribe.</li>
          <li>Analyze website performance and user experience.</li>
          <li>Protect our website from misuse and security threats.</li>
        </ul>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Cookies</h2>
        <p className="tw-mb-6">Our website uses cookies to remember your preferences, improve functionality, analyze website traffic, and support advertising services.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Third-Party Services</h2>
        <p>We may use trusted third-party services such as:</p>
        <ul className="tw-list-disc tw-pl-6 tw-mb-6">
          <li>Google Analytics</li>
          <li>Google AdSense (if enabled)</li>
          <li>Social media platforms</li>
          <li>Embedded content providers</li>
        </ul>
        <p className="tw-mb-6">These services may collect information according to their own privacy policies.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Data Security</h2>
        <p className="tw-mb-6">We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Your Rights</h2>
        <p>You may contact us at any time to:</p>
        <ul className="tw-list-disc tw-pl-6 tw-mb-6">
          <li>Request access to your personal information.</li>
          <li>Request correction or deletion of your information.</li>
          <li>Unsubscribe from newsletters or marketing communications.</li>
        </ul>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Changes to This Policy</h2>
        <p className="tw-mb-6">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.</p>

        <h2 className="tw-text-2xl tw-font-semibold tw-mt-8 tw-mb-4">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <address className="tw-not-italic tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mt-4">
          <strong>The Day News Global</strong><br />
          The Third Place, TRACE Expert City, Colombo 10, Sri Lanka<br />
          Email: <a href="mailto:connect@thedaynewsglobal.lk" className="tw-text-blue-600 hover:tw-underline">connect@thedaynewsglobal.lk</a>
        </address>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
