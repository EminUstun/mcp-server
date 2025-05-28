import requests
import json

def getDefinitions(word: str) -> str:
    """
    Get definitions for a word.
    """
    # Use 'https://api.dictionaryapi.dev/api/v2/entries/en/<word>' to get definitions
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        definitions = []
        for meaning in data[0]['meanings']:
            for definition in meaning['definitions']:
                definitions.append(definition['definition'])
        return "\n".join(definitions)
    else:
        return "No definitions found."