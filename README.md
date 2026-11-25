# Home4Paws – Pet Adoption Platform

A React + Vite academic project for browsing pets, submitting adoption requests, and managing pet listings and grooming appointments. The application uses browser LocalStorage for its demonstration data.

## Features

- Browse and search available pets
- View pet details and submit adoption requests
- User signup and login
- Admin login and pet management (add, edit, delete)
- Adoption request management
- Pet grooming appointment page
- Pet image upload with preview

## Tech stack

- React
- Vite
- JavaScript
- CSS
- Browser LocalStorage

## Run locally

```bash
npm install
npm run dev
```

## Check before deployment

```bash
npm run lint
npm run build
```

The production build is generated in the `dist` folder.

## Deploy to Vercel

Import this repository into Vercel and use:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` rewrites application routes to `index.html` so direct navigation and refreshes work with this single-page app.

## Academic project note

This project stores demo account and application data in browser LocalStorage. It is intended for academic demonstration, not production authentication or shared multi-user storage. LocalStorage data is browser-specific and can be cleared by the user.
