import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../database/schema';

// set up the db handler
export const db = drizzle('file:database.sqlite', { schema })
export const tables = schema
export {and, eq, or } from 'drizzle-orm';