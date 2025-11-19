"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Send } from "lucide-react";

interface Message {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    author: "Peer Mentor · Amina",
    text: "Welcome to IIT! Drop any questions about move-in, SIM cards, or banking here.",
    timestamp: "2 min ago"
  },
  {
    id: 2,
    author: "International Center",
    text: "Reminder: Don’t forget to upload your I-94 and passport copy before orientation day.",
    timestamp: "15 min ago"
  }
];

export function GroupMessaging() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: "You",
        text: value.trim(),
        timestamp: "Just now"
      }
    ]);
    setValue("");
  }

  return (
    <Card className="flex h-full flex-col">
      <header className="mb-2 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Group Messaging
          </h2>
          <p className="text-xs text-slate-400">
            Real-time channels with mentors and other new IIT international
            students.
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/40">
          WebSocket-ready
        </span>
      </header>

      <div className="mb-3 flex-1 space-y-2 overflow-y-auto rounded-xl bg-slate-950/60 p-3 text-xs scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className="rounded-lg bg-slate-900/80 p-2 ring-1 ring-slate-800"
          >
            <div className="mb-0.5 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold text-slate-100">
                {m.author}
              </p>
              <span className="text-[10px] text-slate-500">{m.timestamp}</span>
            </div>
            <p className="text-[11px] text-slate-200">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          placeholder="Ask a question about visas, housing, or campus life..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-red-600 px-3 text-xs font-semibold text-white shadow-md shadow-red-900/40 hover:bg-red-500"
        >
          <Send className="mr-1 h-3.5 w-3.5" />
          Send
        </button>
      </div>

      <p className="mt-1 text-[10px] text-slate-500">
        TODO: Connect this UI to your real-time messaging backend (e.g. WebSocket,
        Firebase, or SignalR) and replace the in-memory messages with live data.
      </p>
    </Card>
  );
}
