"use client";
import { motion } from "framer-motion";
import { MdOutlineViewInAr } from "react-icons/md";
import "./floating-button.css";

interface FloatingButtonProps {
  onClick: () => void;
  label: string;
}

export default function FloatingButton({
  onClick,
  label,
}: FloatingButtonProps) {
  return (
    <div className="container">
      <div className="button-wrapper">
        <motion.button
          className="floating-button"
          animate={{
            y: [0, -8, 0], // Subtle floating effect
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatDelay: 0.2,
          }}
          initial={{ scale: 1 }}
          style={{
            transformOrigin: "center",
          }}
          onClick={onClick}
        >
          <MdOutlineViewInAr className="ar-icon size" aria-hidden="true" />
          <span className="button-text">{label}</span>
        </motion.button>
      </div>
    </div>
  );
}
