import { useState } from "react";
import { generateTestCases } from "../services/api";
import { TestResult } from "../types/testResult";

export function useGenerate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);

  const generate = async (prompt: string): Promise<TestResult> => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await generateTestCases(prompt);
      setResult(data);
      return data;
    } catch (err: any) {
      const errMsg = err.message || "An unexpected error occurred. Please ensure the backend server is running.";
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    result,
    setResult,
    setError,
    setIsLoading
  };
}
