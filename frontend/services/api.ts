export interface GenerateResponse {
  unitTests: string;
  integrationTests: string;
  edgeCases: string;
  securityTests: string;
  performanceTests: string;
}

/**
 * Sends requirements, code, or API specs to the backend for test case generation.
 * @param prompt Requirements, code snippet, or API endpoint details.
 * @returns An object containing generated test cases categorized by type.
 */
export async function generateTestCases(prompt: string): Promise<GenerateResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://ai-test-case-generation-agent-5gnq.vercel.app";
  
  const response = await fetch(`${apiUrl}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
