# 🚀 Reactivate - Collaborative Coding Challenges Platform

A community-driven platform where developers can practice coding challenges, view live previews, track their progress via leaderboards, and engage with other learners. Built as a **modern monorepo** with scalable architecture for future growth or component breakdown.

> still a work in progress!
---

## 📌 Project Scope

- 📝 **Interactive Challenges**: Live code editor with real-time preview
- 👥 **Community Features**: Discussion, sharing, and collaboration
- 🏆 **Progress Tracking**: Leaderboards and personal statistics
- 🔑 **User Management**: Authentication and user profiles
- 🎖️ **Gamification**: Badges, streaks, and achievements
- 🔒 **Premium Content**: Advanced challenges and features
- 📢 **Monetization**: Ads integration and premium subscriptions

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15 + React 19
- **Styling**: TailwindCSS 4
- **Code Editor**: Monaco Editor + Custom Components
- **Build Tool**: Turbopack (Next.js)
- **Code Execution**: esbuild.wasm for in-browser compilation

### **Backend**
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Development**: nodemon for hot reload

### **Development**
- **Monorepo**: npm workspaces
- **TypeScript**: Full type safety
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm

---

## 🏗️ Architecture

```
Reactivate/                    # Monorepo root
├── packages/
│   ├── frontend/             # Next.js application
│   ├── backend/              # Express.js API
│   └── shared/               # Shared utilities & types
├── docs/                     # Documentation
└── tests/                    # Test suites
```

---

## ⚡ Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm 9+
- MongoDB (local or Atlas)

### **Setup**

```bash
# 1. Clone the repository
git clone https://github.com/Kimulu/Reactivate.git
cd Reactivate

# 2. Install all dependencies
npm install

# 3. Set up environment variables
# Create packages/backend/express-backend/.env with your configuration
# Edit .env with your MongoDB connection string

# 4. Start development servers
npm run dev
```

**🌐 Your app will be running at:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🎮 Development Commands

```bash
# Development
npm run dev              # 🚀 Start both frontend + backend
npm run dev:frontend     # ⚛️  Frontend only
npm run dev:backend      # 🔧 Backend only

# Production
npm run build           # 📦 Build for production
npm run start           # 🌟 Start production server

# Code Quality
npm run lint            # 🔍 Lint all packages
npm run test            # 🧪 Run tests
npm run type-check      # 📝 TypeScript validation
```

---

## 📚 Documentation

- **[Development Guide](./docs/DEVELOPMENT.md)** - Detailed setup and workflow
- **[API Documentation](./docs/API.md)** - Backend API reference
- **[Contributing](./CONTRIBUTING.md)** - How to contribute
- **[Deployment](./docs/DEPLOYMENT.md)** - Production deployment guide

---

## ⚡ Recent Achievements

### **Monorepo Migration** ✅
- Implemented npm workspaces for unified development
- Single command (`npm run dev`) now starts entire stack
- Resolved dependency conflicts and improved developer experience

### **Performance Improvements** ✅  
- **esbuild.wasm integration**: Faster in-browser code compilation
- **Turbopack**: Next.js 15 with enhanced build speeds
- **Optimized dependencies**: Reduced bundle size and conflicts

### **Developer Experience** ✅
- **Unified scripts**: Consistent commands across packages
- **Type safety**: Full TypeScript integration
- **Hot reload**: Both frontend and backend auto-refresh

---

## 🗺️ Roadmap

### **Phase 1: Core Platform** (Current)
- ✅ Basic challenge system
- ✅ Live code editor
- ✅ User authentication
- ✅ MongoDB integration
- 🔄 Challenge management system

### **Phase 2: Community Features**
- 🔄 User profiles and progress tracking
- 🔄 Leaderboards and rankings  
- 🔄 Challenge discussions and comments
- 🔄 Social features (following, sharing)

### **Phase 3: Advanced Features**
- 🔄 Premium challenge tiers
- 🔄 Advanced code execution environments
- 🔄 Team challenges and competitions
- 🔄 Integration with GitHub/GitLab

### **Phase 4: Monetization**
- 🔄 Premium subscriptions
- 🔄 Advertisement integration
- 🔄 Corporate training packages
- 🔄 Certification programs

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### **Quick Contribution Steps:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow our [Development Guide](./docs/DEVELOPMENT.md)
4. Submit a pull request

---

## 📞 Support & Community

- **GitHub Issues**: Bug reports and feature requests
- **Documentation**: Comprehensive guides in `/docs`
- **Discord**: [Join our community](https://discord.gg/reactivate) (coming soon)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

**Built with ❤️ by the Reactivate team**
