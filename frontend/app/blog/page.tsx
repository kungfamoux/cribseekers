'use client';

export const dynamic = 'force-dynamic';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Building2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips for First-Time Home Buyers in Nigeria',
    excerpt: 'Navigate the Nigerian real estate market with confidence using these essential tips for first-time buyers.',
    author: 'Chinedu Okafor',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Buying Guide',
    image: '/images/blog/home-buying.jpg',
  },
  {
    id: '2',
    title: 'Understanding Property Verification in Nigeria',
    excerpt: 'Learn why property verification is crucial and how to ensure your investment is secure.',
    author: 'Adaeze Nwosu',
    date: '2024-03-10',
    readTime: '7 min read',
    category: 'Legal',
    image: '/images/blog/verification.jpg',
  },
  {
    id: '3',
    title: 'The Rise of Smart Homes in Lagos',
    excerpt: 'Explore how technology is transforming residential properties in Nigeria\'s commercial capital.',
    author: 'Emeka Johnson',
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Technology',
    image: '/images/blog/smart-homes.jpg',
  },
  {
    id: '4',
    title: 'Escrow Services: Protecting Your Real Estate Investment',
    excerpt: 'Discover how escrow services provide security and peace of mind in property transactions.',
    author: 'Chinedu Okafor',
    date: '2024-02-28',
    readTime: '8 min read',
    category: 'Finance',
    image: '/images/blog/escrow.jpg',
  },
  {
    id: '5',
    title: 'Best Neighborhoods for Families in Abuja',
    excerpt: 'A comprehensive guide to family-friendly areas in Nigeria\'s capital city.',
    author: 'Fatima Ahmed',
    date: '2024-02-20',
    readTime: '6 min read',
    category: 'Location Guide',
    image: '/images/blog/abuja.jpg',
  },
  {
    id: '6',
    title: 'Rental vs. Buying: Making the Right Choice',
    excerpt: 'An in-depth comparison to help you decide between renting and buying property in Nigeria.',
    author: 'Adaeze Nwosu',
    date: '2024-02-15',
    readTime: '10 min read',
    category: 'Advice',
    image: '/images/blog/rental-buy.jpg',
  },
];

export default function BlogPage() {
  const categories = ['All', 'Buying Guide', 'Legal', 'Technology', 'Finance', 'Location Guide', 'Advice'];

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
              <h1 className="display-hero font-heading mb-6">Blog</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Insights, tips, and guides to help you navigate the Nigerian real estate market
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="bg-forest-900 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-forest-700 to-forest-800 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Building2 className="w-16 h-16 text-gold-300 mx-auto mb-4" />
                      <p className="text-forest-200 body-lg font-medium">Property Inspection Guide</p>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
                    <span className="inline-block px-3 py-1 bg-gold-500 text-forest-900 rounded-full ui-sm font-medium w-fit mb-4">
                      Featured
                    </span>
                    <h2 className="display-hero font-heading mb-4">
                      The Complete Guide to Property Inspection in Nigeria
                    </h2>
                    <p className="body-lg text-forest-200 mb-6">
                      Everything you need to know about conducting thorough property inspections before making your investment decision.
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="flex items-center gap-2 body-sm text-forest-300">
                        <Calendar className="w-4 h-4" />
                        March 20, 2024
                      </span>
                      <span className="flex items-center gap-2 body-sm text-forest-300">
                        <Clock className="w-4 h-4" />
                        12 min read
                      </span>
                    </div>
                    <a
                      href="/blog/complete-guide-property-inspection"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-forest-900 rounded-xl ui-md font-medium hover:bg-gold-400 transition-colors w-fit"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ui-sm font-medium transition-colors ${
                    category === 'All'
                      ? 'bg-forest-900 text-white'
                      : 'bg-surface-elevated text-text-secondary hover:bg-surface-secondary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-elevated rounded-2xl overflow-hidden hover:shadow-2 transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-forest-900 mx-auto mb-2" />
                    <span className="text-forest-900 body-md font-medium">{post.category}</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-forest-100 text-forest-900 rounded-full ui-xs font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 body-sm text-text-tertiary">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="heading-lg text-text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="body-md text-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border-default">
                      <div>
                        <p className="body-sm font-medium text-text-primary">{post.author}</p>
                        <p className="body-sm text-text-tertiary">{post.date}</p>
                      </div>
                      
                      <a
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-1 text-forest-900 hover:text-forest-700 ui-sm font-medium transition-colors"
                      >
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 px-8 py-3 border border-border-default rounded-xl ui-md font-medium hover:bg-surface-secondary transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
