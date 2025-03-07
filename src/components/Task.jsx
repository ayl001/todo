import React from 'react';

const Task = ({ task, onToggle, onDelete }) => {
  const getPriorityBackgroundColor = (priority) => {
    switch (priority) {
      case 'haute':
        return 'yellow';
      case 'moyenne':
        return 'blue';
      case 'basse':
        return 'green';
      default:
        return 'white';
    }
  };

  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(task.id)}
      >
        {task.title} - <span style={{ backgroundColor: getPriorityBackgroundColor(task.priority), padding: '2px 5px', borderRadius: '3px', color: '#000' }}>Priorité : {task.priority}</span>
      </span>
      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </li>
  );
};

export default Task;