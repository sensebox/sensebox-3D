// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 bg-white bg-opacity-70 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} senseBox 3D Models</p>
      </div>
    </footer>
  );
}
