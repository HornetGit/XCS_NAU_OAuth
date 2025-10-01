import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', (t) => ({
    id: t.integer('id').primaryKey({ autoIncrement:true}),
    name: t.text().notNull(),    
    email: t.text().notNull().unique(),
    passwordHash: t.text().notNull(),
    createdAt: t.integer( { mode:'timestamp_ms'})
        .$defaultFn(() => new Date()).notNull(),
    updatedAt: t.integer( { mode:'timestamp_ms'})
        .$defaultFn(() => new Date())
        .$onUpdate(()=> new Date()).notNull(),
}))

// link the session to the nux session in the db
// to allow deauthenticate a user, thus deleting the session from the db
// to invalidate a user, so not relying only on the session cookie
// export const session ...