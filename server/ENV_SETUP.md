# Environment Variables Setup

## For Local Development

Create a `.env` file in the `server` directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/thedaynews

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS Configuration - Support for 2 client URLs
# For local development, use CLIENT_URL1 only
CLIENT_URL1=http://localhost:5173
# CLIENT_URL2=https://your-second-client-url.com

# Groq API (for chatbot)
GROQ_API_KEY=your_groq_api_key_here

# Resend API (for contact form)
RESEND_API_KEY=re_your_resend_api_key_here
```

**Note:** `CLIENT_URL2` is commented out for local development. You will uncomment and set it on Render.

---

## For Render Deployment

In your Render Dashboard → Environment Variables, add:

```
CLIENT_URL1=https://your-first-client-url.com
CLIENT_URL2=https://your-second-client-url.com
```

**Important:**
- No trailing slashes in URLs
- Both URLs will be allowed for CORS
- If only CLIENT_URL1 is set, only that URL will be allowed
- If both are set, both URLs will be allowed (OR gate)

---

## Backward Compatibility

If `CLIENT_URL1` and `CLIENT_URL2` are not set, the system will fall back to `CLIENT_URL` for backward compatibility.

