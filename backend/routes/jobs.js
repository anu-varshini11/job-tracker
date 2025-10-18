const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { body, validationResult } = require('express-validator');
const protect = require('./auth'); // ✅ updated path

// Validation middleware
const validateJob = [
  body('companyName').isString().isLength({ min: 3 }).withMessage('Company name must be at least 3 characters'),
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('applicationDate').isISO8601().toDate().withMessage('Valid application date required'),
  body('status').isIn(['Applied', 'Interview', 'Offer', 'Rejected']).withMessage('Invalid status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    if (new Date(req.body.applicationDate) > new Date()) {
      return res.status(400).json({ errors: [{ msg: 'Application date cannot be in the future' }] });
    }
    next();
  }
];

// Create a job
router.post('/', protect, validateJob, async (req, res) => {
  console.log('REQ USER:', req.user);
  console.log('REQ BODY:', req.body);
  try {
    const job = new Job({ ...req.body, userId: req.user._id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error('Add job error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all jobs (with optional filtering)
router.get('/', protect, async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    const jobs = await Job.find(filter).sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single job
router.get('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user._id });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update job
router.put('/:id', protect, validateJob, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete job
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
