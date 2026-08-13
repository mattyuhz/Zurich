import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Guide from "./guide";
import "./globals.css";
import "../site/glossary-links.css";
import "../site/glossary-links.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Guide />
  </StrictMode>,
);
