import requests
import os
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL')

def get_users_details(token):
    """
    Fetches the basic authenticated user information from the Node.js backend
    using the provided Authorization token.
    """
    
    url = f'{BACKEND_URL}/api/users'
    print(f"Fetching user details from {url} with token: {token}")
    headers = {'Authorization': token}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching user data: {e}")
        return None
    

def get_users_details_by_id(user_id):
    """
    Fetches the user information from the Node.js backend using the provided user ID.
    """
    
    url = f'{BACKEND_URL}/api/users/id/{user_id}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching user data: {e}")
        return None   
    
    
    