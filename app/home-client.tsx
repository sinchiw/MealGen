"use client";

import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import GenerateButton from "../components/GenerateButton";
import RecipeList from "../components/RecipeList";
import { getRecipes } from "./actions/recipes";
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
      const data = await getRecipes(ingredients);
      setRecipes(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.blobTopLeft} aria-hidden="true" />
      <div className={styles.blobBottomRight} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.panel}>
          <h1 className={styles.title}>Recipe Generator</h1>

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

            {loading && <div className={styles.loading}>Loading recipes...</div>}
          </div>

          <RecipeList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}
