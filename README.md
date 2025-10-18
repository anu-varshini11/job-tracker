# Job Application Tracker (MERN Stack)

A full-stack MERN (MongoDB, Express, React, Node.js) application that helps users **track and manage job applications** efficiently — with secure authentication, CRUD operations, and filtering options.

---

## Features

**Add, Edit, Delete, and View** job applications  
**Filter by Status** — Applied / Interview / Offer / Rejected  
**Frontend + Backend validation** for all inputs  
**JWT Authentication** (Sign Up & Login)  
**User-specific data** — each user only sees their own jobs  
**Responsive UI** with personalized greeting  
**Clean folder structure** and production-ready code  

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Functional Components + Hooks) |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (Mongoose ORM) |
| **Auth** | JWT + bcrypt |
| **Styling** | CSS |

---

## Project Structure

```bash
job-tracker/
├── backend/        # Node.js + Express API
│   ├── models/     # Mongoose Schemas
│   ├── routes/     # API Routes
│   ├── controllers/# CRUD logic
│   ├── server.js   # Entry point
│   └── .env        # Environment variables
│
├── frontend/       # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.js
│   └── package.json
│
└── README.md
```
## Setup Instructions (Run Locally)
## Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:

```bash
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<any-random-secret-key>
PORT=5000
```

4. Run the backend server:

```bash
node server.js
```
Server runs on http://localhost:5000

## Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

App runs on http://localhost:3000

## API Endpoints

| **Method** | **Endpoint**        | **Description** |
|-------------|--------------------|-----------------|
| **POST**    | `/api/auth/signup` | Register a new user |
| **POST**    | `/api/auth/login`  | Authenticate existing user |
| **GET**     | `/api/jobs`        | Get all jobs (optional `?status=` filter) |
| **POST**    | `/api/jobs`        | Add a new job |
| **GET**     | `/api/jobs/:id`    | Get details of a specific job |
| **PUT**     | `/api/jobs/:id`    | Update an existing job |
| **DELETE**  | `/api/jobs/:id`    | Delete a job |

## Authentication Overview

Sign Up: Users register with a unique username & password.

Login: On login, users receive a JWT token stored in localStorage.

Protected Routes: API endpoints require valid tokens.

Password Security: All passwords are hashed using bcrypt.

JWT Expiration: Tokens expire after 1 hour for added safety.

## Validation Rules

| **Field** | **Rule** |
|------------|----------|
| **Company Name** | Required, minimum 3 characters |
| **Job Title** | Required |
| **Application Date** | Required, cannot be a future date |
| **Status** | Must be one of: Applied, Interview, Offer, Rejected |

## Optional Enhancements

Status-based filtering implemented

Improved card-based UI with greeting

Ready for deployment on Netlify + Render

Author

Anu Varshini M B