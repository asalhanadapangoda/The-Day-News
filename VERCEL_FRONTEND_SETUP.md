# Vercel Frontend Setup - Environment Variables

## Issue: "Cannot connect to server" Error

The frontend is trying to connect to `localhost` instead of your Render backend because the `VITE_API_URL` environment variable is not set in Vercel.

---

## ✅ Solution: Add Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **The-Day-News** (or your project name)
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add Environment Variable

1. Click **Add New** or **Add Environment Variable**
2. Fill in:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://the-day-news.onrender.com/api`
   - **Environment**: Select all (Production, Preview, Development) or at least **Production**
3. Click **Save**

### Step 3: Redeploy

After adding the environment variable, you need to redeploy:

1. Go to **Deployments** tab
2. Click the **3 dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

---

## 📋 Environment Variable Details

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_API_URL` | `https://the-day-news.onrender.com/api` | Production, Preview, Development |

**Important Notes:**
- ✅ Must be prefixed with `VITE_` for Vite to expose it to client-side code
- ✅ Use `https://` (not `http://`)
- ✅ Include `/api` at the end (your backend API base path)
- ✅ No trailing slash after `/api`

---

## 🔍 Verify It's Working

After redeploy, check:

1. **Open your site**: `https://the-day-news.vercel.app`
2. **Open browser console** (F12 → Console tab)
3. **Check Network tab** to see API requests going to:
   - ✅ `https://the-day-news.onrender.com/api/...`
   - ❌ NOT `http://localhost:5000/api/...`

---

## 🐛 Troubleshooting

### Still seeing "Cannot connect to server"

1. **Verify environment variable is set**:
   - Go to Vercel → Settings → Environment Variables
   - Make sure `VITE_API_URL` is listed
   - Value should be `https://the-day-news.onrender.com/api`

2. **Redeploy after adding variable**:
   - Environment variables are only available on new deployments
   - Old deployments won't have the new variable

3. **Check CORS on backend**:
   - Make sure `CLIENT_URL` in Render is set to `https://the-day-news.vercel.app`
   - No trailing slash

4. **Check browser console**:
   - Look for CORS errors
   - Check what URL it's trying to connect to

### CORS Errors

If you see CORS errors in the browser console:

1. Go to Render Dashboard → Your Service → Environment
2. Verify `CLIENT_URL` is set to: `https://the-day-news.vercel.app`
3. No trailing slash
4. Restart the Render service

---

## 📝 Local Development

For local development, keep your `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

This file is only used when running `npm run dev` locally. It doesn't affect Vercel deployments.

---

## ✅ Quick Checklist

- [ ] Added `VITE_API_URL` in Vercel Environment Variables
- [ ] Value set to `https://the-day-news.onrender.com/api`
- [ ] Selected Production environment (or all environments)
- [ ] Redeployed the Vercel project
- [ ] Verified `CLIENT_URL` in Render is `https://the-day-news.vercel.app`
- [ ] Tested the frontend - should connect to backend now

---

**After completing these steps, your frontend should successfully connect to your Render backend!**

