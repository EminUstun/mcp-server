from mcp.server.fastmcp import FastMCP
from app import getDefinitions

# Initialize MCP server
mcp = FastMCP("dictionary-mcp")

@mcp.tool()
async def get_definitions(word: str) -> str:
    """
    Get definitions for a word.
    """
    # Get definitions from the app
    definitions = getDefinitions(word)
    if not definitions:
        return "No definitions found."

    return definitions

if __name__ == "__main__":
    mcp.run(transport="stdio")