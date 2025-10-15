import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import ViewJob from './pages/ViewJob';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="/view/:id" element={<ViewJob />} />
      </Routes>
    </Router>
  );
}

export default App;
