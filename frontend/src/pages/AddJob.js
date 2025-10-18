import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api';

function AddJob() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (companyName.length < 3) {
      setError('Company Name must be at least 3 characters');
      return;
    }
    if (!jobTitle || !applicationDate) {
      setError('Job Title and Application Date are required');
      return;
    }
    if (new Date(applicationDate) > new Date()) {
      setError('Application Date cannot be in the future');
      return;
    }

    try {
      await createJob({ companyName, jobTitle, applicationDate, status });
      navigate('/');
    } catch {
      setError('Failed to add job. Try again.');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2>Add New Job</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        <div>
          <label>Application Date:</label>
          <input type="date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
