import { db } from '../../db'
import { metrics, readings } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { profileId = 1 } = getQuery(event)

  const rows = await db.select({
    key: metrics.key,
    label: metrics.label,
    unit: metrics.unit,
    minNormal: metrics.minNormal,
    maxNormal: metrics.maxNormal,
    minValid: metrics.minValid,
    maxValid: metrics.maxValid,
    value: readings.value,
  })
  .from(readings)
  .innerJoin(metrics, eq(readings.metricId, metrics.id))
  .where(eq(readings.profileId, Number(profileId)))
  .orderBy(desc(readings.readingDate), desc(readings.readingTime))

  const seen = new Set<string>()
  return rows.filter(r => (seen.has(r.key) ? false : (seen.add(r.key), true)))
})
