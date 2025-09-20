/* src/Settings.tsx */
import { ToggleSwitch } from "./ToggleSwitch";
import "./Settings.css";

type SettingsProps = {
  theme: string;
  onThemeChange: () => void;
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  onResetScore: () => void;
};

export function Settings({
  theme,
  onThemeChange,
  difficulty,
  onDifficultyChange,
  onResetScore,
}: SettingsProps) {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-row">
        {/* UPDATED: Added className */}
        <span className="settings-label">Theme</span>
        <ToggleSwitch isChecked={theme === "dark"} onToggle={onThemeChange} />
      </div>
      <div className="settings-row stacked">
        {/* UPDATED: Added className */}
        <span className="settings-label">Difficulty</span>
        <div className="difficulty-buttons">
          <button
            className={difficulty === "easy" ? "selected" : ""}
            onClick={() => onDifficultyChange("easy")}
          >
            Easy
          </button>
          <button
            className={difficulty === "medium" ? "selected" : ""}
            onClick={() => onDifficultyChange("medium")}
          >
            Medium
          </button>
          <button
            className={difficulty === "hard" ? "selected" : ""}
            onClick={() => onDifficultyChange("hard")}
          >
            Hard
          </button>
        </div>
      </div>
      <button className="reset-button" onClick={onResetScore}>
        Reset Score
      </button>
    </div>
  );
}