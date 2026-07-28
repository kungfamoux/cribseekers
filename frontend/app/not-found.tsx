'use client';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-surface-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <h1 className="display-hero font-heading text-forest-900 mb-4">404</h1>
              <h2 className="heading-xl text-text-primary mb-4">Page Not Found</h2>
              <p className="body-lg text-text-secondary mb-8">
                The page you're looking for doesn't exist or has been moved. Let's help you find what you're looking for.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest-900 text-white rounded-xl ui-md font-medium hover:bg-forest-800 transition-colors"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-default rounded-xl ui-md font-medium hover:bg-surface-primary transition-colors"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </Link>
            </div>

            <div className="bg-surface-elevated rounded-2xl p-8">
              <h3 className="heading-md text-text-primary mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Link href="/about" className="body-md text-text-secondary hover:text-forest-900 transition-colors">
                  About Us
                </Link>
                <Link href="/search" className="body-md text-text-secondary hover:text-forest-900 transition-colors">
                  Search
                </Link>
                <Link href="/blog" className="body-md text-text-secondary hover:text-forest-900 transition-colors">
                  Blog
                </Link>
                <Link href="/help" className="body-md text-text-secondary hover:text-forest-900 transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="body-md text-text-secondary hover:text-forest-900 transition-colors">
                  Contact
                </Link>
                <Link href="/faq" className="body-md text-text-secondary hover:text-forest-900 transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
