from flask import Flask, request, jsonify
from recommendation import generate_category_recommendations, get_video, get_category_name

app = Flask(__name__)

@app.route('/')
def home():
    return "🎬 Welcome to the Video Recommendation API"

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)