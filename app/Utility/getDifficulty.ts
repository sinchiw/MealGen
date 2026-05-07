export function getDifficulty(
  readyInMinutes: number,
  ingredientCount: number,
): 1 | 2 | 3 {
  if (readyInMinutes <= 25 && ingredientCount <= 6) {
    return 1;
  }

  if (readyInMinutes <= 50 && ingredientCount <= 12) {
    return 2;
  }

  return 3;
}
