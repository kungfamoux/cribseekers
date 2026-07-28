'use client';

import { useState, useEffect } from 'react';
import { Navbar, Footer, HeroSection, PropertyCard, NewsletterForm } from '@/components/public';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import type { Property } from '@/types';
import { motion } from 'framer-motion';
import { Home, Building2, Landmark, Star, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featuredResponse, recentResponse] = await Promise.all([
          apiClient.get(API_ENDPOINTS.PROPERTY_FEATURED),
          apiClient.get(API_ENDPOINTS.SEARCH_RECENT),
        ]);
        setFeaturedProperties(featuredResponse.data.data || []);
        setRecentProperties(recentResponse.data.data || []);
      } catch {
        console.error('Failed to fetch properties');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const categories = [
    { name: 'Apartments', icon: Building2, count: '2,500+', href: '/search?type=apartment' },
    { name: 'Houses', icon: Home, count: '1,800+', href: '/search?type=house' },
    { name: 'Land', icon: Landmark, count: '3,200+', href: '/search?type=land' },
    { name: 'Commercial', icon: Building2, count: '950+', href: '/search?type=commercial' },
  ];

  const testimonials = [
    {
      name: 'Adebayo Johnson',
      location: 'Lagos',
      rating: 5,
      text: 'Found my dream apartment in just 3 days. The verification process gave me confidence, and the escrow system made the transaction seamless.',
    },
    {
      name: 'Chioma Okafor',
      location: 'Abuja',
      rating: 5,
      text: 'As a first-time buyer, I was nervous. CribSeekers made the entire process transparent and secure. Highly recommended!',
    },
    {
      name: 'Emeka Nwosu',
      location: 'Port Harcourt',
      rating: 5,
      text: 'The AI recommendations were spot on. Found properties that matched my exact requirements without endless searching.',
    },
  ];

  const stats = [
    { label: 'Properties Listed', value: '10,000+', icon: Home },
    { label: 'Happy Clients', value: '5,000+', icon: Users },
    { label: 'States Covered', value: '36', icon: Landmark },
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />

        {/* Categories Section */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-xl text-text-primary mb-4">Browse by Category</h2>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                Find exactly what you're looking for with our curated property categories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={category.name} href={category.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-surface-elevated rounded-2xl p-6 hover:shadow-4 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest-200 transition-colors">
                      <category.icon className="h-6 w-6 text-forest-900" />
                    </div>
                    <h3 className="heading-md text-text-primary mb-1">{category.name}</h3>
                    <p className="body-sm text-text-secondary">{category.count} listings</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="py-16 bg-surface-primary">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-surface-secondary rounded w-1/3 mx-auto" />
                <div className="h-4 bg-surface-secondary rounded w-1/4 mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Featured Properties Section */}
        <section className="py-16 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-xl text-text-primary mb-2">Featured Properties</h2>
                <p className="body-md text-text-secondary">Handpicked properties for you</p>
              </div>
              <Link
                href="/search?featured=true"
                className="flex items-center gap-2 text-forest-900 hover:text-forest-700 transition-colors body-md font-medium"
              >
                View All
              </Link>
            </div>

            {featuredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProperties.map((property: Property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCard
                      id={property.id}
                      title={property.title}
                      price={property.price}
                      currency={property.currency}
                      location={`${property.location.city}, ${property.location.state}`}
                      images={property.images}
                      features={{
                        bedrooms: property.features.bedrooms,
                        bathrooms: property.features.bathrooms,
                        size: property.features.size,
                        sizeUnit: property.features.sizeUnit,
                      }}
                      isVerified={property.verificationStatus === 'verified'}
                      isFeatured={true}
                      purpose={property.purpose}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="body-md text-text-tertiary">No featured properties available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Properties Section */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-xl text-text-primary mb-2">Recently Added</h2>
                <p className="body-md text-text-secondary">Fresh listings just for you</p>
              </div>
              <Link
                href="/search?recent=true"
                className="flex items-center gap-2 text-forest-900 hover:text-forest-700 transition-colors body-md font-medium"
              >
                View All
              </Link>
            </div>

            {recentProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recentProperties.map((property: Property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCard
                      id={property.id}
                      title={property.title}
                      price={property.price}
                      currency={property.currency}
                      location={`${property.location.city}, ${property.location.state}`}
                      images={property.images}
                      features={{
                        bedrooms: property.features.bedrooms,
                        bathrooms: property.features.bathrooms,
                        size: property.features.size,
                        sizeUnit: property.features.sizeUnit,
                      }}
                      isVerified={property.verificationStatus === 'verified'}
                      isFeatured={false}
                      purpose={property.purpose}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="body-md text-text-tertiary">No recent properties available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-xl text-text-primary mb-4">How CribSeekers Works</h2>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                Find your perfect property in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Search', description: 'Browse thousands of verified properties with advanced filters' },
                { step: '02', title: 'Inspect', description: 'Schedule free property inspections at your convenience' },
                { step: '03', title: 'Secure', description: 'Pay securely through our escrow system' },
                { step: '04', title: 'Move In', description: 'Complete your transaction and move into your new home' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-forest-900 rounded-full flex items-center justify-center mx-auto text-gold-300 font-bold text-xl">
                      {item.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-forest-200" />
                    )}
                  </div>
                  <h3 className="heading-md text-text-primary mb-2">{item.title}</h3>
                  <p className="body-md text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-xl text-text-primary mb-4">Why Choose CribSeekers?</h2>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                We make finding your perfect property in Nigeria simple, secure, and stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Verified Listings', description: 'Every property is verified by our team to ensure authenticity and accuracy.' },
                { icon: Star, title: 'Secure Escrow', description: 'Your payments are protected with our secure escrow system until you are satisfied.' },
                { icon: Clock, title: 'Expert Support', description: 'Our team of experts is available 24/7 to help you find your perfect property.' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-forest-900" />
                  </div>
                  <h3 className="heading-md text-text-primary mb-2">{item.title}</h3>
                  <p className="body-md text-text-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-xl text-text-primary mb-4">What Our Clients Say</h2>
              <p className="body-lg text-text-secondary max-w-2xl mx-auto">
                Join thousands of happy Nigerians who found their perfect property with CribSeekers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-elevated rounded-2xl p-6 shadow-2"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="body-md text-text-secondary mb-6">{testimonial.text}</p>
                  <div>
                    <p className="heading-sm text-text-primary">{testimonial.name}</p>
                    <p className="body-sm text-text-tertiary">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-forest-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
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

        {/* Newsletter Section */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
