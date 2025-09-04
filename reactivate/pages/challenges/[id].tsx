import React, { useState, useRef, useEffect } from "react";

const initialCode = `function App() {
  console.log("Welcome to the compiler!");
  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold text-gray-800">Hello, World!</h1>
      <p className="mt-2 text-gray-600">This is a live React compiler.</p>
    </div>
  );
}`;

const ChallengeDetail = () => {
  const [code, setCode] = useState(initialCode);
  const iframeRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [isLogsPanelVisible, setIsLogsPanelVisible] = useState(true);
  const [activeBottomTab, setActiveBottomTab] = useState("tests");
  const [isLoading, setIsLoading] = useState(true);

  // Vertical splitters state
  const [instructionsWidth, setInstructionsWidth] = useState(30);
  const [editorWidth, setEditorWidth] = useState(40);
  const [previewWidth, setPreviewWidth] = useState(30);

  // Drag logic for vertical splitters
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

  // Update the preview panel width based on the other two
  useEffect(() => {
    setPreviewWidth(100 - instructionsWidth - editorWidth);
  }, [instructionsWidth, editorWidth]);

  // Load Babel and ReactDOM once on component mount
  useEffect(() => {
    const scriptBabel = document.createElement("script");
    scriptBabel.src = "https://unpkg.com/@babel/standalone/babel.min.js";
    scriptBabel.onload = () => {
      setIsLoading(false);
      runCode();
    };
    document.head.appendChild(scriptBabel);

    const handleMessage = (event) => {
      if (
        event.data &&
        (event.data.type === "log" || event.data.type === "error")
      ) {
        setLogs((prev) => [...prev, event.data.payload]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const runCode = () => {
    setIsLoading(true);
    setLogs([]);
    const iframe = iframeRef.current;
    if (!iframe || !window.Babel) {
      console.error("Babel not loaded. Please wait and try again.");
      setIsLoading(false);
      return;
    }

    try {
      const transpiledCode = window.Babel.transform(code, {
        presets: ["react"],
      }).code;

      const html = `
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          </head>
          <body>
            <div id="root"></div>
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
                ${transpiledCode}
                
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(App));
              } catch (err) {
                console.error('Runtime Error:', err.message);
              }
            </script>
          </body>
        </html>
      `;
      iframe.srcdoc = html;
    } catch (err) {
      setLogs((prev) => [...prev, `Transpilation Error: ${err.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setLogs([]);
    runCode();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <style>{`
        .splitter-vertical {
          background-color: #333;
          width: 5px;
          cursor: col-resize;
        }
        .collapsible-horizontal {
          background-color: #333;
          height: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        textarea {
          width: 100%;
          height: 100%;
          border: none;
          background-color: #1e1e1e;
          color: white;
          font-family: monospace;
          font-size: 14px;
          resize: none;
          outline: none;
          padding: 10px;
          box-sizing: border-box;
          overflow: auto;
        }
      `}</style>

      {/* Top section: Instructions, Code Editor, and Preview */}
      <div
        className="flex flex-grow"
        style={{ height: isLogsPanelVisible ? "65%" : "100%" }}
      >
        {/* Instructions Panel */}
        <div
          className="p-4 bg-gray-800 overflow-y-auto"
          style={{ flexBasis: `${instructionsWidth}%` }}
        >
          <div className="p-2 border-b border-gray-700 flex">
            <h2 className="text-white font-bold p-2 bg-gray-600 rounded-t-md">
              Instructions
            </h2>
          </div>
          <div className="px-2 py-4 text-gray-300 space-y-4">
            <h2 className="text-xl font-bold">Using Fragments</h2>
            <p>
              Your task is to edit the existing `Summary` component such that it
              outputs the following content:
            </p>
            <p>
              Inside the `Summary` component, this content must not be wrapped
              by any other HTML element!
            </p>
            <p>For example, this code would be wrong:</p>
            <pre className="bg-gray-700 p-2 rounded-md overflow-x-auto text-sm">
              <code>
                &lt;div&gt;
                <br />
                &nbsp;&nbsp;&lt;h1&gt;Summary&lt;/h1&gt;
                <br />
                &nbsp;&nbsp;&lt;p&gt;{`text`}&lt;/p&gt;
                <br />
                &lt;/div&gt;
              </code>
            </pre>
          </div>
        </div>
        {/* Vertical Splitter */}
        <div
          className="splitter-vertical"
          onMouseDown={(e) => startDrag(e, "instructions")}
        ></div>

        {/* Code Editor Panel */}
        <div
          className="flex flex-col bg-gray-800"
          style={{ flexBasis: `${editorWidth}%` }}
        >
          <div className="p-2 border-b border-gray-700 flex justify-between items-center">
            <div className="flex gap-1">
              <span className="p-2 bg-gray-600 rounded-t-md text-white font-bold cursor-pointer">
                App.js
              </span>
              <span className="p-2 bg-gray-800 text-gray-400 font-bold cursor-pointer">
                index.css
              </span>
            </div>
          </div>
          <div className="flex-grow p-2">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
          </div>
          <div className="p-2 bg-gray-800 border-t border-gray-700 flex justify-start items-center gap-4">
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
          </div>
        </div>
        {/* Vertical Splitter */}
        <div
          className="splitter-vertical"
          onMouseDown={(e) => startDrag(e, "editor")}
        ></div>

        {/* Preview Panel */}
        <div
          className="flex flex-col bg-white"
          style={{ flexBasis: `${previewWidth}%` }}
        >
          <div className="p-2 border-b border-gray-300 flex">
            <h2 className="text-gray-800 font-bold p-2 bg-gray-200 rounded-t-md">
              Preview
            </h2>
          </div>
          <div className="flex-grow overflow-y-auto relative">
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

      {/* Collapsible horizontal panel for logs */}
      <div
        className="collapsible-horizontal"
        onClick={() => setIsLogsPanelVisible(!isLogsPanelVisible)}
      >
        <span className="text-white text-lg">
          {isLogsPanelVisible ? "▲ Hide Panels" : "▼ Show Panels"}
        </span>
      </div>

      {/* Bottom section: Test Results and Logs */}
      <div
        className={`flex flex-grow transition-all duration-300 ease-in-out ${
          !isLogsPanelVisible ? "max-h-0 overflow-hidden" : "max-h-full"
        }`}
      >
        <div className="flex-1 flex flex-col p-4 bg-gray-800 overflow-y-auto">
          <div className="flex gap-4 p-2 border-b border-gray-700">
            <button
              onClick={() => setActiveBottomTab("tests")}
              className={`font-bold p-2 rounded-t-md transition-colors duration-200 ${
                activeBottomTab === "tests"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              Test result
            </button>
            <button
              onClick={() => setActiveBottomTab("logs")}
              className={`font-bold p-2 rounded-t-md transition-colors duration-200 ${
                activeBottomTab === "logs"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              }`}
            >
              User logs
            </button>
          </div>

          <div className="flex-grow p-4">
            {activeBottomTab === "tests" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                  Result
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                    Success
                  </span>
                </div>
                <div className="text-gray-300 font-mono">
                  Test Cases: Failed: 0, Passed: 2 of 2 tests
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-700 rounded-md">
                    <span className="text-green-500">✓</span>
                    <span>Your code passed this test</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-700 rounded-md">
                    <span className="text-green-500">✓</span>
                    <span>Summary should be a function</span>
                  </div>
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
