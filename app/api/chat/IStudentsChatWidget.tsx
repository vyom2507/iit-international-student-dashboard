"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
import clsx from "clsx";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function IStudentsChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I’m iStudents Assistant 👋\n\nI can help you with pre-arrival prep, housing, campus navigation, academics, and settling into life at IIT in Chicago. What are you thinking about right now?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const text = input.trim();
    if (!text || loading) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      // Convert to server message format
      const payloadMessages = [
        { role: "system", content: "User is an international student at IIT." },
        ...messages.map((m) => ({
          role: m.role,
          content: m.content
        })),
        { role: "user", content: text }
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Chat request failed.");
      }

      const data = await res.json();
      const replyText =
        typeof data.reply === "string"
          ? data.reply
          : "Sorry, I couldn’t generate a response right now.";

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: replyText
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/60 ring-2 ring-red-300 hover:bg-red-500 md:bottom-6 md:right-6"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      <div
        className={clsx(
          "fixed bottom-20 right-4 z-40 w-[90vw] max-w-sm translate-y-4 opacity-0 transition-all duration-200 md:bottom-24 md:right-6",
          open && "translate-y-0 opacity-100"
        )}
      >
        <div className="flex h-80 flex-col overflow-hidden rounded-2xl bg-slate-950/95 ring-1 ring-slate-800 shadow-2xl shadow-black/80 backdrop-blur">
          <div className="flex items-center justify-between bg-gradient-to-r from-red-700 to-red-600 px-3 py-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-red-50">
                iStudents Assistant
              </span>
              <span className="text-[10px] text-red-100/80">
                International onboarding · IIT Chicago
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/15 p-1 text-red-50 hover:bg-white/25"
            >
              <X className="h-3 w-3" />
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-[11px] text-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={clsx(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={clsx(
                    "max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2",
                    m.role === "user"
                      ? "bg-red-600 text-white"
                      : "bg-slate-900 text-slate-100"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-slate-900 px-3 py-2 text-[11px] text-slate-300">
                  Typing…
                </div>
              </div>
            )}
            {error && (
              <div className="text-[10px] text-red-300">
                Error: {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-800 bg-slate-950/90 px-3 py-2"
          >
            <div className="flex items-end gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about visas, housing, academics, or campus life…"
                className="flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-[11px] text-slate-50 outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
