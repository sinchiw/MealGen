// components/RecipeCard.tsx
import React from "react";
import styles from "../styles/RecipeCard.module.css";

interface RecipeCardProps {
  title: string;
  image: string;
  usedIngredients: string[];
  missedIngredients: string[];
}

const RecipeCard = ({ title, image, usedIngredients, missedIngredients }: RecipeCardProps) => {
  return (
    <div className={styles.recipecard}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>
        ✅ {usedIngredients.join(", ")}
        {missedIngredients.length > 0 && <span> | ❌ {missedIngredients.join(", ")}</span>}
      </p>
    </div>
  );
};

export default RecipeCard;
