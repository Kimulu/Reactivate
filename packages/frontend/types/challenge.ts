export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";

  instructions: string;
  hints: string[];

  initialCode: string; // The complete, single-file code for the challenge

  tests: {
    description: string;
    code: string;
  }[];

  state?: "not-started" | "in-progress" | "completed";
}
