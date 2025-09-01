import Link from "next/link";
import React, { ReactNode } from "react";

// A local Link component is defined here to ensure the code compiles in this environment.

// Define the type for the challenge prop
interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface ChallengeCardProps {
  challenge: Challenge;
}

// Define the ChallengeCard component within this file to resolve the import error.
const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
      <p className="text-gray-400 mb-4">{challenge.description}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            challenge.difficulty === "Easy"
              ? "text-green-400"
              : challenge.difficulty === "Medium"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {challenge.difficulty}
        </span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
          Start
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-8">Reactivate</h2>
        <nav className="w-full">
          <ul className="space-y-4">
            <li>
              <Link
                href="/challenges"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {/* SVG for Challenges icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span className="font-medium text-lg">Challenges</span>
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {/* SVG for Community icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h-10c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12V4"
                  />
                </svg>
                <span className="font-medium text-lg">Community</span>
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {/* SVG for Leaderboard icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.75a2.25 2.25 0 010 4.5H14c-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25zm-2.25 0v4.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.75 16.5H12c-1.24 0-2.25-1.01-2.25-2.25s1.01-2.25 2.25-2.25h6.75a2.25 2.25 0 010 4.5z"
                  />
                </svg>
                <span className="font-medium text-lg">Leaderboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

const Challenges = () => {
  // Dummy data for challenges. In a real app, this would come from an API.
  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Two Sum",
      description: "Find the indices of two numbers that add up to a target.",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Longest Substring Without Repeating Characters",
      description:
        "Find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      description:
        "Merge two sorted linked lists and return it as a new sorted list.",
      difficulty: "Easy",
    },
    {
      id: 4,
      title: "Valid Parentheses",
      description: "Determine if a string is a valid sequence of parentheses.",
      difficulty: "Easy",
    },
    {
      id: 5,
      title: "Reverse Linked List",
      description: "Reverse a singly linked list.",
      difficulty: "Easy",
    },
    {
      id: 6,
      title: "Roman to Integer",
      description: "Convert a Roman numeral to an integer.",
      difficulty: "Easy",
    },
    {
      id: 7,
      title: "Find the Duplicate Number",
      description: "Find the one repeated number in an array.",
      difficulty: "Medium",
    },
    {
      id: 8,
      title: "Binary Tree Level Order Traversal",
      description: "Return the level order traversal of a binary tree.",
      difficulty: "Medium",
    },
    {
      id: 9,
      title: "3Sum",
      description:
        "Find all unique triplets in the array which gives the sum of zero.",
      difficulty: "Medium",
    },
    {
      id: 10,
      title: "Rotate Image",
      description: "Rotate a square matrix by 90 degrees (clockwise).",
      difficulty: "Hard",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">
          Coding Challenges
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge: Challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Challenges;
