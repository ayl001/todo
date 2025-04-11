import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import '../App.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const ToDoPage = ({ theme }) => {
  const { tasks, handleAddTask, handleToggleTask, handleDeleteTask } = useTasks();
  const [filterPriority, setFilterPriority] = useState('toutes');

  const nombreRestantes = tasks.filter(task => !task.completed).length;

  const filteredTasks = filterPriority === 'toutes'
    ? tasks
    : tasks.filter(task => task.priority === filterPriority);

  return (
    <div className={theme}>
      <h1>ToDo List</h1>
      <p>Il reste {nombreRestantes} tâches à accomplir</p>
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

export default ToDoPage;