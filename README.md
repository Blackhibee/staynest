# StayNest

StayNest is a Next.js accommodation marketplace for discovering stays and managing host listings.

## Run locally

Requirements: Node.js 20 or later.

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Deploy with Vercel

1. Push this repository to GitHub and import `Blackhibee/staynest` from the Vercel dashboard.
2. Keep the detected framework as Next.js. Vercel uses `npm run build` automatically.
3. If enabling Firebase, add the variables listed in `.env.example` under **Project Settings > Environment Variables** in Vercel. Use the Firebase web-app values for each deployment environment. Do not commit `.env.local` or credentials.
4. Deploy and test the public pages, sign-in, reservations, and host workflows in the Vercel preview before promoting to production.

The Firebase integration is optional for the current demo experience. Authentication, Firestore, and Storage initialize only when all required Firebase environment variables are present.

## Main routes

- `/` - guest home
- `/properties` - browse available stays
- `/become-a-host` - host information
- `/host/dashboard` - host workspace
- `/about`, `/help`, `/terms`, and `/privacy` - company information and policies

The Terms of Service and Privacy Policy pages are draft copy and require review against StayNest's actual policies and applicable law before public launch.