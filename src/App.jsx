import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from "./components/AddTodoForm";
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('toutes');
  const [theme, setTheme] = useState('light'); // État pour le thème

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        const tasksWithPriority = response.data.map(task => ({
          ...task,
          priority: task.priority || 'basse' // Attribuer une priorité par défaut si elle n'existe pas
        }));
        setTasks(tasksWithPriority);
      })
      .catch((error) => console.error("Erreur de récupération des tâches :", error));
  }, []);

  const handleAddTask = (title, priority) => {
    const newTask = { title, priority, completed: false }; // Création de la nouvelle tâche
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => setTasks([...tasks, response.data])) // Mise à jour de l'état
      .catch((error) => console.error("Erreur lors de l'ajout d'une tâche : ", error));
  };

  const handleToggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    const updateTask = { ...task, completed: !task.completed };
    axios
      .put(`http://localhost:5000/tasks/${id}`, updateTask)
      .then(() => setTasks(tasks.map((t) => (t.id === id ? updateTask : t))))
      .catch((error) => console.error("Erreur lors de la mise à jour de la tâche : ", error));
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch((error) => console.error("Erreur lors de la suppresion", error));
  };

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