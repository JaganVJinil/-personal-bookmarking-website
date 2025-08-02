import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bookmarklogin.webp'; // Adjust path as needed


const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
    <div className="container text-center mt-5">
      <h1 className="display-4"><b>WELCOME TO BOOKMARKING WEBSITE</b></h1>
      <p className="lead"><b>Organize and manage your favorite links with ease!</b></p>
      <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/login')}>
        Get Started
      </button>
    </div>
    </div>
  );
};

export default Home;
