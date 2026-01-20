import React from "react";
import styles from "../styles/RecipeCard.module.css";

interface RecipeCardProps {
  title: string;
  image: string;
  usedIngredients: string[];
  missedIngredients: string[];
}

function IngredientPill({
  label,
  variant,
}: {
  label: string;
  variant: "good" | "bad";
}) {
  return (
    <span className={`${styles.pill} ${variant === "good" ? styles.good : styles.bad}`}>
      <span className={styles.pillIcon}>{variant === "good" ? "✓" : "×"}</span>
      {label}
    </span>
  );
}

export default function RecipeCard({
  title,
  image,
  usedIngredients,
  missedIngredients,
}: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <img className={styles.img} src={image} alt={title} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{title}</h3>

        <div className={styles.pills}>
          {usedIngredients.slice(0, 3).map((ing) => (
            <IngredientPill key={`u-${ing}`} label={ing} variant="good" />
          ))}
          {missedIngredients.slice(0, 3).map((ing) => (
            <IngredientPill key={`m-${ing}`} label={ing} variant="bad" />
          ))}
        </div>
      </div>
    </div>
  );
}
