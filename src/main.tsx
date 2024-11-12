import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BikeScene from "./scenes/bike";

const router = createBrowserRouter([
  {
    path: "bike",
    element: (
      <StrictMode>
        <BikeScene />
      </StrictMode>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <h1>senseBox 3D models</h1>
        <a href="/bike">Bike</a>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
