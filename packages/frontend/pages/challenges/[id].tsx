import { useRouter } from "next/router";
import { challenges } from "@/data/challenges";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackConsole,
  SandpackTests,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import CustomAceEditor from "@/components/CustomAceEditor";
import FileTabs from "@/components/FileTabs";

export default function ChallengeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return <div className="p-4 text-red-500">Challenge not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">
      <SandpackProvider template="react" theme="dark" files={challenge.files}>
        <SandpackLayout>
          {/* Top row: instructions | editor | preview */}
          <div className="flex flex-[2] border-b border-gray-700 min-h-0">
            {/* Instructions */}
            <div className="w-1/5 border-r border-gray-700 flex flex-col min-h-0">
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
            <div className="w-2/5 border-r border-gray-700 flex flex-col min-h-0">
              <div className="border-b border-gray-700">
                <FileTabs allowedFiles={Object.keys(challenge.files)} />
              </div>
              <div className="flex-1 min-h-0 overflow-auto">
                <CustomAceEditor />
              </div>
            </div>

            {/* Preview */}
            <div className="w-2/5 flex flex-col min-h-0">
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

        {/* Bottom row: console | tests */}
        <div className="flex flex-[1] border-t border-gray-700 min-h-0">
          {/* Console */}
          <div className="w-1/2 border-r border-gray-700 flex flex-col min-h-0">
            <div className="border-b border-gray-700 px-3 py-1 text-sm bg-gray-800">
              Console
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <SandpackConsole
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0f172a",
                }}
              />
            </div>
          </div>

          {/* Tests */}
          <div className="w-1/2 flex flex-col min-h-0">
            <div className="border-b border-gray-700 px-3 py-1 text-sm bg-gray-800">
              Tests
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <SandpackTests
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0f172a",
                }}
              />
            </div>
          </div>
        </div>
      </SandpackProvider>
    </div>
  );
}
