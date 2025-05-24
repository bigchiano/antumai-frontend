// app/page.tsx (Landing Page)
"use client";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://antumai-backend.netlify.app/ask", {
        name, 
        input: message,
      });
      const data = await res.data;
      setResponse(data.reply);
      // Use TTS
      const utterance = new SpeechSynthesisUtterance(data.reply);
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error(err);
      setResponse("Sorry, something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Head>
        <title>AntumAI</title>
        <meta name="description" content="Your personal AI, owned by you." />
      </Head>

      {/* Header */}
      <header className="w-full py-6 px-4 md:px-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">AntumAI</h1>
        <Link
          href="/signup"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Try It Now
        </Link>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-12 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Your AI. Your Data. Your Control.
        </h2>
        <p className="text-lg md:text-xl mb-8">
          AntumAI is making it easier for you to have your own AI trained on
          your data, running on your terms, and owned by you. It’s like having
          your personal AI in a mobile app but private, open, and under your
          control.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full max-w-md px-4 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="How was your day?"
            className="w-full max-w-md px-4 py-2 border rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Talk to AI"}
          </button>
        </form>
        {response && (
          <div className="mt-6 text-lg text-left bg-gray-100 p-4 rounded-md max-w-2xl mx-auto">
            <p>
              <strong>AntumAI:</strong> {response}
            </p>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8">Why AntumAI?</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="text-xl font-semibold mb-2">Privacy First</h4>
              <p>
                Everything runs on your terms. No centralized data harvesting.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Truly Yours</h4>
              <p>
                Train AI on your own data. Your conversations belong to you.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Mobile-Ready</h4>
              <p>
                Works like an app — fast, sleek, and always there when you need
                it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AntumAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
