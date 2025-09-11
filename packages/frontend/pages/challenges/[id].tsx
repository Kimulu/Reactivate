import { useRouter } from "next/router";
import { challenges } from "@/data/challenges";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackTests,
  SandpackLayout,
  useSandpack,
} from "@codesandbox/sandpack-react";
import CustomAceEditor from "@/components/CustomAceEditor";
import FileTabs from "@/components/FileTabs";
import { useState } from "react";

function TestRunner() {
  const { dispatch } = useSandpack();
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    dispatch({ type: "run-all-tests" });

    // reset state after ~2s (or when test results are done)
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with buttons */}
      <div className="flex items-center justify-between border-b border-gray-700 px-3 py-1 text-sm bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Tests</span>
          <button
            onClick={handleRunTests}
            className={`px-2 py-1 rounded-md text-white transition-colors duration-200 ${
              isRunning
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Tests"}
          </button>
        </div>
      </div>

      {/* Test results */}
      <div className="flex-1 min-h-0 overflow-auto">
        <SandpackTests
          showVerboseButton={false}
          showWatchButton={false}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0f172a",
          }}
        />
      </div>
    </div>
  );
}

export default function ChallengeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return <div className="p-4 text-red-500">Challenge not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">
      <SandpackProvider
        template="react"
        theme="dark"
        files={challenge.files}
        customSetup={{
          dependencies: {
            "@testing-library/react": "latest",
            "@testing-library/jest-dom": "latest",
            "@testing-library/dom": "latest",
          },
        }}
      >
        <SandpackLayout>
          {/* Top row */}
          <div className="flex flex-[2] border-b border-gray-700 min-h-0">
            {/* Instructions */}
            <div className="flex-[1] border-r border-gray-700 flex flex-col min-h-0">
              <div className="border-b border-gray-700 px-3 py-1 text-sm bg-gray-800">
                Instructions
              </div>
              <div className="flex-1 overflow-auto p-4">
                <h1 className="text-xl font-bold mb-4">{challenge.title}</h1>
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{ __html: challenge.instructions }}
                />
              </div>
            </div>

            {/* Editor */}
            <div className="flex-[2] border-r border-gray-700 flex flex-col min-h-0">
              <div className="border-b border-gray-700">
                <FileTabs allowedFiles={Object.keys(challenge.files)} />
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <CustomAceEditor />
              </div>
            </div>

            {/* Preview */}
            <div className="flex-[2] flex flex-col min-h-0">
              <div className="border-b border-gray-700 px-3 py-1 text-sm bg-gray-800">
                Preview
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                  }}
                />
              </div>
            </div>
          </div>
        </SandpackLayout>

        {/* Bottom row: tests only */}
        <div className="flex flex-[1] border-t border-gray-700 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <TestRunner />
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
}
