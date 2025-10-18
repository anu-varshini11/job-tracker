import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobs, deleteJob } from '../api';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || 'User';

  const fetchJobs = async (status) => {
    try {
      const query = status && status !== 'All' ? status : '';
      const data = await getJobs(query);
      setJobs(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        fetchJobs(filter);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  useEffect(() => {
    fetchJobs(filter);
  }, [filter]);

  const statusColor = (status) => {
    switch (status) {
      case 'Applied': return '#3498db';   // Blue
      case 'Interview': return '#e67e22'; // Orange
      case 'Offer': return '#2ecc71';     // Green
      case 'Rejected': return '#e74c3c';  // Red
      default: return '#7f8c8d';          // Grey
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="card">
      <h2 className="greeting">Hi, {name}!</h2>
      <h3>Job Applications</h3>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <button className="logout" onClick={handleLogout}>Logout</button>
        <Link to="/add"><button>Add New Job</button></Link>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Filter by Status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {jobs.map((job) => (
            <div key={job._id} className="card" style={{ width: 'calc(50% - 15px)' }}>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Title:</strong> {job.jobTitle}</p>
              <p><strong>Date:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong> 
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  marginLeft: '5px',
                  borderRadius: '12px',
                  backgroundColor: statusColor(job.status),
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}>
                  {job.status}
                </span>
              </p>
              <div style={{ marginTop: '10px' }}>
                <Link to={`/view/${job._id}`}><button>View</button></Link>
                <Link to={`/edit/${job._id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(job._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
