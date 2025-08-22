#!/usr/bin/env python3
"""
Simple script to run the Flask application
"""

from app import app, connect_db

if __name__ == '__main__':
    # Connect to database
    connect_db()
    
    # Run the app
    app.run(host='0.0.0.0', port=5000, debug=True) 