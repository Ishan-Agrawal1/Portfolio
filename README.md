# Portfolio — Ishan Agrawal

A full-stack personal portfolio showcasing projects, skills, competitive programming stats, and a contact form. The frontend is a React SPA with page-level composition; the backend is an Express API backed by MongoDB with live integrations to coding platforms.

## Features

- **Home** — Hero, tech marquee, featured project, and achievements snapshot
- **About** — Bio, technical philosophy, education, tech stack, and beyond-coding interests
- **Projects** — Project grid loaded from the API
- **Skills** — Live stats from Codeforces, LeetCode, CodeChef, and GeeksforGeeks (cached server-side and in the browser)
- **Contact** — Validated contact form with success/error feedback

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion |
| Backend | Node.js, Express 4, Mongoose 9 |
| Database | MongoDB |
| External APIs | Codeforces, LeetCode GraphQL, CodeChef, GeeksforGeeks |

## Project Structure

```
Portfolio/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── cards/          # Reusable card UI (projects, stats, education, coding platforms)
│       │   ├── sections/       # Page sections grouped by route (about, home, skills, …)
│       │   ├── ui/             # Shared primitives (SectionHeader, CTAButton, AnimatedNumber, …)
│       │   └── layout/         # App shell (Navbar, Footer, MobileMenu)
│       ├── pages/              # Thin composition layers — import sections only
│       ├── hooks/              # useCodingProfiles, useProjects
│       ├── routes/             # Route configuration
│       ├── lib/                # API client
│       └── utils/              # Constants, validators, helpers
└── backend/
    └── src/
        ├── config/             # Environment and database
        ├── controllers/        # Request handlers
        ├── middleware/         # Validation and error handling
        ├── models/             # Mongoose schemas
        └── routes/             # API route definitions
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) running locally or a remote connection string

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Portfolio
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

Start the API server:

```bash
npm run dev
```

The backend runs at `http://localhost:3000`. Health check: `GET /api/health`.

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (optional — defaults work for local dev):

```env
VITE_API_URL=http://localhost:3000/api
```

Start the dev server:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/projects/:id` | Get project by ID |
| `POST` | `/api/projects` | Create a project |
| `PUT` | `/api/projects/:id` | Update a project |
| `DELETE` | `/api/projects/:id` | Delete a project |
| `POST` | `/api/contacts` | Submit contact form |
| `GET` | `/api/contacts` | List contact submissions |
| `GET` | `/api/coding-profiles` | Aggregated live coding platform stats |

## Scripts

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with hot reload (`tsx watch`) |
| `npm start` | Start server (production) |

## Frontend Architecture

Pages are intentionally thin — each page composes section components, and sections compose cards and UI primitives:

```
Page → Section → Card / UI primitive
```

Example (`About.jsx`):

```jsx
<AboutHero />
<PhilosophySection />
<EducationSection />
<TechStackSection />
<AchievementsSection />
<BeyondCodingSection />
```

Coding profile data is fetched once via `useCodingProfiles`, cached in `sessionStorage` for 5 minutes on the client, and aggregated on the server with a 15-minute in-memory cache.

## Environment Variables

### Backend

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | Recommended | `mongodb://localhost:27017/portfolio` | MongoDB connection string |
| `PORT` | No | `3000` | HTTP server port |
| `NODE_ENV` | No | `development` | Runtime environment |

### Frontend

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | `http://localhost:3000/api` | Backend API base URL |

## License

MIT
