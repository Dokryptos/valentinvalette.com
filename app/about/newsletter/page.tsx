"use client";
import { useState } from "react";

export default function NewslettersPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setMessage("Thank you! You are subscribed.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.error || "An error occurred.");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl">
        <div>Receive updates and download the latest portfolio as a PDF.</div>
      </div>
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="text-[#767676] text-[8px] flex justify-between mb-1">
          <span>Email*</span>
          <span>*required</span>
        </div>
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded text-[12px] mb-2 w-full"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-black text-white px-3 py-1 rounded text-[12px]"
        >
          Subscribe
        </button>
      </form>
      {message && (
        <div
          className={`mt-2 text-[12px] ${status === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
