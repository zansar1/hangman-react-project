/* src/ToggleSwitch.tsx */
import "./ToggleSwitch.css"

type ToggleSwitchProps = {
  isChecked: boolean
  onToggle: () => void
}

export function ToggleSwitch({ isChecked, onToggle }: ToggleSwitchProps) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  )
}