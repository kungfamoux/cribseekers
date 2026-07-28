'use client';

export const dynamic = 'force-dynamic';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Share2, Bookmark, Building2 } from 'lucide-react';

export default function BlogDetailPage() {
  const relatedPosts = [
    {
      id: '2',
      title: 'Understanding Property Verification in Nigeria',
      excerpt: 'Learn why property verification is crucial...',
      date: '2024-03-10',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'The Rise of Smart Homes in Lagos',
      excerpt: 'Explore how technology is transforming...',
      date: '2024-03-05',
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Escrow Services: Protecting Your Investment',
      excerpt: 'Discover how escrow services provide security...',
      date: '2024-02-28',
      readTime: '8 min read',
    },
  ];

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
              <h1 className="display-hero font-heading mb-6">Blog Article</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Insights, tips, and guides to help you navigate the Nigerian real estate market
              </p>
            </motion.div>
          </div>
        </section>

        <article className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <span className="inline-block px-3 py-1 bg-forest-100 text-forest-900 rounded-full ui-sm font-medium mb-4">
                  Buying Guide
                </span>
                
                <h1 className="display-hero font-heading text-forest-900 mb-6">
                  10 Tips for First-Time Home Buyers in Nigeria
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="body-md">Chinedu Okafor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="body-md">March 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="body-md">5 min read</span>
                  </div>
                </div>
              </motion.div>

              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-br from-forest-100 to-forest-200 rounded-2xl mb-8 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-forest-900 mx-auto mb-4" />
                  <p className="text-forest-900 body-lg font-medium">10 Tips for First-Time Home Buyers</p>
                </div>
              </div>

              {/* Share & Save Actions */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border-default">
                <button className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg ui-sm font-medium hover:bg-surface-secondary transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg ui-sm font-medium hover:bg-surface-secondary transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="body-lg text-text-secondary mb-6">
                  Buying your first home is an exciting milestone, but it can also be overwhelming, especially in the dynamic Nigerian real estate market. Here are ten essential tips to help you navigate the process with confidence.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">1. Determine Your Budget</h2>
                <p className="body-md text-text-secondary mb-6">
                  Before you start looking at properties, establish a clear budget. Consider not just the purchase price but also additional costs like legal fees, agent commissions, and potential renovations. Get pre-approved for a mortgage if you're financing the purchase.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">2. Research Neighborhoods</h2>
                <p className="body-md text-text-secondary mb-6">
                  Different areas offer different advantages. Consider factors like proximity to work, schools, healthcare facilities, and security. Visit neighborhoods at different times of day to get a true feel for the area.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">3. Work with Reputable Agents</h2>
                <p className="body-md text-text-secondary mb-6">
                  A good real estate agent can be invaluable. Look for agents with proven track records, proper licensing, and positive reviews. On CribSeekers, all agents are verified, giving you an extra layer of confidence.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">4. Verify Property Documents</h2>
                <p className="body-md text-text-secondary mb-6">
                  This is crucial in Nigeria. Ensure the property has proper documentation including Certificate of Occupancy (C of O), approved building plans, and no outstanding disputes. Never skip this step.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">5. Conduct Thorough Inspections</h2>
                <p className="body-md text-text-secondary mb-6">
                  Don't rely solely on photos. Schedule physical inspections to check the property's condition. Look for signs of structural issues, water damage, and necessary repairs. Consider hiring a professional inspector.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">6. Use Escrow for Payments</h2>
                <p className="body-md text-text-secondary mb-6">
                  Protect your investment by using escrow services. This ensures funds are only released when all conditions are met, protecting both buyer and seller from fraud.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">7. Understand the Market</h2>
                <p className="body-md text-text-secondary mb-6">
                  Research current market trends in your preferred area. Are prices rising or stable? What's the average time properties stay on the market? This knowledge can help you make informed decisions and negotiate better.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">8. Plan for the Future</h2>
                <p className="body-md text-text-secondary mb-6">
                  Consider your long-term plans. Is this property suitable for your needs 5-10 years from now? Think about family growth, career changes, and potential resale value.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">9. Negotiate Wisely</h2>
                <p className="body-md text-text-secondary mb-6">
                  Don't be afraid to negotiate, but do so respectfully and based on market research. Your agent can help you determine a fair price and negotiate terms effectively.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">10. Get Everything in Writing</h2>
                <p className="body-md text-text-secondary mb-6">
                  Ensure all agreements, promises, and conditions are documented in writing. Verbal agreements are difficult to enforce and can lead to misunderstandings.
                </p>

                <p className="body-lg text-text-secondary mb-6">
                  Following these tips will help you make a sound investment and navigate the home-buying process with greater confidence. Remember, patience and due diligence are your best allies in real estate.
                </p>
              </div>

              {/* Author Bio */}
              <div className="bg-surface-elevated rounded-2xl p-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-forest-900" />
                  </div>
                  <div>
                    <h3 className="heading-md text-text-primary mb-2">Chinedu Okafor</h3>
                    <p className="body-md text-text-secondary mb-4">
                      Real Estate Expert with over 10 years of experience in the Nigerian property market. Chinedu specializes in helping first-time buyers navigate the complexities of property acquisition.
                    </p>
                    <a href="#" className="text-forest-900 hover:text-forest-700 ui-sm font-medium">
                      View all articles by Chinedu Okafor
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-xl text-forest-900 mb-6">Related Articles</h2>
                <div className="space-y-4">
                  {relatedPosts.map((post, index) => (
                    <motion.a
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      href={`/blog/${post.id}`}
                      className="block bg-surface-elevated rounded-xl p-6 hover:shadow-2 transition-shadow"
                    >
                      <h3 className="heading-md text-text-primary mb-2">{post.title}</h3>
                      <p className="body-sm text-text-secondary mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-text-tertiary">
                        <span className="body-sm">{post.date}</span>
                        <span className="body-sm">{post.readTime}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
