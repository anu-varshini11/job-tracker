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
        const jobs = await getJobs(); // get all jobs
        const singleJob = jobs.find((j) => j._id === id);
        setJob(singleJob);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch job:', err);
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h2>Job Details</h2>
      <p><strong>Company Name:</strong> {job.companyName}</p>
      <p><strong>Job Title:</strong> {job.jobTitle}</p>
      <p><strong>Application Date:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <Link to="/"><button>Back to Jobs</button></Link>
    </div>
  );
}

export default ViewJob;
