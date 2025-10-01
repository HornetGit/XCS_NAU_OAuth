# OAuth - Nuxt Authentication Module for testing

Purpose: Testing the authentication module using Nuxt UI + nuxt-auth-utils module for GitHub OAuth (or more) and local authentication.

This is the code testing corresponding to the ['NAU in 1 hour' YouTube tutorial](https://youtu.be/mNDHRLqmoMg?si=Fx-CYUcR-1M35Ij9) by his owner.

NAU: Nuxt OAuth Utils module, published as a [nuxt module](https://nuxt.com/modules/auth-utils)

## More ref:
- [nuxt-auth-utils by Eckhardt (Kaizen) Dreyer](https://github.com/Eckhardt-D/nuxt-auth-utils.git)
- [Demo by Atinux](https://github.com/atinux/nuxt-auth-utils)


## Stack

- **Framework**: Nuxt 4.1.2 with Nuxt UI 4.0
- **Auth**: nuxt-auth-utils 0.5.25 (GitHub OAuth + local auth)
- **Database**: SQLite with Drizzle ORM 0.44.5
- **Icons**: Lucide + Simple Icons
- **Package Manager**: pnpm 10.17.1

## Features

- GitHub OAuth login
- Local registration/login with password hashing
- Session management (7-day cookie expiration)
- Protected routes with auth middleware
- SQLite database for user storage

## Database Schema

**users** table:
- `id`: auto-increment primary key
- `name`, `email`, `passwordHash`
- `createdAt`, `updatedAt`: timestamps

## Environment Variables

```bash
NUXT_SESSION_PASSWORD=<32-char-random-hex>
NUXT_OAUTH_GITHUB_CLIENT_ID=<github-app-id>
NUXT_OAUTH_GITHUB_CLIENT_SECRET=<github-secret>
NUXT_OAUTH_GITHUB_REDIRECT_URL=http://localhost:3000/oauth/github
```

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server (port 3000)
pnpm build                # Build for production
pnpm migrations:generate  # Generate Drizzle migrations
pnpm migrations:migrate   # Run migrations
```

## Structure

```
app/
├── assets/css/
│   └── main.css            # Global styles
├── components/
│   ├── AppLogo.vue
│   └── TemplateMenu.vue
├── layouts/
│   ├── default.vue         # Default layout
│   ├── form.vue            # Form layout (auth pages)
│   └── landing.vue         # Landing page layout
├── middleware/
│   └── auth.ts             # Auth middleware for protected routes
├── pages/
│   ├── auth/
│   │   ├── login.vue       # Login page
│   │   └── register.vue    # Registration page
│   └── index.vue           # Protected home page
├── app.config.ts           # App configuration
└── app.vue                 # Root component

server/
├── api/auth/
│   ├── login.post.ts       # Local login endpoint
│   └── register.post.ts    # Registration endpoint
├── database/
│   └── schema.ts           # Drizzle schema definition
├── routes/oauth/
│   └── github.get.ts       # GitHub OAuth callback handler
└── utils/
    └── database.ts         # DB connection utilities
```

## Usage

1. Configure GitHub OAuth app and add credentials from `.env.example` to `.env`
2. Run `pnpm migrations:generate` and `pnpm migrations:migrate` to initialize database
3. Start dev server with `pnpm dev`
4. Access login at `/auth/login` or protected page at `/`