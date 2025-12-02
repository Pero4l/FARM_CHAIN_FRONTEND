"use client";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://farmchain.onrender.com/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("fc-email", email);
        window.location.href = "/enter-otp";
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Network error.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <p className="mb-6 text-gray-600">Enter your email to receive a 4-digit OTP.</p>

      <input
        className="w-full border p-3 rounded-lg mb-4"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSendOTP}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}
