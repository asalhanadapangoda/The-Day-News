# Quick Start Guide - Fix MongoDB Connection

## Current Issue
MongoDB is not running or not properly configured.

## Solution Options

### Option 1: Install and Start MongoDB (Recommended)

#### Windows Installation:

1. **Download MongoDB Community Server:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and install

2. **During Installation:**
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Service will start automatically

3. **Verify Installation:**
   ```powershell
   # Check if MongoDB service is running
   Get-Service MongoDB
   
   # Or test connection
   mongosh
   ```

4. **Start MongoDB Service (if not running):**
   ```powershell
   # Start MongoDB service
   Start-Service MongoDB
   ```

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. **Sign up for free account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register

2. **Create a free cluster:**
   - Click "Build a Database"
   - Choose FREE (M0) tier
   - Select a cloud provider and region
   - Create cluster (takes 3-5 minutes)

3. **Create database user:**
   - Go to "Database Access"
   - Add New Database User
   - Create username and password (save these!)

4. **Whitelist your IP:**
   - Go to "Network Access"
   - Add IP Address
   - Click "Add Current IP Address" or use "0.0.0.0/0" for development

5. **Get connection string:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `thedaynews`

6. **Update `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/thedaynews?retryWrites=true&w=majority
   ```

### Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps
```

Then use in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/thedaynews
```

## After Setting Up MongoDB

1. **Make sure `.env` file exists in `server/` directory**
   - I've created it for you with the default local MongoDB URI

2. **Restart your server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Create admin user:**
   ```bash
   npm run create-admin
   ```

## Verify MongoDB is Working

### Test Connection:
```bash
# Open MongoDB shell
mongosh

# Or if mongosh is not available:
mongo
```

If you see MongoDB shell prompt, MongoDB is running!

### Check MongoDB Service Status:
```powershell
# Windows PowerShell
Get-Service MongoDB

# Start if stopped
Start-Service MongoDB
```

## Troubleshooting

### If MongoDB service won't start:

1. **Check MongoDB logs:**
   - Usually in: `C:\Program Files\MongoDB\Server\[version]\log\mongod.log`

2. **Check if port 27017 is in use:**
   ```powershell
   netstat -ano | findstr :27017
   ```

3. **Manually start MongoDB:**
   ```bash
   # Navigate to MongoDB bin directory
   cd "C:\Program Files\MongoDB\Server\[version]\bin"
   
   # Start MongoDB
   mongod --dbpath "C:\data\db"
   ```
   (Create `C:\data\db` directory first if it doesn't exist)

### If still getting authentication error:

1. **For local MongoDB, make sure `.env` has:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/thedaynews
   ```
   (No username/password for local MongoDB without auth)

2. **Check your `.env` file doesn't have extra spaces or quotes**

3. **Restart the server after changing `.env`**

## Need Help?

- Check `MONGODB_SETUP.md` for detailed instructions
- MongoDB Documentation: https://docs.mongodb.com/manual/installation/

