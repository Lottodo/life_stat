import { db } from '../../db'
import { profiles } from '../../db/schema'

export default defineEventHandler(async () => {
  return db.select().from(profiles)
})
