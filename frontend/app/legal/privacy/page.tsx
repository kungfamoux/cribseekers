'use client';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              <h1 className="display-hero font-heading mb-6">Privacy Policy</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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

                <h2 className="heading-lg text-text-primary mb-4">1. Information We Collect</h2>
                <p className="body-md text-text-secondary mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a payment, or contact us. This includes:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li>Name and contact information</li>
                  <li>Account credentials</li>
                  <li>Payment information</li>
                  <li>Property preferences and search history</li>
                  <li>Communication with other users</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">2. How We Use Your Information</h2>
                <p className="body-md text-text-secondary mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to comments and questions</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect and prevent fraud and abuse</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">3. Information Sharing</h2>
                <p className="body-md text-text-secondary mb-6">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li>Other users when you engage in transactions</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Law enforcement when required by law</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">4. Data Security</h2>
                <p className="body-md text-text-secondary mb-6">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">5. Data Retention</h2>
                <p className="body-md text-text-secondary mb-6">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">6. Your Rights</h2>
                <p className="body-md text-text-secondary mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to processing of your information</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">7. Cookies</h2>
                <p className="body-md text-text-secondary mb-6">
                  We use cookies and similar technologies to improve your experience, analyze usage, and assist in marketing efforts. You can control cookie settings through your browser preferences. See our Cookie Policy for more details.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">8. Third-Party Services</h2>
                <p className="body-md text-text-secondary mb-6">
                  Our platform may contain links to third-party websites. We are not responsible for the privacy practices of such third parties. We encourage you to review their privacy policies.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">9. Children's Privacy</h2>
                <p className="body-md text-text-secondary mb-6">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">10. Changes to This Policy</h2>
                <p className="body-md text-text-secondary mb-6">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">11. Contact Us</h2>
                <p className="body-md text-text-secondary mb-6">
                  If you have any questions about this Privacy Policy, please contact us at privacy@cribseekers.com.
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
