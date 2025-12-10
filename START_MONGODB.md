# How to Start MongoDB

## ✅ .env File Created!

I've created the `.env` file in your `server` directory with the correct MongoDB connection string.

## Now Start MongoDB

### Option 1: Start MongoDB Service (If installed as service)

```powershell
# Check if MongoDB service exists
Get-Service | Where-Object {$_.DisplayName -like "*Mongo*"}

# If found, start it:
Start-Service MongoDB
```

### Option 2: Start MongoDB Manually

1. **Find MongoDB installation:**
   - Usually in: `C:\Program Files\MongoDB\Server\[version]\bin\mongod.exe`

2. **Create data directory (if doesn't exist):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "C:\data\db"
   ```

3. **Start MongoDB:**
   ```powershell
   # Navigate to MongoDB bin directory
   cd "C:\Program Files\MongoDB\Server\[version]\bin"
   
   # Start MongoDB
   .\mongod.exe --dbpath "C:\data\db"
   ```

   **Keep this window open** - MongoDB will run in this terminal.

### Option 3: Use MongoDB Atlas (Cloud - Easiest!)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0)
4. Get connection string
5. Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thedaynews
   ```

## After Starting MongoDB

1. **Verify MongoDB is running:**
   ```powershell
   # Test connection
   mongosh
   # or
   mongo
   ```

2. **Restart your server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Create admin user:**
   ```bash
   npm run create-admin
   ```

## Quick Test

Once MongoDB is running, test the connection:

```powershell
# Try connecting
mongosh mongodb://localhost:27017/thedaynews
```

If you see a MongoDB prompt, you're connected! ✅

## Still Having Issues?

- MongoDB might not be installed
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud) - no installation needed!

