import requests
from flask import Flask, request, jsonify
from recommendation import generate_category_recommendations, get_video, get_category_name
from services.user_service import get_users_details, get_users_details_by_id
from services.video_service import extract_liked_video_ids, get_history, get_video_by_id, fetch_videos
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/')
def home():
    return "🎬 Welcome to the Video Recommendation API"


    #user_id = request.args.get('user_id')
    user_id = "u2";
    if not user_id:
        return jsonify({"error": "Missing user_id parameter"}), 400

    recommended_ids = generate_category_recommendations(user_id)
    results = []

    for vid in recommended_ids:
        video = get_video(vid)
        if video:
            category_names = [get_category_name(cid) for cid in video["categoryIds"]]
            results.append({
                "videoId": vid,
                "title": video["title"],
                "categories": category_names
            })

    return jsonify({
        "user": user_id,
        "recommendations": results
    })

@app.route('/recommend-videos', methods=['GET'])
def recommend_videos():
    #print(f"Received token: {token}")

    try:
        token = request.headers.get('Authorization')
        # print(f"Received token: {request.headers}")
        if not token:
            return jsonify({"error": "Missing Authorization token"}), 401
        
        user_data = get_users_details(token)
        if user_data is None:
            return jsonify({"error": "Failed to fetch user data"}), 500
        
        user_id = user_data.get('id')
        if not user_id:
            return jsonify({"error": "User ID not found in user data"}), 500
        
        user_details = get_users_details_by_id(user_id)
        if user_details is None:
            return jsonify({"error": "Failed to fetch user data by ID"}), 500
        
        watched_videos = get_history(token)
        #return jsonify(watched_videos)
        if watched_videos is None:
            return jsonify({"error": "Failed to fetch watched videos"}), 500
        
        liked_videos = user_details.get('likedVideos', [])
        #return jsonify(liked_videos)
        if not liked_videos:
            return jsonify({"error": "No liked videos found for the user"}), 404
        
        liked_videos_ids = extract_liked_video_ids(liked_videos)
        #return jsonify(liked_videos_ids)
        if not liked_videos_ids:
            return jsonify({"error": "No liked videos found for the user"}), 404
        
        video_details = []
        for video_id in liked_videos_ids:
            video = get_video_by_id(video_id)
            #return jsonify(video)
            if video:
                category_info = [{
                        "id": cat["category"]["id"],
                        "name": cat["category"]["name"]
                    }
                    for cat in video.get("categories", [])
                    if "category" in cat and "id" in cat["category"] and "name" in cat["category"]
                ]
                video_details.append({
                    "videoId": video_id,
                    "title": video.get("title"),
                    "description": video.get("description"),
                    "thumbnail": video.get("thumbnail"),
                    "categories": category_info
                })
                
        #return jsonify(video_details)
                
        all_liked_categories = [video["categories"] for video in video_details if "categories" in video]
        videos = fetch_videos()
        
        recommended_videoIds = generate_category_recommendations(all_liked_categories, watched_videos)
        results = []
        
        for video_id in recommended_videoIds:
            video = get_video_by_id(video_id)
            if video:
                results.append(video)
        
        #return jsonify(videos)
        
        return jsonify(results)
    
        # video_titles = [video['video']['title'] for video in results]
        # return jsonify(video_titles)



    except requests.exceptions.RequestException as e:
        # Step 3: Handle errors and print the error details
        print(f"Error fetching data: {e}")
        return jsonify({"error": "Failed to fetch data", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)