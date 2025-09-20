/* src/Game.tsx */
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import { Modal } from "./Modal";
import { Settings } from "./Settings";
import { supabase } from "./supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useToast } from "./ToastContext"; // NEW: Import the useToast hook

type GameProps = {
  user: User;
};

export function Game({ user }: GameProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("HANGMAN_THEME") || "dark";
  });
  const [difficulty, setDifficulty] = useState("easy");
  const [wordToGuess, setWordToGuess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  
  // NEW: Get the showToast function from our context
  const { showToast } = useToast();
  
  // REMOVED: All toast-related useState and useEffect hooks are gone from this file.

  const handleLogout = async () => {
    // ... (handleLogout function is unchanged)
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred during logout."
      );
    }
  };

  const fetchWord = useCallback(async (difficultyToFetch: string) => {
    // ... (fetchWord function is unchanged)
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.datamuse.com/words?rel_trg=software&max=100"
      );
      if (!res.ok) throw new Error("Failed to fetch words.");
      const words: { word: string }[] = await res.json();
      const wordList = words
        .map((item) => item.word.toLowerCase())
        .filter((w) => /^[a-z]+$/.test(w));
      const filteredByDifficulty = wordList.filter((w) => {
        if (difficultyToFetch === "easy") return w.length <= 5;
        if (difficultyToFetch === "medium") return w.length > 5 && w.length <= 8;
        return w.length > 8;
      });
      if (filteredByDifficulty.length === 0)
        throw new Error(`No words found for ${difficultyToFetch} difficulty.`);
      const randomWord =
        filteredByDifficulty[
          Math.floor(Math.random() * filteredByDifficulty.length)
        ];
      setWordToGuess(randomWord);
      setGuessedLetters([]);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // ... (getProfileAndFirstWord useEffect is unchanged)
    const getProfileAndFirstWord = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("wins, losses")
        .eq("id", user.id)
        .single();
      if (error) {
        console.warn(error);
      } else if (data) {
        setWins(data.wins);
        setLosses(data.losses);
      }
      fetchWord(difficulty);
    };
    getProfileAndFirstWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner =
    wordToGuess !== "" &&
    wordToGuess.split("").every((letter) => guessedLetters.includes(letter));
  const isGameOver = isWinner || isLoser;

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("HANGMAN_THEME", theme);
  }, [theme]);

  useEffect(() => {
    // ... (updateScore useEffect is unchanged)
    const updateScore = () => {
      if (isWinner) {
        setWins((currentWins) => {
          const newWins = currentWins + 1;
          supabase
            .from("profiles")
            .update({ wins: newWins })
            .eq("id", user.id)
            .then();
          return newWins;
        });
      }
      if (isLoser) {
        setLosses((currentLosses) => {
          const newLosses = currentLosses + 1;
          supabase
            .from("profiles")
            .update({ losses: newLosses })
            .eq("id", user.id)
            .then();
          return newLosses;
        });
      }
    };
    if (isGameOver) {
      updateScore();
    }
  }, [isWinner, isLoser, user.id]);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isGameOver) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isGameOver]
  );
  
  const startNewGame = useCallback(() => {
    fetchWord(difficulty);
  }, [fetchWord, difficulty]);
  
  // UPDATED: resetScore now calls the global showToast function
  const resetScore = async () => {
    await supabase.from("profiles").update({ wins: 0, losses: 0 }).eq("id", user.id);
    setWins(0); // Also reset local state for immediate UI update
    setLosses(0);
    showToast("Score has been reset!");
  };
  
  useEffect(() => {
    // ... (keypress useEffects are unchanged)
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (isGameOver || !key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [guessedLetters, isGameOver]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && isGameOver) {
        e.preventDefault();
        startNewGame();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [isGameOver, startNewGame]);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem", fontSize: "1.1rem" }}>
          <span>Wins: {wins}</span>
          <span>Losses: {losses}</span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <motion.button
            className="header-btn"
            onClick={handleLogout}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
          <motion.button
            className="header-btn"
            onClick={() => setIsSettingsOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            Settings
          </motion.button>
        </div>
      </div>
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
          minHeight: "6rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {isWinner && "Winner!"}
        {isLoser && "Nice Try!"}
        {isGameOver && (
          <motion.button
            className="primary-action-btn"
            onClick={startNewGame}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        )}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isGameOver}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      
      <AnimatePresence>
        {isSettingsOpen && (
          <Modal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          >
            <Settings
              theme={theme}
              onThemeChange={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              onResetScore={resetScore}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}