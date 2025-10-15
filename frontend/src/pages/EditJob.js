import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobs, updateJob } from '../api';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState('Applied');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobs = await getJobs();
        const job = jobs.find((j) => j._id === id);
        if (job) {
          setCompanyName(job.companyName);
          setJobTitle(job.jobTitle);
          setApplicationDate(job.applicationDate.split('T')[0]); // format yyyy-mm-dd
          setStatus(job.status);
        }
      } catch (err) {
        console.error('Failed to fetch job:', err);
      }
    };
    fetchJob();
  }, [id]);

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

    setError('');
    try {
      await updateJob(id, { companyName, jobTitle, applicationDate, status });
      navigate('/'); // redirect to home after update
    } catch (err) {
      setError('Failed to update job. Try again.');
    }
  };

  return (
    <div>
      <h2>Edit Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Application Date:</label>
          <input
            type="date"
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
          />
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
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;
