# CribSeekers Frontend Security Documentation

**Version:** 1.0.0 (Release Candidate 1)
**Date:** July 27, 2026

---

## Overview

This document outlines the security measures implemented in the CribSeekers frontend application and provides guidelines for maintaining security.

---

## Security Architecture

### Authentication

#### JWT Token Management
- **Access Token:** Stored in localStorage, valid for 15 minutes
- **Refresh Token:** Stored in localStorage, valid for 7 days
- **Automatic Refresh:** Implemented in Axios interceptor
- **Token Cleanup:** On logout and refresh failure

#### Token Flow
```
1. User logs in → Receive access + refresh tokens
2. Access token in Authorization header for API calls
3. On 401 response → Attempt token refresh
4. Refresh success → Retry original request
5. Refresh failure → Clear tokens, redirect to login
```

### HTTP Security Headers

Configured in `next.config.ts`:

```typescript
{
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Content-Security-Policy': '...'
}
```

### Content Security Policy (CSP)

```http
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com https://cribseekers.onrender.com; 
  style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com; 
  img-src 'self' data: https: blob:; 
  font-src 'self' https://*.googleapis.com https://*.gstatic.com; 
  connect-src 'self' https://cribseekers.onrender.com https://*.googleapis.com wss://cribseekers.onrender.com; 
  frame-src 'self' https://*.google.com; 
  media-src 'self' https: blob:; 
  object-src 'none'; 
  base-uri 'self'; 
  form-action 'self'; 
  frame-ancestors 'self';
```

---

## Security Measures

### 1. Input Validation

#### Form Validation
- All forms use Zod schemas for validation
- Client-side validation before submission
- Server-side validation (backend responsibility)

#### Example Zod Schema
```typescript
const propertySchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(50).max(5000),
  price: z.number().positive(),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9+]{10,15}$/),
});
```

### 2. XSS Prevention

#### React Default Protection
- React automatically escapes JSX content
- No use of `dangerouslySetInnerHTML` unless necessary
- Sanitization when using dynamic HTML

#### User-Generated Content
- All user input is escaped by React
- File uploads validated for type and size
- Image URLs validated before display

### 3. CSRF Protection

#### Current Status
- CSRF tokens not currently implemented
- Recommended for future implementation

#### Recommended Implementation
```typescript
// Add CSRF token to all mutations
const csrfToken = getCsrfToken();
apiClient.post('/endpoint', data, {
  headers: { 'X-CSRF-Token': csrfToken }
});
```

### 4. API Security

#### Axios Interceptors
```typescript
// Request interceptor - Add auth token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token refresh logic
    }
    return Promise.reject(error);
  }
);
```

#### Error Handling
- 403: Access forbidden logged
- 404: Resource not found logged
- 500: Server error logged
- Network errors: Logged and displayed to user

### 5. Environment Variables

#### Protected Variables
- API URLs configured via environment
- Google Maps API key via environment
- No hardcoded secrets in code
- `.env` files excluded from Git

#### .gitignore
```
.env
.env*.local
.env.production
```

### 6. Data Storage

#### localStorage Usage
- Access tokens
- Refresh tokens
- User preferences
- Search history

#### Security Considerations
- Tokens accessible via JavaScript (XSS risk)
- Consider HttpOnly cookies for production
- Implement token rotation

### 7. File Upload Security

#### Validation
- File type validation (MIME type)
- File size limits
- File name sanitization
- Virus scanning (backend responsibility)

#### Implementation
```typescript
const validateFile = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
};
```

### 8. WebSocket Security

#### Socket.IO Configuration
```typescript
const socket = io(SOCKET_URL, {
  auth: { token: accessToken },
  secure: true, // WSS in production
  transports: ['websocket']
});
```

#### Security Measures
- Authentication via token
- Secure WebSocket (WSS)
- No fallback to insecure transports

---

## Security Best Practices

### 1. Dependency Management

#### Regular Updates
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

#### Locked Dependencies
- Use `package-lock.json`
- Pin exact versions in production
- Review security advisories

### 2. Code Quality

#### TypeScript Strict Mode
- No implicit `any`
- Strict null checks
- All files typed

#### ESLint Rules
- No console.log in production
- No eval usage
- No unsafe assignments

### 3. Secrets Management

#### Never Commit Secrets
- API keys in environment variables
- No keys in code
- Use secret management in CI/CD

#### CI/CD Secrets
- GitHub Secrets
- Vercel Environment Variables
- Netlify Environment Variables

### 4. Error Handling

#### Generic Error Messages
- Don't expose system details
- User-friendly error messages
- Log detailed errors server-side

#### Example
```typescript
// Bad
throw new Error(`Database connection failed: ${connectionString}`);

// Good
throw new Error('Unable to connect to database');
```

### 5. Logging

#### What to Log
- Authentication attempts
- Failed authorization
- Suspicious activity
- API errors

#### What Not to Log
- Passwords
- Tokens
- Personal data
- Sensitive information

---

## Security Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] No hardcoded secrets in code
- [ ] CSP headers configured
- [ ] Security headers enabled
- [ ] HTTPS enforced
- [ ] Dependencies audited
- [ ] No vulnerable packages
- [ ] Error handling reviewed
- [ ] Input validation tested
- [ ] File upload validation tested

### Post-Deployment

- [ ] Monitor for security events
- [ ] Review error logs
- [ ] Check for unusual activity
- [ ] Verify HTTPS working
- [ ] Test authentication flow
- [ ] Test authorization
- [ ] Review CSP reports

### Ongoing

- [ ] Regular dependency updates
- [ ] Security audits quarterly
- [ ] Penetration testing annually
- [ ] Security training for team
- [ ] Monitor security advisories

---

## Known Security Considerations

### Current Limitations

1. **Token Storage**
   - Tokens in localStorage (XSS vulnerable)
   - **Recommendation:** Move to HttpOnly cookies

2. **CSRF Protection**
   - No CSRF tokens implemented
   - **Recommendation:** Implement CSRF tokens for mutations

3. **Rate Limiting**
   - No client-side rate limiting
   - **Recommendation:** Implement rate limiting for sensitive operations

4. **Content Security Policy**
   - Uses `unsafe-inline` for styles
   - **Recommendation:** Remove unsafe-inline when possible

### Future Improvements

1. **HttpOnly Cookies**
   - Move tokens to HttpOnly cookies
   - Implement secure cookie flags

2. **CSRF Tokens**
   - Implement double-submit cookie pattern
   - Add CSRF validation to all mutations

3. **Rate Limiting**
   - Implement exponential backoff
   - Add request throttling

4. **Security Headers**
   - Add Permissions-Policy header
   - Add Cross-Origin-Opener-Policy
   - Add Cross-Origin-Embedder-Policy

5. **Content Security Policy**
   - Remove unsafe-inline
   - Implement nonce-based CSP
   - Add CSP reporting

---

## Incident Response

### Security Incident Procedure

1. **Identify**
   - Monitor security alerts
   - Review error logs
   - Check for unusual activity

2. **Contain**
   - Disable affected features
   - Rotate compromised credentials
   - Block malicious IPs

3. **Eradicate**
   - Patch vulnerabilities
   - Remove malicious code
   - Update dependencies

4. **Recover**
   - Restore from backups if needed
   - Verify systems are clean
   - Resume normal operations

5. **Post-Incident**
   - Document the incident
   - Conduct root cause analysis
   - Implement preventive measures

### Reporting Security Issues

- **Email:** security@cribseekers.com
- **Process:** Acknowledgment within 24 hours
- **Resolution:** Based on severity

---

## Compliance

### Data Protection
- GDPR considerations for EU users
- Nigerian Data Protection Act compliance
- User data handling policies

### Privacy
- Privacy policy published
- Cookie consent implemented
- Data retention policies defined

---

## Resources

### Security Tools
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [Snyk](https://snyk.io/) - Dependency scanning
- [npm audit](https://docs.npmjs.com/cli/v6/commands/npm-audit) - Vulnerability scanning

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [React Security](https://react.dev/learn/keeping-components-pure)

---

**End of Security Documentation**
