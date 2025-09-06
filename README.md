# 🚀 Collaborative Coding Challenges Platform

A community-driven platform where developers can practice coding challenges, view live previews, track their progress via leaderboards, and engage with other learners. The project aims to grow into a **full-featured startup** with gamification, premium features, and community engagement at its core.

---

## 📌 Project Scope

- 📝 Coding challenges with live editor & preview
- 👥 Community centered around challenges
- 🏆 Leaderboard tracking
- 🔑 Authentication & user sessions
- 🎖️ Gamification (badges, streaks, achievements)
- 🔒 Premium-only challenges
- 📢 Future ads integration (e.g., Google Ads)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js + React
- **Styling**: TailwindCSS
- **Editor**: Monaco Editor
- **Code Execution**: esbuild.wasm (was Babel, migrated for speed & stability)
- **State Management**: Redux (planned)
- **Backend**: Node.js + Express (planned)
- **Database**: MongoDB

---

## ⚡ Recent Progress

One major milestone was **switching from Babel to esbuild.wasm** for running React code in the challenge editor preview.

- This improved **speed**, reduced runtime issues, and worked more smoothly with **Monaco Editor**.

---

## 📂 Project Structure

/pages
/challenges
[id].tsx # Challenge details page (editor, preview, tests)
/public
esbuild.wasm # WebAssembly build for esbuild
tailwind.css # Custom Tailwind build for iframe styling
/components
... # Shared UI components (WIP)
/data
challenges.js # Challenge seeds (title, instructions, initial code)

---

## ⚡ Development Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd project
npm install

2. Run the Dev Server
npm run dev

```
