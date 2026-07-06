import { db } from '../db'
import { profiles } from '../db/schema'

export default defineEventHandler(async () => {
  const [profile] = await db.select().from(profiles).limit(1)
  if (!profile)
    throw createError({ statusCode: 404, statusMessage: 'No se encontraron perfiles' })
  return profile
})