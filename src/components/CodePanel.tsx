import React from 'react';

interface CodePanelProps {
  tikzCode: string;
}

const CodePanel: React.FC<CodePanelProps> = ({ tikzCode }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tikzCode);
      alert('TikZ code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const defaultCode = `\\begin{tikzpicture}
% Your diagram will appear here
\\end{tikzpicture}`;

  return (
    <div className="code-panel">
      <div className="code-header">
        <h2>Generated TikZ Code</h2>
      </div>
      <div className="code-content">
        <button className="copy-button" onClick={copyToClipboard}>
          Copy Code
        </button>
        <pre>{tikzCode || defaultCode}</pre>
      </div>
    </div>
  );
};

export default CodePanel; 