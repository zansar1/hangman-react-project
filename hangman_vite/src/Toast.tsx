/* src/Toast.tsx */
import { motion } from "framer-motion";
import "./Toast.css";

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <motion.div
      className="toast-container"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {message}
    </motion.div>
  );
}