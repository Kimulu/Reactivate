from flask import Flask, request, jsonify
from flask_cors import CORS
from mongoengine import connect, disconnect
from models.user import User
from models.challenge import Challenge
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')

# Enable CORS
CORS(app)

# Database connection
def connect_db():
    """Connect to MongoDB"""
    try:
        connect(host=os.getenv('MONGODB_URI', 'mongodb://localhost:27017/reactivate'))
        print("Connected to MongoDB successfully!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")

def disconnect_db():
    """Disconnect from MongoDB"""
    try:
        disconnect()
        print("Disconnected from MongoDB")
    except Exception as e:
        print(f"Error disconnecting from MongoDB: {e}")

# User Management Routes
@app.route('/api/users', methods=['POST'])
def create_user():
    """Create a new user"""
    try:
        data = request.get_json()
        if not data or 'userId' not in data:
            return jsonify({'error': 'userId is required'}), 400
        
        userId = data['userId']
        
        # Check if user already exists
        existing_user = User.objects(userId=userId).first()
        if existing_user:
            return jsonify({'error': 'User already exists'}), 409
        
        # Create new user
        new_user = User(userId=userId)
        new_user.save()
        
        return jsonify({
            'message': 'User created successfully',
            'user': {
                'userId': new_user.userId,
                'score': new_user.score,
                'rank': new_user.rank,
                'completedChallenges': new_user.completedChallenges
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<userId>', methods=['GET'])
def get_user(userId):
    """Get user profile data"""
    try:
        user = User.objects(userId=userId).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'userId': user.userId,
            'score': user.score,
            'rank': user.rank,
            'completedChallenges': user.completedChallenges
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Challenge Management Routes
@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    """Get all challenges"""
    try:
        challenges = Challenge.objects.all()
        challenges_list = []
        
        for challenge in challenges:
            challenges_list.append({
                'id': challenge.challenge_id,
                'title': challenge.title,
                'description': challenge.description,
                'difficulty': challenge.difficulty,
                'starterCode': challenge.starterCode
            })
        
        return jsonify(challenges_list), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/challenges/<challenge_id>', methods=['GET'])
def get_challenge(challenge_id):
    """Get a specific challenge"""
    try:
        challenge = Challenge.objects(challenge_id=challenge_id).first()
        if not challenge:
            return jsonify({'error': 'Challenge not found'}), 404
        
        return jsonify({
            'id': challenge.challenge_id,
            'title': challenge.title,
            'description': challenge.description,
            'difficulty': challenge.difficulty,
            'starterCode': challenge.starterCode,
            'testCases': challenge.testCases
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/challenges/<challenge_id>/complete', methods=['POST'])
def complete_challenge(challenge_id):
    """Complete a challenge and update user score"""
    try:
        data = request.get_json()
        if not data or 'userId' not in data or 'score' not in data:
            return jsonify({'error': 'userId and score are required'}), 400
        
        userId = data['userId']
        score = data['score']
        
        # Check if user exists
        user = User.objects(userId=userId).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Check if challenge exists
        challenge = Challenge.objects(challenge_id=challenge_id).first()
        if not challenge:
            return jsonify({'error': 'Challenge not found'}), 404
        
        # Check if user already completed this challenge
        if challenge_id in user.completedChallenges:
            return jsonify({'error': 'Challenge already completed'}), 409
        
        # Update user score and completed challenges
        user.score += score
        user.completedChallenges.append(challenge_id)
        
        # Recalculate rank (simple implementation - can be optimized)
        all_users = User.objects.order_by('-score')
        rank = 1
        for u in all_users:
            if u.userId == userId:
                user.rank = rank
                break
            rank += 1
        
        user.save()
        
        return jsonify({
            'message': 'Challenge completed successfully',
            'user': {
                'userId': user.userId,
                'score': user.score,
                'rank': user.rank,
                'completedChallenges': user.completedChallenges
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Leaderboard Route
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get top users for leaderboard"""
    try:
        # Get top 100 users sorted by score
        top_users = User.objects.order_by('-score').limit(100)
        
        leaderboard = []
        for user in top_users:
            leaderboard.append({
                'userId': user.userId,
                'score': user.score,
                'rank': user.rank
            })
        
        return jsonify(leaderboard), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check route
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Reactivate API is running'}), 200

if __name__ == '__main__':
    # Connect to database
    connect_db()
    
    # Run the app
    host = os.getenv('API_HOST', '0.0.0.0')
    port = int(os.getenv('API_PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    app.run(host=host, port=port, debug=debug) 