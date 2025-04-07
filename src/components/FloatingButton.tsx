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
        {/* Shadow waves with optimized animations */}
        <div className="shadow-wave wave1"></div>
        <div className="shadow-wave wave2"></div>
        <div className="shadow-wave wave3"></div>

        <motion.button
          className="floating-button"
          animate={{
            y: [0, -8, 0], // Reduced movement for subtler effect
          }}
          transition={{
            duration: 3, // Slowed down to avoid competing with pulse
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            // Using a different timing to avoid synchronization with pulse
            repeatDelay: 0.2,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 15px 25px -3px rgba(59, 130, 246, 0.35), 0 8px 10px -2px rgba(59, 130, 246, 0.25)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          style={{
            transformOrigin: "center",
          }}
          onClick={onClick}
        >
          <MdOutlineViewInAr className="ar-icon size" />
          <span className="button-text">{label}</span>
        </motion.button>
      </div>
    </div>
  );
}
