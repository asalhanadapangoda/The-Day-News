# Vercel SPA Routing Fix

## Problem: 404 Error on Routes

When accessing routes like `/admin` directly or refreshing the page, Vercel returns a 404 error because it tries to find a file at that path, but React Router handles routing client-side.

## Solution: vercel.json Configuration

Created `client/vercel.json` file that tells Vercel to:
- Rewrite all routes to `index.html`
- Let React Router handle the routing client-side

## File Created

`client/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Next Steps

1. **Commit and push the file**:
   ```bash
   git add client/vercel.json
   git commit -m "Add vercel.json for SPA routing"
   git push
   ```

2. **Wait for Vercel to redeploy** (automatic after push)

3. **Test the routes**:
   - `/admin` - Should show login page
   - `/admin/dashboard` - Should redirect to login if not authenticated
   - `/tv` - Should redirect to Google Sites
   - All other routes should work

## How It Works

- **Without vercel.json**: Vercel tries to find `/admin/index.html` → 404 error
- **With vercel.json**: Vercel serves `/index.html` for all routes → React Router handles `/admin` → Works correctly

This is a standard configuration for Single Page Applications (SPAs) on Vercel.

