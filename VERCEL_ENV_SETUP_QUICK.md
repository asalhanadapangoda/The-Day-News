# Quick Fix: Vercel Environment Variable

## ⚠️ Important: Local .env File ≠ Vercel Environment Variables

Editing `client/.env` file only works for **local development**. For Vercel production deployments, you **must** add the environment variable in the Vercel Dashboard.

---

## ✅ Steps to Fix (Do This in Vercel Dashboard):

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/dashboard
- Click on your **The-Day-News** project

### 2. Add Environment Variable
- Click **Settings** tab (top navigation)
- Click **Environment Variables** (left sidebar)
- Click **Add New** button
- Fill in:
  - **Key**: `VITE_API_URL`
  - **Value**: `https://the-day-news.onrender.com/api`
  - **Environments**: Check ✅ **Production** (or select all)
- Click **Save**

### 3. Redeploy (CRITICAL!)
After adding the variable, you **must** redeploy:
- Go to **Deployments** tab
- Find your latest deployment
- Click the **3 dots** (⋯) menu
- Click **Redeploy**
- ✅ Wait for deployment to complete

---

## 🔍 Verify It's Set Correctly

After redeploy:

1. Go to your site: `https://the-day-news.vercel.app`
2. Open browser **Developer Tools** (F12)
3. Go to **Console** tab
4. You should see API requests going to: `https://the-day-news.onrender.com/api/...`
5. You should **NOT** see: `http://localhost:5000/api/...`

---

## ⚠️ Common Mistakes

❌ **Wrong**: Only editing `client/.env` file  
✅ **Correct**: Adding variable in Vercel Dashboard + Redeploy

❌ **Wrong**: Adding variable but not redeploying  
✅ **Correct**: Adding variable + Redeploying

❌ **Wrong**: Using `http://` instead of `https://`  
✅ **Correct**: Use `https://the-day-news.onrender.com/api`

❌ **Wrong**: Adding trailing slash: `...com/api/`  
✅ **Correct**: No trailing slash: `...com/api`

---

## 🐛 Still Not Working?

### Check Backend CORS
Make sure in **Render Dashboard**:
- Environment Variable `CLIENT_URL` = `https://the-day-news.vercel.app`
- No trailing slash

### Check Browser Console
- Open DevTools (F12) → Console tab
- Look for errors
- Check Network tab to see what URL it's trying to connect to

---

**Remember**: `.env` file = local only. Vercel Dashboard = production deployment.

