const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { body, validationResult } = require('express-validator');

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
router.post('/', validateJob, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all jobs (optional filtering by status ?status=Interview)
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  try {
    const jobs = await Job.find(filter).sort({ applicationDate: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update job
router.put('/:id', validateJob, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
