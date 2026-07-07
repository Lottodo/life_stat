import { db } from '../../db'
import { metrics } from '../../db/schema'

export default defineEventHandler(async () => {
  return db.select().from(metrics)
})
