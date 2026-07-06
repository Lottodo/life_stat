// @ts-nocheck
import { db } from './index'
import { profiles, metrics, readings, readingValues } from './schema'

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
    { key: 'temp', label: 'Temperatura',             unit: '°C',   category: 'temperatura',    minNormal: 36.1, maxNormal: 37.2, minValid: 30, maxValid: 43 },
    { key: 'spo2', label: 'Saturación de oxígeno',   unit: '%',    category: 'respiratorio',   minNormal: 95,   maxNormal: 100, minValid: 50, maxValid: 100 },
  ]).returning()

  const metricByKey = Object.fromEntries(insertedMetrics.map(m => [m.key, m.id]))

  // 3. Lectura de ejemplo para Juan (sesión con sys+dia+ppm juntos)
  const [juanReading] = await db.insert(readings).values({
    profileId: juan.id,
    recordedAt: new Date().toISOString(),
    source: 'baumanometro',
    sessionId: 'demo-juan-1',
  }).returning()

  await db.insert(readingValues).values([
    { readingId: juanReading.id, metricId: metricByKey.sys, value: 118 },
    { readingId: juanReading.id, metricId: metricByKey.dia, value: 76 },
    { readingId: juanReading.id, metricId: metricByKey.ppm, value: 68 },
  ])

  // 4. Lectura de ejemplo para Alicia (SpO2 suelto, sin sesión de baumanómetro)
  const [aliciaReading] = await db.insert(readings).values({
    profileId: alicia.id,
    recordedAt: new Date().toISOString(),
    source: 'oximetro',
    notes: 'Medición post-ejercicio',
  }).returning()

  await db.insert(readingValues).values([
    { readingId: aliciaReading.id, metricId: metricByKey.spo2, value: 97 },
  ])

  console.log('Seed completado: 2 perfiles, 5 métricas, 2 lecturas de ejemplo ✅')
}

seed()