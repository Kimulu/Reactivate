// pages/challenges/[id].tsx
import { useRouter } from "next/router";
import { challenges } from "@/data/challenges";
import { useState } from "react";

const ChallengeDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find challenge
  const challenge = challenges.find((c) => c.id === id);

  // Local state for tab switching
  const [activeTab, setActiveTab] = useState<"instructions" | "hints">(
    "instructions"
  );

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <h2 className="text-2xl">Challenge not found 🚫</h2>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar: Instructions + Hints */}
      <aside className="w-1/4 bg-gray-800 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{challenge.title}</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-3 py-1 rounded ${
              activeTab === "instructions" ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          <button
            className={`px-3 py-1 rounded ${
              activeTab === "hints" ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("hints")}
          >
            Hints
          </button>
        </div>

        {activeTab === "instructions" && (
          <div className="whitespace-pre-line text-gray-300">
            {challenge.instructions}
          </div>
        )}
        {activeTab === "hints" && (
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            {challenge.hints.map((hint, i) => (
              <li key={i}>{hint}</li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Environment */}
      <main className="flex-1 flex flex-col">
        {/* Tabs for files */}
        <div className="flex bg-gray-800">
          {Object.keys(challenge.files).map((file) => (
            <button
              key={file}
              className="px-4 py-2 border-b-2 border-blue-500 text-sm bg-gray-900"
            >
              {file}
            </button>
          ))}
        </div>

        {/* Code editor area (placeholder for now) */}
        <div className="flex-1 bg-gray-900 p-4 overflow-y-auto">
          <pre className="bg-gray-800 p-4 rounded text-sm text-green-400">
            {Object.values(challenge.files)[0]}
          </pre>
        </div>

        {/* Bottom Panel: Tests + Logs */}
        <div className="grid grid-cols-2 bg-gray-800 border-t border-gray-700 h-40">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Test Cases</h3>
            <ul className="text-sm space-y-1 text-gray-300">
              {challenge.tests.map((t, i) => (
                <li key={i}>✅ {t.description}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-l border-gray-700">
            <h3 className="text-lg font-bold mb-2">User Logs</h3>
            <div className="text-sm text-gray-400">No logs yet…</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetail;
