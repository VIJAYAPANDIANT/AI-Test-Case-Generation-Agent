"use client";

import React, { useState } from "react";
import { generateTestCases } from "../services/api";
import { Play, Sparkles, Terminal, FileCode, ShieldAlert } from "lucide-react";

interface InputAreaProps {
  onGenerateStart: () => void;
  onGenerateSuccess: (data: any) => void;
  onGenerateError: (error: string) => void;
  isLoading: boolean;
}

const TEMPLATES = [
  {
    name: "Express Login API",
    icon: Terminal,
    prompt: `POST /api/auth/login
Body:
{
  "email": "user@example.com",
  "password": "Password123"
}
Requirements:
1. Validate email format.
2. Hash password verification.
3. Return JWT token on success.
4. Return 401 on incorrect password.
5. Return 404 if email is not registered.`
  },
  {
    name: "React Counter Component",
    icon: FileCode,
    prompt: `import React, { useState } from 'react';

export default function Counter({ initialCount = 0, min = 0, max = 10 }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    if (count < max) setCount(count + 1);
  };

  const decrement = () => {
    if (count > min) setCount(count - 1);
  };

  return (
    <div>
      <button onClick={decrement} data-testid="dec">-</button>
      <span data-testid="count">{count}</span>
      <button onClick={increment} data-testid="inc">+</button>
    </div>
  );
}`
  },
  {
    name: "Secure Payment Verification",
    icon: ShieldAlert,
    prompt: `function verifyPaymentSignature(payload, signature, secret) {
  if (!payload || !signature || !secret) {
    throw new Error("Missing parameters");
  }
  const crypto = require("crypto");
  const hash = crypto.createHmac("sha256", secret)
                     .update(JSON.stringify(payload))
                     .digest("hex");
  return hash === signature;
}`
  }
];

export default function InputArea({
  onGenerateStart,
  onGenerateSuccess,
  onGenerateError,
  isLoading
}: InputAreaProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    onGenerateStart();
    try {
      const data = await generateTestCases(prompt);
      onGenerateSuccess(data);
    } catch (err: any) {
      onGenerateError(err.message || "An unexpected error occurred. Please make sure the backend is running.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4" id="generator">
      {/* Templates Row */}
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2.5">
          Select a Sample Template
        </label>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((tpl, i) => {
            const Icon = tpl.icon;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPrompt(tpl.prompt)}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-slate-900 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-900/60 px-3.5 py-2 text-xs font-medium text-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                <Icon className="h-3.5 w-3.5 text-indigo-400" />
                {tpl.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-3 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste API details, requirements, or code..."
          rows={10}
          disabled={isLoading}
          className="w-full resize-y bg-transparent p-4 text-slate-200 placeholder-slate-500 focus:outline-none font-mono text-sm leading-relaxed border-0 rounded-xl"
        />

        <div className="flex items-center justify-between border-t border-white/5 pt-3 px-2">
          <span className="text-xs text-slate-500 font-mono">
            {prompt.length} characters
          </span>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-indigo-500/35 focus:outline-none disabled:opacity-50 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Test Cases</span>
            <Play className="h-3.5 w-3.5 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
