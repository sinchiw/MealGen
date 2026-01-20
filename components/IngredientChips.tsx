// components/IngredientChips.tsx
import React from "react";
import styles from "../styles/IngredientChips.module.css";

interface IngredientChipsProps {
  ingredients: string[];
  onRemoveIngredient: (ingredient: string) => void;
}

const IngredientChips = ({ ingredients, onRemoveIngredient }: IngredientChipsProps) => {
  return (
    <div className={styles.container}>
      {ingredients.map((ing) => (
        <div key={ing} className={styles.chip}>
          {ing} <button onClick={() => onRemoveIngredient(ing)}>✕</button>
        </div>
      ))}
    </div>
  );
};

export default IngredientChips;
