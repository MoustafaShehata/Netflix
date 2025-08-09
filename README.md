# Netflix Clone Full-Stack Application

This project is a full-stack Netflix clone, featuring a React frontend and a Node.js/Express backend. It allows users to browse, search, and watch movies and TV shows, with authentication and personalized features.

![Netflix Clone App](https://t3.ftcdn.net/jpg/04/81/76/22/360_F_481762281_Xcvl3QsGh1pBMvQuyKIoIqq8aYksXEwX.jpg)

## Features

### Frontend (React + Vite)

- Modern UI inspired by Netflix
- User authentication (Sign Up, Login)
- Browse trending movies and TV shows
- Search for content
- Watch page for streaming
- User history and personalized content
- Responsive design

### Backend (Node.js + Express)

- RESTful API for movies, TV shows, and user management
- JWT-based authentication
- MongoDB integration for user data
- TMDB API integration for content data
- Secure routes and middleware

## Project Structure

```
backend/
  server.js                # Entry point for Express server
  config/                  # Database and environment config
  controllers/             # Route controllers (auth, movie, tv, search)
  middleware/              # Auth middleware
  models/                  # Mongoose models
  routes/                  # API route definitions
  services/                # TMDB API service
  utils/                   # Utility functions
frontend/
  src/                     # React source code
    components/            # Reusable UI components
    pages/                 # App pages (Home, Login, Signup, etc.)
    store/                 # State management
    utils/                 # Frontend utilities
  public/                  # Static assets
  index.html               # Main HTML file
  vite.config.js           # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- TMDB API key

### Application Setup

1. fill a `.env` file in `Netflix/.env` with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TMDB_API_KEY=your_tmdb_api_key
   ```
2. Make sure you are open Netflix folder in your terminal

3. then run these command lines:

   ```sh
   npm run build
   npm run start
   ```

4. Open [http://localhost:8000](http://localhost:8000) in your browser.

## License

This project is for educational purposes only and is not affiliated with Netflix.
