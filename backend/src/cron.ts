// src/cron.ts

import cron from 'node-cron'
import { getDb } from './db'

/**
 * Clean up users with empty names every day at midnight
 */
export function scheduleCleanupTask() {
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('[cron] Running cleanup task at', new Date().toISOString())
      const db = getDb()
      const result = await db.run(
        'DELETE FROM users WHERE TRIM(name) = \'\''
      )
      console.log(`[cron] Deleted ${result.changes} users with empty names`)
    } catch (err) {
      console.error('[cron] Cleanup task failed:', err)
    }
  })
}

/**
 * Log current user count every hour
 */
export function scheduleHourlyUserCount() {
  cron.schedule('0 * * * *', async () => {
    try {
      const db = getDb()
      // row may be undefined, so handle that case
      const row = await db.get<{ count: number }>(
        'SELECT COUNT(*) AS count FROM users'
      )
      const count = row?.count ?? 0
      console.log(`[cron] Current user count: ${count}`)
    } catch (err) {
      console.error('[cron] Failed to fetch user count:', err)
    }
  })
}
