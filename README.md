# SalesPro AI - Sales Prediction Platform

AI-powered sales forecasting tool built with Next.js and powered by polynomial regression machine learning model.

## 🚀 Project Overview

SalesPro AI predicts sales potential based on advertising spending across three channels:
- **TV Advertising**
- **Radio Advertising**
- **Newspaper Advertising**

**Model Accuracy:** 93.55% (R² Score)  
**Training Data:** 200+ real advertising campaigns

---

## 📋 Project Structure

```
salespro-ai/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global Tailwind styles
│   ├── page.tsx                # Landing page
│   ├── not-found.tsx           # 404 error page
│   ├── auth/
│   │   ├── login/page.tsx      # Login page
│   │   └── signup/page.tsx     # Sign up page
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout with sidebar
│       ├── page.tsx            # Dashboard home
│       ├── predictions/page.tsx # Prediction tool (Phase 6)
│       ├── history/page.tsx    # Prediction history (Phase 7)
│       └── settings/page.tsx   # User settings (Phase 7)
├── lib/
│   ├── auth.ts                 # Authentication utilities
│   ├── storage.ts              # LocalStorage utilities
│   └── regressionModel.ts      # ML prediction model
├── public/                     # Static assets
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

---

## 🎨 Design System

**Color Scheme (Dark Mode):**
- Primary: `#aac7ff` (Blue)
- Secondary: `#4cd7f6` (Cyan)
- Tertiary: `#6ffbbe` (Green)
- Background: `#0b121d`
- Surface: `#121c2a`
- Error: `#ffdad6` (Red)

**Typography:**
- Font Family: Inter
- Material Symbols Icons
- Responsive text scaling

---

## 🔐 Authentication

Simple client-side authentication system:
- User registration with email validation
- Password strength indicator
- Secure session management with localStorage
- Protected routes (redirect to login if not authenticated)

**Features:**
- Sign up with full name, email, and password
- Login with email and password
- Automatic redirect to dashboard after login
- Logout functionality

---

## 💾 Data Storage

All data persists in browser localStorage:

**User Data:**
- Registered users: `users`
- Current session: `salespro_current_user`
- Auth status: `salespro_is_authenticated`

**Predictions:**
- All predictions: `salespro_predictions`
- Format: Array of prediction objects with ID, inputs, result, timestamp

---

## 🤖 Regression Model

**Model Type:** Polynomial Regression (Degree 2)  
**Accuracy:** 93.55% (R² Score)

**Features:**
- TV Budget (0-300K)
- Radio Budget (0-50K)
- Newspaper Budget (0-114K)

**Polynomial Features:**
- TV, Radio, Newspaper (linear terms)
- TV², Radio², Newspaper² (quadratic terms)
- TV×Radio, TV×Newspaper, Radio×Newspaper (interaction terms)

**Usage:**
```typescript
import { predictSales } from '@/lib/regressionModel'

const result = predictSales({
  TV: 230,
  Radio: 37.8,
  Newspaper: 69.2
})
// Returns: { sales: 22.1, confidence: 0.9355, roundedSales: "22.10" }
```

---

## 📊 Pages Overview

### Public Pages
- **Landing Page** (`/`) - Features, how it works, CTAs
- **Login** (`/auth/login`) - User login form
- **Sign Up** (`/auth/signup`) - User registration form
- **404** - Error page for not found routes

### Private Pages (Requires Authentication)
- **Dashboard** (`/dashboard`) - Overview with stats and recent predictions
- **Prediction Tool** (`/dashboard/predictions`) - Form to make predictions
- **History** (`/dashboard/history`) - View all saved predictions
- **Settings** (`/dashboard/settings`) - User profile and preferences

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with localStorage support

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📈 Development Phases

### ✅ Phase 1: Project Setup (COMPLETE)
- Next.js project initialized with Tailwind CSS
- TypeScript configuration
- Authentication system with localStorage
- ML regression model integrated
- All pages created as placeholders
- Dashboard navigation and layout

### 📋 Phase 2: Core Components & Navigation (Next)
- Reusable button, input, card components
- Navigation refinements
- Loading and error states

### 🔐 Phase 3: Authentication System (Next)
- Route guards and protected pages
- Session management
- Login/signup validation

### 🎨 Phase 4: Public Pages (Next)
- Landing page content
- Auth page styling and animations
- 404 page enhancements

### 📊 Phase 5: Dashboard & Main Layout (Next)
- Dashboard stats display
- Sidebar navigation
- Quick-access cards

### 🎯 Phase 6: Prediction System (Next)
- Prediction form with validation
- Real-time results display
- Prediction animations

### 📚 Phase 7: History & Settings (Next)
- Prediction history table with filtering
- User profile management
- Settings page

### ✨ Phase 8: Polish & Integration (Next)
- All pages connected and functional
- Responsive design testing
- Final testing and refinements

---

## 🎯 Features Implemented

✅ Multi-page Next.js application  
✅ Dark mode UI with Material Design  
✅ User authentication (signup/login)  
✅ Protected routes  
✅ localStorage data persistence  
✅ Responsive design (mobile, tablet, desktop)  
✅ Polynomial regression ML model  
✅ TypeScript support  
✅ Tailwind CSS styling  

---

## 🚀 Next Steps

1. **Phase 2:** Create shared components (Button, Input, Card, etc.)
2. **Phase 3:** Enhance authentication with form validation
3. **Phase 4:** Build out public pages with full content
4. **Phase 5:** Create dashboard with real data display
5. **Phase 6:** Implement prediction form and results
6. **Phase 7:** Build history and settings pages
7. **Phase 8:** Final testing and polish

---

## 📝 Notes

- All data is stored in browser localStorage (no backend)
- Model is embedded in the app (no API calls needed)
- Predictions are instant (no server processing)
- Perfect for MVP and demonstration purposes

---

## 📄 License

© 2026 SalesPro AI. All rights reserved.
