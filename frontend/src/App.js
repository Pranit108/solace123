import React, { useState, useCallback } from "react";
import axios from "axios";
import Chat from "./Chat"; // <-- import Chat component

// Reusable Card component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white shadow-md p-6 rounded-2xl ${className}`}
    style={{ width: "24rem", maxWidth: "90vw" }}
  >
    {children}
  </div>
);

export default function App() {
  const [view, setView] = useState("register"); // register | login | profile | matches
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    tags: [],
    interests: "",
  });
  const [matches, setMatches] = useState([]);
  const [chatUser, setChatUser] = useState(null); // <-- selected user to chat with

  // Change port if Flask runs on 5001 instead of 5000
  const API = "http://localhost:5001/api";

  const tagOptions = [
    "Study Buddy",
    "Sports Partner",
    "Reading Partner",
    "Event Partner",
    "Music Jamming",
    "Tech Projects",
    "Fitness",
    "Volunteer",
    "Gaming",
    "Coffee Chats",
  ];

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const toggleTag = (tag) => {
    setForm((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };

  const register = async () => {
    try {
      const res = await axios.post(`${API}/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        bio: form.bio,
        tags: form.tags,
        interests: form.interests.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setUser(res.data.user);
      setView("profile");
    } catch (err) {
      alert(err.response?.data?.error || "Error registering");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, {
        email: form.email,
        password: form.password,
      });
      setUser(res.data.user);
      setView("profile");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const getMatches = async () => {
    try {
      const res = await axios.get(`${API}/match?user_id=${user.id}`);
      setMatches(res.data);
      setView("matches");
    } catch (err) {
      alert("Error fetching matches");
    }
  };

  const logout = () => {
    setUser(null);
    setView("login");
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Campus Connect
      </h1>

      {/* === REGISTER === */}
      {view === "register" && (
        <Card>
          <h2 className="text-xl font-semibold mb-3 text-center">Register</h2>
          <input
            className="border p-2 w-full mb-2 rounded"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="border p-2 w-full mb-2 rounded"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="border p-2 w-full mb-2 rounded"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <textarea
            className="border p-2 w-full mb-2 rounded"
            name="bio"
            placeholder="Short bio"
            value={form.bio}
            onChange={handleChange}
          />

          <label className="block mb-1 font-semibold text-orange-700">
            Select Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tagOptions.map((tag) => {
              const isSelected = form.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                    isSelected
                      ? "bg-orange-500 text-white border-orange-500 shadow-md scale-105"
                      : "bg-white text-orange-600 border-orange-400 hover:bg-orange-100"
                  }`}
                >
                  {isSelected ? `✅ ${tag}` : tag}
                </button>
              );
            })}
          </div>

          <input
            className="border p-2 w-full mb-3 rounded"
            name="interests"
            placeholder="Interests (comma-separated)"
            value={form.interests}
            onChange={handleChange}
          />

          <button
            className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
            onClick={register}
          >
            Sign Up
          </button>
          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <button
              className="text-orange-600 hover:underline"
              onClick={() => setView("login")}
            >
              Login
            </button>
          </p>
        </Card>
      )}

      {/* === LOGIN === */}
      {view === "login" && (
        <Card>
          <h2 className="text-xl font-semibold mb-3 text-center">Login</h2>
          <input
            className="border p-2 w-full mb-2 rounded"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="border p-2 w-full mb-3 rounded"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600"
            onClick={login}
          >
            Login
          </button>
          <p className="text-sm mt-2 text-center">
            New here?{" "}
            <button
              className="text-orange-600 hover:underline"
              onClick={() => setView("register")}
            >
              Register
            </button>
          </p>
        </Card>
      )}

      {/* === PROFILE === */}
      {view === "profile" && user && (
        <Card>
          <h2 className="text-xl font-semibold mb-2 text-center text-orange-700">
            Welcome, {user.name}
          </h2>
          <p className="text-gray-600 mb-4">{user.bio}</p>
          <div className="text-left mb-3">
            <p>
              <b>Tags:</b> {user.tags.join(", ")}
            </p>
            <p>
              <b>Interests:</b> {user.interests.join(", ")}
            </p>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2 hover:bg-green-600"
            onClick={getMatches}
          >
            Find Matches
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded w-full hover:bg-gray-400"
            onClick={logout}
          >
            Logout
          </button>
        </Card>
      )}

      {/* === MATCHES === */}
      {view === "matches" && (
        <Card className="w-[30rem]">
          <h2 className="text-xl font-semibold mb-3 text-center">
            Your Matches
          </h2>
          {matches.length === 0 && <p>No matches found yet!</p>}
          {matches.map((m, i) => (
            <div key={i} className="border-b py-2">
              <p className="font-bold text-orange-700">
                {m.user.name} ({m.score}%)
              </p>
              <p className="text-sm text-gray-600">{m.user.bio}</p>
              <p className="text-sm">Tags: {m.user.tags.join(", ")}</p>
              <p className="text-sm">Interests: {m.user.interests.join(", ")}</p>

              {/* CHAT BUTTON */}
              <button
                className="text-sm text-orange-600 mt-1"
                onClick={() => setChatUser(m.user)}
              >
                💬 Chat
              </button>
            </div>
          ))}
          <button
            className="bg-gray-300 px-4 py-2 rounded w-full mt-3 hover:bg-gray-400"
            onClick={() => setView("profile")}
          >
            Back
          </button>
        </Card>
      )}

      {/* === CHAT POPUP === */}
      {chatUser && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <Chat
            user={user}
            matchUser={chatUser}
            onExit={() => setChatUser(null)}
          />
        </div>
      )}
    </div>
  );
}
