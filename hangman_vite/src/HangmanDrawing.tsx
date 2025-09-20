/* src/HangmanDrawing.tsx */
import { motion } from "framer-motion"

const partVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}

const Head = () => (
  <motion.div
    style={{ width: "50px", height: "50px", borderRadius: "100%", border: "10px solid var(--border-color)", position: "absolute", top: "50px", right: "-30px" }}
    variants={partVariants} initial="hidden" animate="visible"
  />
)

const Body = () => (
  <motion.div
    style={{ width: "10px", height: "100px", background: "var(--border-color)", position: "absolute", top: "120px", right: 0 }}
    variants={partVariants} initial="hidden" animate="visible"
  />
)

const RightArm = () => (
  <motion.div
    style={{ width: "100px", height: "10px", background: "var(--border-color)", position: "absolute", top: "150px", right: "-100px", rotate: "-30deg", transformOrigin: "left bottom" }}
    variants={partVariants} initial="hidden" animate="visible"
  />
)

const LeftArm = () => (
  <motion.div
    style={{ width: "100px", height: "10px", background: "var(--border-color)", position: "absolute", top: "150px", right: "10px", rotate: "30deg", transformOrigin: "right bottom" }}
    variants={partVariants} initial="hidden" animate="visible"
  />
)

const RightLeg = () => (
  <motion.div
    style={{ width: "100px", height: "10px", background: "var(--border-color)", position: "absolute", top: "210px", right: "-90px", rotate: "60deg", transformOrigin: "left bottom" }}
    variants={partVariants} initial="hidden" animate="visible"
  />
)

const LeftLeg = () => (
  <motion.div
    style={{ width: "100px", height: "10px", background: "var(--border-color)", position: "absolute", top: "210px", right: 0, rotate: "-60deg", transformOrigin: "right bottom" }}
    variants={partVariants} initial="hidden" animate="visible"
  />
)

const BODY_PARTS = [<Head />, <Body />, <RightArm />, <LeftArm />, <RightLeg />, <LeftLeg />]

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div style={{ height: "50px", width: "10px", background: "var(--border-color)", position: "absolute", top: 0, right: 0 }} />
      <div style={{ height: "10px", width: "200px", background: "var(--border-color)", marginLeft: "120px" }} />
      <div style={{ height: "400px", width: "10px", background: "var(--border-color)", marginLeft: "120px" }} />
      <div style={{ height: "10px", width: "250px", background: "var(--border-color)" }} />
    </div>
  )
}