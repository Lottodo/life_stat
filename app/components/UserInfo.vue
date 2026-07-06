<script setup lang="ts">
const props = defineProps<{
  name: string
  sex: string | null
  birthDate: string | null
}>()

const sexLabels: Record<string, string> = { M: 'Masc.', F: 'Fem.' }
const sexLabel = computed(() => props.sex ? (sexLabels[props.sex] ?? props.sex) : 'N/A')


function calculateAge(birthDate: string | null) {
  if (!birthDate) return null
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hasHadBirthdayThisYear) age--
  return age
}

const age = computed(() => calculateAge(props.birthDate))
</script>

<template>
  <div class="user-info">
    <p class="name">{{ name }}</p>
    <ul class="meta">
      <li><span class="label">Sexo</span> {{ sexLabel }}</li>
      <li><span class="label">Edad</span> {{ age }}</li>
    </ul>
  </div>
</template>

<style scoped>
.user-info {
  display: inline-block;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px 22px;
  margin-bottom: 16px;
}

.name {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 6px;
}

.meta {
  display: flex;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.meta li {
  font-size: 13px;
  color: var(--ink-soft);
}

.label {
  color: var(--ink-faint);
  text-transform: uppercase;
  font-size: 10.5px;
  letter-spacing: 0.06em;
  margin-right: 4px;
}
</style>
