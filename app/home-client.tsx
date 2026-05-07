"use client";

import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import GenerateButton from "../components/GenerateButton";
import RecipeList from "../components/RecipeList";

import type { Recipe } from "../types";
import styles from "../styles/HomeClient.module.css";

export default function HomeClient() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const addIngredient = (ingredient: string) => {
    const next = ingredient.trim();
    if (!next) return;

    const normalized = next.toLowerCase();
    const exists = ingredients.some((i) => i.toLowerCase() === normalized);
    if (!exists) setIngredients([...ingredients, next]);
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);

    try {
      const query = encodeURIComponent(ingredients.join(","));

      const res = await fetch(`/api/recipes?ingredients=${query}`);

      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.panel}>
          <h1 className={styles.title}>Recipe Generator</h1>
          <h2 className={styles.subtitle}>
            Type an ingredient and press Enter to add it to your list
          </h2>

          <div className={styles.controls}>
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />

            <GenerateButton
              onClick={generateRecipes}
              disabled={ingredients.length === 0 || loading}
            />

            {loading && (
              <div className={styles.loading}>Loading recipes...</div>
            )}
          </div>

          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}
