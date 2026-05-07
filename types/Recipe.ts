// types/Recipe.ts
export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: string[];
  missedIngredients: string[];
  calories: number;
  readyInMinutes: number;
  difficulty: 1 | 2 | 3;
}
