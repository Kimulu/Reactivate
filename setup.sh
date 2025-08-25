#!/bin/bash

echo "🚀 Setting up Reactivate Flask Backend..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Create .env file from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please edit it with your MongoDB connection string."
else
    echo "✅ .env file already exists."
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your MongoDB connection string"
echo "2. Test MongoDB connection: python test_connection.py"
echo "3. Make sure MongoDB is running"
echo "4. Run: python seed_data.py (to populate database with sample data)"
echo "5. Run: python run.py (to start the Flask server)"
echo "6. Run: python test_api.py (to test the API endpoints)"
echo ""
echo "📖 For detailed MongoDB setup, see MONGODB_SETUP.md"
echo ""
echo "Happy coding! 🚀" 