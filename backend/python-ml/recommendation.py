#import libraries
import pandas as pd #for working with tables (Data Frames)
from sklearn.metrics.pairwise import cosine_similarity #measures how similar two users are based on their video scores.
from collections import Counter

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
def get_priority_categories(user_id):
    user = next((u for u in users if u["_id"] == user_id), None)
    if not user:
        return []

    watched = set(user.get("watchHistory", []))
    liked = set(user.get("likedVideos", []))

    both = Counter()
    only_watched = Counter()

    for video in videos:
        if video["_id"] in watched and video["_id"] in liked:
            both.update(video["categoryIds"])
        elif video["_id"] in watched:
            only_watched.update(video["categoryIds"])

    # Return sorted list: first from both, then from watched-only
    sorted_both = [cat for cat, _ in both.most_common()]
    sorted_only = [cat for cat, _ in only_watched.most_common() if cat not in sorted_both]
    return sorted_both + sorted_only

# 🔹 Step 2: Generate recommendations based on priority categories
def generate_category_recommendations(user_id):
    user = next((u for u in users if u["_id"] == user_id), None)
    if not user:
        return []

    watched = set(user.get("watchHistory", []))
    priority_categories = get_priority_categories(user_id)

    recommendations = []

    for cat_id in priority_categories:
        for video in videos:
            if video["_id"] not in watched and video["_id"] not in recommendations:
                if cat_id in video["categoryIds"]:
                    recommendations.append(video["_id"])
            if len(recommendations) >= 5:
                break
        if len(recommendations) >= 5:
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