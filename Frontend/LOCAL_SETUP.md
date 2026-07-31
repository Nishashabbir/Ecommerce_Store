# Artisan Crochet E-Commerce - Local Setup Guide

## Overview
This is a professional boutique e-commerce website built with React, Tailwind CSS, and includes:
- ✨ Professional animations and smooth transitions
- 🖼️ Realistic embedded product images (no external URLs needed)
- 🎨 Luxury boutique design with custom color palette
- 📱 Fully responsive design
- 🛒 Complete shopping cart and checkout flow
- 📦 Order confirmation and tracking

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. **Navigate to project directory:**
   ```bash
   cd boutique-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser:**
   - Local: `http://localhost:3000`
   - Network: Check terminal output for network URL

## Project Structure

```
boutique-ecommerce/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Landing page with hero section
│   │   │   ├── Cart.tsx          # Shopping cart with embedded images
│   │   │   ├── Checkout.tsx      # Multi-step checkout process
│   │   │   ├── OrderConfirmation.tsx  # Order success page
│   │   │   ├── About.tsx         # About Us and brand story
│   │   │   └── NotFound.tsx      # 404 page
│   │   ├── components/
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   ├── Footer.tsx        # Footer with links
│   │   │   └── ui/               # shadcn/ui components
│   │   ├── contexts/
│   │   │   ├── CartContext.tsx   # Cart state management
│   │   │   └── CheckoutContext.tsx # Checkout state
│   │   ├── lib/
│   │   │   ├── embeddedImages.ts # Base64 encoded product images
│   │   │   └── utils.ts          # Utility functions
│   │   ├── assets/
│   │   │   └── images/           # Original image files
│   │   ├── index.css             # Global styles & animations
│   │   └── App.tsx               # Main app component
│   ├── public/
│   │   └── favicon.ico
│   └── index.html
├── server/
│   └── index.ts                  # Express server (static serving)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Features

### 🎨 Design System
- **Color Palette:**
  - Deep Mauve Brown: `#5C4A47`
  - Dusty Rose: `#D9A5A8`
  - Cream/Ivory: `#F5EFE8`
  - Muted Lavender: `#B08A9E`
  - Soft Gray Pink: `#C9AFAE`

- **Typography:**
  - Headings: Playfair Display (serif)
  - Body: Poppins (sans-serif)
  - Navigation: Poppins (uppercase, letter-spaced)

### ✨ Animations
- Fade in/up/down animations on page load
- Slide transitions for navigation
- Scale animations for modals and cards
- Hover effects with lift and glow
- Staggered animations for list items
- Smooth transitions on all interactive elements

### 📦 Embedded Images
All product images are embedded as base64 in `lib/embeddedImages.ts`:
- Crochet Blanket (84KB)
- Crochet Sweater (174KB)
- Crochet Accessories (21KB)

No external image URLs needed - everything runs offline!

## Pages

### Home Page (`/`)
- Hero section with CTA buttons
- Featured collections showcase
- Why choose us section
- Newsletter signup
- All with smooth animations

### Cart Page (`/cart`)
- Product list with images
- Quantity controls
- Coupon code input (try: WELCOME10)
- Order summary with pricing breakdown
- Proceed to checkout button

### Checkout Page (`/checkout`)
- 3-step multi-step process
  1. Shipping Address
  2. Payment Method
  3. Order Review
- Progress indicator
- Form validation
- Order summary sidebar

### Order Confirmation (`/order-confirmation/:orderId`)
- Success message with checkmark
- Order status timeline
- Shipping address display
- Ordered products list
- Payment summary
- Continue shopping option

### About Us Page (`/about`)
- Brand story hero section
- Mission and vision cards
- Why choose us features grid
- Meet our artisans section
- Customer testimonials
- Contact information

## Development

### Available Scripts

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check

# Format code
pnpm format
```

### Customization

**Update Colors:**
Edit `client/src/index.css` `:root` section

**Update Typography:**
Modify font imports in `client/index.html`

**Add New Pages:**
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Import and use in Router

**Modify Animations:**
Edit animation keyframes in `client/src/index.css`

## Production Build

```bash
# Build
pnpm build

# Start production server
pnpm start
```

The production build will be optimized and ready for deployment.

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- Optimized animations using GPU-accelerated transforms
- Lazy loading for images
- Efficient state management with React Context
- Minimal bundle size with tree-shaking

## Troubleshooting

**Port 3000 already in use:**
```bash
# Use different port
PORT=3001 pnpm dev
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Animations not working:**
Check browser console for errors and ensure CSS is loaded properly.

## Support
For issues or questions, check the component files and inline comments for implementation details.

## License
MIT

---

**Happy Shopping! 🧶✨**
