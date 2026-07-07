import { db } from '../../db'
import { profiles } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { profileId = 1 } = getQuery(event)
  const body = await readBody(event)

  const [profile] = await db.update(profiles)
    .set({
      name: body.name,
      sex: body.sex,
      birthDate: body.birthDate,
      avatarColor: body.avatarColor,
    })
    .where(eq(profiles.id, Number(profileId)))
    .returning()

  if (!profile)
    throw createError({ statusCode: 404, statusMessage: 'No se encontraron perfiles' })

  return profile
})
