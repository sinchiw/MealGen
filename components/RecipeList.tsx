// components/RecipeList.tsx
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

const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className={styles.recipeList}>
      {recipes.map((r) => (
        <RecipeCard key={r.id} {...r} />
      ))}
    </div>
  );
};

export default RecipeList;
