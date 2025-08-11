// src/app.ts

import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { cleanEnv, port, str } from 'envalid'
import { initDb, getDb } from './db'
import { scheduleCleanupTask, scheduleHourlyUserCount } from './cron'

/**
 * Validate environment variables.
 * - PORT defaults to 3000
 * - DATABASE_PATH defaults to './data.sqlite'
 */
const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  DATABASE_PATH: str({ default: './data.sqlite' })
})

/**
 * Create and configure the Express app.
 * Initializes the database, schedules cron jobs,
 * sets up middleware and HTTP routes.
 */
export async function createApp() {
  // 1. Initialize SQLite (file-based or in-memory for tests)
  await initDb()

  // 2. Schedule recurring background tasks
  scheduleCleanupTask()
  scheduleHourlyUserCount()

  // 3. Create Express application
  const app = express()

  // 4. HTTP request logging
  app.use(morgan('dev'))

  // 5. JSON body parsing middleware
  app.use(express.json())

  // 6. Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  // 7. Fetch all users
  app.get('/users', async (_req, res) => {
    const users = await getDb().all<{ id: number; name: string }>(
      'SELECT id, name FROM users'
    )
    res.json(users)
  })

  // 8. Create a new user
  app.post('/users', async (req, res) => {
    const { name } = req.body

    // Basic validation
    if (!name || typeof name !== 'string') {
      return res
        .status(400)
        .json({ error: 'Request body must include a string field "name".' })
    }

    // Insert the new user and retrieve the inserted record
    const result = await getDb().run(
      'INSERT INTO users (name) VALUES (?)',
      name.trim()
    )
    const user = await getDb().get<{ id: number; name: string }>(
      'SELECT id, name FROM users WHERE id = ?',
      result.lastID
    )

    // Return the new user with 201 status
    res.status(201).json(user)
  })

  // 9. Return the configured app instance
  return app
}
