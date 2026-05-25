import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { buildPrompt } from "../utils/promptBuilder.js";

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
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.log("[Mock API] Generating simulated test suite (No GEMINI_API_KEY found)");
    
    // Simulate 2 seconds of AI processing latency
    await new Promise(resolve => setTimeout(resolve, 2200));

    const isPayment = /payment|stripe|invoice|checkout/i.test(prompt);
    const isLogin = /login|auth|register|user/i.test(prompt);
    const targetName = isPayment ? "PaymentProcessor" : isLogin ? "AuthService" : "ComponentProcessor";

    return {
      unitTests: [
        `// Unit tests for ${targetName}\nimport { ${targetName} } from './index';`,
        `describe('${targetName} - Unit tests', () => {\n  it('should process valid input correctly', () => {\n    const response = ${targetName}.process({ id: 1, test: true });\n    expect(response.success).toBe(true);\n  });\n\n  it('should throw validation error on empty payload', () => {\n    expect(() => ${targetName}.process({})).toThrow('Validation Error');\n  });\n});`
      ].join("\n\n"),
      integrationTests: [
        `// Integration tests for ${targetName}\nimport request from 'supertest';\nimport app from './app';`,
        `describe('${targetName} - Integration pipelines', () => {\n  it('should pipe requests to the database layer', async () => {\n    const res = await request(app)\n      .post('/api/data')\n      .send({ payload: 'mock-data' });\n    expect(res.statusCode).toEqual(200);\n    expect(res.body.dbSaved).toBe(true);\n  });\n});`
      ].join("\n\n"),
      edgeCases: [
        `// Edge cases for ${targetName}`,
        `describe('${targetName} - Edge condition boundaries', () => {\n  it('should handle zero bounds gracefully', () => {\n    const response = ${targetName}.process({ value: 0 });\n    expect(response.status).toBe('zero_limit');\n  });\n\n  it('should reject extremely large payload volumes', () => {\n    const hugeInput = 'x'.repeat(1000000);\n    expect(() => ${targetName}.process({ data: hugeInput })).toThrow();\n  });\n});`
      ].join("\n\n"),
      securityTests: [
        `// Security tests for ${targetName}`,
        `describe('${targetName} - Security checks', () => {\n  it('should prevent SQL Injection attempts', () => {\n    const sqlPayload = "1' OR '1'='1";\n    const clean = ${targetName}.sanitize(sqlPayload);\n    expect(clean).not.toContain("'");\n  });\n\n  it('should block requests without valid authentication tokens', async () => {\n    const response = await ${targetName}.authorize({ token: null });\n    expect(response.authorized).toBe(false);\n  });\n});`
      ].join("\n\n"),
      performanceTests: [
        `// Performance tests for ${targetName}`,
        `describe('${targetName} - Benchmark responses', () => {\n  it('should complete processing under 150ms', async () => {\n    const start = Date.now();\n    await ${targetName}.runBenchmark();\n    const duration = Date.now() - start;\n    expect(duration).toBeLessThan(150);\n  });\n});`
      ].join("\n\n")
    };
  }
  
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
        parts: [{ text: buildPrompt(prompt) }]
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
