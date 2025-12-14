# 🔒 Security Documentation - The Day News Website

## Overview

This document outlines the security measures implemented in The Day News Website to protect the admin panel and API endpoints.

---

## 🛡️ Security Features Implemented

### 1. **Authentication & Authorization**

#### Frontend Protection
- ✅ **Protected Routes**: All admin routes (`/admin/*`) are protected by `ProtectedRoute` component
- ✅ **Token Verification**: Tokens are verified on every route access via API call
- ✅ **Automatic Redirect**: Unauthenticated users are automatically redirected to `/admin` login page
- ✅ **Role-Based Access**: Only users with `admin` role can access admin routes
- ✅ **Token Refresh**: Automatic token verification every 5 minutes

#### Backend Protection
- ✅ **JWT Authentication**: All admin endpoints require valid JWT token
- ✅ **Token Validation**: Tokens are verified on every request
- ✅ **Role Verification**: Backend checks user role before allowing access
- ✅ **Token Expiration**: Tokens expire after 7 days (configurable via `JWT_EXPIRE`)

### 2. **Rate Limiting**

#### Login Protection
- ✅ **Brute Force Prevention**: Login endpoint limited to 5 attempts per 15 minutes per IP
- ✅ **Account Lockout**: Prevents automated password guessing attacks

#### API Protection
- ✅ **General API Limiting**: 100 requests per 15 minutes per IP
- ✅ **Admin Route Limiting**: 50 requests per 15 minutes per IP for admin endpoints

### 3. **Input Validation & Sanitization**

#### Login Form
- ✅ **Username Validation**: 
  - 3-30 characters
  - Only letters, numbers, and underscores
  - Trimmed and lowercased
  
- ✅ **Password Validation**:
  - Minimum 6 characters
  - Required field

#### Admin Endpoints
- ✅ **Podcast Validation**: Name and description validation
- ✅ **Section Validation**: Name validation
- ✅ **Upcoming Validation**: Name and description validation
- ✅ **Express-Validator**: All inputs validated using express-validator

### 4. **Password Security**

- ✅ **Bcrypt Hashing**: Passwords hashed with bcrypt (12 salt rounds)
- ✅ **Password Never Returned**: Passwords excluded from API responses
- ✅ **Minimum Length**: 6 character minimum enforced
- ✅ **No Plain Text Storage**: Passwords never stored in plain text

### 5. **Security Headers (Helmet.js)**

- ✅ **XSS Protection**: XSS filter enabled
- ✅ **Content Security Policy**: Configured CSP headers
- ✅ **Frame Options**: Prevents clickjacking
- ✅ **MIME Sniffing**: Prevents MIME type sniffing
- ✅ **HSTS**: HTTP Strict Transport Security (in production)

### 6. **Error Handling**

- ✅ **Generic Error Messages**: Login errors don't reveal if username exists
- ✅ **Timing Attack Prevention**: Consistent response times for login attempts
- ✅ **No Information Leakage**: Error messages don't expose system details

### 7. **CORS Configuration**

- ✅ **Restricted Origins**: Only configured client URL allowed
- ✅ **Credentials Support**: Secure credential handling
- ✅ **Method Restrictions**: Only allowed HTTP methods

---

## 🔐 Authentication Flow

### Login Process

1. User navigates to `/admin`
2. If already authenticated, redirected to `/admin/dashboard`
3. User enters username and password
4. Frontend validates input (client-side)
5. Request sent to `/api/auth/login` with rate limiting
6. Backend validates input (server-side)
7. Backend checks username (case-insensitive)
8. Backend verifies password with bcrypt
9. If valid, JWT token generated and returned
10. Token stored in localStorage
11. User redirected to `/admin/dashboard`

### Protected Route Access

1. User navigates to any `/admin/*` route
2. `ProtectedRoute` component checks for token
3. If no token → redirect to `/admin`
4. If token exists → verify with `/api/auth/me`
5. Backend validates token and checks user role
6. If valid admin → allow access
7. If invalid/expired → remove token, redirect to `/admin`

---

## 🚨 Security Best Practices

### For Developers

1. **Never Commit Secrets**
   - `.env` files are in `.gitignore`
   - Never commit JWT secrets, database URIs, or API keys

2. **Use Strong Passwords**
   - Minimum 8+ characters recommended
   - Mix of uppercase, lowercase, numbers, symbols

3. **Regular Security Updates**
   - Keep dependencies updated
   - Monitor security advisories

4. **Environment Variables**
   - Use strong `JWT_SECRET` (32+ random characters)
   - Use different secrets for development/production

### For Administrators

1. **Strong Admin Password**
   - Use a unique, strong password
   - Change password regularly
   - Don't share credentials

2. **Monitor Login Attempts**
   - Check server logs for failed login attempts
   - Be aware of rate limiting triggers

3. **Token Management**
   - Logout when done (clears token)
   - Don't share browser sessions
   - Use private browsing for shared computers

---

## 🔧 Configuration

### Environment Variables Required

```env
# JWT Configuration
JWT_SECRET=your_very_strong_secret_key_here_minimum_32_characters
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173
```

### Rate Limiting Configuration

Rate limits are configured in `server/middleware/rateLimiter.js`:
- Login: 5 attempts per 15 minutes
- API: 100 requests per 15 minutes
- Admin: 50 requests per 15 minutes

---

## 🐛 Security Issues & Reporting

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email the project maintainer directly
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before disclosure

---

## 📋 Security Checklist

### Before Deployment

- [ ] Strong `JWT_SECRET` set (32+ characters, random)
- [ ] `.env` files not committed to git
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Helmet security headers enabled
- [ ] HTTPS enabled (production)
- [ ] Database credentials secure
- [ ] Admin password is strong
- [ ] Error messages don't leak information
- [ ] All admin routes protected

### Regular Maintenance

- [ ] Update dependencies monthly
- [ ] Review security logs
- [ ] Rotate JWT secret annually
- [ ] Review and update rate limits
- [ ] Monitor failed login attempts
- [ ] Keep server software updated

---

## 🔄 Token Refresh

Currently, tokens expire after 7 days. Users must log in again after expiration.

**Future Enhancement**: Implement refresh tokens for seamless re-authentication.

---

## 📊 Security Monitoring

### What to Monitor

1. **Failed Login Attempts**
   - Check for brute force attempts
   - Monitor rate limit triggers

2. **Token Validation Failures**
   - Expired tokens
   - Invalid tokens
   - Missing tokens

3. **API Rate Limit Hits**
   - Unusual traffic patterns
   - Potential DDoS attempts

---

## ✅ Security Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| JWT Authentication | ✅ | Token-based auth |
| Route Protection | ✅ | Frontend + Backend |
| Rate Limiting | ✅ | Login, API, Admin |
| Input Validation | ✅ | All endpoints |
| Password Hashing | ✅ | Bcrypt (12 rounds) |
| Security Headers | ✅ | Helmet.js |
| CORS Protection | ✅ | Restricted origins |
| Error Handling | ✅ | No info leakage |
| Role-Based Access | ✅ | Admin only |
| Token Expiration | ✅ | 7 days |

---

## 🎯 Conclusion

The Day News Website implements multiple layers of security:

1. **Frontend**: Route protection, token verification
2. **Backend**: JWT validation, role checking, rate limiting
3. **Data**: Password hashing, input validation
4. **Network**: CORS, security headers, rate limiting

All admin routes are protected and require valid authentication. Users cannot access admin pages without logging in first.

---

*Last Updated: 2024*  
*Security Level: Production Ready*

