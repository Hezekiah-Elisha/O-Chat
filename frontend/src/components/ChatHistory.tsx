import React from "react";

export default function ChatHistory({ messages }: { messages: string[] }) {
  return (
    <div className="font-mono">
      <h2>Chat History</h2>
      <section className="flex flex-col gap-4">
        {messages.map((msg, index) => (
          <p className="bg-slate-800 p-2 rounded" key={index}>{msg}</p>
        ))}
      </section>
    </div>
  );
}
