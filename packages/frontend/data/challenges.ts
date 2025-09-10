// challenges.ts
export const challenges = [
  {
    id: "fragments",
    title: "Fragments Challenge",
    instructions: `
      Edit the <Summary /> component so it returns an <h1> and <p> wrapped in a React Fragment.
    `,
    files: {
      "/App.js": `import Summary from "./Summary";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Summary text="Fragments help you avoid unnecessary HTML elements.">
        Summary
      </Summary>
    </div>
  );
}
`,
      "/Summary.js": `export default function Summary({ text, children }) {
  return (
    <>
      <h1>{children}</h1>
      <p>{text}</p>
    </>
  );
}
`,
      "/styles.css": `body {
  font-family: sans-serif;
  background-color: #0f172a;
  color: white;
  padding: 2rem;
}

h1 {
  color: #38bdf8; /* Tailwind cyan-400 */
}

p {
  color: #cbd5e1; /* Tailwind slate-300 */
}`,
    },
  },
  {
    id: "counter",
    title: "Counter Challenge",
    instructions: `
      Fix the <Counter /> component so the "Increment" button increases the count using useState.
    `,
    files: {
      "/App.js": `import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>useState Counter</h1>
      <Counter />
    </div>
  );
}
`,
      "/Counter.js": `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
`,
      "/styles.css": `body {
  font-family: sans-serif;
  background-color: #0f172a;
  color: white;
  padding: 2rem;
}

button {
  background: #38bdf8;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: black;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

button:hover {
  background: #0ea5e9; /* darker cyan */
}`,
    },
  },
  {
    id: "button-style",
    title: "Styled Button Challenge",
    instructions: `
      Create a reusable <Button /> component styled with CSS. 
      It should accept a "label" prop and render a blue button.
    `,
    files: {
      "/App.js": `import Button from "./Button";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Reusable Button</h1>
      <Button label="Click Me!" />
      <Button label="Submit" />
    </div>
  );
}
`,
      "/Button.js": `export default function Button({ label }) {
  return <button className="btn">{label}</button>;
}
`,
      "/styles.css": `body {
  font-family: sans-serif;
  background-color: #0f172a;
  color: white;
  padding: 2rem;
}

h1 {
  color: #38bdf8;
}

.btn {
  background: #3b82f6; /* Tailwind blue-500 */
  color: white;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.btn:hover {
  background: #2563eb; /* Tailwind blue-600 */
}`,
    },
  },
];
