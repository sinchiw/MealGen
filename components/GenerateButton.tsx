// components/GenerateButton.tsx
import React from "react";
import styles from "../styles/GenerateButton.module.css";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GenerateButton = ({ onClick, disabled }: GenerateButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      Generate Dishes
    </button>
  );
};

export default GenerateButton;
