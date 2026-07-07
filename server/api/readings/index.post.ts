import { db } from '../../db'
import { readings } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const { profileId = 1 } = getQuery(event)
  const body = await readBody(event)

  const [reading] = await db.insert(readings).values({
    profileId: Number(profileId),
    metricId: body.metricId,
    value: body.value,
    note: body.note,
    readingDate: body.readingDate,
    readingTime: body.readingTime,
  }).returning()

  return reading
})
