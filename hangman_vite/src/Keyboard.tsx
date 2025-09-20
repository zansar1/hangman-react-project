/* src/Keyboard.tsx */
import styles from "./Keyboard.module.css";

const KEYS_ROW1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const KEYS_ROW2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const KEYS_ROW3 = ["z", "x", "c", "v", "b", "n", "m"];
const ALL_KEYS = [KEYS_ROW1, KEYS_ROW2, KEYS_ROW3];

type KeyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled?: boolean;
};

export function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div className={styles.keyboardContainer}>
      {ALL_KEYS.map((row, index) => (
        <div className={styles.keyboardRow} key={index}>
          {row.map((key) => {
            const isActive = activeLetters.includes(key);
            const isInactive = inactiveLetters.includes(key);
            return (
              <button
                onClick={() => addGuessedLetter(key)}
                className={`${styles.btn} ${isActive ? styles.active : ""} ${
                  isInactive ? styles.inactive : ""
                }`}
                disabled={isInactive || isActive || disabled}
                key={key}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}