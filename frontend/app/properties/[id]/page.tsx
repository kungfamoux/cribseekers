'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar, Footer } from '@/components/public';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { motion } from 'framer-motion';
import type { Property } from '@/types/property.types';
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Shield,
  Share2,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Check,
  Building2,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCreateConversation } from '@/hooks/useConversation';
import { toast } from 'sonner';

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const createConversation = useCreateConversation();

  useEffect(() => {
    async function fetchProperty() {
      setIsLoading(true);
      try {
        const response = await apiClient.get(API_ENDPOINTS.PROPERTY_BY_ID(propertyId));
        setProperty(response.data);
      } catch {
        console.error('Failed to fetch property');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId]);

  const formatPrice = (amount: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-surface-secondary">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-surface-elevated rounded-2xl" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-surface-elevated rounded w-3/4" />
                  <div className="h-4 bg-surface-elevated rounded w-1/2" />
                  <div className="h-64 bg-surface-elevated rounded" />
                </div>
                <div className="h-96 bg-surface-elevated rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-surface-secondary flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-xl text-text-primary mb-4">Property Not Found</h1>
            <p className="body-md text-text-secondary mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-900 text-white rounded-lg ui-md font-medium hover:bg-forest-800 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = property.images || [];
  const amenities = property.amenities || [];
  const features = property.features || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-surface-secondary">
        {/* Image Gallery */}
        <section className="bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-surface-secondary">
                {images.length > 0 ? (
                  <Image
                    src={images[currentImageIndex] || images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-secondary">
                    <span className="text-text-tertiary">No Image</span>
                  </div>
                )}
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-2"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-2"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full ui-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}

                {/* Verification Badge */}
                {property.verificationStatus === 'verified' && (
                  <div className="absolute top-4 right-4 bg-success-500 text-white px-4 py-2 rounded-full ui-sm font-medium flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current" />
                    Verified
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 gap-2">
                {images.slice(1, 5).map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index + 1)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-secondary transition-all ${
                      currentImageIndex === index + 1 ? 'ring-2 ring-forest-900 ring-offset-2' : 'hover:ring-2 hover:ring-forest-900 hover:ring-offset-2'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-elevated rounded-2xl p-6 shadow-2"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="heading-xl text-text-primary mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin className="h-4 w-4" />
                      <span className="body-md">
                        {property.address?.street}, {property.address?.city}, {property.address?.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="p-2 rounded-full bg-surface-secondary hover:bg-surface-primary transition-colors"
                      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`h-5 w-5 ${isFavorited ? 'fill-error-500 text-error-500' : 'text-text-tertiary'}`}
                      />
                    </button>
                    <button
                      className="p-2 rounded-full bg-surface-secondary hover:bg-surface-primary transition-colors"
                      aria-label="Share property"
                    >
                      <Share2 className="h-5 w-5 text-text-tertiary" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-4 border-t border-b border-border-default">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-text-secondary" />
                    <span className="body-md text-text-primary">{features.bedrooms || 0} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-text-secondary" />
                    <span className="body-md text-text-primary">{features.bathrooms || 0} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-text-secondary" />
                    <span className="body-md text-text-primary">
                      {features.size || 0} {features.sizeUnit || 'sqft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-text-secondary" />
                    <span className="body-md text-text-primary capitalize">{property.type || 'Property'}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="display-lg text-forest-900 font-bold">
                    {formatPrice(property.price, property.currency)}
                    {property.purpose === 'rent' && <span className="body-md text-text-secondary">/month</span>}
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface-elevated rounded-2xl p-6 shadow-2"
              >
                <h2 className="heading-lg text-text-primary mb-4">Description</h2>
                <p className="body-md text-text-secondary whitespace-pre-wrap">
                  {property.description || 'No description available.'}
                </p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-elevated rounded-2xl p-6 shadow-2"
              >
                <h2 className="heading-lg text-text-primary mb-4">Amenities</h2>
                {amenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-success-500 flex-shrink-0" />
                        <span className="body-md text-text-secondary capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="body-md text-text-tertiary">No amenities listed.</p>
                )}
              </motion.div>

              {/* Location & Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-surface-elevated rounded-2xl p-6 shadow-2"
              >
                <h2 className="heading-lg text-text-primary mb-4">Location</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-text-secondary mt-0.5" />
                    <div>
                      <p className="body-md text-text-primary">{property.address?.street}</p>
                      <p className="body-md text-text-secondary">
                        {property.address?.city}, {property.address?.state}
                      </p>
                      <p className="body-md text-text-tertiary">Nigeria</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-forest-100 to-forest-200 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-forest-900 mx-auto mb-2" />
                      <p className="body-md text-forest-900 font-medium">Interactive Map</p>
                      <p className="body-sm text-text-secondary">View property location</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface-elevated rounded-2xl p-6 shadow-2 sticky top-24"
              >
                <h3 className="heading-lg text-text-primary mb-4">Contact Agent</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-forest-900" />
                    </div>
                    <div>
                      <p className="heading-sm text-text-primary">{property.agent?.name || 'Property Agent'}</p>
                      <p className="body-sm text-text-secondary">Verified Agent</p>
                    </div>
                  </div>
                </div>

                {!showContactForm ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full py-3 bg-forest-900 text-white rounded-lg ui-md font-medium hover:bg-forest-800 transition-colors"
                    >
                      Send Message
                    </button>
                    <button className="w-full py-3 border border-forest-900 text-forest-900 rounded-lg ui-md font-medium hover:bg-forest-50 transition-colors flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Agent
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await createConversation.mutateAsync({
                        propertyId: propertyId,
                        initialMessage: contactForm.message,
                        participantId: property?.agent?.id || '',
                      });
                      toast.success('Message sent successfully');
                      setShowContactForm(false);
                      setContactForm({ name: '', email: '', phone: '', message: '' });
                    } catch {
                      toast.error('Failed to send message');
                    }
                  }}>
                    <div>
                      <label className="block body-sm text-text-secondary mb-2">Your Name</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-border-default rounded-lg body-md focus:outline-none focus:border-forest-900"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block body-sm text-text-secondary mb-2">Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-border-default rounded-lg body-md focus:outline-none focus:border-forest-900"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block body-sm text-text-secondary mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-border-default rounded-lg body-md focus:outline-none focus:border-forest-900"
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div>
                      <label className="block body-sm text-text-secondary mb-2">Message</label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 border border-border-default rounded-lg body-md focus:outline-none focus:border-forest-900 resize-none"
                        placeholder="I'm interested in this property..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-forest-900 text-white rounded-lg ui-md font-medium hover:bg-forest-800 transition-colors"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="w-full py-3 text-text-tertiary ui-md hover:text-text-secondary transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Schedule Inspection */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-forest-900 text-white rounded-2xl p-6 shadow-2"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-gold-300" />
                  <h3 className="heading-lg">Schedule Inspection</h3>
                </div>
                <p className="body-md text-forest-200 mb-4">
                  Book a free inspection to see this property in person.
                </p>
                <button className="w-full py-3 bg-gold-500 text-forest-900 rounded-lg ui-md font-medium hover:bg-gold-400 transition-colors">
                  Book Inspection
                </button>
              </motion.div>

              {/* Safety Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-elevated rounded-2xl p-6 shadow-2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-success-500" />
                  <h3 className="heading-md text-text-primary">Safety Tips</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="body-sm text-text-secondary">Always inspect the property before payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="body-sm text-text-secondary">Use our secure escrow system for payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="body-sm text-text-secondary">Verify the agent's identity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="body-sm text-text-secondary">Never pay outside the platform</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
