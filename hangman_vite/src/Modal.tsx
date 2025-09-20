/* src/Modal.tsx */
import { motion } from "framer-motion";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// Animation variants for the backdrop
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

// Animation variants for the modal content
const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { delay: 0.2, type: "spring", stiffness: 120 },
  },
} as const; 

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        // You also need to add initial, animate, and exit here for the modal itself
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}