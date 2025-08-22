#!/usr/bin/env python3
"""
Script to seed the database with sample data for testing
"""

import os
from mongoengine import connect, disconnect
from models.user import User
from models.challenge import Challenge

# Set default MongoDB URI if not provided
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/reactivate')

def connect_db():
    """Connect to MongoDB"""
    try:
        connect(host=MONGODB_URI)
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

def seed_challenges():
    """Seed the database with sample challenges"""
    print("Seeding challenges...")
    
    # Sample challenges
    challenges_data = [
        {
            'challenge_id': 'challenge_001',
            'title': 'Hello World',
            'description': 'Write a function that returns "Hello, World!"',
            'difficulty': 'easy',
            'starterCode': 'def hello_world():\n    # Your code here\n    pass',
            'testCases': [
                {
                    'input': {},
                    'expectedOutput': 'Hello, World!',
                    'description': 'Basic hello world test'
                }
            ]
        },
        {
            'challenge_id': 'challenge_002',
            'title': 'Sum of Two Numbers',
            'description': 'Write a function that takes two numbers and returns their sum',
            'difficulty': 'easy',
            'starterCode': 'def add_numbers(a, b):\n    # Your code here\n    pass',
            'testCases': [
                {
                    'input': {'a': 5, 'b': 3},
                    'expectedOutput': 8,
                    'description': 'Positive numbers'
                },
                {
                    'input': {'a': -1, 'b': 1},
                    'expectedOutput': 0,
                    'description': 'Negative and positive'
                }
            ]
        },
        {
            'challenge_id': 'challenge_003',
            'title': 'Reverse String',
            'description': 'Write a function that reverses a given string',
            'difficulty': 'medium',
            'starterCode': 'def reverse_string(text):\n    # Your code here\n    pass',
            'testCases': [
                {
                    'input': {'text': 'hello'},
                    'expectedOutput': 'olleh',
                    'description': 'Basic string reversal'
                },
                {
                    'input': {'text': 'racecar'},
                    'expectedOutput': 'racecar',
                    'description': 'Palindrome test'
                }
            ]
        },
        {
            'challenge_id': 'challenge_004',
            'title': 'Fibonacci Sequence',
            'description': 'Write a function that returns the nth number in the Fibonacci sequence',
            'difficulty': 'medium',
            'starterCode': 'def fibonacci(n):\n    # Your code here\n    pass',
            'testCases': [
                {
                    'input': {'n': 0},
                    'expectedOutput': 0,
                    'description': 'First number'
                },
                {
                    'input': {'n': 1},
                    'expectedOutput': 1,
                    'description': 'Second number'
                },
                {
                    'input': {'n': 5},
                    'expectedOutput': 5,
                    'description': 'Fifth number'
                }
            ]
        },
        {
            'challenge_id': 'challenge_005',
            'title': 'Find Duplicates',
            'description': 'Write a function that finds all duplicate elements in a list',
            'difficulty': 'hard',
            'starterCode': 'def find_duplicates(arr):\n    # Your code here\n    pass',
            'testCases': [
                {
                    'input': {'arr': [1, 2, 3, 4, 5]},
                    'expectedOutput': [],
                    'description': 'No duplicates'
                },
                {
                    'input': {'arr': [1, 2, 2, 3, 4, 4, 5]},
                    'expectedOutput': [2, 4],
                    'description': 'Multiple duplicates'
                }
            ]
        }
    ]
    
    # Clear existing challenges
    Challenge.objects.delete()
    
    # Create new challenges
    for challenge_data in challenges_data:
        challenge = Challenge(**challenge_data)
        challenge.save()
        print(f"Created challenge: {challenge.title}")
    
    print(f"Created {len(challenges_data)} challenges")

def seed_users():
    """Seed the database with sample users"""
    print("Seeding users...")
    
    # Sample users
    users_data = [
        {'userId': 'user_001', 'score': 150, 'rank': 1, 'completedChallenges': ['challenge_001', 'challenge_002', 'challenge_003']},
        {'userId': 'user_002', 'score': 120, 'rank': 2, 'completedChallenges': ['challenge_001', 'challenge_002']},
        {'userId': 'user_003', 'score': 80, 'rank': 3, 'completedChallenges': ['challenge_001']},
        {'userId': 'user_004', 'score': 50, 'rank': 4, 'completedChallenges': []},
        {'userId': 'user_005', 'score': 200, 'rank': 5, 'completedChallenges': ['challenge_001', 'challenge_002', 'challenge_003', 'challenge_004']}
    ]
    
    # Clear existing users
    User.objects.delete()
    
    # Create new users
    for user_data in users_data:
        user = User(**user_data)
        user.save()
        print(f"Created user: {user.userId} with score {user.score}")
    
    print(f"Created {len(users_data)} users")

def main():
    """Main function to seed the database"""
    print("Starting database seeding...")
    
    # Connect to database
    connect_db()
    
    try:
        # Seed challenges
        seed_challenges()
        
        # Seed users
        seed_users()
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error during seeding: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        # Disconnect from database
        disconnect_db()

if __name__ == '__main__':
    main() 