import { generateTestSuite } from "../services/geminiService.js";

/**
 * Handle POST request to generate test suite from code or specs.
 * @route POST /api/generate
 */
export async function generateTestCases(req, res, next) {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      res.status(400);
      throw new Error("Request body must include a non-empty 'prompt' string.");
    }

    const testSuite = await generateTestSuite(prompt);
    res.status(200).json(testSuite);
  } catch (error) {
    next(error);
  }
}
