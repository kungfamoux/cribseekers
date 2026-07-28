'use client';

export const dynamic = 'force-dynamic';

import { Navbar, Footer, NewsletterForm } from '@/components/public';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Award, Home, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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
              <h1 className="display-hero font-heading mb-6">About CribSeekers</h1>
              <p className="body-lg text-forest-200 max-w-2xl mx-auto">
                Nigeria's premier real estate platform, connecting people with their dream properties since 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="display-lg font-heading text-forest-900 mb-6">Our Mission</h2>
              <p className="body-lg text-text-secondary leading-relaxed">
                To revolutionize the Nigerian real estate industry by providing a secure, transparent, 
                and user-friendly platform that connects property seekers with verified listings, trusted agents, 
                and secure payment solutions. We believe everyone deserves access to safe and reliable housing 
                options across Nigeria.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="display-lg font-heading text-forest-900 mb-4">Our Values</h2>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: 'Trust & Security', description: 'Every property is verified, and every transaction is protected by our secure escrow system.' },
                { icon: Users, title: 'Customer First', description: 'We prioritize your needs and work tirelessly to ensure your satisfaction.' },
                { icon: Target, title: 'Innovation', description: 'We leverage technology to make property search simple, efficient, and enjoyable.' },
                { icon: Award, title: 'Excellence', description: 'We strive for the highest standards in everything we do, from listings to support.' },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-forest-900" />
                  </div>
                  <h3 className="heading-md text-text-primary mb-2">{value.title}</h3>
                  <p className="body-md text-text-secondary">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="display-lg font-heading text-forest-900 mb-8 text-center">Our Story</h2>
              
              <div className="space-y-6">
                <p className="body-lg text-text-secondary">
                  CribSeekers was founded in 2024 with a simple yet powerful vision: to make finding a home in Nigeria 
                  as easy and secure as shopping online. Our founders experienced firsthand the challenges of the Nigerian 
                  real estate market – from fake listings to fraudulent transactions – and decided to build a solution.
                </p>
                
                <p className="body-lg text-text-secondary">
                  Starting with just a small team in Lagos, we've grown to become Nigeria's leading real estate platform, 
                  serving thousands of users across all 36 states. Our commitment to verification, security, and customer 
                  satisfaction has earned us the trust of property seekers and agents alike.
                </p>
                
                <p className="body-lg text-text-secondary">
                  Today, CribSeekers continues to innovate, introducing new features like AI-powered recommendations, 
                  virtual inspections, and secure escrow payments to make the property journey seamless for everyone 
                  involved in the transaction.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-forest-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10K+', label: 'Properties Listed', icon: Home },
                { value: '5K+', label: 'Happy Customers', icon: Users },
                { value: '36', label: 'States Covered', icon: TrendingUp },
                { value: '500+', label: 'Verified Agents', icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-forest-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-gold-300" />
                  </div>
                  <p className="display-lg font-heading text-gold-300 mb-2">{stat.value}</p>
                  <p className="body-md text-forest-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
