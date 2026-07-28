'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search, User, LogIn } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Search', href: '/search' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface-primary/95 backdrop-blur-sm border-b border-border-default">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="CribSeekers Logo"
              width={120}
              height={120}
              className="h-24 w-24"
              priority
            />
            <span className="heading-xl font-heading text-forest-900">CribSeekers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="body-md text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/search"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default hover:bg-surface-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-text-tertiary" />
            </Link>
            <Link
              href="/auth/login"
              className="flex h-10 items-center space-x-2 rounded-lg bg-forest-900 px-4 text-white hover:bg-forest-800 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span className="body-md">Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-default bg-surface-primary">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block body-lg text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-default space-y-3">
              <Link
                href="/search"
                className="flex items-center space-x-3 body-lg text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
              <Link
                href="/auth/login"
                className="flex items-center space-x-3 body-lg text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
