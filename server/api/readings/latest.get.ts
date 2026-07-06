import { db } from '../../db'
import { metrics, readings, readingValues } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { profileId = 1} = getQuery(event)

  const rows = await db.select({
    key: metrics.key,
    label: metrics.label,
    unit: metrics.unit,
    minNormal: metrics.minNormal,
    maxNormal: metrics.maxNormal,
    minValid: metrics.minValid,
    maxValid: metrics.maxValid,
    value: readingValues.value,
  })
  .from(readingValues)
  .innerJoin(readings, eq(readingValues.readingId, readings.id))
  .innerJoin(metrics, eq(readingValues.metricId, metrics.id))
  .where(eq(readings.profileId, Number(profileId)))
  .orderBy(desc(readings.recordedAt))

  const seen = new Set<string>()
  return rows.filter(r => (seen.has(r.key) ? false : (seen.add(r.key), true)))
})
