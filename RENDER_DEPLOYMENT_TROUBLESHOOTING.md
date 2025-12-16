# Render Deployment Troubleshooting

## Issue: "Cannot GET /" Error

### ✅ Solution Applied

I've added a root route (`/`) to your server that returns helpful API information. This will resolve the "Cannot GET /" error.

### Testing Your Backend

After the next deployment, test these URLs:

1. **Root Route (API Info)**:
   ```
   https://the-day-news.onrender.com/
   ```
   Should return API information and available endpoints.

2. **Health Check**:
   ```
   https://the-day-news.onrender.com/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

3. **Public Endpoints**:
   ```
   https://the-day-news.onrender.com/api/podcasts
   https://the-day-news.onrender.com/api/sections
   https://the-day-news.onrender.com/api/upcoming
   ```

### Important: Update CLIENT_URL in Render

Make sure your Render environment variable is set to:

```
CLIENT_URL=https://the-day-news.vercel.app
```

**Note**: Remove trailing slashes from URLs in environment variables.

### Steps to Update CLIENT_URL in Render:

1. Go to your Render dashboard
2. Select your "The-Day-News" service
3. Go to "Environment" tab
4. Find `CLIENT_URL` variable
5. Update the value to: `https://the-day-news.vercel.app` (no trailing slash)
6. Click "Save Changes"
7. Render will automatically redeploy

### Verify Deployment is Working

Check your Render logs:
1. Go to Render dashboard → Your service
2. Click "Logs" tab
3. Look for:
   - ✅ `MongoDB Connected: ...`
   - ✅ `Server running on 0.0.0.0:XXXX`
   - ❌ Any error messages

### Common Issues

1. **MongoDB Connection Failed**
   - Check `MONGODB_URI` is correct
   - Verify MongoDB Atlas IP whitelist includes Render IPs (or use 0.0.0.0/0)
   - Check database name is correct: `/thedaynews`

2. **Environment Variables Missing**
   - Verify all required variables are set in Render
   - Check variable names are exact (case-sensitive)

3. **CORS Errors**
   - Ensure `CLIENT_URL` matches your frontend URL exactly
   - No trailing slashes
   - Use `https://` not `http://`

---

## Current Configuration

- **Backend URL**: `https://the-day-news.onrender.com`
- **Frontend URL**: `https://the-day-news.vercel.app`
- **CLIENT_URL**: Should be `https://the-day-news.vercel.app`

---

## Next Steps

1. ✅ Code updated with root route
2. ⚠️ Commit and push changes to trigger Render redeploy
3. ⚠️ Update `CLIENT_URL` in Render dashboard if not already set
4. ✅ Test health endpoint after redeploy

