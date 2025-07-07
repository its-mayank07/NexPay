# NexPay

A modern, full-stack wallet app for the future.

## 🚀 Features
- Secure user authentication (NextAuth.js)
- Add money from multiple banks
- P2P transfers
- Transaction history
- Beautiful, responsive UI (mobile & desktop)
- Built with Next.js 15, Prisma, PostgreSQL, Tailwind CSS

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), React 19, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL (NeonDB, local, or any Postgres)
- **Auth:** NextAuth.js (credentials, social login ready)

## 📦 Getting Started

1. **Clone the repo:**
   ```sh
   git clone <your-repo-url>
   cd nex
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in your secrets and database URL.
4. **Run database migrations:**
   ```sh
   npx prisma migrate dev
   ```
5. **Start the dev server:**
   ```sh
   npm run dev
   ```
6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 📝 Contributing
- Fork the repo and create a feature branch
- Make your changes and add tests if needed
- Open a pull request with a clear description

## 📄 License
MIT

---

> Made with ❤️ for modern web wallets
