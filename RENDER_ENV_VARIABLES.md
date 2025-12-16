# Render Environment Variables Configuration

## Copy these into Render Dashboard → Environment Variables

**Important Notes:**
1. ✅ **Fixed MONGODB_URI**: Added `/thedaynews` database name to the connection string
2. ❌ **Removed VITE_GROQ_API_KEY**: This is for frontend only, backend uses `GROQ_API_KEY`
3. ⚠️ **Update CLIENT_URL**: Change to your actual frontend URL after deploying frontend

---

## Environment Variables for Render

### Copy these one by one into Render:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/thedaynews?retryWrites=true&w=majority
```

```
JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters
```

```
JWT_EXPIRE=7d
```

```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

```
CLOUDINARY_API_KEY=your_cloudinary_api_key
```

```
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

```
CLIENT_URL=https://the-day-news.vercel.app
```
*✅ Updated to your Vercel frontend URL - NO trailing slash!*

```
GROQ_API_KEY=your_groq_api_key_here
```

```
RESEND_API_KEY=re_your_resend_api_key_here
```

```
NODE_ENV=production
```

---

## Changes Made

1. **MONGODB_URI Fixed**: Added `/thedaynews` database name and proper query parameters
   - Before: `...mongodb.net/?appName=Cluster0`
   - After: `...mongodb.net/thedaynews?retryWrites=true&w=majority`

2. **Removed VITE_GROQ_API_KEY**: Frontend-only variable (backend uses `GROQ_API_KEY`)

3. **CLIENT_URL**: Placeholder - update with your actual frontend URL

4. **PORT**: Not needed - Render sets this automatically

---

## Step-by-Step: Adding to Render

1. Go to your Render service dashboard
2. Click "Environment" tab (or "Environment Variables" section)
3. Click "Add Environment Variable"
4. For each variable above:
   - **NAME**: Copy the variable name (left side of `=`)
   - **VALUE**: Copy the value (right side of `=`)
   - Click "Save Changes"
5. Repeat for all variables

---

## After Frontend Deployment

Once you deploy your frontend to Render, update:

```
CLIENT_URL=https://your-actual-frontend-url.onrender.com
```

Replace `your-actual-frontend-url` with your actual Render frontend service name.

