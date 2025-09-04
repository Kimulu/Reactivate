// types/challenge.ts
export interface Challenge {
  id: string; // unique slug like "button-component"
  title: string;
  description: string; // short summary for dashboard cards
  difficulty: "Easy" | "Medium" | "Hard";

  instructions: string; // markdown / text with requirements
  hints: string[];

  files: {
    [filename: string]: string; // e.g. { "App.tsx": "...", "Button.tsx": "...", "style.css": "..." }
  };

  tests: {
    description: string; // e.g. "renders button with text"
    code: string; // Jest/RTL-like test code (to be run in sandbox)
  }[];

  state?: "not-started" | "in-progress" | "completed";
}
