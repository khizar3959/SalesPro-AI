# SalesPro AI - Deployment & Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git (optional, for version control)
- A modern web browser

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## Project Structure

```
salespro-ai/
├── app/                          # Next.js app router
│   ├── layout.tsx               # Root layout with initialization
│   ├── globals.css              # Global Tailwind + animations
│   ├── page.tsx                 # Landing page
│   ├── not-found.tsx            # 404 error page
│   ├── auth/
│   │   ├── login/page.tsx       # Login page with validation
│   │   └── signup/page.tsx      # Sign up with password strength
│   └── dashboard/
│       ├── layout.tsx           # Dashboard with sidebar
│       ├── page.tsx             # Dashboard home with stats
│       ├── predictions/page.tsx # Prediction tool (fully functional)
│       ├── history/page.tsx     # History with delete, export
│       └── settings/page.tsx    # Settings & profile management
├── components/                  # Reusable components
│   ├── Button.tsx              # Multiple variants
│   ├── Input.tsx               # With validation support
│   ├── Card.tsx                # Composable card system
│   ├── Modal.tsx               # Dialog & confirm modals
│   ├── Alert.tsx               # Notifications
│   ├── Badge.tsx               # Status indicators
│   ├── PasswordStrength.tsx     # Password validator
│   ├── LoadingSpinner.tsx       # Loading states
│   ├── Select.tsx              # Dropdown selector
│   ├── ErrorBoundary.tsx       # Error handling
│   └── index.ts                # Centralized exports
├── lib/
│   ├── auth.ts                 # Authentication (signup/login/logout)
│   ├── useAuth.ts              # Auth hook & protection
│   ├── storage.ts              # localStorage utilities
│   ├── regressionModel.ts      # ML predictions (93.55% accuracy)
│   └── initDemo.ts             # Demo data initialization
├── public/                      # Static assets
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind theme
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── README.md                   # Project documentation
```

---

## Key Features

### Authentication
- User signup with password strength validation
- Secure login with session management
- Demo account: `demo@example.com` / `Demo@12345`
- Session persistence with localStorage

### Prediction System
- Real polynomial regression model (93.55% accuracy)
- TV, Radio, Newspaper budget inputs
- Instant sales forecasts
- Dynamic insight messages
- Save predictions with notes

### Data Management
- Prediction history with sorting
- Delete individual predictions
- Clear all predictions
- Export to CSV with download
- Statistics: total, average, best, lowest

### User Experience
- Dark mode UI with gradients
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Empty states with helpful CTAs

---

## Demo Credentials

Use these to test the app without creating an account:

- **Email:** `demo@example.com`
- **Password:** `Demo@12345`

Demo account includes 3 sample predictions.

---

## Testing Checklist

### Authentication
- [ ] Sign up with new account
- [ ] Verify password strength indicator
- [ ] Login with created account
- [ ] Auto-redirect to dashboard
- [ ] Logout functionality
- [ ] Protected routes redirect to login

### Predictions
- [ ] Enter valid budgets and predict
- [ ] Verify prediction displays correctly
- [ ] Check insight message updates
- [ ] Save prediction with notes
- [ ] Verify save redirects to history

### History
- [ ] View saved predictions
- [ ] Sort by latest/highest/lowest
- [ ] Click to view prediction details
- [ ] Delete individual prediction
- [ ] Export to CSV
- [ ] Clear all predictions

### Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1440px)
- [ ] Sidebar collapses on mobile
- [ ] All forms remain accessible

### Accessibility
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Color contrast meets WCAG AA
- [ ] Error messages are clear
- [ ] Loading states visible

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Optimization

### Implemented
- Static site generation where possible
- Image optimization
- CSS tree-shaking with Tailwind
- Component lazy loading
- Efficient re-renders with React hooks

### Recommendations
- Use CDN for static assets
- Enable compression (gzip/brotli)
- Monitor Core Web Vitals
- Optimize images further if needed

---

## Deployment Options

### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel login
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting
```bash
npm run build
npm run start
```

Then deploy the `.next` folder and `node_modules` to your server.

---

## Environment Variables

Currently uses browser localStorage (no backend needed). For future cloud features:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## Troubleshooting

### "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### localStorage data lost
- Check browser storage settings
- Ensure cookies/storage not blocked
- Clear browser cache if issues persist

### Predictions not saving
- Verify localStorage is enabled
- Check browser console for errors
- Try clearing app data and restarting

---

## Security Considerations

### Current
- ✅ Client-side validation
- ✅ Password hashing (basic - for demo)
- ✅ No sensitive data in URLs
- ✅ HTTPS ready (deployment dependent)

### For Production
- [ ] Implement proper backend authentication
- [ ] Use OAuth/JWT tokens
- [ ] Add CSRF protection
- [ ] Rate limiting on API
- [ ] Data encryption at rest
- [ ] HTTPS enforcement
- [ ] Security headers configuration

---

## Future Enhancements

- [ ] Backend API with database
- [ ] Real user authentication (OAuth)
- [ ] Team collaboration features
- [ ] Advanced analytics and charts
- [ ] Prediction scheduling
- [ ] Mobile app (React Native)
- [ ] API for third-party integration
- [ ] Multi-language support

---

## Support & Resources

- **Documentation:** See README.md
- **Issue Tracking:** GitHub Issues
- **Live Demo:** https://salespro-ai.vercel.app (example)

---

## License

© 2026 SalesPro AI. All rights reserved.
