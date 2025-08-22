#!/usr/bin/env python3
"""
Test script to verify API endpoints
"""

import requests
import json
import time

# API base URL
BASE_URL = 'http://localhost:5000'

def test_health_check():
    """Test health check endpoint"""
    print("Testing health check...")
    try:
        response = requests.get(f'{BASE_URL}/health')
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_create_user():
    """Test user creation"""
    print("\nTesting user creation...")
    try:
        data = {'userId': 'test_user_001'}
        response = requests.post(f'{BASE_URL}/api/users', json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 201
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_get_user():
    """Test getting user data"""
    print("\nTesting get user...")
    try:
        response = requests.get(f'{BASE_URL}/api/users/test_user_001')
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_get_challenges():
    """Test getting all challenges"""
    print("\nTesting get challenges...")
    try:
        response = requests.get(f'{BASE_URL}/api/challenges')
        print(f"Status: {response.status_code}")
        challenges = response.json()
        print(f"Found {len(challenges)} challenges")
        for challenge in challenges[:2]:  # Show first 2 challenges
            print(f"  - {challenge['title']} ({challenge['difficulty']})")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_get_challenge():
    """Test getting a specific challenge"""
    print("\nTesting get specific challenge...")
    try:
        response = requests.get(f'{BASE_URL}/api/challenges/challenge_001')
        print(f"Status: {response.status_code}")
        challenge = response.json()
        print(f"Challenge: {challenge['title']}")
        print(f"Description: {challenge['description'][:50]}...")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_complete_challenge():
    """Test completing a challenge"""
    print("\nTesting complete challenge...")
    try:
        data = {'userId': 'test_user_001', 'score': 50}
        response = requests.post(f'{BASE_URL}/api/challenges/challenge_001/complete', json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_leaderboard():
    """Test getting leaderboard"""
    print("\nTesting leaderboard...")
    try:
        response = requests.get(f'{BASE_URL}/api/leaderboard')
        print(f"Status: {response.status_code}")
        leaderboard = response.json()
        print(f"Found {len(leaderboard)} users in leaderboard")
        for user in leaderboard[:3]:  # Show top 3 users
            print(f"  - {user['userId']}: {user['score']} points (rank {user['rank']})")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    """Run all tests"""
    print("Starting API tests...")
    print("=" * 50)
    
    # Wait a moment for the server to be ready
    time.sleep(2)
    
    tests = [
        test_health_check,
        test_create_user,
        test_get_user,
        test_get_challenges,
        test_get_challenge,
        test_complete_challenge,
        test_leaderboard
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print("-" * 30)
    
    print(f"\nTest Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! API is working correctly.")
    else:
        print("❌ Some tests failed. Check the server logs for details.")

if __name__ == '__main__':
    main() 