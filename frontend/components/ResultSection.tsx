"use client";

import React from "react";
import OutputCard from "./OutputCard";
import ExportButtons from "./ExportButtons";
import EmptyState from "./EmptyState";
import { TestResult } from "../types/testResult";
import { Cpu, Layers, AlertCircle, ShieldAlert, Zap, Terminal } from "lucide-react";

interface ResultSectionProps {
  data: TestResult | null;
}

export default function ResultSection({ data }: ResultSectionProps) {
  const cards = data
    ? [
        {
          title: "Unit Tests",
          content: data.unitTests,
          icon: Cpu,
          badgeColor: "bg-indigo-600/80 shadow-indigo-600/20 text-indigo-400"
        },
        {
          title: "Integration Tests",
          content: data.integrationTests,
          icon: Layers,
          badgeColor: "bg-purple-600/80 shadow-purple-600/20 text-purple-400"
        },
        {
          title: "Edge Cases",
          content: data.edgeCases,
          icon: AlertCircle,
          badgeColor: "bg-pink-600/80 shadow-pink-600/20 text-pink-400"
        },
        {
          title: "Security Tests",
          content: data.securityTests,
          icon: ShieldAlert,
          badgeColor: "bg-red-600/80 shadow-red-600/20 text-red-400"
        },
        {
          title: "Performance Tests",
          content: data.performanceTests,
          icon: Zap,
          badgeColor: "bg-amber-600/80 shadow-amber-600/20 text-amber-400"
        }
      ]
    : [];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mt-16 scroll-mt-24" id="results">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Terminal className="h-5.5 w-5.5 text-indigo-400" />
            Generated Test Results
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Review, copy, and implement your customized AI-generated test cases.
          </p>
        </div>

        {/* Render export tools if tests exist */}
        {data && (
          <div className="mt-4 md:mt-0">
            <ExportButtons data={data} />
          </div>
        )}
      </div>

      {/* Grid or Empty placeholder */}
      {!data ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`${
                i === 3 || i === 4
                  ? "lg:col-span-1 md:col-span-1"
                  : ""
              }`}
            >
              <OutputCard
                title={card.title}
                content={card.content}
                icon={card.icon}
                badgeColor={card.badgeColor}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
