"use client";
import { connect, sendMsg } from "@/api";
import Header from "@/components/Header";
import ChatHistory from "@/components/ChatHistory";
import { useState } from "react";

export default function Home() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  connect((msg) => {
    setChatHistory((prev) => [...prev, msg]);
  });
  const sendMessage = () => {
    console.log("Sending message to WebSocket server...");
    sendMsg("Hello, WebSocket server!");
  };
  return (
    <div>
      <Header />
      <main className="container m-auto">
        <button>
          <span
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            onClick={sendMessage}
          >
            Send Message
          </span>
        </button>
        <ChatHistory messages={chatHistory} />
      </main>
    </div>
  );
}
