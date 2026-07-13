# Suds — Laundry App (React Native / Expo)

Mobile e-commerce frontend for a laundry pickup & delivery business, built with
Expo so it runs the same code on web, iOS, and Android.

Screens: Splash → Onboarding → Login/Signup → Home (categories + services) →
Service detail (quantity + add-ons) → Cart → Checkout → Order confirmation →
Orders (history) → Order tracking → Profile.

State (cart, orders, logged-in user, pickup slot) persists on-device via
`@react-native-async-storage/async-storage`, so it survives a refresh/reload.

## Requirements
- [Node.js](https://nodejs.org) 18+ installed
- npm (comes with Node)

You do **not** need Xcode or Android Studio to run this on web.

## Setup

```bash
cd suds-native
npm install
```

## Run it on web

```bash
npx expo start --web
```

This opens `http://localhost:8081` (or the port Expo prints) in your browser.
Shrink the browser window to see it at phone width, or open dev tools → device
toolbar and pick any phone preset.

## Run it on your phone (optional)

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app (iOS/Android) — install it from the
App Store / Play Store first.

## Project structure

```
suds-native/
├── App.js                   # entry point, screen router + tab bar
├── src/
│   ├── theme.js              # colors, radius, spacing tokens
│   ├── data.js                # services, categories, pickup slots (edit here)
│   ├── context/AppContext.js  # navigation stack, cart/orders/auth state, persistence
│   ├── components/            # Button, Chip, TagChip, ServiceCard, BottomTabBar
│   └── screens/                # one file per screen
```

## Customizing
- **Services & prices**: edit `src/data.js`.
- **Colors/branding**: edit the `colors` object in `src/theme.js`.
- **Navigation**: this app uses a lightweight custom stack in `AppContext.js`
  (no React Navigation dependency) — `navigate(screen, params)`, `goBack()`,
  and `resetToTab(screen)` are all you need if you add new screens.

## Notes
- This is a frontend prototype — there's no backend. Login/signup accept any
  input and just create a local user object; orders are generated and stored
  on-device only.
- To swap in a custom font (e.g. a display serif for headings), install
  `expo-font` + a `@expo-google-fonts/*` package and load it in `App.js`
  before rendering `Root`.
