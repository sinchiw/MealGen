import React, { useMemo, useState, KeyboardEvent } from "react";
import styles from "../styles/IngredientInput.module.css";

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
}

export default function IngredientInput({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
}: IngredientInputProps) {
  const [input, setInput] = useState("");

  const placeholder = useMemo(() => {
    return ingredients.length ? "" : "Type an ingredient and press Enter";
  }, [ingredients.length]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.trim();
      if (!value) return;
      onAddIngredient(value);
      setInput("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.left}>
          {ingredients.map((ing) => (
            <span key={ing} className={styles.chip}>
              {ing}
              <button
                type="button"
                className={styles.chipX}
                onClick={() => onRemoveIngredient(ing)}
                aria-label={`Remove ${ing}`}
              >
                ×
              </button>
            </span>
          ))}

          <input
            className={styles.input}
            value={input}
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
          />
        </div>


      </div>
    </div>
  );
}
