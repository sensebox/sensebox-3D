import React from "react";
import BikeScene from "../src/scenes/bike";
import FloatingButton from "../src/components/FloatingButton";

const Page: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <BikeScene style={{ transform: "scale(1.2)" }} />
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <FloatingButton />
      </div>
    </div>
  );
};

export default Page;
