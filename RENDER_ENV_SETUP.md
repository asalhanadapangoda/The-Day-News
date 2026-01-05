# Render Environment Variables Setup

## Required Environment Variables for Render

Set these in your Render Dashboard → Environment Variables:

```
CLIENT_URL1=https://thedaynewsglobal.lk
CLIENT_URL2=https://www.thedaynewsglobal.lk
```

## Other Required Variables

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
NODE_ENV=production
```

## Important Notes

- **No trailing slashes** in URLs
- Use `https://` (not `http://`)
- Both CLIENT_URL1 and CLIENT_URL2 must be set for CORS to work properly
- After adding/updating variables, **restart your Render service**

## How to Set in Render

1. Go to your Render service dashboard
2. Click "Environment" tab
3. Click "Add Environment Variable"
4. Add each variable one by one:
   - Name: `CLIENT_URL1`
   - Value: `https://thedaynewsglobal.lk`
   - Click "Save Changes"
5. Repeat for `CLIENT_URL2` with value `https://www.thedaynewsglobal.lk`
6. Restart your service

