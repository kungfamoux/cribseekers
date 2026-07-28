# CribSeekers Frontend Deployment Guide

**Version:** 1.0.0 (Release Candidate 1)
**Date:** July 27, 2026

---

## Overview

This guide covers deploying the CribSeekers frontend application to production. The application is built with Next.js 15 and can be deployed to various platforms including Vercel, Netlify, and Docker.

---

## Prerequisites

- Node.js 18+ installed
- Git repository access
- Backend API running at `https://cribseekers.onrender.com/api/v1`
- Google Maps API key
- Environment variables configured

---

## Environment Variables

### Required Variables

```env
NEXT_PUBLIC_API_URL=https://cribseekers.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://cribseekers.onrender.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key_here
NODE_ENV=production
```

### Optional Variables (Production)

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxx@o12345.ingest.sentry.io/123456
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
NEXT_PUBLIC_DEBUG=false
```

---

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel is the recommended platform for Next.js applications due to native support and optimized performance.

#### Setup

1. **Create Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Connect your GitHub repository

2. **Import Project**
   - Click "Add New Project"
   - Select the CribSeekers frontend repository
   - Configure project settings

3. **Configure Environment Variables**
   - Go to Settings → Environment Variables
   - Add all required environment variables
   - Select appropriate environments (Production, Preview, Development)

4. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Preview deployments available for pull requests

#### Build Configuration

Vercel automatically detects Next.js and uses the following build command:
```bash
npm run build
```

The output directory is automatically set to `.next`.

#### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain (e.g., `cribseekers.com`)
3. Configure DNS records as instructed
4. Enable HTTPS (automatic)

#### Performance Optimization

Vercel provides:
- Automatic CDN
- Edge caching
- Image optimization
- Automatic HTTPS
- Zero-configuration deployment

---

### 2. Netlify

Netlify is an alternative platform with excellent Next.js support.

#### Setup

1. **Create Netlify Account**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Select the CribSeekers frontend repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add all required environment variables

5. **Deploy**
   - Netlify will deploy on push to main branch
   - Deploy previews available for pull requests

#### Custom Domain

1. Go to Domain settings
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

---

### 3. Docker Deployment

For containerized deployments, use Docker.

#### Dockerfile

```dockerfile
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://cribseekers.onrender.com/api/v1
      - NEXT_PUBLIC_SOCKET_URL=https://cribseekers.onrender.com
      - NEXT_PUBLIC_GOOGLE_MAPS_KEY=${GOOGLE_MAPS_KEY}
      - NODE_ENV=production
    restart: unless-stopped
```

#### Build and Run

```bash
# Build image
docker build -t cribseekers-frontend .

# Run container
docker run -p 3000:3000 cribseekers-frontend

# Or use docker-compose
docker-compose up -d
```

---

### 4. Traditional Server (VPS)

Deploy to a traditional VPS (DigitalOcean, AWS EC2, etc.).

#### Setup

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/your-org/cribseekers.git
   cd cribseekers/frontend
   ```

4. **Install Dependencies**
   ```bash
   npm install --production
   ```

5. **Build Application**
   ```bash
   npm run build
   ```

6. **Configure Environment Variables**
   ```bash
   cp .env.production.example .env.local
   # Edit .env.local with your values
   ```

7. **Start with PM2**
   ```bash
   pm2 start npm --name "cribseekers-frontend" -- start
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name cribseekers.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Build Optimization

### Production Build

```bash
npm run build
```

This creates an optimized production build with:
- Minified JavaScript
- Optimized CSS
- Tree-shaken code
- Compressed assets

### Build Analysis

Analyze bundle size:
```bash
npm run build -- --analyze
```

---

## Pre-Deployment Checklist

### Code Quality

- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm run lint` - No ESLint warnings
- [ ] Run `npm run format` - Code formatted
- [ ] All features tested locally
- [ ] Environment variables configured

### Security

- [ ] CSP headers configured in `next.config.ts`
- [ ] Security headers enabled
- [ ] HTTPS configured
- [ ] No sensitive data in code
- [ ] API base URL set to production
- [ ] Google Maps API key configured

### Performance

- [ ] Images optimized
- [ ] Bundle size analyzed
- [ ] Lazy loading implemented
- [ ] Caching configured
- [ ] CDN configured (if applicable)

### SEO

- [ ] robots.txt configured
- [ ] sitemap.xml configured
- [ ] manifest.json configured
- [ ] Meta tags updated
- [ ] Open Graph tags configured

### Monitoring

- [ ] Analytics configured (Google Analytics)
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring enabled
- [ ] Logging configured

---

## Post-Deployment Verification

### Health Checks

1. **Check Application Status**
   - Visit production URL
   - Verify homepage loads
   - Check console for errors

2. **Test Authentication**
   - Login flow
   - Signup flow
   - Password reset

3. **Test Core Features**
   - Property search
   - Property details
   - Dashboard access
   - Profile management

4. **Test API Integration**
   - API calls working
   - Data loading correctly
   - Error handling functional

5. **Test Performance**
   - Page load times
   - Lighthouse score
   - Core Web Vitals

### Monitoring Setup

1. **Google Analytics**
   - Verify tracking code installed
   - Check real-time visitors
   - Verify event tracking

2. **Sentry**
   - Verify error tracking
   - Check for errors
   - Configure alerts

3. **Vercel/Netlify Analytics**
   - Enable platform analytics
   - Review performance metrics
   - Monitor uptime

---

## Rollback Procedure

### Vercel

1. Go to Deployments
2. Select previous successful deployment
3. Click "Promote to Production"

### Netlify

1. Go to Deploys
2. Select previous successful deployment
3. Click "Publish deploy"

### Docker

```bash
# Stop current container
docker stop cribseekers-frontend

# Start previous version
docker run -p 3000:3000 cribseekers-frontend:previous-tag
```

### PM2

```bash
# Revert to previous version
git checkout <previous-commit>
npm run build
pm2 restart cribseekers-frontend
```

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run type check
        run: npm run type-check
        
      - name: Run lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          NEXT_PUBLIC_SOCKET_URL: ${{ secrets.SOCKET_URL }}
          NEXT_PUBLIC_GOOGLE_MAPS_KEY: ${{ secrets.GOOGLE_MAPS_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Troubleshooting

### Build Failures

**Issue:** Build fails with TypeScript errors
```bash
# Solution: Run type check locally
npm run type-check
```

**Issue:** Build fails with ESLint errors
```bash
# Solution: Run lint locally
npm run lint
```

### Runtime Errors

**Issue:** API calls failing
- Check API URL in environment variables
- Verify backend is running
- Check CORS configuration

**Issue:** Images not loading
- Verify image domains in `next.config.ts`
- Check CSP headers
- Verify image URLs are correct

### Performance Issues

**Issue:** Slow page load times
- Run Lighthouse audit
- Check bundle size
- Enable caching
- Optimize images

---

## Maintenance

### Regular Updates

- Update dependencies monthly
- Security patches immediately
- Monitor for deprecated APIs
- Review performance metrics

### Monitoring

- Check error logs daily
- Review analytics weekly
- Monitor uptime continuously
- Review performance monthly

---

## Support

For deployment issues, contact:
- **Technical Support:** devops@cribseekers.com
- **Documentation:** docs.cribseekers.com
- **GitHub Issues:** github.com/your-org/cribseekers/issues

---

**End of Deployment Guide**
