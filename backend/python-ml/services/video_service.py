import requests
import os
from dotenv import load_dotenv
load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL')

def extract_liked_video_ids(liked_video_array):
    """
    Extracts videoId from liked video entries.
    """
    return [item['videoId'] for item in liked_video_array if 'videoId' in item]


def get_video_by_id(video_id):
    """
    Fetches the video information from the Node.js backend using the provided video ID.
    """
    
    url = f'{BACKEND_URL}/api/content/video/{video_id}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching video data: {e}")
        return None
    
    
def fetch_videos():
    """
    Fetches all videos from the Node.js backend.
    """
    url = f'{BACKEND_URL}/api/content/video/'
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching video data: {e}")
        return None
    
def get_history(token):
    """
    Fetches the watchlist of the authenticated user from the Node.js backend
    using the provided Authorization token.
    """
    
    url = f'{BACKEND_URL}/api/content/history/'
    headers = {'Authorization': token}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching history data: {e}")
        return None