/**
 * Utility functions for YAML extraction from agent files
 */

/**
 * Extract YAML content from agent markdown files
 * @param {string} agentContent - The full content of the agent file
 * @param {boolean} cleanCommands - Whether to clean command descriptions (default: false)
 * @returns {string|null} - The extracted YAML content or null if not found
 */
function extractYamlFromAgent(agentContent, cleanCommands = false) {
  // Remove carriage returns
  const cleanContent = agentContent.replaceAll('\r', '');

  // First try to match YAML code block format
  let yamlMatch = cleanContent.match(/```ya?ml\n([\s\S]*?)\n```/);

  // If no code block found, try YAML front matter format
  if (!yamlMatch) {
    yamlMatch = cleanContent.match(/^---\n([\s\S]*?)\n---/);
  }

  if (!yamlMatch) return null;

  let yamlContent = yamlMatch[1].trim();

  // Clean up command descriptions if requested
  // Converts "- command - description" to just "- command"
  if (cleanCommands) {
    yamlContent = yamlContent.replaceAll(/^(\s*-)(\s*"[^"]+")(\s*-\s*.*)$/gm, '$1$2');
  }

  return yamlContent;
}

module.exports = {
  extractYamlFromAgent,
};
