// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";

// import Page from "../pages/page";

// const router = createBrowserRouter([
//   {
//     path: "bike",
//     element: (
//       <StrictMode>
//         <Page />
//       </StrictMode>
//     ),
//   },
//   {
//     path: "/",
//     element: (
//       <div>
//         <h1>senseBox 3D models</h1>
//         <a href="/bike">Bike</a>
//       </div>
//     ),
//   },
// ]);

// createRoot(document.getElementById("root")!).render(
//   <RouterProvider router={router} />,
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Page from "../pages/page";
import HomePage from "../pages/home"; // Import the new component

const router = createBrowserRouter([
  {
    path: "bike",
    element: (
      <StrictMode>
        <Page />
      </StrictMode>
    ),
  },
  {
    path: "/",
    element: (
      <StrictMode>
        <HomePage />
      </StrictMode>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
