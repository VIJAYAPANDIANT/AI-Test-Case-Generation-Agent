"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Mail, Github, User } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 animate-fade-in">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Terms of Service
          </h1>
        </div>

        <p className="text-slate-400 text-sm mb-8">
          Last Updated: May 25, 2026
        </p>

        {/* Content */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TestGen AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Description of Service</h2>
            <p>
              TestGen AI provides an automated test case generation utility leveraging the Google Gemini API. It processes source code and requirements specs to generate unit tests, integration tests, and edge case validation instructions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Code Ownership & Generated Test Cases</h2>
            <p>
              We claim no ownership over the source code, guidelines, or instructions you input into our application. All generated test cases and outputs belong entirely to you, and you are free to copy, modify, export, and distribute them under your own terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Disclaimer of AI Output Accuracy</h2>
            <p>
              TestGen AI leverages artificial intelligence models (specifically Google Gemini) to generate test suites. AI-generated outputs can sometimes contain errors, logic discrepancies, or hallucinations. You are solely responsible for verifying the accuracy, security, and suitability of the generated test code before running it in production environments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Acceptable Use</h2>
            <p>
              You agree not to use the service to generate malicious scripts, exploit software vulnerabilities, or intentionally bypass safety filters of the underlying AI models. We reserve the right to restrict access to users who violate these guidelines.
            </p>
          </section>

          <section className="rounded-2xl border border-white/5 bg-slate-900/25 p-6 backdrop-blur-md">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-indigo-400" />
              Contact & Administrator Details
            </h2>
            <p className="text-slate-400 mb-4">
              For any questions regarding these Terms of Service, or to request support, please reach out to the project administrator:
            </p>
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium w-24 text-xs uppercase tracking-wider">Admin:</span>
                <span className="text-slate-200 font-semibold text-sm">Vijayapandian T</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium w-24 text-xs uppercase tracking-wider">Email:</span>
                <a
                  href="mailto:vijayapandian112007@gmail.com"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors flex items-center gap-1.5"
                >
                  <Mail className="h-4 w-4" />
                  vijayapandian112007@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-medium w-24 text-xs uppercase tracking-wider">GitHub:</span>
                <a
                  href="https://github.com/VIJAYAPANDIANT"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors flex items-center gap-1.5"
                >
                  <Github className="h-4 w-4" />
                  github.com/VIJAYAPANDIANT
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
