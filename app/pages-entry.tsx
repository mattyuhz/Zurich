import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Guide from "./guide";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Guide />
  </StrictMode>,
);
