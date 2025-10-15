import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobs, deleteJob } from '../api';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const fetchJobs = async (status) => {
    try {
      const query = status && status !== 'All' ? status : '';
      const data = await getJobs(query);
      setJobs(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        fetchJobs(filter);
      } catch (err) {
        console.error('Failed to delete job:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchJobs(filter);
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2>Job Applications</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/add"><button>Add New Job</button></Link>

      <div style={{ margin: '10px 0' }}>
        <label>Filter by Status: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.companyName}</td>
                <td>{job.jobTitle}</td>
                <td>{new Date(job.applicationDate).toLocaleDateString()}</td>
                <td>{job.status}</td>
                <td>
                  <Link to={`/view/${job._id}`}><button>View</button></Link>
                  <Link to={`/edit/${job._id}`}><button>Edit</button></Link>
                  <button onClick={() => handleDelete(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
