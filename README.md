
# JWT Authentication and Authorization

This repository demonstrates a simple implementation of JWT (JSON Web Token) authentication and authorization in a Node.js application using Express. The application includes user registration, login, and protected routes that require authentication.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Usage](#usage)
5. [Endpoints](#endpoints)
6. [Middleware](#middleware)
7. [Common Issues](#common-issues)
8. [License](#license)

## Overview

This project is designed to provide a secure and efficient method of user authentication and authorization using JWTs. It includes:

- User Registration
- User Login
- Token Verification Middleware
- Role-based Authorization

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your database:**

   Ensure you have a Prisma-compatible database set up. Update your Prisma schema and run migrations.

   ```bash
   npx prisma migrate dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
```

- `DATABASE_URL`: The connection string for your database.
- `JWT_SECRET_KEY`: A secret key for signing JWTs. This should be a secure and random string.
- `NODE_ENV`: The environment in which the application is running (e.g., `development`, `production`).

## Usage

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the API via** `http://localhost:3000`.

## Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  - Registers a new user.
  - Request body should include `username`, `email`, and `password`.

- **Login**: `POST /api/auth/login`
  - Authenticates a user and returns a JWT token.
  - Request body should include `username` and `password`.

- **Logout**: `POST /api/auth/logout`
  - Logs out the user by clearing the token cookie.

### User Management

- **Get All Users**: `GET /api/users`
  - Returns a list of all users. Requires authentication.

- **Get User by ID**: `GET /api/users/:id`
  - Returns details of a specific user. Requires authentication.

- **Update User**: `PUT /api/users/:id`
  - Updates user information. Requires authentication and ownership.

- **Delete User**: `DELETE /api/users/:id`
  - Deletes a user. Requires authentication and ownership.

### Protected Routes

- **Should Be Logged In**: `GET /api/protected/logged-in`
  - Checks if the user is authenticated.
  - Requires valid JWT token.

- **Should Be Admin**: `GET /api/protected/admin`
  - Checks if the user is authenticated and an admin.
  - Requires valid JWT token with admin privileges.

## Middleware

### Token Verification

- **verifyToken**
  - Middleware to verify the presence and validity of a JWT token.
  - Attaches `userId` from the token payload to the request object.

### Role-based Authorization

- **shouldBeAdmin**
  - Middleware to verify if the authenticated user has admin privileges.
  - Checks the `isAdmin` flag in the token payload.

## Common Issues

### Token and Request ID Mismatch

- Ensure the token is being generated correctly with the user ID.
- Verify that the token is being decoded properly and the `userId` is correctly attached to the request object.
- Check middleware execution order to ensure proper token verification before accessing protected routes.
- Debug by adding logging statements to track the flow of user IDs and tokens.
- Clear cookies on logout to avoid stale tokens.

## License


By following the above documentation, you should have a comprehensive guide on how to set up and use JWT authentication and authorization in your Node.js application.
