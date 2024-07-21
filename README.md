# Workout Tracker

Welcome to the Workout Tracker application! This application allows users to track their workouts, endurance activities, and calorie intake. It provides a user-friendly interface for adding, viewing, editing, and deleting workout records.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration and login)
- Add, view, edit, and delete workouts
- Track endurance activities
- Monitor calorie intake
- Responsive design for both desktop and mobile devices

## Technologies Used

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, Mongoose, JWT, Bcryptjs
- **Database**: MongoDB
- **Deployment**: Render

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>=14.20.1)
- npm (>=6.14.15)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Christopher4113/Workout-Tracker.git
   cd Workout-Tracker
2. **Install Dependencies**:
    **Install the backend server**:
   cd server
   npm install
   **Install the frontend client**:
   cd client
   npm install
## Running the Application

1. **Start the backend server**:
   ```bash
   cd server
   npm start
2. **Start the frontend client**:
    ```bash
    cd client
    npm run dev

The frontend will start on http://localhost:3000.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `server` directory.

```bash
# MongoDB connection URI
MONGO_URI=<your_mongo_db_connection_string>

# Secret key for JWT
SECRET_KEY=<your_secret_key>

# Frontend URL
FRONTEND_URL=http://localhost:5173





## Deployment

This application is deployed on Render. Follow these steps to deploy your own version:

1. **Fork the repository** to your GitHub account.
2. **Create a new Web Service** on Render for the backend.
   - **Repository**: Connect to your forked repository.
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add the necessary environment variables as specified in the `.env` file.
3. **Create a new Static Site** on Render for the frontend.
   - **Repository**: Connect to your forked repository.
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `client/./dist`
   - **Environment Variables**: Add the necessary environment variables as specified in the `.env` file.

Make sure your `CORS` settings on the backend allow requests from the frontend URL.

## Contributing

Contributions are always welcome!

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-branch-name`
5. Submit a pull request.

Please make sure to update tests as appropriate.


  



