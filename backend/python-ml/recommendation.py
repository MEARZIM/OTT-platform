#import libraries
import pandas as pd #for working with tables (Data Frames)
from sklearn.metrics.pairwise import cosine_similarity #measures how similar two users are based on their video scores.
from collections import Counter
from services.video_service import get_video_by_id, fetch_videos

# Dummy category data
categories = [
    {"_id": "c1", "name": "comedy"},
    {"_id": "c2", "name": "drama"},
    {"_id": "c3", "name": "action"},
    {"_id": "c4", "name": "thriller"},
]

# Dummy video data (Video + VideoCategory combined)
videos = [
    {"_id": "v1", "title": "Funny Cats", "categoryIds": ["c1"]},
    {"_id": "v2", "title": "Superhero Movie", "categoryIds": ["c1", "c3"]},
    {"_id": "v3", "title": "Family Drama", "categoryIds": ["c2"]},
    {"_id": "v4", "title": "Sad Ending", "categoryIds": ["c2"]},
    {"_id": "v5", "title": "Car Chase", "categoryIds": ["c3"]},
    {"_id": "v6", "title": "Murder Mystery", "categoryIds": ["c4"]},
    {"_id": "v7", "title": "Laugh Riot", "categoryIds": ["c1"]},
    {"_id": "v8", "title": "Epic Drama", "categoryIds": ["c2"]},
]

# Dummy user behavior
users = [
    {"_id": "u1", "watchHistory": ["v1", "v2"], "likedVideos": ["v2"]},
    {"_id": "u2", "watchHistory": ["v2", "v3", "v5"], "likedVideos": ["v3"]},
    {"_id": "u3", "watchHistory": ["v3", "v4", "v6"], "likedVideos": ["v4"]},
]

# 🔹 Helpers
def get_category_name(cat_id):
    for cat in categories:
        if cat["_id"] == cat_id:
            return cat["name"]
    return None

def get_video(video_id):
    return next((v for v in videos if v["_id"] == video_id), None)

# 🔹 Step 1: Prioritize categories (watched + liked > watched only)
def get_priority_categories(liked_category_ids, watched_category_ids):
    
    both = Counter()
    only_watched = Counter()
    
    
    for cat_id in watched_category_ids:
        if cat_id in liked_category_ids:
            both[cat_id] += 1
        else:
            only_watched[cat_id] += 1
    
    # videos = fetch_videos()  # Fetch all videos from the backend

    # for video in videos:
    #     video_id = video.get("id")
    #     video_category_ids = [cat["categoryId"] for cat in video.get("categories", [])]
    #      # Check if any of the video categories are in the watched categories
    #     common_categories_ids = set(video_category_ids).intersection(watched_category_ids)
        
    #     # If there's an intersection with liked categories, add to 'both' counter
    #     liked_common_categories_ids = set(video_category_ids).intersection(liked_category_ids)
    #     if liked_common_categories_ids and common_categories_ids:
    #         both.update(liked_common_categories_ids)
    #     elif common_categories_ids:  # If only watched categories
    #         only_watched.update(common_categories_ids)

    # Return sorted list: first from both, then from watched-only
    sorted_both = [cat for cat, _ in both.most_common()]
    sorted_only = [cat for cat, _ in only_watched.most_common() if cat not in sorted_both]
    return sorted_both + sorted_only

# 🔹 Step 2: Generate recommendations based on priority categories
def generate_category_recommendations(all_liked_categories, watched_videos):
    # user = next((u for u in users if u["_id"] == user_id), None)
    # if not user:
    #     return []

    #watched = set(user.get("watchHistory", []))
    
    liked_category_ids = [cat["id"] for sublist in all_liked_categories for cat in sublist if "id" in cat]
    watched_video_ids = [item["videoId"] for item in watched_videos]
    watched_category_ids = []
    for video_id in watched_video_ids:
        video = get_video_by_id(video_id)
        categories = video.get("categories", [])
        for cat in categories:
            watched_category_ids.append(cat["categoryId"])
        
    #return (watched_category_ids)

    
    priority_category_ids = get_priority_categories(liked_category_ids, watched_category_ids)
    #return priority_category_ids

    videos = fetch_videos() 
    #return videos

    recommendations = []

    for cat_id in priority_category_ids:
        for video in videos:
            video_id = video.get("id")
            video_category_ids = [cat["categoryId"] for cat in video.get("categories", [])]
            #return(category_ids)
            if video_id not in watched_video_ids and video_id not in recommendations:
                #print(f"Checking video {video_id} against category {cat_id}")
                if cat_id in video_category_ids:
                    recommendations.append(video_id)
            if len(recommendations) >= 8:
                break
        if len(recommendations) >= 8:
            break

    return recommendations

# 🔹 Step 3: Run and display
if __name__ == "__main__":
    user_id = "u2"  # Change this to test other users (u1, u2, u3)
    recommended_ids = generate_category_recommendations(user_id)
    print(f"\n🎯 Recommended videos for user {user_id}:\n")
    for vid in recommended_ids:
        video = get_video(vid)
        category_names = [get_category_name(cid) for cid in video["categoryIds"]]
        print(f"• {video['title']} ({', '.join(category_names)})")