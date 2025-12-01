"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";

type Message = {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    fullName: string | null;
  };
};

interface Props {
  conversationId: string;
  currentUserId: string;
}

/**
 * Simple “near real-time” chat using polling every 2 seconds.
 * You can later upgrade this to websockets (Pusher, Ably, Supabase, etc.)
 */
export function MarketplaceChat({ conversationId, currentUserId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load + poll messages
  useEffect(() => {
    let active = true;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/marketplace/conversations/${conversationId}/messages`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (active) setMessages(data.messages as Message[]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [conversationId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/marketplace/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: input })
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send message");
      }
      setInput("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="flex h-[380px] flex-col bg-white/95 text-slate-900">
      <div className="mb-2 text-[11px] text-slate-600">
        Use this chat to coordinate pickup location (e.g., MTCC, library) and
        confirm the item before payment in person.
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto rounded-lg bg-slate-50 p-2 text-xs">
        {messages.length === 0 ? (
          <p className="text-[11px] text-slate-400">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((m) => {
            const mine = m.sender.id === currentUserId;
            return (
              <div
                key={m.id}
                className={`flex ${
                  mine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-3 py-1.5 text-[11px] ${
                    mine
                      ? "bg-red-600 text-white"
                      : "bg-white text-slate-900 ring-1 ring-slate-200"
                  }`}
                >
                  {!mine && (
                    <p className="text-[10px] font-semibold text-slate-700">
                      {m.sender.fullName || "Student"}
                    </p>
                  )}
                  <p>{m.content}</p>
                  <p
                    className={`mt-0.5 text-[9px] ${
                      mine ? "text-red-100/80" : "text-slate-400"
                    }`}
                  >
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="mt-1 text-[10px] text-red-600">{error}</p>
      )}

      <form
        onSubmit={handleSend}
        className="mt-2 flex gap-2 border-t border-slate-200 pt-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="Type a message…"
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-500 disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </Card>
  );
}
