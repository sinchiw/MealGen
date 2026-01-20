"use client";

import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import IngredientChips from "../components/IngredientChips";
import GenerateButton from "../components/GenerateButton";
import RecipeList from "../components/RecipeList";
import { getRecipes } from "./actions/recipes";
import type { Recipe } from "../types";

export default function HomeClient() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const addIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
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
    <div style={{ padding: "2rem" }}>
      <h1>Recipe Generator</h1>

      <IngredientInput onAddIngredient={addIngredient} />
      <IngredientChips
        ingredients={ingredients}
        onRemoveIngredient={removeIngredient}
      />

      <GenerateButton
        onClick={generateRecipes}
        disabled={ingredients.length === 0 || loading}
      />

      {loading && <p>Loading recipes...</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
}
