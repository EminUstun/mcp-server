import { createTool } from "@mastra/core/tools";
import { MCPClient } from "@mastra/mcp";
import { z } from "zod";

// Dog Image MCP Tool
export const dogImageTool = createTool({
  id: "get-dog-image",
  description: "Get a random dog image URL using the dog MCP server",
  inputSchema: z.object({}),
  outputSchema: z.object({
    imageUrl: z.string(),
  }),
  execute: async () => {
    try {
      // Create MCP client to connect to your dog MCP server
      const mcpClient = new MCPClient({
        name: "dog-mcp",
        serverConfig: {
          command: "python",
          args: ["-m", "server"],
          cwd: "../dictionary-mcp", // Path to your MCP server
        },
      });

      // Connect to the MCP server
      await mcpClient.connect();

      // Call the get_dog_image tool from your MCP server
      const result = await mcpClient.callTool("get_dog_image", {});

      // Disconnect from the MCP server
      await mcpClient.disconnect();

      return {
        imageUrl: result.content[0].text || "No image found.",
      };
    } catch (error) {
      console.error("Error calling dog image MCP:", error);
      return {
        imageUrl: `Error getting dog image: ${error.message}`,
      };
    }
  },
});

// Dog Fact MCP Tool
export const dogFactTool = createTool({
  id: "get-dog-fact",
  description: "Get a random dog fact using the dog MCP server",
  inputSchema: z.object({}),
  outputSchema: z.object({
    fact: z.string(),
  }),
  execute: async () => {
    try {
      // Create MCP client to connect to your dog MCP server
      const mcpClient = new MCPClient({
        name: "dog-mcp",
        serverConfig: {
          command: "python",
          args: ["-m", "server"],
          cwd: "../dictionary-mcp", // Path to your MCP server
        },
      });

      // Connect to the MCP server
      await mcpClient.connect();

      // Call the get_dog_fact tool from your MCP server
      const result = await mcpClient.callTool("get_dog_fact", {});

      // Disconnect from the MCP server
      await mcpClient.disconnect();

      return {
        fact: result.content[0].text || "No fact found.",
      };
    } catch (error) {
      console.error("Error calling dog fact MCP:", error);
      return {
        fact: `Error getting dog fact: ${error.message}`,
      };
    }
  },
});
