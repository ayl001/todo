import axios from "axios";
import { useEffect, useState } from "react";

const useTasks=() => {
    const [tasks, setTasks] = useState([]); // État pour stocker les tâches
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
  return { tasks, handleAddTask, handleToggleTask, handleDeleteTask };
};
export default useTasks;
