// @ts-nocheck
import { db } from './index'
import { profiles, metrics, readings } from './schema'

async function seed() {
  // 1. Perfiles ficticios
  const insertedProfiles = await db.insert(profiles).values([
    { name: 'Juan Pérez', sex: 'M', birthDate: '1998-03-14', avatarColor: '#2F5D8A' },
    { name: 'Alicia Gómez', sex: 'F', birthDate: '1995-07-22', avatarColor: '#1D7A6E' },
  ]).returning()

  const juan = insertedProfiles[0]
  const alicia = insertedProfiles[1]

  // 2. Catálogo de métricas — global, no depende del perfil
  const insertedMetrics = await db.insert(metrics).values([
    { key: 'sys',  label: 'Sistólica',              unit: 'mmHg', category: 'cardiovascular', minNormal: 90,   maxNormal: 120, minValid: 40, maxValid: 250 },
    { key: 'dia',  label: 'Diastólica',              unit: 'mmHg', category: 'cardiovascular', minNormal: 60,   maxNormal: 80,  minValid: 30, maxValid: 150 },
    { key: 'ppm',  label: 'Pulsaciones por minuto',  unit: 'lpm',  category: 'cardiovascular', minNormal: 60,   maxNormal: 100, minValid: 20, maxValid: 220 },
  ]).returning()

  const metricByKey = Object.fromEntries(insertedMetrics.map(m => [m.key, m.id]))

  // 3. Lecturas de ejemplo
  const now = new Date()
  const readingDate = now.toISOString().slice(0, 10)
  const readingTime = now.toISOString().slice(11, 16)

  await db.insert(readings).values([
    { profileId: juan.id, metricId: metricByKey.sys, value: 118, readingDate, readingTime },
    { profileId: juan.id, metricId: metricByKey.dia, value: 76, readingDate, readingTime },
    { profileId: juan.id, metricId: metricByKey.ppm, value: 68, readingDate, readingTime },
  ])

  console.log('Seed completado: 2 perfiles, 5 métricas, 4 lecturas de ejemplo ✅')
}

seed()
