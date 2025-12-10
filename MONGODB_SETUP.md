# MongoDB Setup Guide

## Error: "bad auth : authentication failed"

This error occurs when MongoDB cannot authenticate the connection. Here's how to fix it:

## Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB via Docker

2. **Start MongoDB Service**:
   - Windows: MongoDB should start automatically as a service
   - Or run manually: `mongod` in a terminal

3. **Update your `.env` file** in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/thedaynews
   ```

## Option 2: MongoDB Atlas (Cloud)

1. **Create a free account** at: https://www.mongodb.com/cloud/atlas

2. **Create a cluster** (free tier available)

3. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update your `.env` file**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thedaynews?retryWrites=true&w=majority
   ```
   Replace `username` and `password` with your Atlas credentials.

## Option 3: Docker MongoDB (Quick Setup)

1. **Run MongoDB in Docker**:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Use this connection string** in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/thedaynews
   ```

## Verify MongoDB is Running

### Windows:
```bash
# Check if MongoDB service is running
sc query MongoDB

# Or check in Task Manager for mongod.exe
```

### Test Connection:
```bash
# Try connecting with MongoDB shell
mongosh
# or
mongo
```

## Common Issues

1. **MongoDB not running**: Start the MongoDB service
2. **Wrong port**: Default MongoDB port is 27017
3. **Firewall blocking**: Allow MongoDB through Windows Firewall
4. **Wrong credentials**: Check username/password in connection string
5. **Database name**: Make sure database name is correct

## Quick Fix for Development

If you just want to test without MongoDB, you can temporarily comment out the database connection in `server.js`:

```javascript
// Connect to database
// connectDB(); // Comment this out temporarily
```

But you'll need MongoDB for the full application to work.

