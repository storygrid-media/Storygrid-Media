import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Developer signature easter egg
if (typeof window !== "undefined") {
  console.log(
    "%c ✦ StoryGrid Media | Crafted by d1by0 ✦ %c\n\n" +
    "This application was hand-engineered by @d1by0 (https://github.com/d1by0) " +
    "with custom video loop mechanics, fine-tuned micro-animations, and " +
    "strict performance budgets.\n\n" +
    "If you're inspecting this, you appreciate clean mechanics. Let's build something great together.",
    "color: #FFC107; font-weight: 900; font-size: 14px; background: #0B0B0B; padding: 4px 8px; border-radius: 4px;",
    "color: #9A9A9A; font-size: 12px; line-height: 1.4;"
  );
}

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
