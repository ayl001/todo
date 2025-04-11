import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import ToDoPage from './components/ToDoPage';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
      <div className={`app ${theme}`}>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/todolist" className={({ isActive }) => (isActive ? 'active' : '')}>
                ToDo List
              </NavLink>
            </li>
          </ul>
        </nav>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
        </button>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/todolist" element={<ToDoPage theme={theme} />} />
        </Routes>
      </div>
    
  );
};

export default App;