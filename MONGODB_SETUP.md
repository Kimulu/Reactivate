# MongoDB Setup Guide

This guide provides detailed instructions for setting up MongoDB for the Reactivate application.

## Option 1: Local MongoDB Installation

### Ubuntu/Debian
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
brew services list | grep mongodb
```

### Windows
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a service and start automatically

### Connection String for Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/reactivate
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose "Free" tier (M0) for development

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier
3. Select your preferred cloud provider and region
4. Click "Create"

### Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

### Step 6: Update Your .env File
```env
# Replace <username>, <password>, and <cluster-url> with your actual values
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/reactivate?retryWrites=true&w=majority
```

**Example:**
```env
MONGODB_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/reactivate?retryWrites=true&w=majority
```

## Option 3: Docker MongoDB

### Install Docker
First, install Docker on your system:
- [Docker Desktop for Windows/Mac](https://www.docker.com/products/docker-desktop)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

### Run MongoDB Container
```bash
# Pull and run MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -v mongodb_data:/data/db \
  mongo:latest

# Verify container is running
docker ps

# Access MongoDB shell (optional)
docker exec -it mongodb mongosh
```

### Connection String for Docker MongoDB
```env
# If using default setup
MONGODB_URI=mongodb://localhost:27017/reactivate

# If using authentication
MONGODB_URI=mongodb://admin:password@localhost:27017/reactivate?authSource=admin
```

## Testing Your Connection

### Method 1: Using the Application
```bash
# Start the Flask application
python run.py

# If you see "Connected to MongoDB successfully!" - it's working!
```

### Method 2: Using MongoDB Shell
```bash
# For local MongoDB
mongosh

# For MongoDB Atlas
mongosh "your-connection-string"

# Test commands
use reactivate
db.users.find()
db.challenges.find()
```

### Method 3: Using Python Script
```python
from mongoengine import connect
from dotenv import load_dotenv
import os

load_dotenv()

try:
    connect(host=os.getenv('MONGODB_URI'))
    print("✅ MongoDB connection successful!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
```

## Troubleshooting

### Common Issues

**1. Connection Refused (Local MongoDB)**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB if not running
sudo systemctl start mongod
```

**2. Authentication Failed (MongoDB Atlas)**
- Verify username and password in connection string
- Check if IP address is whitelisted in Network Access
- Ensure database user has correct permissions

**3. DNS Resolution Issues (MongoDB Atlas)**
- Try using the direct connection string format
- Check your internet connection
- Verify the cluster URL is correct

**4. Port Already in Use**
```bash
# Check what's using port 27017
sudo lsof -i :27017

# Kill the process if needed
sudo kill -9 <PID>
```

### Security Best Practices

1. **Never commit credentials to version control**
   - Keep `.env` file in `.gitignore`
   - Use environment variables in production

2. **Use strong passwords**
   - Minimum 8 characters
   - Mix of letters, numbers, and symbols

3. **Restrict network access**
   - Use specific IP addresses in production
   - Avoid "Allow Access from Anywhere" in production

4. **Regular backups**
   - Set up automated backups in MongoDB Atlas
   - Test restore procedures

## Next Steps

After setting up MongoDB:

1. **Test the connection** using one of the methods above
2. **Seed the database** with sample data:
   ```bash
   python seed_data.py
   ```
3. **Start the application**:
   ```bash
   python run.py
   ```
4. **Test the API**:
   ```bash
   python test_api.py
   ```

## Support

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoEngine Documentation](http://mongoengine.org/) 