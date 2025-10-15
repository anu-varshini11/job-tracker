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

job-tracker/
├── backend/ # Node + Express backend
├── frontend/ # React frontend
└── README.md


## Setup Instructions (Local)

### Backend

1. Navigate to backend folder:
   ```bash
   cd backend
2. Install dependencies:
    npm install
3. Create .env file with:
    MONGO_URI=<your-mongodb-connection-string>
    PORT=5000
4. Start the server:
    node server.js

Server runs on http://localhost:5000

### Frontend
1. Navigate to frontend folder:
    cd frontend

2. Install dependencies:
    npm install

3. Start the frontend:
    npm start

Frontend runs on http://localhost:3000 and communicates with backend API.

API Endpoints

GET /api/jobs — Fetch all jobs (supports optional ?status= filter)

POST /api/jobs — Add a new job

PUT /api/jobs/:id — Update an existing job

DELETE /api/jobs/:id — Delete a job

GET /api/jobs/:id — Fetch single job details

Author
Anu Varshini M B