require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRouter);

connectDB();

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
