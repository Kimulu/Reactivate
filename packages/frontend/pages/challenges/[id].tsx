import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { challenges } from "@/data/challenges";
import Link from "next/link";
import { Editor } from "@monaco-editor/react";
import * as esbuild from "esbuild-wasm";
import { useEsbuild } from "@/context/EsbuildContext"; // ✅ use context

// ✅ module-level guard (persists across navigations)
let esbuildInitialized = false;

const ChallengeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { esbuildReady } = useEsbuild(); // ✅ get readiness from context

  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-gray-900">
        <p>Loading challenge...</p>
      </div>
    );
  }

  const [code, setCode] = useState(challenge.initialCode);
  const iframeRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [isLogsPanelVisible, setIsLogsPanelVisible] = useState(true);
  const [activeBottomTab, setActiveBottomTab] = useState("tests");
  const [isLoading, setIsLoading] = useState(true);

  const [instructionsWidth, setInstructionsWidth] = useState(30);
  const [editorWidth, setEditorWidth] = useState(40);
  const [previewWidth, setPreviewWidth] = useState(30);

  const startDrag = (e, panel) => {
    e.preventDefault();
    const startX = e.clientX;
    const totalWidth = e.currentTarget.parentElement.offsetWidth;

    const doDrag = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      if (panel === "instructions") {
        setInstructionsWidth(
          Math.max(
            20,
            Math.min(45, instructionsWidth + (deltaX / totalWidth) * 100)
          )
        );
      } else if (panel === "editor") {
        setEditorWidth(
          Math.max(20, Math.min(65, editorWidth + (deltaX / totalWidth) * 100))
        );
      }
    };

    const endDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", endDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", endDrag);
  };

  useEffect(() => {
    setPreviewWidth(100 - instructionsWidth - editorWidth);
  }, [instructionsWidth, editorWidth]);

  // ✅ Listen to logs
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        (event.data.type === "log" || event.data.type === "error")
      ) {
        setLogs((prev) => [...prev, event.data.payload]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ✅ run code once esbuild is ready
  useEffect(() => {
    if (esbuildReady) {
      runCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esbuildReady]);

  const runCode = async () => {
    if (!esbuildReady) {
      console.warn("⏳ Esbuild not ready yet. Please wait...");
      return;
    }

    setIsLoading(true);
    setLogs([]);
    const iframe = iframeRef.current;
    if (!iframe) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await esbuild.transform(code, {
        loader: "jsx",
        target: "es2015",
      });

      const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50">
    <div id="root"></div>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script>
      const originalLog = console.log;
      const originalError = console.error;
      console.log = (...args) => {
        window.parent.postMessage({ type: 'log', payload: args.join(' ') }, '*');
        originalLog(...args);
      };
      console.error = (...args) => {
        window.parent.postMessage({ type: 'error', payload: args.join(' ') }, '*');
        originalError(...args);
      };
      try {
        ${result.code}
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(App));
      } catch (err) {
        console.error('Runtime Error:', err && err.message ? err.message : err);
      }
    </script>
  </body>
</html>`;

      iframe.srcdoc = html;
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        `Build Error: ${err && err.message ? err.message : err}`,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCode = () => {
    setCode(challenge.initialCode);
    setLogs([]);
    runCode();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <style>{`
        .splitter-vertical {
          background-color: transparent;
          width: 10px;
          cursor: col-resize;
          flex-shrink: 0;
          position: relative;
        }
        .splitter-vertical::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 50px;
          width: 2px;
          background-color: #555;
          border-radius: 2px;
          transition: background-color 0.2s ease;
        }
        .splitter-vertical:hover::after {
          background-color: #888;
        }
        .collapsible-horizontal {
          background-color: #333;
          height: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .textarea-editor {
          background-color: #1a202c;
          color: #f7fafc;
          font-family: monospace;
          font-size: 14px;
          padding: 1rem;
          resize: none;
          outline: none;
          border-width: 0px;
          overflow-y: auto;
        }
      `}</style>

      {/* Main split panels */}
      <div
        className="flex flex-grow overflow-hidden"
        style={{ height: isLogsPanelVisible ? "65%" : "100%" }}
      >
        {/* Instructions */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ flexBasis: `${instructionsWidth}%` }}
        >
          <div className="px-4 py-2 text-gray-300 border-b border-gray-700 bg-gray-800 text-sm font-bold">
            Instructions
          </div>
          <div
            className="p-4 bg-gray-900 overflow-y-auto flex-grow"
            dangerouslySetInnerHTML={{ __html: challenge.instructions }}
          />
        </div>

        <div
          className="splitter-vertical"
          onMouseDown={(e) => startDrag(e, "instructions")}
        ></div>

        {/* Code Editor */}
        <div
          className="flex flex-col bg-gray-900 overflow-hidden"
          style={{ flexBasis: `${editorWidth}%` }}
        >
          <div className="px-4 py-2 text-gray-300 border-b border-gray-700 bg-gray-800 text-sm font-bold">
            App.js
          </div>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
          <div className="p-2 bg-gray-800 border-t border-gray-700 flex gap-4">
            <button
              onClick={runCode}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Run tests
            </button>
            <button
              onClick={resetCode}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Reset
            </button>
            <Link
              href="/challenges"
              className="text-white font-bold px-6 py-2 rounded-lg transition-colors duration-200 border-1 border-dashed border-blue-500"
            >
              <button> Back to Challenges</button>
            </Link>
          </div>
        </div>

        <div
          className="splitter-vertical"
          onMouseDown={(e) => startDrag(e, "editor")}
        ></div>

        {/* Preview */}
        <div
          className="flex flex-col bg-white overflow-hidden"
          style={{ flexBasis: `${previewWidth}%` }}
        >
          <div className="px-4 py-2 text-gray-800 bg-gray-200 text-sm font-bold">
            Preview
          </div>
          <div className="flex-grow overflow-auto relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <p className="text-gray-800 font-bold text-lg">Loading...</p>
              </div>
            )}
            <iframe
              ref={iframeRef}
              title="live-preview"
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>

      {/* Collapsible Logs */}
      <div
        className="collapsible-horizontal"
        onClick={() => setIsLogsPanelVisible(!isLogsPanelVisible)}
      >
        <span className="text-white text-lg">
          {isLogsPanelVisible ? "▲ Hide Panels" : "▼ Show Panels"}
        </span>
      </div>

      {/* Bottom Logs */}
      <div
        className={`flex flex-grow transition-all duration-300 ease-in-out overflow-hidden ${
          !isLogsPanelVisible ? "max-h-0" : "max-h-full"
        }`}
      >
        <div className="flex-1 flex flex-col p-4 bg-gray-800 overflow-hidden">
          <div className="flex gap-4 p-2 border-b border-gray-700">
            <button
              onClick={() => setActiveBottomTab("tests")}
              className={`font-bold p-2 rounded-t-md ${
                activeBottomTab === "tests"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              Test result
            </button>
            <button
              onClick={() => setActiveBottomTab("logs")}
              className={`font-bold p-2 rounded-t-md ${
                activeBottomTab === "logs"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              User logs
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto">
            {activeBottomTab === "tests" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                  Result
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                    Success
                  </span>
                </div>
                <div className="text-gray-300 font-mono">
                  Test Cases: Placeholder for {challenge.title}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-300 space-y-1 font-mono">
                {logs.length === 0 ? (
                  <div>No logs yet... Click "Run tests" to see output.</div>
                ) : (
                  logs.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
