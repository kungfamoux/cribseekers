'use client';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
              <h1 className="display-hero font-heading mb-6">Terms of Service</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Please read these terms carefully before using CribSeekers
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

                <h2 className="heading-lg text-text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="body-md text-text-secondary mb-6">
                  By accessing and using CribSeekers, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our service.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">2. Description of Service</h2>
                <p className="body-md text-text-secondary mb-6">
                  CribSeekers is a real estate platform that connects property seekers with property owners and agents. Our services include property listings, search functionality, inspection booking, and secure payment processing through our escrow system.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">3. User Accounts</h2>
                <p className="body-md text-text-secondary mb-6">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately of any unauthorized use of your account.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">4. Property Listings</h2>
                <p className="body-md text-text-secondary mb-6">
                  Property listings on CribSeekers are provided by property owners and agents. While we strive to verify all listings, we cannot guarantee the accuracy or completeness of any listing. Users should conduct their own due diligence before making any decisions.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">5. Escrow Services</h2>
                <p className="body-md text-text-secondary mb-6">
                  Our escrow service holds funds securely until both parties confirm satisfaction with the transaction. By using our escrow service, you agree to our escrow terms and conditions, which are outlined separately.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">6. Prohibited Activities</h2>
                <p className="body-md text-text-secondary mb-6">
                  Users may not use CribSeekers for any illegal purpose, to solicit others to perform unlawful acts, or to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">7. Intellectual Property</h2>
                <p className="body-md text-text-secondary mb-6">
                  All content on CribSeekers, including text, graphics, logos, images, and software, is the property of CribSeekers or its content suppliers and is protected by international copyright laws.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">8. Limitation of Liability</h2>
                <p className="body-md text-text-secondary mb-6">
                  CribSeekers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">9. Termination</h2>
                <p className="body-md text-text-secondary mb-6">
                  We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">10. Governing Law</h2>
                <p className="body-md text-text-secondary mb-6">
                  These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">11. Changes to Terms</h2>
                <p className="body-md text-text-secondary mb-6">
                  We reserve the right to modify these terms at any time. All changes are effective immediately when we post them. Your continued use of the service following the posting of changes constitutes your acceptance of such changes.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">12. Contact Information</h2>
                <p className="body-md text-text-secondary mb-6">
                  If you have any questions about these Terms of Service, please contact us at legal@cribseekers.com.
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
