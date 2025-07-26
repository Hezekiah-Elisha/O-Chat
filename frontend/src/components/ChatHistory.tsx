import React from "react";

export default function ChatHistory({ messages }: { messages: string[] }) {
  return (
    <div className="font-mono">
      <h2>Chat History</h2>
      <ul className="">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
