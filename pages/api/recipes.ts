import type { NextApiRequest, NextApiResponse } from "next";
import { getDifficulty } from "../../app/Utility/getDifficulty";
import type { Recipe } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ingredients = req.query.ingredients as string;

  if (!ingredients) {
    return res.status(400).json({ message: "Ingredients are required" });
  }

  try {
    const searchUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=9&ranking=1&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const searchRes = await fetch(searchUrl);
    const recipes = await searchRes.json();

    const detailedRecipes: Recipe[] = await Promise.all(
      recipes.map(async (recipe: any) => {
        const detailUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`;

        const detailRes = await fetch(detailUrl);
        const detail = await detailRes.json();

        const calories = detail.nutrition?.nutrients?.find(
          (nutrient: any) => nutrient.name === "Calories",
        )?.amount;

        const usedIngredients = recipe.usedIngredients.map(
          (item: any) => item.name,
        );
        const missedIngredients = recipe.missedIngredients.map(
          (item: any) => item.name,
        );

        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          usedIngredients,
          missedIngredients,
          calories: Math.round(calories || 0),
          readyInMinutes: detail.readyInMinutes || 0,
          difficulty: getDifficulty(
            detail.readyInMinutes || 0,
            usedIngredients.length + missedIngredients.length,
          ),
        };
      }),
    );

    return res.status(200).json(detailedRecipes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
}
