# 🚀 Development Guide - Reactivate Monorepo

This guide covers the development workflow for the Reactivate collaborative coding challenges platform using our npm workspaces setup.

## 📋 Quick Start

```bash
# 1. Clone and install dependencies
git clone https://github.com/Kimulu/Reactivate.git
cd Reactivate
npm install

# 2. Set up environment variables (create .env file)
# Create packages/backend/express-backend/.env with your configuration

# 3. Start development environment
npm run dev
```

**Your app will be running at:**
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5000

---

## 🏗️ Project Structure

```
Reactivate/                          # Monorepo root
├── package.json                     # Workspace configuration
├── packages/
│   ├── frontend/                    # Next.js React app
│   │   ├── package.json            # Frontend dependencies
│   │   ├── pages/                   # Next.js pages
│   │   ├── components/              # React components
│   │   └── ...
│   ├── backend/
│   │   └── express-backend/         # Express.js API
│   │       ├── package.json         # Backend dependencies
│   │       ├── server.js            # Main server file
│   │       ├── controllers/         # API controllers
│   │       ├── models/              # Database models
│   │       └── routes/              # API routes
│   └── shared/                      # Shared utilities
│       └── utils.ts                 # Common functions
├── docs/                            # Documentation
└── tests/                           # Test files
```

---

## 🎮 Available Commands

### **Primary Development Commands:**

```bash
# Start both frontend + backend together
npm run dev                 #  Recommended for development

# Start services individually  
npm run dev:frontend        #  Frontend only (port 3000)
npm run dev:backend         #  Backend only (port 5000)
```

### **Build & Production:**

```bash
# Build for production
npm run build              #  Build frontend
npm run build:all          #  Build all packages

# Start production server
npm run start              #  Start frontend production
npm run start:backend      #  Start backend production
```

### **Code Quality:**

```bash
# Linting
npm run lint               #  Lint all packages
npm run lint:fix           #  Auto-fix linting issues

# Type checking
npm run type-check         #  TypeScript validation

# Testing
npm run test               #  Run all tests
```

### **Maintenance:**

```bash
# Clean install
npm run clean              #  Remove all node_modules
npm install                #  Fresh install

# Install dependencies
npm run install:all        # 📦 Install workspace dependencies
```

---

## 🌍 Environment Setup

### **Backend Environment Variables**

Create `packages/backend/express-backend/.env` with the following configuration:

```env
# ===== DATABASE =====
# MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/reactivate
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database
MONGODB_URI=mongodb://localhost:27017/reactivate

# ===== SERVER =====
# Port for the backend server to run on
PORT=5000

# ===== AUTHENTICATION =====
# JWT secret key for token signing (generate a secure random string)
# You can generate one at: https://generate-secret.vercel.app/32
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# ===== ENVIRONMENT =====
# Set to 'development' for development, 'production' for production
NODE_ENV=development

# ===== CORS (Optional) =====
# Frontend URL for CORS configuration
FRONTEND_URL=http://localhost:3000

# ===== LOGGING (Optional) =====
# Log level: error, warn, info, debug
LOG_LEVEL=info
```

> **Important**: Replace `your-super-secret-jwt-key-at-least-32-characters-long` with a secure random string for JWT_SECRET, and update MONGODB_URI with your actual database connection string.

### **Frontend Environment Variables**

Create `packages/frontend/.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Development
NODE_ENV=development
```

---

## 🔧 Workspace Configuration

### **How npm Workspaces Work**

Our monorepo uses npm workspaces to manage multiple packages:

```json
{
  "workspaces": [
    "packages/*",
    "packages/backend/express-backend"
  ]
}
```

**Benefits:**
- ✅ **Unified dependency management**: Shared packages hoisted to root
- ✅ **Cross-package imports**: Import from `@reactivate/shared`
- ✅ **Coordinated scripts**: Run commands across all packages
- ✅ **Faster installs**: Deduplication of common dependencies

### **Workspace Commands**

```bash
# Work with specific workspace
npm run dev --workspace=frontend
npm install lodash --workspace=express-backend

# Work with all workspaces
npm run build --workspaces
npm run test --workspaces --if-present
```

---

## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### **1. Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

#### **2. Permission Denied (nodemon)**
```bash
# Our setup uses npx to avoid this, but if issues persist:
chmod +x packages/backend/express-backend/node_modules/.bin/nodemon

# Or reinstall
cd packages/backend/express-backend
rm -rf node_modules
npm install
```

#### **3. React Hook Errors**
```bash
# Clean install to resolve version conflicts
rm -rf node_modules package-lock.json
npm install
```

#### **4. TypeScript Errors**
```bash
# Type check all packages
npm run type-check

# Or check specific package
cd packages/frontend
npx tsc --noEmit
```

#### **5. Build Failures**
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

---

## 🔄 Development Workflow

### **Adding New Features**

1. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Start development environment:**
   ```bash
   npm run dev
   ```

3. **Make changes** to frontend/backend as needed

4. **Test your changes:**
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

### **Working with Database**

```bash
# MongoDB connection is handled automatically
# Check connection in backend logs:
# "MongoDB connected successfully!"
```

### **API Development**

- **Backend**: Express routes in `packages/backend/express-backend/routes/`
- **Frontend**: API calls in `packages/frontend/utils/apiClient.ts`
- **Shared types**: `packages/shared/` for common interfaces

---

## 📚 Additional Resources

### **Documentation**
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

### **Useful Scripts**

```bash
# View workspace tree
npm ls --workspaces

# Check for vulnerabilities
npm audit --workspaces

# Update dependencies
npm update --workspaces
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the development workflow above
4. Submit a pull request

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Create a new issue with detailed description
4. Include error logs and environment details

---

**Happy reactivating! 🚀**