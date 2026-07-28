import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy - The Day News Global</title>
        <meta name="description" content="Privacy Policy for The Day News Global" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">Effective Date: July 28, 2026</p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <p className="text-lg text-gray-200">
              Welcome to The Day News Global. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                Information We Collect
              </h2>
              <p className="mb-3">We may collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>Your name and email address when you contact us or subscribe to our newsletter.</li>
                <li>Technical information such as your IP address, browser type, device information, and pages visited.</li>
                <li>Information collected through cookies and analytics tools.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 purple-500 bg-purple-500 rounded-full"></span>
                How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>Provide and improve our news services.</li>
                <li>Respond to your inquiries.</li>
                <li>Send newsletters or updates if you subscribe.</li>
                <li>Analyze website performance and user experience.</li>
                <li>Protect our website from misuse and security threats.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Cookies</h2>
              <p>Our website uses cookies to remember your preferences, improve functionality, analyze website traffic, and support advertising services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Third-Party Services</h2>
              <p className="mb-3">We may use trusted third-party services such as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400 mb-4">
                <li>Google Analytics</li>
                <li>Google AdSense (if enabled)</li>
                <li>Social media platforms</li>
                <li>Embedded content providers</li>
              </ul>
              <p>These services may collect information according to their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Data Security</h2>
              <p>We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Your Rights</h2>
              <p className="mb-3">You may contact us at any time to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>Request access to your personal information.</li>
                <li>Request correction or deletion of your information.</li>
                <li>Unsubscribe from newsletters or marketing communications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.</p>
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
                  <p className="text-gray-400 mb-2">The Third Place, TRACE Expert City, Colombo 10, Sri Lanka</p>
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

export default PrivacyPolicy;
