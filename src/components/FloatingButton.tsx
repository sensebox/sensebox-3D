"use client";
import { motion } from "framer-motion";
import "./floating-button.css";
// Option 1: React Icons (enthält viele Icon-Bibliotheken)
import { MdOutlineViewInAr } from "react-icons/md"; // Material Design Icons
// Option 2: Alternative Icons aus React Icons
// import { GiAugmentation } from "react-icons/gi" // Game Icons
// import { TbAugmentedReality } from "react-icons/tb" // Tabler Icons

export default function FloatingButton() {
  return (
    <div className="container">
      <div className="button-wrapper">
        {/* Schatten-Wellen-Elemente mit Button-Form */}
        <div className="shadow-wave wave1"></div>
        <div className="shadow-wave wave2"></div>
        <div className="shadow-wave wave3"></div>

        <motion.button
          className="floating-button"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          style={{
            transformOrigin: "center",
          }}
        >
          {/* AR-Icon aus einer Bibliothek */}
          <MdOutlineViewInAr className="ar-icon size" />
          <span className="button-text">In deinem Raum ansehen</span>
        </motion.button>
      </div>
    </div>
  );
}
