// components/chat/RealtimeGroupChat.tsx
"use client";
import { Star, StarOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPusherClient } from "@/lib/pusher";
import { Send, MessageCircle } from "lucide-react";

type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  roomSlug: string;
  student: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
  };
};

type ChatRoom = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  pinned?: boolean;
  isLastActive?: boolean;
};

type Props = {
  defaultRoomSlug?: string;
};

export function RealtimeGroupChat({ defaultRoomSlug = "new-arrivals" }: Props) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>(defaultRoomSlug);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load rooms on mount
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await fetch("/api/chat/rooms");
        const data = await res.json();
        if (res.ok) {
          setRooms(data.rooms || []);
        }
      } catch (err) {
        console.error("Load rooms error:", err);
      }
    };
    loadRooms();
  }, []);

  // Load messages for current room
  useEffect(() => {
    const loadMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await fetch(`/api/chat/messages?room=${currentRoom}`);
        const data = await res.json();
        if (res.ok) {
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.error("Load messages error:", err);
      } finally {
        setLoadingMessages(false);
      }
    };
    if (currentRoom) {
      loadMessages();
    }
  }, [currentRoom]);

  // Pusher subscription
  useEffect(() => {
    const pusher = createPusherClient();
    if (!pusher || !currentRoom) return;

    const channelName = `chat-room-${currentRoom}`;
    const channel = pusher.subscribe(channelName);

    const handler = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    channel.bind("message:new", handler);

    return () => {
      channel.unbind("message:new", handler);
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [currentRoom]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentRoom) return;
    setSending(true);
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomSlug: currentRoom,
          content: input.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Send message error:", data.error);
      } else {
        // Optimistic update not necessary because Pusher will broadcast
        setInput("");
      }
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSending(false);
    }
  };

const handleTogglePin = async (roomSlug: string, pin: boolean) => {
  try {
    const res = await fetch("/api/chat/rooms/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomSlug, pin })
    });
    if (!res.ok) return;

    setRooms((prev) =>
      prev.map((r) =>
        r.slug === roomSlug ? { ...r, pinned: pin } : r
      )
    );
  } catch (err) {
    console.error("Pin room error:", err);
  }
};

  const activeRoom = rooms.find((r) => r.slug === currentRoom);

  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-50">
              Group messaging
            </p>
            <p className="text-[11px] text-slate-400">
              Real-time rooms for arrivals, housing, and academic cohorts.
            </p>
          </div>
        </div>
      </div>

      {/* Rooms selector */}
      <div className="mb-2 flex gap-2 overflow-x-auto pb-1 text-[11px]">
  {rooms.map((room) => (
    <button
      key={room.slug}
      type="button"
      onClick={() => setCurrentRoom(room.slug)}
      className={`
        flex items-center gap-1 rounded-full border px-3 py-1
        ${
          room.slug === currentRoom
            ? "border-red-500 bg-red-600/40 text-red-50"
            : "border-slate-700 bg-slate-900 text-slate-200 hover:border-red-500/70 hover:text-red-100"
        }
      `}
    >
      {room.pinned && <Star className="h-3 w-3 text-yellow-300" />}
      <span>{room.name}</span>
      {room.isLastActive && (
        <span className="ml-1 rounded-full bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-200">
          last active
        </span>
      )}
    </button>
  ))}
</div>


      {activeRoom && (
        <p className="mb-2 text-[10px] text-slate-400">
          {activeRoom.description}
        </p>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-slate-950/70 p-2 text-[11px] ring-1 ring-slate-800">
        {loadingMessages ? (
          <p className="text-slate-400">Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="text-slate-400">
            No messages yet. Be the first to say hello 👋
          </p>
        ) : (
          <>
            {messages.map((m) => (
              <div key={m.id} className="mb-1.5">
                <p className="font-semibold text-slate-100">
                  {m.student.fullName}
                </p>
                <p className="text-slate-200">{m.content}</p>
                <p className="text-[9px] text-slate-500">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="mt-2 flex gap-2 text-[11px]">
        <input
          type="text"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-slate-100 outline-none focus:border-red-500"
          placeholder="Type a message for other IIT students..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          <Send className="mr-1 h-3 w-3" />
          Send
        </button>
      </form>
    </div>
  );
}
