import { mastra } from "./src/mastra/index.js";

async function main() {
  try {
    console.log("Testing Dog Agent...");

    const agent = await mastra.getAgent("dogAgent");

    const result = await agent.generate("Show me a cute dog picture and tell me an interesting dog fact!");

    console.log("Agent response:", result.text);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
