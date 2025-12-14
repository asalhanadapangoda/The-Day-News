# Email Setup Guide - Simple Resend Configuration

## Quick Setup (2 minutes)

### Step 1: Get Free Resend API Key
1. Go to: https://resend.com/signup
2. Sign up for a free account (no credit card required)
3. Go to: https://resend.com/api-keys
4. Click **Create API Key**
5. Give it a name: "THE DAY NEWS Website"
6. Copy the API key (starts with `re_`)

### Step 2: Add to .env File
Open `server/.env` and add this one line:

```env
RESEND_API_KEY=re_your_api_key_here
```

**Important:**
- Replace `re_your_api_key_here` with your actual Resend API key
- The email will ALWAYS be sent TO: `asalhimsanda@gmail.com`

### Step 3: Restart Server
After adding the API key, restart your server:
```bash
# Stop the server (Ctrl+C)
# Then start it again
npm run dev
```

## Testing

1. Go to the contact form on your website
2. Fill out the form and submit
3. Check `asalhimsanda@gmail.com` inbox
4. You should receive the email within a few seconds

## Troubleshooting

**If you see "Email service is not configured":**
- Make sure `RESEND_API_KEY` is in `server/.env`
- Make sure there are no spaces or quotes around the value
- Restart the server after adding it

**If you see "Failed to send email":**
- Check the server console for detailed error messages
- Verify your Resend API key is correct
- Make sure your Resend account is active

## Example .env File

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/thedaynews
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# Email Configuration (Resend)
RESEND_API_KEY=re_your_api_key_here
```

## Why Resend?

- ✅ **Free tier**: 3,000 emails/month free
- ✅ **Simple**: Just one API key, no complex setup
- ✅ **Reliable**: Modern email service
- ✅ **No Gmail setup needed**: No app passwords or 2FA required

That's it! The contact form will now send emails to `asalhimsanda@gmail.com` automatically.

