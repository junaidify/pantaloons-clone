# Setup Guide - Pantaloons Clone

This guide will help you set up the application with all its features including Auth0 authentication and Razorpay payment integration.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Auth0 Setup](#auth0-setup)
- [Razorpay Setup](#razorpay-setup)
- [Running the Application](#running-the-application)
- [Features Overview](#features-overview)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Auth0 account (free tier available)
- Razorpay account (for payment integration)

## Installation

1. Clone the repository and install dependencies:

```bash
# Install frontend dependencies
cd Frontend
npm install

# Install backend dependencies
cd ../Backend
npm install
```

## Environment Configuration

### Frontend Configuration

1. Copy the environment template:
```bash
cd Frontend
cp .env.example .env
```

2. Edit `.env` and fill in your values:
```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=  # Optional
VITE_AUTH0_REDIRECT_URI=http://localhost:5173

# Backend API
VITE_API_BASE_URL=http://localhost:3000

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### Backend Configuration

1. Copy the environment template:
```bash
cd Backend
cp .env.example .env
```

2. Edit `.env` and fill in your values:
```env
PORT=3000
NODE_ENV=development

# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=  # Should match your Auth0 API identifier

# Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Auth0 Setup

### Step 1: Create an Auth0 Account
1. Go to [Auth0](https://auth0.com/) and sign up
2. Create a new tenant (if needed)

### Step 2: Create a Single Page Application
1. Go to **Applications** > **Applications** in the Auth0 Dashboard
2. Click **Create Application**
3. Choose **Single Page Application**
4. Name it (e.g., "Pantaloons Frontend")
5. Select **React** as the technology

### Step 3: Configure Application Settings
1. In your application settings, add these URLs:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
   - **Allowed Origins (CORS)**: `http://localhost:5173`

2. Copy the following to your frontend `.env`:
   - **Domain** → `VITE_AUTH0_DOMAIN`
   - **Client ID** → `VITE_AUTH0_CLIENT_ID`

### Step 4: Create an API (Optional - for JWT tokens)
1. Go to **Applications** > **APIs**
2. Click **Create API**
3. Name it (e.g., "Pantaloons API")
4. Set identifier (e.g., `https://pantaloons-api`)
5. Copy the **Identifier** to both:
   - Frontend `.env` → `VITE_AUTH0_AUDIENCE`
   - Backend `.env` → `AUTH0_AUDIENCE`

## Razorpay Setup

### Step 1: Create a Razorpay Account
1. Go to [Razorpay](https://razorpay.com/) and sign up
2. Complete the verification process
3. Switch to **Test Mode** for development

### Step 2: Get API Keys
1. Go to **Settings** > **API Keys**
2. Click **Generate Test Keys** (or use existing keys)
3. Copy the keys to your `.env` files:
   - **Key ID** → `VITE_RAZORPAY_KEY_ID` (frontend) and `RAZORPAY_KEY_ID` (backend)
   - **Key Secret** → `RAZORPAY_KEY_SECRET` (backend only - never expose this!)

### Step 3: Test Cards (for testing)
Use these test card details in test mode:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## Running the Application

### Start the Backend
```bash
cd Backend
npm start
```
The backend will run on `http://localhost:3000`

### Start the Frontend
```bash
cd Frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## Features Overview

### 🎨 UI Makeover
- **New Color Palette**: Modern indigo/pink gradient theme
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Mobile-friendly layout

### 🔐 Authentication (Auth0)
- **Protected Routes**: Cart and Wishlist require login
- **User Profile**: Avatar and name display in navbar
- **Secure JWT**: Token-based authentication

### 💳 Payment Integration (Razorpay)
- **Secure Checkout**: Full Razorpay integration
- **Order Creation**: Backend creates and verifies orders
- **Payment Verification**: Signature verification for security

### 🎥 Video Components
- **Hero Video**: Background video on landing page
- **Promo Video**: Promotional video sections
- **Placeholders**: Graceful fallback when videos aren't available

### 📁 Video Assets
Add your video files to `/Frontend/public/videos/`:
- `hero-video.mp4` - Main hero section background
- `promo-video.mp4` - Promotional video

Recommended specs:
- Format: MP4 (H.264)
- Resolution: 1920x1080 for hero, 1280x720 for promo
- Duration: 10-30 seconds for hero, 15-45 seconds for promo
- File size: Under 5MB for hero, under 10MB for promo

### 🔧 Technical Features
- **Centralized API**: Axios instance with interceptors
- **Environment Variables**: Secure configuration management
- **JWT Middleware**: Optional backend authentication
- **CORS Configuration**: Secure cross-origin requests

## Troubleshooting

### Auth0 Issues
- **"Invalid state"**: Check that your callback URLs match exactly
- **"Unauthorized"**: Verify your domain and client ID
- **Can't login**: Check browser console for CORS errors

### Razorpay Issues
- **Payment fails**: Ensure you're using test mode keys in development
- **"Key ID is invalid"**: Check that you copied the key correctly
- **Backend error**: Verify both key ID and secret are set

### Video Issues
- **Video not playing**: Check file format (must be MP4/H.264)
- **Video too large**: Compress using HandBrake or FFmpeg
- **Black screen**: Check video codec compatibility

## Production Deployment

### Frontend
1. Update `.env` with production URLs
2. Build: `npm run build`
3. Deploy the `dist` folder

### Backend
1. Update `.env` with production credentials
2. Use Razorpay **Live Mode** keys
3. Update CORS origins
4. Deploy to your hosting service

### Auth0
1. Add production URLs to Auth0 application settings
2. Consider enabling MFA for security

### Important Security Notes
- ⚠️ Never commit `.env` files
- ⚠️ Never expose Razorpay Key Secret
- ⚠️ Use environment variables for all secrets
- ⚠️ Enable HTTPS in production
- ⚠️ Switch to Razorpay Live Mode for production

## Support

For issues or questions:
- Check the Auth0 documentation: https://auth0.com/docs
- Check the Razorpay documentation: https://razorpay.com/docs
- Review error messages in browser console and server logs

## License

This project is for educational purposes.
