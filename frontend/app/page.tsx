"use client";

import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import InputArea from "../components/InputArea";
import Loading from "../components/Loading";
import ResultSection from "../components/ResultSection";
import Footer from "../components/Footer";
import { useGenerate } from "../hooks/useGenerate";

export default function Home() {
  const {
    generate,
    isLoading,
    error,
    result,
    setResult,
    setError
  } = useGenerate();

  const handleGenerateStart = () => {
    // Handled internally by hook, but we can do custom page resets if needed
  };

  const handleGenerateSuccess = (data: any) => {
    // Automatically triggers hook state updates, now handle side-effects like scrolling
    setTimeout(() => {
      const resultsEl = document.getElementById("results");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleGenerateError = (errMsg: string) => {
    // Hook automatically logs and handles errors, this allows page specific notifications
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <Hero />

      {/* Stats Section with Scroll Animation */}
      <StatsSection />

      {/* Input Generator Form Container */}
      <div className="relative mt-16">
        <InputArea
          onGenerateStart={handleGenerateStart}
          onGenerateSuccess={handleGenerateSuccess}
          onGenerateError={handleGenerateError}
          isLoading={isLoading}
        />
      </div>

      {/* Loading AI thinking status sequence */}
      {isLoading && (
        <div className="mt-12 animate-fade-in">
          <Loading />
        </div>
      )}

      {/* Central Error Payload Boundary */}
      {error && (
        <div className="mx-auto w-full max-w-2xl px-4 mt-8 animate-fade-in">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center">
            <h4 className="text-sm font-bold text-red-400">Generation Failed</h4>
            <p className="mt-1 text-xs text-red-300/80">{error}</p>
          </div>
        </div>
      )}

      {/* Test Results Dashboard & Export Actions */}
      <ResultSection data={result} />

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
