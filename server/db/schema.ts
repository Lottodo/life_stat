import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const profiles = sqliteTable('profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  sex: text('sex'),                 // 'M', 'F', u otro/null
  birthDate: text('birth_date'),    // ISO date, la edad se calcula en runtime
  avatarColor: text('avatar_color'),
})

export const metrics = sqliteTable('metrics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),       // 'sys', 'dia', 'ppm', 'temp', 'spo2'
  label: text('label').notNull(),            // 'Sistólica'
  unit: text('unit').notNull(),              // 'mmHg'
  category: text('category'),                // 'cardiovascular', 'respiratorio', 'temperatura'
  minNormal: real('min_normal'),
  maxNormal: real('max_normal'),
  minValid: real('min_valid'),
  maxValid: real('max_valid'),
})

export const readings = sqliteTable('readings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id').notNull().references(() => profiles.id),
  recordedAt: text('recorded_at').notNull(), // ISO string
  source: text('source'),                    // 'baumanometro', 'manual', 'oximetro'
  notes: text('notes'),
  sessionId: text('session_id'),             // agrupa sys+dia+ppm de una sola toma
})

export const readingValues = sqliteTable('reading_values', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  readingId: integer('reading_id').notNull().references(() => readings.id),
  metricId: integer('metric_id').notNull().references(() => metrics.id),
  value: real('value').notNull(),
})