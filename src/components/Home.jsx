import React from 'react';
import '../App.css';

const Home = ({ theme }) => {
  return (
    <div className={theme}>
      <h1>Bienvenue à votre liste de tâches</h1>
    </div>
  );
};

export default Home;