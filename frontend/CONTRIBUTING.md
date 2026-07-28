# Contributing to CribSeekers Frontend

**Version:** 1.0.0 (Release Candidate 1)
**Date:** July 27, 2026

---

## Overview

Thank you for your interest in contributing to CribSeekers! This document provides guidelines for contributing to the frontend application.

---

## Code of Conduct

### Our Pledge

- Be respectful and inclusive
- Welcome new contributors
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub
   git clone https://github.com/your-username/cribseekers.git
   cd cribseekers/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Development Workflow

### Branch Strategy

- **main** - Production-ready code
- **develop** - Integration branch for features
- **feature/*** - New features
- **bugfix/*** - Bug fixes
- **hotfix/*** - Critical production fixes

### Creating a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Write Code**
   - Follow coding standards
   - Add TypeScript types
   - Write descriptive comments

2. **Test Locally**
   ```bash
   npm run type-check
   npm run lint
   npm run format
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements

**Examples:**
```
feat(auth): add OAuth login support
fix(properties): resolve image upload issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Update Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature-name
   git rebase develop
   ```

2. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template
   - Request review

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests pass
   - [ ] Manual testing completed
   - [ ] Screenshots attached (if UI changes)

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Commented complex code
   - [ ] Updated documentation
   - [ ] No new warnings
   - [ ] Added tests
   - [ ] All tests pass
   ```

---

## Coding Standards

### TypeScript

#### Strict Mode
- No implicit `any`
- Strict null checks enabled
- All functions typed

#### Naming Conventions
- **Components:** PascalCase (`PropertyCard.tsx`)
- **Hooks:** camelCase with `use` prefix (`useProperty.ts`)
- **Utilities:** camelCase (`formatCurrency.ts`)
- **Types:** PascalCase (`User`, `Property`)
- **Interfaces:** PascalCase (`ApiResponse`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)

#### Example
```typescript
// Good
interface User {
  id: string;
  name: string;
}

const getUserById = (id: string): User => {
  return apiClient.get(`/users/${id}`);
};

// Bad
const getUser = (id) => {
  return api.get(`/users/${id}`);
};
```

### React

#### Component Structure
```typescript
import { useState, useEffect } from 'react';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Effect logic
  }, []);

  const handleClick = () => {
    onAction();
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}
```

#### Best Practices
- Use functional components with hooks
- Avoid class components
- Use TypeScript for props
- Extract reusable logic to custom hooks
- Use React Query for data fetching

### CSS/Tailwind

#### Tailwind Guidelines
- Use utility classes over custom CSS
- Follow design system tokens
- Use responsive prefixes (`md:`, `lg:`)
- Group related classes

#### Example
```tsx
// Good
<div className="flex items-center justify-between p-4 bg-surface-primary rounded-lg">

// Bad
<div className="flex items-center justify-between p-4 bg-white rounded-lg">
```

### File Organization

#### Component File
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/shared';

// 2. Types
interface Props {
  // ...
}

// 3. Component
export function Component({ ... }: Props) {
  // ...
}

// 4. Sub-components
function SubComponent() {
  // ...
}
```

---

## Testing

### Unit Tests (Future)

```typescript
describe('Component', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive design works
- [ ] Loading states display
- [ ] Error states display
- [ ] Accessibility features work

---

## Code Review

### Reviewer Guidelines

1. **Check Functionality**
   - Does the code work as intended?
   - Are there edge cases not handled?

2. **Check Code Quality**
   - Is the code readable?
   - Are there better approaches?
   - Is TypeScript used correctly?

3. **Check Best Practices**
   - Are React patterns followed?
   - Is state managed appropriately?
   - Are hooks used correctly?

4. **Check Documentation**
   - Are comments clear?
   - Is the PR description accurate?
   - Are docs updated?

### Author Guidelines

1. **Before Submitting**
   - Self-review your code
   - Run all checks locally
   - Update documentation
   - Add tests

2. **During Review**
   - Respond to feedback promptly
   - Explain your decisions
   - Make requested changes
   - Ask questions if unclear

---

## Issue Reporting

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

## Additional Context
Any other context
```

### Feature Request Template

```markdown
## Description
Clear description of the feature

## Problem
What problem does this solve?

## Proposed Solution
How should this be implemented?

## Alternatives
What alternatives have you considered?

## Additional Context
Any other context
```

---

## Documentation

### When to Update Docs

- Adding new features
- Changing existing behavior
- Updating dependencies
- Modifying configuration

### Documentation Files

- `README.md` - Project overview
- `ARCHITECTURE.md` - Architecture details
- `API.md` - API documentation
- `DEPLOYMENT.md` - Deployment guide
- `SECURITY.md` - Security guidelines
- `CONTRIBUTING.md` - This file

---

## Performance Guidelines

### Optimization Checklist

- [ ] Avoid unnecessary re-renders
- [ ] Use React.memo for expensive components
- [ ] Implement lazy loading for heavy components
- [ ] Optimize images
- [ ] Use code splitting
- [ ] Cache API responses
- [ ] Debounce user input

### Example

```typescript
// Good - Memoized component
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* heavy rendering */}</div>;
});

// Good - Lazy loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Alt text for images
- [ ] Color contrast 4.5:1

### Example

```tsx
// Good
<button aria-label="Close modal" onClick={onClose}>
  <X />
</button>

// Bad
<button onClick={onClose}>
  <X />
</button>
```

---

## Security Guidelines

### Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] Output escaping
- [ ] Secure API calls
- [ ] Proper error handling
- [ ] No XSS vulnerabilities

See [SECURITY.md](./SECURITY.md) for details.

---

## Getting Help

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Real-time discussion
- **Email** - dev@cribseekers.com

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project website

---

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

**End of Contributing Guidelines**
