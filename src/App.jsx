// Importer les dépendances nécessaires

import {React, useState } from 'react';
import useTasks from './hooks/useTasks';
import './App.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

const App = () => {
const { tasks, handleAddTask, handleToggleTask, handleDeleteTask } = useTasks();
  const [filterPriority, setFilterPriority] = useState('toutes');
  const [theme, setTheme] = useState('light'); // État pour le thème

  

  const nombreRestantes = tasks.filter(task => !task.completed).length;

  const filteredTasks = filterPriority === 'toutes'
    ? tasks
    : tasks.filter(task => task.priority === filterPriority);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme}>
      <h1>ToDo List</h1>
      <p>Il reste {nombreRestantes} tâches à accomplir</p>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
      </button>
      <AddTodoForm onAddTask={handleAddTask} />
      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
        <option value="toutes">Toutes les priorités</option>
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
      </select>
      <TodoList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;