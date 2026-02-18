# Netflix Clone Full-Stack Application

This project is a full-stack Netflix clone, featuring a React frontend and a Node.js/Express backend. It allows users to browse, search, and watch movies and TV shows, with authentication, personalized features, and email notifications.

![Netflix Clone App](https://t3.ftcdn.net/jpg/04/81/76/22/360_F_481762281_Xcvl3QsGh1pBMvQuyKIoIqq8aYksXEwX.jpg)

## Features

### Frontend (React + Vite)

- Modern UI inspired by Netflix
- User authentication:
  - **Sign Up**
  - **Login**
  - **Verify email** via 6-digit OTP
  - **Forgot Password** and **Reset Password**
- Browse trending movies and TV shows
- Search for content
- Watch page for streaming
- User history and personalized content
- Responsive design
- Skeleton loaders for better user experience during content loading

### Backend (Node.js + Express)

- RESTful API for movies, TV shows, and user management
- JWT-based authentication
- MongoDB integration for user data
- TMDB API integration for content data
- Secure routes and middleware
- Email notifications using **Mailtrap**:
  - Verification email with 6-digit code upon signup
  - Welcome email on successful login
  - Forgot password email
  - Password reset confirmation email

> **Important:** To receive emails through Mailtrap, the user **must sign up with the email they want to use**. The same email will receive tokens and notifications.

## Project Structure

```
|   .env
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|
+---backend
|   |   server.js
|   |
|   +---config
|   |       db.js
|   |       envVars.js
|   |
|   +---controllers
|   |       auth.controller.js
|   |       movie.controller.js
|   |       search.controller.js
|   |       tv.controller.js
|   |
|   +---Emails
|   |       emails.js
|   |       emailTemplates.js
|   |       mailtrap.config.js
|   |
|   +---middlewares
|   |       protectRoute.js
|   |
|   +---models
|   |       user.model.js
|   |
|   +---routes
|   |       auth.route.js
|   |       movie.route.js
|   |       search.route.js
|   |       tv.route.js
|   |
|   +---services
|   |       tmdb.service.js
|   |
|   \---utils
|           generateToken.js
|
\---frontend
    |   eslint.config.js
    |   index.html
    |   package-lock.json
    |   package.json
    |   vite.config.js
    |
    +---public
    |   \---assets
    |           404.png
    |           avatar1.png
    |           avatar2.png
    |           avatar3.png
    |           device-pile.png
    |           download-icon.gif
    |           extraction.png
    |           favicon.png
    |           hero-vid.mp4
    |           hero.png
    |           kids.png
    |           netflix-logo.png
    |           stranger-things-lg.png
    |           stranger-things-sm.png
    |           tv.png
    |           video-devices.mp4
    |
    \---src
        |   App.jsx
        |   index.css
        |   main.jsx
        |
        +---components
        |   |   Footer.jsx
        |   |   MovieSlider.jsx
        |   |   Nav.jsx
        |   |
        |   \---skeletons
        |           HistoryPageCardSkeleton.jsx
        |           HomeScreenSkeleton.jsx
        |           MovieDetailsTrailerSkeleton.jsx
        |           MovieSliderSkeleton.jsx
        |           SearchPageCardSkeleton.jsx
        |
        +---pages
        |   |   HistoryPage.jsx
        |   |   MovieDetailsPage.jsx
        |   |   NotFoundPage.jsx
        |   |   SearchPage.jsx
        |   |
        |   +---Auth
        |   |       ForgotPasswordPage.jsx
        |   |       LoginPage.jsx
        |   |       ResetPasswordPage.jsx
        |   |       SignupPage.jsx
        |   |       VerifyEmailPage.jsx
        |   |
        |   \---Home
        |           AuthScreen.jsx
        |           HomePage.jsx
        |           HomeScreen.jsx
        |
        \---store
                constants.js
                getMovies.js
                userAuth.js
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- TMDB API key
- Mailtrap API key

### Application Setup

1. fill a `.env` file in `Netflix/.env` with the following:

```
PORT =8000
JWT_SECRET= # your JWT_SECRET
NODE_ENV=development
MONGO_URL= # your MONGO_URL
MAILTRAP_API_TOKEN= # get Token from https://mailtrap.io/pricing/?tab=email-api
TMDB_API_TOKEN= # get Token From https://www.themoviedb.org
CLIENT_URL=http://localhost:8000

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
