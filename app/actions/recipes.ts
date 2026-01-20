"use server";

import type { Recipe } from "../../types";

export async function getRecipes(
  ingredients: string[]
): Promise<Recipe[]> {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const API_KEY = process.env.SPOONACULAR_API_KEY;

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
    ","
  )}&number=10&ranking=1&apiKey=${API_KEY}`;

  const res = await fetch(url, {
    cache: "no-store", // important for dynamic user input
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();

  return data.map((r: any) => ({
    id: r.id,
    title: r.title,
    image: r.image,
    usedIngredients: r.usedIngredients.map((i: any) => i.name),
    missedIngredients: r.missedIngredients.map((i: any) => i.name),
  }));
}
