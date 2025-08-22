# Reactivate - Backend Developer Briefing

## Overview
This document provides a detailed briefing for backend developers working on the Reactivate application, a Flask-based API with MongoDB integration for a coding challenge platform.

## Tech Stack
- **Backend Framework**: Flask
- **Database**: MongoDB
- **ODM**: MongoEngine or PyMongo
- **Language**: Python

## Project Structure
```
Reactivate/
├── app.py                 # Main Flask application
├── run.py                 # Simple run script
├── requirements.txt       # Python dependencies
├── env.example           # Environment variables template
├── setup.sh              # Automated setup script
├── seed_data.py          # Database seeding script
├── test_api.py           # API testing script
├── models/               # Database models
│   ├── __init__.py
│   ├── user.py           # User model
│   └── challenge.py      # Challenge model
└── readme.md             # This file
```

## Core API Endpoints & Logic

### 1. User Management

#### POST /api/users
**Purpose**: Create a new user document on their first visit.

**Logic**: 
- Receives a `userId` from the request
- Checks if the user already exists in the users collection
- If not, creates a new user document with initial values:
  - `score`: 0
  - `rank`: 0
  - `completedChallenges`: empty array

**Flask Route**:
```python
@app.route('/api/users', methods=['POST'])
```

#### GET /api/users/<userId>
**Purpose**: Fetch a user's profile data.

**Logic**: 
- Queries the users collection by the provided `userId`
- Returns the user's complete data

**Flask Route**:
```python
@app.route('/api/users/<userId>', methods=['GET'])
```

### 2. Challenge Management

#### GET /api/challenges
**Purpose**: Fetch a list of all challenges.

**Logic**: 
- Queries the challenges collection
- Returns a list of all challenge documents

**Flask Route**:
```python
@app.route('/api/challenges', methods=['GET'])
```

#### GET /api/challenges/<id>
**Purpose**: Fetch the details of a single challenge.

**Logic**: 
- Finds and returns a single challenge document by its `id`
- Includes description, starter code, and tests

**Flask Route**:
```python
@app.route('/api/challenges/<id>', methods=['GET'])
```

#### POST /api/challenges/<id>/complete
**Purpose**: Update a user's score and progress after completing a challenge.

**Logic**: 
- Receives `userId` and the score awarded for the challenge
- Updates the user's total score
- Adds the challenge's `id` to their `completedChallenges` array
- Recalculates and updates the user's rank

**Flask Route**:
```python
@app.route('/api/challenges/<id>/complete', methods=['POST'])
```

### 3. Leaderboard

#### GET /api/leaderboard
**Purpose**: Retrieve the top users for the leaderboard.

**Logic**: 
- Performs a query on the users collection
- Sorts by score in descending order
- Returns a limited list (e.g., top 100 users)

**Flask Route**:
```python
@app.route('/api/leaderboard', methods=['GET'])
```

## Database Schemas (MongoDB)

### User Schema/Model
```python
class User(Document):
    userId = StringField(required=True, unique=True)
    score = IntField(default=0)
    rank = IntField(default=0)
    completedChallenges = ListField(StringField(), default=[])
```

**Fields**:
- `userId`: A unique string identifier for the user
- `score`: A number representing their total points
- `rank`: A number for their leaderboard rank
- `completedChallenges`: An array of strings storing the id of each completed challenge

### Challenge Schema/Model
```python
class Challenge(Document):
    id = StringField(required=True, unique=True)
    title = StringField(required=True)
    description = StringField(required=True)
    difficulty = StringField(required=True, choices=['easy', 'medium', 'hard'])
    starterCode = StringField(required=True)
    testCases = ListField(DictField(), required=True)
```

**Fields**:
- `id`: A unique string identifier for the challenge
- `title`: A string for the challenge title
- `description`: A string with the challenge instructions
- `difficulty`: A string (e.g., "easy", "medium", "hard")
- `starterCode`: The initial code string to be displayed to the user
- `testCases`: An array of objects, each containing the necessary data for testing (e.g., input, expected output)

## Developer Responsibilities

### 1. Project Setup
- Initialize the Flask project with proper structure
- Handle environment variables (for MongoDB connection string)
- Set up project dependencies and requirements
- Configure development and production environments

### 2. Database Integration
- Configure the connection to MongoDB
- Define the necessary schemas using an ODM (MongoEngine or PyMongo)
- Set up database indexes for optimal performance
- Implement database connection pooling

### 3. API Development
- Build and test all the API endpoints listed above
- Implement proper error handling and status codes
- Add request/response validation
- Create comprehensive API documentation

### 4. Data Handling
- Implement the logic for creating, fetching, and updating data in the database
- Ensure data consistency and integrity
- Implement proper transaction handling where necessary
- Add data validation and sanitization

### 5. Security
- Ensure API endpoints are secure
- Implement rate limiting to prevent abuse
- Add basic input validation to prevent malicious use
- Consider implementing authentication/authorization if required
- Sanitize user inputs to prevent injection attacks

## Getting Started

### Quick Setup (Recommended)
```bash
# Run the automated setup script
./setup.sh
```

### Manual Setup
1. **Clone the repository**
2. **Set up virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure environment variables**:
   ```bash
   cp env.example .env
   # Edit .env file with your MongoDB connection string
   ```
   
   **MongoDB Connection Setup:**
   
   **Quick Options:**
   - **Local MongoDB**: `mongodb://localhost:27017/reactivate`
   - **MongoDB Atlas (Cloud)**: `mongodb+srv://username:password@cluster.mongodb.net/reactivate?retryWrites=true&w=majority`
   - **Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
   
   **📖 For detailed MongoDB setup instructions, see [MONGODB_SETUP.md](MONGODB_SETUP.md)**
   
   **Edit your .env file:**
   ```bash
   nano .env  # or use your preferred editor
   ```
   
   Update the MONGODB_URI line:
   ```env
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/reactivate
   
   # For MongoDB Atlas (replace with your actual connection string)
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/reactivate?retryWrites=true&w=majority
   ```
5. **Seed the database with sample data**:
   ```bash
   python seed_data.py
   ```
6. **Run the application**:
   ```bash
   python run.py
   # or
   python app.py
   ```

## Testing

### Automated Testing
Run the test script to verify all endpoints:
```bash
python test_api.py
```

### Manual Testing
Use tools like Postman or curl to test the endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Create a new user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'

# Get user profile
curl http://localhost:5000/api/users/user123

# Get all challenges
curl http://localhost:5000/api/challenges

# Get specific challenge
curl http://localhost:5000/api/challenges/challenge_001

# Complete a challenge
curl -X POST http://localhost:5000/api/challenges/challenge_001/complete \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123", "score": 100}'

# Get leaderboard
curl http://localhost:5000/api/leaderboard
```

## Notes for Development

- Ensure all endpoints return appropriate HTTP status codes
- Implement proper logging for debugging and monitoring
- Consider adding pagination for endpoints that return lists
- Add comprehensive unit tests for all endpoints
- Document any additional endpoints or modifications made during development
