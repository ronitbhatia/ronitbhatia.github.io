import React from "react";

const TrashWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full trash-window">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs window-chrome-bar"
        style={{
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-body)",
        }}
      >
        <span className="font-semibold">Trash</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 mac-scroll">
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl mb-4 border-2"
          style={{
            borderColor: "hsl(var(--mac-border))",
            background: "hsl(var(--window-input-bg-alt))",
          }}
        >
          🗑️
        </div>
        <p
          className="text-sm font-semibold mb-1"
          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
        >
          Trash is empty
        </p>
        <p
          className="text-xs opacity-70"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--mac-dark))" }}
        >
          Items you delete will appear here
        </p>
      </div>
    </div>
  );
};

export default TrashWindow;
