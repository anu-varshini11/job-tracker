import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobs } from '../api';

function ViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobs = await getJobs();
        const singleJob = jobs.find((j) => j._id === id);
        setJob(singleJob);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  const statusColors = {
    Applied: '#3498db',
    Interview: '#f1c40f',
    Offer: '#2ecc71',
    Rejected: '#e74c3c',
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2>Job Details</h2>
      <p><strong>Company Name:</strong> {job.companyName}</p>
      <p><strong>Job Title:</strong> {job.jobTitle}</p>
      <p><strong>Application Date:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span 
          style={{ 
            backgroundColor: statusColors[job.status] || '#7f8c8d',
            color: '#fff',
            padding: '3px 8px',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          {job.status}
        </span>
      </p>
      <Link to="/"><button style={{ marginTop: '15px' }}>Back to Jobs</button></Link>
    </div>
  );
}

export default ViewJob;
