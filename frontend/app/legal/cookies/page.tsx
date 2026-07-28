'use client';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="display-hero font-heading mb-6">Cookie Policy</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                This policy explains how CribSeekers uses cookies and similar technologies.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="body-lg text-text-secondary mb-8">
                  Last updated: July 20, 2026
                </p>

                <h2 className="heading-lg text-text-primary mb-4">1. What Are Cookies</h2>
                <p className="body-md text-text-secondary mb-6">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">2. How We Use Cookies</h2>
                <p className="body-md text-text-secondary mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
                  <li><strong>Authentication Cookies:</strong> Keep you logged in to your account</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="heading-md text-text-primary mb-2">Session Cookies</h3>
                <p className="body-md text-text-secondary mb-6">
                  These are temporary cookies that expire when you close your browser. They help us maintain your session while you navigate our platform.
                </p>

                <h3 className="heading-md text-text-primary mb-2">Persistent Cookies</h3>
                <p className="body-md text-text-secondary mb-6">
                  These cookies remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.
                </p>

                <h3 className="heading-md text-text-primary mb-2">Third-Party Cookies</h3>
                <p className="body-md text-text-secondary mb-6">
                  We may use third-party services that place cookies on your device, such as analytics tools and payment processors.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">4. Managing Cookies</h2>
                <p className="body-md text-text-secondary mb-4">
                  You can control and manage cookies in various ways:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li>Browser settings to accept or reject cookies</li>
                  <li>Browser settings to delete existing cookies</li>
                  <li>Our cookie consent banner to manage preferences</li>
                </ul>
                <p className="body-md text-text-secondary mb-6">
                  Please note that disabling cookies may affect the functionality of our platform and your user experience.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">5. Third-Party Services</h2>
                <p className="body-md text-text-secondary mb-4">
                  We use the following third-party services that may use cookies:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing features</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">6. Updates to This Policy</h2>
                <p className="body-md text-text-secondary mb-6">
                  We may update this cookie policy from time to time to reflect changes in our use of cookies or due to regulatory requirements. We will notify you of any significant changes by posting the updated policy on this page.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">7. Contact Us</h2>
                <p className="body-md text-text-secondary mb-6">
                  If you have any questions about our use of cookies, please contact us at privacy@cribseekers.com.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
