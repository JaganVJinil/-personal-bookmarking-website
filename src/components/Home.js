import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">WELCOME TO BOOKMARKING WEBSITE</h1>
      <p className="lead">Organize and manage your favorite links with ease!</p>
      <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/login')}>
        Get Started
      </button>
    </div>
  );
};

export default Home;
