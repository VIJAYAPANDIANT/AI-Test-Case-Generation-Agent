import { TestResult } from "../types/testResult";

/**
 * Trigger browser file download of generated test results as a JSON file.
 * @param data TestResult data
 * @param filename File name default
 */
export function downloadJson(data: TestResult, filename = "testgen-ai-suite.json") {
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download JSON:", err);
  }
}
