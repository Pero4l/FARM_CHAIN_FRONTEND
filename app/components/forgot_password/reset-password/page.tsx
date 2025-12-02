"use client";
import React, { useState, useEffect } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("fc-reset-token") : "";

  useEffect(() => {
    if (!token) window.location.href = "/forgot-password";
  }, [token]);

  const handleReset = async () => {
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://farmchain.onrender.com/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("fc-reset-token");
        localStorage.removeItem("fc-email");
        window.location.href = "/login";
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setMessage("Network error.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <p className="mb-6 text-gray-600">Enter your new password.</p>

      <input
        className="w-full border p-3 rounded-lg mb-4"
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded-lg mb-4"
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Saving..." : "Reset Password"}
      </button>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}
