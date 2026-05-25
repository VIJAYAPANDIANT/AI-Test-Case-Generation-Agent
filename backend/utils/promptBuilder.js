/**
 * Utility to structure and clean user prompts before passing to the Gemini LLM.
 * @param {string} rawPrompt Raw user requirements or code
 * @returns {string} Formatted instruction prompt
 */
export function buildPrompt(rawPrompt) {
  if (!rawPrompt) return "";
  
  return `[User Code/Requirements Specification]:
--------------------------------------------------
${rawPrompt.trim()}
--------------------------------------------------
Please analyze the inputs above and generate the full suite of testing scenarios.`;
}
