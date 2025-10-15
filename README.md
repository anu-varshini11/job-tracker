# Job Application Tracker (MERN Stack)

A full-stack MERN application to manage and track job applications with CRUD operations, status filtering, and detailed views.

## Features

- Add, Edit, Delete, and View job applications
- Filter jobs by status: Applied, Interview, Offer, Rejected
- Frontend and backend input validation
- Clean and responsive UI
- MongoDB Atlas integration for cloud database storage

## Tech Stack

- **Frontend:** React (functional components + hooks)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Styling:** CSS

## Project Structure

```bash
job-tracker/
├── backend/ # Node + Express backend
├── frontend/ # React frontend
└── README.md
```


## Setup Instructions (Local)

### Backend

1. Navigate to backend folder:
   ```bash
   cd backend
2. Install dependencies:
    ```bash
    npm install
3. Create .env file with:
    ```bash
    MONGO_URI=<your-mongodb-connection-string>
    PORT=5000
4. Start the server:
    ```bash
    node server.js

Server runs on http://localhost:5000

### Frontend
1. Navigate to frontend folder:
    ```bash
    cd frontend

2. Install dependencies:
    ```bash
    npm install

3. Start the frontend:
    ```bash
    npm start

Frontend runs on http://localhost:3000 and communicates with backend API.

### API Endpoints

```bash
GET /api/jobs — Fetch all jobs (supports optional ?status= filter)

POST /api/jobs — Add a new job

PUT /api/jobs/:id — Update an existing job

DELETE /api/jobs/:id — Delete a job

GET /api/jobs/:id — Fetch single job details
```

### Authentication
```bash
Sign Up: New users can create an account with a unique username and password.

Login: Existing users can log in and receive a JWT token for secure access.

Protected Routes: Only authenticated users can access their job applications.

User-specific Data: Each user can only see and manage their own job applications.

Password Security: Passwords are hashed using bcrypt before storing in the database.

JWT Expiration: Tokens expire after 1 hour for added security.
```

Author <br>
Anu Varshini M B