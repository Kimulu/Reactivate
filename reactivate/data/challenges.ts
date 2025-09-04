// data/challenges.ts
export interface ChallengeDef {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  instructions: string;
  hints: string[];
  files: { [path: string]: string };
  tests: { description: string; run: string }[]; // run can be a function string for now
}

export const challenges: ChallengeDef[] = [
  {
    id: "course-goal-props",
    title: "Working with Props",
    description: "Make CourseGoal reusable with title + description props.",
    difficulty: "Easy",
    instructions: `
Your task is to make the CourseGoal component reusable.
It should accept a "title" and "description" and render them in <h2> and <p>.
    `,
    hints: [
      "Use props destructuring: ({ title, description })",
      "Render props between <h2> and <p>.",
    ],
    files: {
      "/App.js": `import CourseGoal from './CourseGoal';

export default function App() {
  return (
    <ul>
      <CourseGoal title="Learn React" description="In-depth" />
      <CourseGoal title="Practice More" description="Hands-on coding" />
    </ul>
  );
}`,
      "/CourseGoal.js": `export default function CourseGoal({ title, description }) {
  return (
    <li>
      <h2>{title}</h2>
      <p>{description}</p>
    </li>
  );
}`,
      "/index.css": `body { font-family: sans-serif; }`,
    },
    tests: [
      { description: "renders 'Learn React'", run: "getByText('Learn React')" },
    ],
  },
];
