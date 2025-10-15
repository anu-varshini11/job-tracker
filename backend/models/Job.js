const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyName: { type: String, required: true, minlength: 3 },
  jobTitle: { type: String, required: true },
  applicationDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
