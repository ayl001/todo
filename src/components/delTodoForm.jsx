import React, { useState } from "react";

const DelTodoForm = ({ onDelTask }) => {
  const [id, setId] = useState(0); // Etat du champ input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === 0) return; // On ne supprime pas la tâche 0
    onDelTask(id);
    setId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="Donner l'id de la tâche à supprimer"
      />
      <button type="submit">Supprimer</button>
    </form>
  );
};

export default DelTodoForm;