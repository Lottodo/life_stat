import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

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
  metricId: integer('metric_id').notNull().references(() => metrics.id),
  profileId: integer('profile_id').notNull().references(() => profiles.id),
  value: real('value').notNull(),
  note: text('note'),
  readingDate: text('reading_date').notNull(), // 'YYYY-MM-DD'
  readingTime: text('reading_time').notNull(), // 'HH:MM'
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
})