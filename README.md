# SUGAR Project

> Rule the world, one look at a time 👀

## Overview

SUGAR is a web application built with React, Node.js, and Tailwind CSS. The project implements a modern UI with a focus on user experience and responsive design.

## Demo

- **Live Demo**: [[https://sugar-project.vercel.app](https://sugar-project.vercel.app/)]
- **GitHub Repository**: [[https://github.com/RiyasudhM19/SUGAR_Project.git](https://github.com/Riyasahu0419/SUGAR_Project)]

## Features

- User authentication system with phone number verification
- Responsive design with Tailwind CSS
- Interactive UI components
- Server-side implementation with Node.js

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js
- **Styling**: Tailwind CSS with custom gradient designs
- **Authentication**: Custom phone number verification

## Project Structure

SUGAR_Project/
├── Server/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── giftController.js
│   │   ├── profileController.js
│   │   └── userController.js
│   ├── middleware/
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Eye.js
│   │   ├── Foundation.js
│   │   ├── Gift.js
│   │   ├── Lip.js
│   │   ├── Nail.js
│   │   ├── New.js
│   │   ├── Play.js
│   │   ├── Skin.js
│   │   └── User.js
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── homeContent/
│   │   │   ├── Carousel.jsx
│   │   │   ├── EliteEdition.jsx
│   │   │   ├── NewLaunches.jsx
│   │   │   ├── SugarInsta.jsx
│   │   │   └── SugarPlay.jsx
│   │   └── NavBrands/
│   │       ├── Eye.jsx
│   │       ├── Foundation.jsx
│   │       ├── Gift.jsx
│   │       ├── Lip.jsx
│   │       ├── Nail.jsx
│   │       ├── New.jsx
│   │       ├── Offer.jsx
│   │       ├── Play.jsx
│   │       └── Skin.jsx
│   ├── WhatsappLogin.jsx
│   └── App.jsx
├── public/
├── package.json
├── README.md
└── tailwind.config.js


## Installation

1. Clone the repository:
```
git clone https://github.com/RiyasudhM19/SUGAR_Project.git
cd SUGAR_Project
```

# Install client dependencies
npm install

# Install server dependencies
```
cd Server
npm install
cd ..
```

### Set up environment variables:
```
MONGO_URL=mongodb+srv://username:password@cluster0.sample.mongodb.net/database_name
PORT=5000
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

```
## Start the development server:

# Start client
```
npm run dev
```
# Start server (in a separate terminal)
```
cd Server
npm start
```

# Usage
-After starting the application, you can access the UI through your browser at http://localhost:3000.
### The application allows users to:
-Log in using their phone number
-Browse through different product categories
-View product details
-Interact with various UI components like carousels

# API Endpoints
## Authentication
```

POST /api/auth/login - Login with phone number
POST /api/auth/verify - Verify OTP

```
# User

## Products
```
GET /api/products - Get all products
GET /api/products/:category - Get products by category
GET /api/products/:id - Get specific product details
```
## Cart
```
GET /api/cart - Get user's cart
POST /api/cart/add - Add item to cart
DELETE /api/cart/:itemId - Remove item from cart
```
# Cosmetic Categories
```
GET /api/eye - Get eye products
GET /api/lip - Get lip products
GET /api/skin - Get skin products
GET /api/nail - Get nail products
GET /api/foundation - Get foundation products
GET /api/new - Get new arrivals
GET /api/play - Get play products
GET /api/gifts - Get gift products
```
