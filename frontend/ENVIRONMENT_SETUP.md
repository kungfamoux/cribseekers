# CribSeekers Frontend Environment Setup Guide

**Version:** 1.0.0 (Release Candidate 1)
**Date:** July 27, 2026

---

## Overview

This guide provides step-by-step instructions for setting up the development environment for the CribSeekers frontend application.

---

## Prerequisites

### System Requirements

- **Operating System:** Windows 10+, macOS 10.15+, or Linux
- **Node.js:** Version 18.x or higher
- **npm:** Version 9.x or higher (comes with Node.js)
- **Git:** Version 2.x or higher
- **Code Editor:** VS Code (recommended) or any TypeScript-compatible editor

### Optional Tools

- **Docker:** For containerized development
- **Postman:** For API testing
- **Chrome DevTools:** For debugging

---

## Installation Steps

### 1. Install Node.js

#### Windows
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Follow the installation wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

#### Linux (Ubuntu/Debian)
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Git

#### Windows
1. Download Git from [git-scm.com](https://git-scm.com/)
2. Run the installer
3. Follow the installation wizard
4. Verify installation:
   ```bash
   git --version
   ```

#### macOS
```bash
# Using Homebrew
brew install git

# Verify installation
git --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install git

# Verify installation
git --version
```

### 3. Install VS Code (Recommended)

#### Windows
1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
2. Run the installer
3. Follow the installation wizard

#### macOS
```bash
# Using Homebrew
brew install --cask visual-studio-code
```

#### Linux (Ubuntu/Debian)
```bash
# Download .deb package from code.visualstudio.com
sudo dpkg -i code_*.deb
```

### 4. Install VS Code Extensions

Install the following extensions for optimal development:

- **ESLint** - `dbaeumer.vscode-eslint`
- **Prettier** - `esbenp.prettier-vscode`
- **TypeScript** - `ms-vscode.vscode-typescript-next`
- **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
- **GitLens** - `eamodio.gitlens`
- **Auto Rename Tag** - `formulahendry.auto-rename-tag`
- **Bracket Pair Colorizer** - `coenraads.bracket-pair-colorizer-2`

---

## Project Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-org/cribseekers.git

# Navigate to the frontend directory
cd cribseekers/frontend
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or use yarn
yarn install
```

### 3. Set Up Environment Variables

#### Development Environment

```bash
# Copy the example file
cp .env.development.example .env.local

# Edit .env.local with your values
```

#### Required Variables

```env
NEXT_PUBLIC_API_URL=https://cribseekers.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://cribseekers.onrender.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key_here
NODE_ENV=development
```

#### Optional Variables

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxx@o12345.ingest.sentry.io/123456
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=false
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=false
NEXT_PUBLIC_DEBUG=true
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# Or use yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

---

## VS Code Configuration

### 1. Create `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 2. Create `.vscode/extensions.json`

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens",
    "formulahendry.auto-rename-tag",
    "coenraads.bracket-pair-colorizer-2"
  ]
}
```

---

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing (Future)

```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run E2E tests
```

---

## Troubleshooting

### Common Issues

#### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

#### Issue: TypeScript errors

**Solution:**
```bash
# Run type check to see all errors
npm run type-check

# Ensure TypeScript is installed
npm install typescript --save-dev
```

#### Issue: ESLint errors

**Solution:**
```bash
# Run lint to see all errors
npm run lint

# Auto-fix linting errors
npm run lint -- --fix
```

#### Issue: Environment variables not loading

**Solution:**
```bash
# Ensure .env.local exists
ls -la .env.local

# Restart development server after changing .env.local
# Environment variables are only loaded at startup
```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Edit files in your code editor
- Save changes
- Run type check: `npm run type-check`
- Run lint: `npm run lint`
- Format code: `npm run format`

### 3. Test Changes

- Start development server: `npm run dev`
- Open browser to http://localhost:3000
- Test your changes manually
- Check browser console for errors

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new feature description"
```

### 5. Push to Remote

```bash
# Push to remote repository
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub repository
- Click "New Pull Request"
- Select your branch
- Fill in PR description
- Request review

---

## Google Maps API Setup

### 1. Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Enable Places API
5. Create API key with restrictions
6. Copy the API key

### 2. Configure Environment Variable

```env
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_api_key_here
```

### 3. Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

---

## Backend API Setup

### Development API

The frontend connects to the backend API at:
```
https://cribseekers.onrender.com/api/v1
```

### Local Backend (Optional)

If you're running the backend locally:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

---

## Docker Setup (Optional)

### 1. Install Docker

Download and install Docker from [docker.com](https://www.docker.com/)

### 2. Build Docker Image

```bash
docker build -t cribseekers-frontend .
```

### 3. Run Docker Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://cribseekers.onrender.com/api/v1 \
  -e NEXT_PUBLIC_SOCKET_URL=https://cribseekers.onrender.com \
  -e NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key \
  cribseekers-frontend
```

---

## Production Build

### 1. Build for Production

```bash
npm run build
```

### 2. Test Production Build Locally

```bash
npm run start
```

### 3. Deploy

Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for deployment instructions.

---

## Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project Documentation
- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details
- [API.md](./API.md) - API documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](./SECURITY.md) - Security guidelines
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing guidelines

---

## Support

For setup issues, contact:
- **Technical Support:** dev@cribseekers.com
- **Documentation:** docs.cribseekers.com
- **GitHub Issues:** github.com/your-org/cribseekers/issues

---

**End of Environment Setup Guide**
