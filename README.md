# Giftora – Gift Ordering Website (React + Vite, mock API)

## Run
    npm install
    npm run dev       # http://localhost:5173

## Demo login
    demo@giftora.com / demo123   (or Register a new account)

## Pages
- Home       – hero, Shop by Occasion, Find Gifts by Mood, Trending, Personalize
- Shop       – search, occasion chips, sort, budget slider, wishlist
- Build a Box – live preview of your custom gift box (photos, ribbon, message)
- AI Gift Finder – chat-style recommendations from occasion + budget + vibe
- Login / Register, Cart + Checkout (login required), My Orders with live tracking

## Mock API (src/api.js)
Uses localStorage + fake delays. Replace functions with fetch() to use a real backend.

## Images
Photos load live by keyword from loremflickr.com (internet needed).
Replace `photoUrl()` in src/components/Photo.jsx to use your own images.
