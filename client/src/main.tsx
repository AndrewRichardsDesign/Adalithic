// Must run first: redirects unprefixed URLs to the browser's preferred locale
// before i18n seeds or React renders (no flash of English).
import "./lib/detect-locale";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(<App />);
