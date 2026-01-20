import React from "react";
import RecipeCard from "./RecipeCard";
import styles from "../styles/RecipeList.module.css";

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: string[];
  missedIngredients: string[];
}

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (!recipes.length) return null;

  return (
    <div className={styles.grid}>
      {recipes.map((r) => (
        <RecipeCard key={r.id} {...r} />
      ))}
    </div>
  );
}
