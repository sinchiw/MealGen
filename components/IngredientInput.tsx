// components/IngredientInput.tsx
import React, { useState, KeyboardEvent } from "react";
import styles from "../styles/IngredientInput.module.css";


interface IngredienInputProps {
  onAddIngredient: (ingredient: string) => void;
}

const IngredientInput = ({ onAddIngredient }: IngredienInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onAddIngredient(input.trim());
      setInput("");
    }
  };

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Type an ingredient and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default IngredientInput;
