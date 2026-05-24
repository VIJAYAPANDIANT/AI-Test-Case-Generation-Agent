import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Ensure the API key is present
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
}

const genAI = new GoogleGenerativeAI(apiKey || "dummy-key");

/**
 * Generates five categories of test cases using Gemini based on a given prompt.
 * @param {string} prompt Input requirements, code snippet, or endpoint details
 * @returns {Promise<Object>} Object containing unitTests, integrationTests, edgeCases, securityTests, and performanceTests
 */
export async function generateTestSuite(prompt) {
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  
  // Define response schema for arrays as requested
  const responseSchema = {
    type: "OBJECT",
    properties: {
      unitTests: {
        type: "ARRAY",
        items: { type: "STRING" },
        description: "List of unit test cases verifying positive, negative, and validation flows."
      },
      integrationTests: {
        type: "ARRAY",
        items: { type: "STRING" },
        description: "List of integration test cases verifying end-to-end interactions and database queries."
      },
      edgeCases: {
        type: "ARRAY",
        items: { type: "STRING" },
        description: "List of edge case test cases verifying boundary limits, empty inputs, and unusual user actions."
      },
      securityTests: {
        type: "ARRAY",
        items: { type: "STRING" },
        description: "List of security test cases verifying vulnerabilities, injection safety, and access risks."
      },
      performanceTests: {
        type: "ARRAY",
        items: { type: "STRING" },
        description: "List of performance test cases verifying throughput limits and bottlenecks."
      }
    },
    required: ["unitTests", "integrationTests", "edgeCases", "securityTests", "performanceTests"]
  };

  const systemInstruction = 
    "You are an expert QA Engineer.\n\n" +
    "Analyze user requirements and generate:\n" +
    "1. Unit Tests\n" +
    "2. Integration Tests\n" +
    "3. Edge Cases\n" +
    "4. Security Tests\n" +
    "5. Performance Tests\n\n" +
    "Rules:\n" +
    "- Include positive tests\n" +
    "- Include negative tests\n" +
    "- Include validation tests\n" +
    "- Include security risks\n" +
    "- Include unusual user actions\n" +
    "- Include performance bottlenecks\n\n" +
    "Return ONLY JSON matching the requested structure.";

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.2
    }
  });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: `User requirements:\n\n${prompt}` }]
      }
    ]
  });

  const responseText = response.response.text();
  const rawJson = JSON.parse(responseText);

  // Map the arrays of strings into double-newline separated strings for frontend rendering
  return {
    unitTests: Array.isArray(rawJson.unitTests) ? rawJson.unitTests.join("\n\n") : "",
    integrationTests: Array.isArray(rawJson.integrationTests) ? rawJson.integrationTests.join("\n\n") : "",
    edgeCases: Array.isArray(rawJson.edgeCases) ? rawJson.edgeCases.join("\n\n") : "",
    securityTests: Array.isArray(rawJson.securityTests) ? rawJson.securityTests.join("\n\n") : "",
    performanceTests: Array.isArray(rawJson.performanceTests) ? rawJson.performanceTests.join("\n\n") : ""
  };
}
