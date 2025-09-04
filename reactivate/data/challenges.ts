import { Challenge } from "@/types/challenge";

export const challenges: Challenge[] = [
  {
    id: "fragments-challenge",
    title: "Understanding React Fragments",
    description:
      "Your task is to use React Fragments to return multiple elements from a component without a parent wrapper.",
    instructions: `
      <h2 className="text-xl font-bold">Using React Fragments</h2>
      <p>Your task is to edit the existing <code>Summary</code> component such that it outputs a heading and a paragraph. The key requirement is that this content must not be wrapped by any other HTML element!</p>
      <p>This is where you'll use a **React Fragment** to return multiple elements. The correct syntax is <code>&lt;React.Fragment&gt;...&lt;/React.Fragment&gt;</code> or the shorthand <code>&lt;&gt;...&lt;/&gt;</code>.</p>
      <p>For example, this code would be wrong:</p>
      <pre className="bg-gray-700 p-2 rounded-md overflow-x-auto text-sm">
        <code>
          &lt;div&gt;<br />
          &nbsp;&nbsp;&lt;h1&gt;Summary&lt;/h1&gt;<br />
          &nbsp;&nbsp;&lt;p&gt;This component uses a React Fragment...&lt;/p&gt;<br />
          &lt;/div&gt;
        </code>
      </pre>
      <p>The correct output should be directly at the root of the component's return statement.</p>
    `,
    initialCode: `function App() {
  function Summary() {
    // Your code here. Use a React Fragment to return a heading and a paragraph.
    return (
      <React.Fragment>
        <h1>Summary</h1>
        <p>This component uses a React Fragment to return two elements without a single parent wrapper.</p>
      </React.Fragment>
    );
  }

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold text-gray-800">Hello, World!</h1>
      <Summary />
    </div>
  );
}`,
  },
  {
    id: "state-challenge",
    title: "Managing State with Hooks",
    description:
      "Create a simple counter component that increments and decrements a number using the useState hook.",
    instructions: `
      <h2 className="text-xl font-bold">Using the useState Hook</h2>
      <p>In this challenge, your goal is to create a simple counter. Use the <code>useState</code> hook to declare a state variable for the count.</p>
      <p>The component should display the current count and include two buttons: one to increment the count and one to decrement it.</p>
      <p>Remember, the <code>useState</code> hook returns an array with two elements: the current state value and a function to update it. Make sure to use the update function to change the state.</p>
    `,
    initialCode: `function App() {
  // Your code here. Use the useState hook to manage a counter.
  const [count, setCount] = React.useState(0);

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold text-gray-800">Counter App</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}`,
  },
  {
    id: "button-component",
    title: "Build a Button Component",
    description: "Create a reusable button with custom styles.",
    difficulty: "Easy",
    instructions: `
      <h2 className="text-xl font-bold">Build a Reusable Button</h2>
      <p>Your task is to build a reusable <code>Button</code> component. This component will accept a <code>label</code> prop and render it inside the button.</p>
      <p>This app uses <a href="https://tailwindcss.com/" target="_blank" class="text-blue-400 underline">Tailwind CSS</a>, so you should use Tailwind classes to apply the button's base styles. A good combination of classes would be <code>bg-blue-600</code>, <code>text-white</code>, <code>px-4</code>, <code>py-2</code>, <code>rounded-lg</code>, and a hover effect like <code>hover:bg-blue-700</code>.</p>
      <p>On click, the button should log <code>Button clicked!</code> to the console.</p>
      `,
    initialCode: `import React from "react";

const Button = ({ label }) => {
  return (
    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200" onClick={() => console.log("Button clicked!")}>
      {label}
    </button>
  );
};

export default function App() {
  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hello React</h1>
      <Button label="Click me" />
    </div>
  );
}`,
  },
];
