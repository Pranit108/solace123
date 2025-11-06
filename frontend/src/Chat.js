import React, { useState, useEffect } from "react";
import {
  collection, addDoc, query, orderBy, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Chat({ user, matchUser, onExit }) {
  const roomId = [user.email, matchUser.email].sort().join("_"); // stable id
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("timestamp")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => d.data()));
    });
    return unsub;
  }, [roomId]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    await addDoc(collection(db, "chats", roomId, "messages"), {
      text,
      sender: user.email,
      senderName: user.name,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-96 max-w-full">
      <h2 className="text-lg font-bold text-orange-600 mb-3 text-center">
        Chat with {matchUser.name}
      </h2>

      <div className="h-64 overflow-y-auto border rounded p-2 bg-orange-50 mb-3">
        {messages.map((m, i) => {
          const mine = m.sender === user.email;
          return (
            <p key={i} className={`my-1 ${mine ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-2 py-1 rounded-lg ${mine ? "bg-orange-200" : "bg-gray-200"}`}>
                {m.text}
              </span>
            </p>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Send
        </button>
      </div>

      <button onClick={onExit} className="text-sm text-gray-500 mt-2 hover:underline">
        Back
      </button>
    </div>
  );
}
