# Blog React App

A React-based blogging platform with authentication, role-based content management, and social interactions. The frontend talks to a Node.js/MongoDB backend deployed via Docker on Render.com.

Backend repository: https://github.com/sarahlynnx/blog-server

## Features

- **User authentication** — sign up, log in, forgot password, and password reset flows
- **Role-based content management** — users with the *author* role can create, edit, and delete posts; all authenticated users can like and comment
- **Markdown support** — posts are rendered with `react-markdown`
- **Responsive design** — built with React Bootstrap for cross-device layouts
- **Routing** — client-side routing via `react-router-dom` (HashRouter)

## Tech Stack

- **Framework:** React 18 (Create React App / `react-scripts`)
- **UI:** React Bootstrap, Bootstrap 5, Sass, Font Awesome
- **Routing:** react-router-dom v6
- **Utilities:** dayjs, react-markdown
- **Backend:** Node.js + MongoDB (separate repo, containerized with Docker)
- **Hosting:** Render.com (static site)

## Routes

| Path | Component |
| --- | --- |
| `/` | Blog list |
| `/blog/:id` | Individual blog post |
| `/blog/create` | Create a new post (authors only) |
| `/login` | Login |
| `/login/forgot-password` | Request password reset |
| `/login/reset-password/:token` | Complete password reset |
| `/signup` | Sign up |

## Getting Started

### Prerequisites

- Node.js 21+ and npm
- A running instance of the [blog server](https://github.com/sarahlynnx/blog-server)

### Installation

```bash
npm install
```

### Environment

The app reads the backend URL from `REACT_APP_SERVER_BASE_URL`. The provided npm scripts set this for you:

- `npm run start:local` — runs on port 4001 against `http://localhost:5001`
- `npm run start:prod` — runs on port 4001 against the deployed backend

### Available Scripts

| Script | Description |
| --- | --- |
| `npm start` | Start the dev server (default CRA settings) |
| `npm run start:local` | Dev server pointed at a local backend |
| `npm run start:prod` | Dev server pointed at the production backend |
| `npm run build` | Production build into `build/` |
| `npm test` | Run tests in watch mode |
| `npm run deploy` | Publish `build/` to GitHub Pages |

## Deployment

The app is deployed as a static site on Render.com using the configuration in [render.yaml](render.yaml), which publishes the `build/` directory.

A [Dockerfile](Dockerfile) is also included for containerized deployment — it builds the React app and serves the static output with `serve` on port 5000.

## Project Structure

```
src/
├── App.js                 # Routes and FontAwesome setup
├── index.js
└── components/
    ├── Assets/
    ├── BlogList/          # Home / post listing
    ├── IndividualBlog/    # Single post view
    ├── CreateBlog/        # Author-only post editor
    ├── Login/             # Login, forgot password, reset password
    ├── Signup/
    ├── ErrorMessage/
    ├── LoadingAnimation/
    ├── api.js             # Backend API client
    ├── userContext.jsx    # Auth context
    └── DateFormat.jsx
```
