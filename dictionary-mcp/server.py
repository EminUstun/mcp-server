from mcp.server.fastmcp import FastMCP
from app import get_random_dog_image, get_random_dog_fact

# Initialize MCP server
mcp = FastMCP("dog-mcp")

@mcp.tool()
async def get_dog_image() -> str:
    """
    Get a random dog image URL.
    """
    return get_random_dog_image()

@mcp.tool()
async def get_dog_fact() -> str:
    """
    Get a random dog fact.
    """
    return get_random_dog_fact()

if __name__ == "__main__":
    mcp.run(transport="stdio")