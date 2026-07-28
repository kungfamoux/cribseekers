'use client';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';
import { Search, BookOpen, FileText, CreditCard, Shield, Users, MessageSquare } from 'lucide-react';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: number;
  slug: string;
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using CribSeekers',
    icon: <BookOpen className="w-6 h-6" />,
    articles: 12,
    slug: 'getting-started',
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Manage your profile and settings',
    icon: <Users className="w-6 h-6" />,
    articles: 8,
    slug: 'account',
  },
  {
    id: 'properties',
    title: 'Property Search',
    description: 'Find and explore properties',
    icon: <Search className="w-6 h-6" />,
    articles: 15,
    slug: 'properties',
  },
  {
    id: 'inspections',
    title: 'Inspections',
    description: 'Book and manage property inspections',
    icon: <FileText className="w-6 h-6" />,
    articles: 6,
    slug: 'inspections',
  },
  {
    id: 'payments',
    title: 'Payments & Escrow',
    description: 'Understand our payment system',
    icon: <CreditCard className="w-6 h-6" />,
    articles: 10,
    slug: 'payments',
  },
  {
    id: 'security',
    title: 'Security & Safety',
    description: 'Keep your account and transactions secure',
    icon: <Shield className="w-6 h-6" />,
    articles: 7,
    slug: 'security',
  },
];

const popularArticles = [
  { id: '1', title: 'How to create an account', category: 'Getting Started' },
  { id: '2', title: 'Searching for properties', category: 'Property Search' },
  { id: '3', title: 'Booking an inspection', category: 'Inspections' },
  { id: '4', title: 'How escrow works', category: 'Payments & Escrow' },
  { id: '5', title: 'Verifying property documents', category: 'Security & Safety' },
];

export default function HelpPage() {
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
              <h1 className="display-hero font-heading mb-6">Help Center</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Find answers to your questions and get the most out of CribSeekers
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 border border-border-default rounded-xl body-md focus:outline-none focus:border-forest-500 transition-colors"
                />
              </div>
            </div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="heading-xl text-forest-900 mb-8 text-center">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helpCategories.map((category, index) => (
                  <motion.a
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    href={`/help/${category.slug}`}
                    className="bg-surface-elevated rounded-2xl p-6 hover:shadow-2 transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center text-forest-900 mb-4 group-hover:bg-forest-900 group-hover:text-white transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="heading-md text-text-primary mb-2">{category.title}</h3>
                    <p className="body-md text-text-secondary mb-4">{category.description}</p>
                    <p className="body-sm text-text-tertiary">{category.articles} articles</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="heading-xl text-forest-900 mb-8 text-center">Popular Articles</h2>
              <div className="bg-surface-elevated rounded-2xl divide-y divide-border-default">
                {popularArticles.map((article, index) => (
                  <motion.a
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    href={`/help/${article.category.toLowerCase().replace(' ', '-')}/${article.id}`}
                    className="flex items-center justify-between p-6 hover:bg-surface-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="heading-md text-text-primary">{article.title}</h3>
                        <p className="body-sm text-text-tertiary">{article.category}</p>
                      </div>
                    </div>
                    <MessageSquare className="w-5 h-5 text-text-tertiary" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Support */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <div className="bg-forest-900 rounded-2xl p-8 text-white">
                <h3 className="heading-lg mb-4">Still need help?</h3>
                <p className="body-md text-forest-200 mb-6">
                  Can't find what you're looking for? Our support team is here to help you 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-forest-900 rounded-xl ui-md font-medium hover:bg-gold-400 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/faq"
                    className="inline-flex items-center justify-center px-6 py-3 bg-forest-800 text-white rounded-xl ui-md font-medium hover:bg-forest-700 transition-colors"
                  >
                    View FAQ
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
