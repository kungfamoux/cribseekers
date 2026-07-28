'use client';

import { useState } from 'react';
import { Navbar, Footer } from '@/components/public';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account on CribSeekers?',
        a: 'Creating an account is simple. Click the "Sign In" button on the homepage, then select "Create Account". Fill in your details, verify your email, and you\'re ready to start searching for properties.',
      },
      {
        q: 'Is CribSeekers free to use?',
        a: 'Yes, browsing and searching for properties on CribSeekers is completely free. We only charge fees when you successfully complete a transaction through our platform.',
      },
      {
        q: 'How do I search for properties?',
        a: 'Use our search bar to enter keywords, locations, or property types. You can also use our advanced filters to narrow down by price, number of bedrooms, amenities, and more.',
      },
    ],
  },
  {
    category: 'Property Listings',
    questions: [
      {
        q: 'Are all property listings verified?',
        a: 'Yes, we verify all property listings before they go live on our platform. Our team conducts physical inspections and document verification to ensure authenticity.',
      },
      {
        q: 'How often are listings updated?',
        a: 'Our listings are updated in real-time. Property owners and agents can update their listings anytime, and our system reflects these changes immediately.',
      },
      {
        q: 'Can I save properties for later?',
        a: 'Yes, you can save properties to your favorites by clicking the heart icon on any property card. You can access your saved properties from your dashboard.',
      },
    ],
  },
  {
    category: 'Payments & Escrow',
    questions: [
      {
        q: 'How does the escrow system work?',
        a: 'When you make a payment, the funds are held securely in our escrow account. The funds are only released to the seller after you confirm that you\'re satisfied with the property or service received.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfers, debit cards, and credit cards. We also support mobile money services for convenience.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use industry-standard encryption and security measures to protect your payment information. We never store your full card details on our servers.',
      },
    ],
  },
  {
    category: 'Inspections',
    questions: [
      {
        q: 'How do I book a property inspection?',
        a: 'You can book an inspection directly from the property details page. Select a convenient date and time, and we\'ll confirm with the property owner.',
      },
      {
        q: 'What should I bring to an inspection?',
        a: 'Bring a valid ID for verification, comfortable shoes for walking around the property, and a checklist of things you want to check. You may also want to bring a camera to document the property.',
      },
      {
        q: 'Can I reschedule or cancel an inspection?',
        a: 'Yes, you can reschedule or cancel an inspection up to 24 hours before the scheduled time through your dashboard.',
      },
    ],
  },
  {
    category: 'Support',
    questions: [
      {
        q: 'How do I contact customer support?',
        a: 'You can reach our support team via email at support@cribseekers.com, by phone at +234 800 123 4567, or through our help center.',
      },
      {
        q: 'What are your support hours?',
        a: 'Our phone support is available Monday-Friday 9am-6pm WAT. Email and chat support are available 24/7.',
      },
      {
        q: 'How do I report a problem with a listing?',
        a: 'Use the "Report" button on any property listing or contact our support team directly with details of the issue.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

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
              <h1 className="display-hero font-heading mb-6">Frequently Asked Questions</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Find answers to common questions about CribSeekers, our services, and how to make the most of our platform.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {faqData.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="heading-xl text-forest-900 mb-6">{category.category}</h2>
                  
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const itemId = `${categoryIndex}-${itemIndex}`;
                      const isOpen = openItems.has(itemId);
                      
                      return (
                        <motion.div
                          key={itemId}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="bg-surface-elevated rounded-xl border border-border-default overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-surface-secondary transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span className="heading-md text-text-primary pr-4">{item.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-text-tertiary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-text-tertiary flex-shrink-0" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-6 pb-4"
                              >
                                <p className="body-md text-text-secondary leading-relaxed">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <div className="bg-forest-900 rounded-2xl p-8 text-white">
                <h3 className="heading-lg mb-4">Still Have Questions?</h3>
                <p className="body-md text-forest-200 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-forest-900 rounded-xl ui-md font-medium hover:bg-gold-400 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/help"
                    className="inline-flex items-center justify-center px-6 py-3 bg-forest-800 text-white rounded-xl ui-md font-medium hover:bg-forest-700 transition-colors"
                  >
                    Visit Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
