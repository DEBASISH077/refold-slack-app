import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { cleanEnv, str } from 'envalid'

// Validate DATABASE_PATH
const env = cleanEnv(process.env, {
  DATABASE_PATH: str({ default: './data.sqlite' })
})

let db: Database<sqlite3.Database, sqlite3.Statement>

export async function initDb() {
  db = await open({
    filename: env.DATABASE_PATH,
    driver: sqlite3.Database
  })
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `)
  console.log(`SQLite initialized at ${env.DATABASE_PATH}`)
  return db
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.')
  }
  return db
}
