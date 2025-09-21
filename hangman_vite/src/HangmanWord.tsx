/* src/HangmanWord.tsx */
import { motion } from "framer-motion";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        // UPDATED: This font size is now responsive!
        fontSize: "clamp(1.5rem, 10vw, 6rem)",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{
            borderBottom: ".1em solid var(--border-color)",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1em",
          }}
          key={index}
        >
          <motion.span
            style={{
              color:
                !guessedLetters.includes(letter) && reveal
                  ? "red"
                  : "var(--text-color)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: guessedLetters.includes(letter) || reveal ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </div>
  );
}