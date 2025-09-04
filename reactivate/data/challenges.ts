// data/challenges.ts
import { Challenge } from "@/types/challenge";

export const challenges: Challenge[] = [
  {
    id: "button-component",
    title: "Build a Button Component",
    description: "Create a reusable button with custom styles.",
    difficulty: "Easy",

    instructions: `
Your task is to build a reusable \`Button\` component.

Requirements:
- Accept a \`label\` prop and render it inside the button
- Apply base styles from \`style.css\`
- On click, log \`Button clicked!\` to the console
    `,
    hints: [
      "Remember to use props to pass text into your component.",
      "Use the onClick prop for event handling.",
    ],

    files: {
      "App.js": `import React from "react";
import { Button } from "./Button";

export default function App() {
  return (
    <div className="app">
      <h1>Hello React</h1>
      <Button label="Click me" />
    </div>
  );
}`,
      "Button.js": `import React from "react";

export const Button = ({ label }) => {
  return (
    <button className="btn" onClick={() => console.log("Button clicked!")}>
      {label}
    </button>
  );
};`,
      "style.css": `.btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background: #1d4ed8;
}`,
    },

    tests: [
      {
        description: "renders button with label",
        code: `render(<Button label="Click me" />);
expect(screen.getByText("Click me")).toBeInTheDocument();`,
      },
      {
        description: "logs click to console",
        code: `const logSpy = jest.spyOn(console, "log");
render(<Button label="Click" />);
fireEvent.click(screen.getByText("Click"));
expect(logSpy).toHaveBeenCalledWith("Button clicked!");`,
      },
    ],

    state: "not-started",
  },
];
