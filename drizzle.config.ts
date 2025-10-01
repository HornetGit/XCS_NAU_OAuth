import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'sqlite',
    out: './server/database/drizzle',
    schema: './server/database/schema.ts',
    dbCredentials: {
        url: 'file:database.sqlite',
    }
})