#!/usr/bin/env python3
"""
Simple script to test MongoDB connection
"""

import os
from dotenv import load_dotenv
from mongoengine import connect, disconnect

def test_mongodb_connection():
    """Test MongoDB connection"""
    print("🔍 Testing MongoDB connection...")
    
    # Load environment variables
    load_dotenv()
    
    # Get connection string
    mongodb_uri = os.getenv('MONGODB_URI')
    
    if not mongodb_uri:
        print("❌ MONGODB_URI not found in .env file")
        print("Please create a .env file with your MongoDB connection string")
        return False
    
    print(f"📡 Connection string: {mongodb_uri.split('@')[0]}@***")
    
    try:
        # Attempt to connect
        connect(host=mongodb_uri)
        print("✅ MongoDB connection successful!")
        
        # Test basic operations
        from models.user import User
        from models.challenge import Challenge
        
        # Count documents (this will fail if collections don't exist, but connection is fine)
        try:
            user_count = User.objects.count()
            challenge_count = Challenge.objects.count()
            print(f"📊 Database stats: {user_count} users, {challenge_count} challenges")
        except:
            print("📊 Database connected (collections may be empty)")
        
        # Disconnect
        disconnect()
        print("🔌 Disconnected from MongoDB")
        
        return True
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        print("\n🔧 Troubleshooting tips:")
        print("1. Check if MongoDB is running")
        print("2. Verify your connection string in .env file")
        print("3. Check network connectivity (for Atlas)")
        print("4. Ensure IP is whitelisted (for Atlas)")
        print("5. Verify username/password (for Atlas)")
        return False

if __name__ == '__main__':
    success = test_mongodb_connection()
    
    if success:
        print("\n🎉 Connection test passed! You can now run the application.")
        print("Next steps:")
        print("1. python seed_data.py")
        print("2. python run.py")
    else:
        print("\n💡 See MONGODB_SETUP.md for detailed setup instructions.")
        exit(1) 