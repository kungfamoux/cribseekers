import { Navbar, Footer } from '@/components/public';
import { PageHeader } from '@/components/shared';
import { ThumbsUp, ThumbsDown, Share2, Bookmark, ChevronRight } from 'lucide-react';

export default function HelpArticlePage() {
  const relatedArticles = [
    { id: '2', title: 'Searching for properties', category: 'Property Search' },
    { id: '3', title: 'Using filters effectively', category: 'Property Search' },
    { id: '4', title: 'Saving properties to favorites', category: 'Property Search' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <PageHeader
          title="Help Center"
          subtitle="Find answers to your questions and get the most out of CribSeekers"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Help Center', href: '/help' },
            { label: 'Getting Started' },
            { label: 'Article' },
          ]}
        />

        <article className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-8">
                <h1 className="display-hero font-heading text-forest-900 mb-4">
                  How to Create an Account
                </h1>
                <p className="body-lg text-text-secondary">
                  Learn how to sign up for CribSeekers and start your property search journey.
                </p>
              </div>

              {/* Article Actions */}
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
                  Creating an account on CribSeekers is your first step towards finding your perfect property. Follow these simple steps to get started.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">Step 1: Click Sign Up</h2>
                <p className="body-md text-text-secondary mb-6">
                  Navigate to the CribSeekers homepage and click the "Sign In" button in the top right corner. Then select "Create Account" from the dropdown menu.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">Step 2: Enter Your Details</h2>
                <p className="body-md text-text-secondary mb-6">
                  Fill in the registration form with your personal information:
                </p>
                <ul className="list-disc pl-6 body-md text-text-secondary mb-6 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Password (must be at least 8 characters)</li>
                </ul>

                <h2 className="heading-lg text-text-primary mb-4">Step 3: Verify Your Email</h2>
                <p className="body-md text-text-secondary mb-6">
                  After submitting the form, you'll receive a verification email. Click the link in the email to verify your account. This step is required for security purposes.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">Step 4: Complete Your Profile</h2>
                <p className="body-md text-text-secondary mb-6">
                  Once verified, you can complete your profile by adding additional information like your address, preferences, and profile picture. This helps us provide personalized recommendations.
                </p>

                <h2 className="heading-lg text-text-primary mb-4">Step 5: Start Exploring</h2>
                <p className="body-md text-text-secondary mb-6">
                  Your account is now ready! You can start searching for properties, save favorites, book inspections, and much more.
                </p>

                <div className="bg-forest-50 border-l-4 border-forest-900 p-6 rounded-r-xl my-8">
                  <p className="body-md text-forest-900 font-medium mb-2">Pro Tip</p>
                  <p className="body-md text-forest-800">
                    Enable two-factor authentication in your account settings for enhanced security.
                  </p>
                </div>

                <h2 className="heading-lg text-text-primary mb-4">Troubleshooting</h2>
                
                <h3 className="heading-md text-text-primary mb-2">Didn't receive the verification email?</h3>
                <p className="body-md text-text-secondary mb-6">
                  Check your spam folder. If you still don't find it, click "Resend verification email" on the login page.
                </p>

                <h3 className="heading-md text-text-primary mb-2">Forgot your password?</h3>
                <p className="body-md text-text-secondary mb-6">
                  Click "Forgot Password" on the login page and follow the instructions to reset it via email.
                </p>
              </div>

              {/* Feedback */}
              <div className="bg-surface-elevated rounded-2xl p-6 mb-12">
                <h3 className="heading-md text-text-primary mb-4">Was this article helpful?</h3>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg ui-sm font-medium hover:bg-surface-secondary transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    Yes
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg ui-sm font-medium hover:bg-surface-secondary transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    No
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              <div>
                <h2 className="heading-xl text-forest-900 mb-6">Related Articles</h2>
                <div className="space-y-4">
                  {relatedArticles.map((article) => (
                    <a
                      key={article.id}
                      href={`/help/${article.category.toLowerCase().replace(' ', '-')}/${article.id}`}
                      className="flex items-center justify-between bg-surface-elevated rounded-xl p-6 hover:shadow-2 transition-shadow group"
                    >
                      <div>
                        <h3 className="heading-md text-text-primary mb-1">{article.title}</h3>
                        <p className="body-sm text-text-tertiary">{article.category}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-forest-900 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
