import { db } from '../../db'
import { profiles } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { profileId = 1 } = getQuery(event)

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, Number(profileId)))
  if (!profile)
    throw createError({ statusCode: 404, statusMessage: 'No se encontraron perfiles' })
  return profile
})