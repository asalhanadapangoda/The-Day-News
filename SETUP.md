# THE DAY NEWS - Setup Instructions

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Create a `.env` file in the `server` directory with the following:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/thedaynews
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=http://localhost:5173
   NEWS_API_KEY=your_news_api_key_here
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Create admin user:**
   ```bash
   npm run create-admin
   ```
   Default credentials:
   - Username: `admin`
   - Password: `admin123`
   **⚠️ IMPORTANT: Change the default password in production!**

6. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

## Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Create a `.env` file in the `client` directory with the following:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=The Day News
   VITE_NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Access Points

- **User Interface:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin
- **Admin Dashboard:** http://localhost:5173/admin/dashboard (after login)

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

**⚠️ SECURITY WARNING:** Change these credentials immediately in production!

## Features

### User Pages
- **Home:** Featured podcasts, latest feed, hero section
- **Podcasts:** All episodes with search and pagination
- **Single Episode:** Full episode details with audio player
- **About:** Mission statement and team info
- **Contact:** Contact form and social links
- **AI Chatbot:** Interactive chatbot (placeholder - ready for AI integration)

### Admin Pages
- **Login:** Secure authentication
- **Dashboard:** Admin panel with sidebar navigation
- **Add Podcast:** Create new podcast episodes
- **Edit Podcast:** View, update, and delete podcasts
- **Delete Confirmation:** Safety popup before deletion

## API Endpoints

### Public Endpoints
- `GET /api/podcasts` - Get all published podcasts
- `GET /api/podcasts/:id` - Get single podcast
- `GET /api/podcasts/latest` - Get latest podcast
- `GET /api/podcasts/featured` - Get featured podcasts
- `GET /api/podcasts/:id/related` - Get related podcasts

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/podcasts` - Create podcast
- `PUT /api/podcasts/:id` - Update podcast
- `DELETE /api/podcasts/:id` - Delete podcast
- `GET /api/podcasts/admin/all` - Get all podcasts (including unpublished)

## Project Structure

```
The Day News Website/
├── client/              # React frontend
│   └── src/
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       └── services/   # API services
└── server/             # Express backend
    ├── config/         # Configuration files
    ├── controllers/    # Request handlers
    ├── middleware/     # Custom middleware
    ├── models/         # Database models
    ├── routes/         # API routes
    └── utils/          # Utility functions
```

## Troubleshooting

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in `.env` file

2. **Port Already in Use:**
   - Change PORT in server `.env` file
   - Update CLIENT_URL accordingly

3. **CORS Errors:**
   - Ensure CLIENT_URL in server `.env` matches frontend URL

4. **Authentication Issues:**
   - Clear browser localStorage
   - Re-run `npm run create-admin` to reset admin user

## Next Steps

1. Replace placeholder AI chatbot with actual AI integration
2. Add image upload functionality using Cloudinary
3. Customize team information on About page
4. Add email functionality for contact form
5. Set up production environment variables
6. Configure proper security measures

## Support

For issues or questions, please refer to the project documentation or contact the development team.

