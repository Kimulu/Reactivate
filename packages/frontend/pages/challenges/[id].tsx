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
import { useEffect, useState, useRef } from "react";

// TestRunner component from your FIRST file
function TestRunner() {
  const { dispatch, listen } = useSandpack();
  const [isRunning, setIsRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [testsPassed, setTestsPassed] = useState(false);
  const [hasRun, setHasRun] = useState(false); // has run tests at least once
  const [errorOccurred, setErrorOccurred] = useState(false); // Tracks critical Sandpack errors
  const [criticalSandpackError, setCriticalSandpackError] = useState(false);

  const router = useRouter();
  const criticalErrorConfirmTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showErrorReceivedDuringRunRef = useRef(false);
  // useRef to track if total_test_end has been received for the current test run
  const totalTestEndReceivedRef = useRef(false);

  const handleRunTests = () => {
    setIsRunning(true);
    setIsOpen(true);
    setHasRun(true);
    setTestsPassed(false);
    // ADDED: Reset critical error flag for a new run
    setCriticalSandpackError(false);
    // ADDED: Reset the test completion flag for a new run
    totalTestEndReceivedRef.current = false;
    // ADDED: Reset showErrorReceivedDuringRunRef for a new run
    showErrorReceivedDuringRunRef.current = false;

    dispatch({ type: "refresh" });
    setTimeout(() => {
      dispatch({ type: "run-all-tests" });
    }, 800);
    // ADDED: Clear any previous pending critical error confirmation timeout
    if (criticalErrorConfirmTimeoutRef.current) {
      clearTimeout(criticalErrorConfirmTimeoutRef.current);
      criticalErrorConfirmTimeoutRef.current = null;
    }
  };

  // Listen for test results to update state
  useEffect(() => {
    const unsubscribe = listen((msg) => {
      // 1. Listener for general Sandpack compilation/runtime errors (e.g., syntax errors, preview crashes)
      if (msg.type === "action" && msg.action === "show-error") {
        console.group("🔴 Sandpack show-error received");
        console.log("Message:", msg);
        // ADDED: Set this ref to true immediately to indicate a show-error has occurred
        showErrorReceivedDuringRunRef.current = true;

        // Temporarily set criticalSandpackError to true. This makes our custom message show
        // promptly if there's an immediate issue and tests might not even attempt to run.
        setCriticalSandpackError(true);
        setIsOpen(true); // Ensure panel is open to show our message
        setIsRunning(false); // Assume not running if a show-error occurs
        setTestsPassed(false); // Assume non-completion

        // ADDED: Crucial for TypeErrors. If a show-error happens, assume total_test_end won't arrive.
        // This ensures criticalSandpackError state sticks until total_test_end explicitly clears it.
        totalTestEndReceivedRef.current = false;

        // If a previous timeout exists, clear it to prevent old states from being confirmed.
        if (criticalErrorConfirmTimeoutRef.current) {
          clearTimeout(criticalErrorConfirmTimeoutRef.current);
          console.log(
            "Cleared previous critical error confirmation timeout on new show-error."
          );
        }

        // Start a timeout to definitively confirm if this 'show-error' represents a critical halt.
        // We give it enough time for 'total_test_end' to potentially arrive.
        criticalErrorConfirmTimeoutRef.current = setTimeout(() => {
          console.group("⏰ Critical error confirmation timeout fired.");
          // Confirm critical error ONLY if total_test_end has NOT arrived by now.
          // This implicitly means showErrorReceivedDuringRunRef.current is true, as this timeout only starts then.
          if (!totalTestEndReceivedRef.current) {
            setCriticalSandpackError(true); // Confirm critical error
            setIsOpen(true); // Ensure panel remains open to show the custom error
            console.log(
              "Confirmed critical Sandpack error: total_test_end was not received."
            );
          } else {
            // This else block handles a race condition where total_test_end arrives *just before* this timeout,
            // but after the initial criticalSandpackError(true).
            setCriticalSandpackError(false); // Dismiss critical error as total_test_end did arrive.
            console.log(
              "Dismissed critical Sandpack error: total_test_end already received."
            );
          }
          criticalErrorConfirmTimeoutRef.current = null; // Clear the ref after timeout
          console.groupEnd();
        }, 3500); // Keep 3.5 seconds
        console.groupEnd();
      }

      // 2. Listener for specific test runner results (PASS/FAIL/ERROR from the test framework)
      if (msg.type === "test" && msg.event === "total_test_end") {
        console.group("🟡 total_test_end received");
        console.log(
          "This indicates tests *did* run to completion, regardless of prior show-error."
        );

        // ADDED: Set this ref to true immediately to indicate total_test_end has successfully fired
        totalTestEndReceivedRef.current = true;
        console.log("State: totalTestEndReceivedRef set to true");

        // If total_test_end arrives, it definitively means tests successfully finished their run.
        // Therefore, any 'show-error' that occurred prior is *not* a critical halt to the tests
        // that prevented results from being displayed by SandpackTests.

        // Clear any pending critical error confirmation timeout
        if (criticalErrorConfirmTimeoutRef.current) {
          clearTimeout(criticalErrorConfirmTimeoutRef.current);
          criticalErrorConfirmTimeoutRef.current = null;
          console.log(
            "Cleared critical error confirmation timeout on total_test_end."
          );
        }

        setCriticalSandpackError(false); // Tests completed, so no critical Sandpack error preventing results
        console.log(
          "State: criticalSandpackError set to false due to total_test_end."
        );
        setIsOpen(true); // Ensure panel is open to show test results

        setTimeout(() => {
          const label = document.querySelector(
            ".sp-test-spec-label"
          ) as HTMLElement;
          if (label) {
            console.log(
              "🔍 Detected result text from test runner:",
              label.innerText
            );

            if (label.innerText === "PASS") {
              setTestsPassed(true);
              console.log("State: testsPassed set to true.");
            } else if (label.innerText === "FAIL") {
              setTestsPassed(false);
              console.log("State: testsPassed set to false (FAIL).");
            } else if (label.innerText === "ERROR") {
              // This is an error *within the test runner/test file*, not a compilation halt.
              // SandpackTests should display this detailed error.
              setTestsPassed(false); // Tests did not pass
              console.log(
                "State: testsPassed set to false (ERROR from test runner)."
              );
            }
          } else {
            console.log(
              "⚠️ Could not find .sp-test-spec-label element after total_test_end. Assuming test failure."
            );
            setTestsPassed(false);
          }
          setIsRunning(false); // Tests are no longer running
          console.log("State: isRunning set to false.");
        }, 500); // Delay for DOM update
        console.groupEnd();
      }
    });

    return () => {
      unsubscribe();
      // Cleanup the timeout if the component unmounts
      if (criticalErrorConfirmTimeoutRef.current) {
        clearTimeout(criticalErrorConfirmTimeoutRef.current);
        console.log("Cleanup: Cleared critical error confirmation timeout.");
      }
    };
  }, [listen]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 px-3 py-1 text-sm bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Tests</span>

          {/* Run Tests */}
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

          {/* Submit button always visible after first run, checks state on click */}
          {hasRun && (
            <button
              onClick={() => {
                if (testsPassed) {
                  alert("✅ user submitted code successfully");
                } else {
                  alert(
                    "⚠️ Please fix errors and rerun tests before submitting."
                  );
                }
              }}
              className={`px-2 py-1 rounded-md text-white transition-colors duration-200 ${
                testsPassed
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              Submit
            </button>
          )}
          {/* Note: The 'Return to Challenges' button is not present in this version of TestRunner */}
        </div>

        {/* Toggle button appears only after first run */}
        {hasRun && (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="px-2 py-1 rounded-md text-gray-300 hover:text-white"
          >
            {isOpen ? "▼ Hide" : "▲ Show"}
          </button>
        )}
      </div>

      {/* Test results panel */}
      <div
        className={`flex-1 min-h-0 overflow-auto transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
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

// ChallengeDetail component (remains consistent with both original files)
export default function ChallengeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return <div className="p-4 text-[#0f172a]-500">Loading challenges..</div>;
  }
  const auto = true;
  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">
      <SandpackProvider
        template="react"
        theme="dark"
        files={challenge.files ?? {}}
        customSetup={{
          dependencies: {
            "@testing-library/react": "latest",
            "@testing-library/jest-dom": "latest",
            "@testing-library/dom": "latest",
          },
        }}
        options={{ autorun: auto }}
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
                <FileTabs allowedFiles={Object.keys(challenge.files ?? {})} />
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
                  showSandpackErrorOverlay={false}
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

        {/* Bottom row: tests */}
        <div className="flex flex-[1] border-t border-gray-700 min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <TestRunner />
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
}
