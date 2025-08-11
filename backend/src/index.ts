import 'dotenv/config'
// __tests__/users.test.ts
import { createApp } from '../src/app'


async function main() {
  // Create and configure the Express app (with DB, logging, routes)
  const app = await createApp()

  // Determine the port (from .env or default)
  const port = Number(process.env.PORT) || 3000

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

main().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
// src/app.ts (inside createApp, after initDb())
export async function createApp() {
  await initDb()

  // Schedule background tasks
+ scheduleCleanupTask()
+ scheduleHourlyUserCount()

  const app = express()
  // … rest of middleware and routes …
  return app
}
