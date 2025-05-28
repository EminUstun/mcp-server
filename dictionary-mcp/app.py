import requests

def get_random_dog_image() -> str:
    """
    Get a random dog image URL.
    """
    try:
        url = "https://dog.ceo/api/breeds/image/random"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'success':
                return data.get('message', 'No image found.')
            else:
                return "Failed to fetch dog image."
        else:
            return "Error fetching dog image."
    except Exception as e:
        return f"Error: {str(e)}"

def get_random_dog_fact() -> str:
    """
    Get a random dog fact.
    """
    try:
        url = "https://dogapi.dog/api/v2/facts"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            facts = data.get('data', [])
            if facts:
                return facts[0].get('attributes', {}).get('body', 'No fact found.')
            else:
                return "No dog facts available."
        else:
            return "Error fetching dog fact."
    except Exception as e:
        return f"Error: {str(e)}"