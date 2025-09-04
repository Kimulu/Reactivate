// components/Preview.tsx
import { useEffect, useRef } from "react";

interface PreviewProps {
  files: { [filename: string]: string };
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    const css = files["style.css"] || "";
    const appCode =
      files["App.tsx"] || files["App.jsx"] || files["App.js"] || "";

    // Simple HTML skeleton
    const html = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          <div id="root"></div>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script type="text/javascript">
            try {
              const exports = {};
              ${appCode}
              const App = exports.default || window.App;
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(App));
            } catch (err) {
              document.body.innerHTML = '<pre style="color:red;">' + err + '</pre>';
            }
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();
  }, [files]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      className="w-full h-full bg-white rounded-b-lg"
    />
  );
};

export default Preview;
