# 💳 NexPay - Digital Banking Platform

A modern, full-stack digital banking application built with Next.js, TypeScript, and Prisma. Experience seamless money transfers, P2P payments, and comprehensive transaction management.

## ✨ Features

- **🔐 Secure Authentication** - NextAuth.js integration with phone-based login
- **💸 Money Transfers** - Send money to other users instantly
- **👥 P2P Payments** - Peer-to-peer transfer functionality
- **📊 Transaction History** - Complete transaction tracking and analytics
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Real-time Updates** - Live balance and transaction updates
- **🏦 Bank Integration** - Payment processing and webhook handling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/100xdevs-cohort-2/week-17-final-code.git
   cd week-17-final-code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Using Docker (recommended)
   docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   
   # Or use a cloud database (Neon, Supabase, etc.)
   ```

4. **Configure environment variables**
   ```bash
   # Copy example files in each app directory
   cp apps/user-app/.env.example apps/user-app/.env
   cp apps/bank/.env.example apps/bank/.env
   
   # Update with your database URL and other settings
   ```

5. **Run database migrations**
   ```bash
   cd packages/db
   npx prisma migrate dev
   npx prisma db seed
   ```

6. **Start the development servers**
   ```bash
   # Terminal 1 - Start user app
   cd apps/user-app
   npm run dev
   
   # Terminal 2 - Start bank app
   cd apps/bank
   npm run dev
   ```

7. **Access the applications**
   ```
   User App: http://localhost:3001
   Bank App: http://localhost:3000
   ```

## 🔑 Default Login Credentials

Use these credentials to test the application:

- **Phone:** `1111111111`
- **Password:** `alice`

## 🏗️ Project Structure

```
nexpay/
├── apps/
│   ├── user-app/          # Main user banking application ✅
│   └── bank/              # Bank payment processing app ✅
├── packages/
│   ├── db/               # Database schema and migrations
│   ├── ui/               # Shared UI components
│   └── eslint-config/    # ESLint configuration
└── README.md
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **State Management:** Recoil
- **Deployment:** Vercel (recommended)

## 📱 Applications

### User App (`apps/user-app`) ✅
The main banking application for end users featuring:
- Dashboard with balance overview
- Money transfer functionality
- P2P payment system
- Transaction history
- User profile management
- Add money functionality

### Bank App (`apps/bank`) ✅
Handles payment processing and webhooks for:
- Payment processing interface
- Transaction status updates
- Payment webhook handling
- Bank payment simulation

## 🔧 Development

### Available Scripts

```bash
# Install dependencies
npm install

# Run all development servers
npm run dev

# Build for production
npm run build

# Run database migrations
cd packages/db
npx prisma migrate dev

# Seed database
npx prisma db seed

# Run linting
npm run lint
```

### Environment Variables

Create `.env` files in each app directory:

**User App (`apps/user-app/.env`):**
```env

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"

# Bank App URL (for payment redirects)
NEXT_PUBLIC_BANK_APP_URL="http://localhost:3000"
```

**Bank App (`apps/bank/.env`):**
```env

# User App URL (for redirects back to user app)
NEXT_PUBLIC_USER_APP_URL="http://localhost:3001"
```

## 🚀 Running the Applications

1. **Start the database:**
   ```bash
   docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   ```

2. **Set up the database:**
   ```bash
   cd packages/db
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Start both applications:**
   ```bash
   # Terminal 1 - User App
   cd apps/user-app
   npm run dev
   
   # Terminal 2 - Bank App  
   cd apps/bank
   npm run dev
   ```

4. **Access the apps:**
   - User App: http://localhost:3001
   - Bank App: http://localhost:3000

## 🔄 App Communication

The applications communicate with each other through environment variables:

- **User App → Bank App**: When adding money, redirects to bank payment page
- **Bank App → User App**: After payment processing, redirects back to user dashboard

Environment variables handle the URLs dynamically, making deployment to different environments easier.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and TypeScript
- Icons from [Heroicons](https://heroicons.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**NexPay** - Modern banking for the digital age.

```jsx
git clone https://github.com/100xdevs-cohort-2/week-17-final-code
```

- npm install
- Run postgres either locally or on the cloud (neon.tech)

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)