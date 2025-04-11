import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

test("Affiche correctement le texte", () => {
  render(<Home theme="light" />);
  const textElement = screen.getByText(/Bienvenue à votre liste de tâches/);
  expect(textElement).toBeInTheDocument();
});