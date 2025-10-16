require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const app = express();

// CORS setup — allow frontend (Netlify) to access backend
const allowedOrigins = [
  'http://localhost:3000', // local development
  'https://jobtrackergidy.netlify.app', // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
