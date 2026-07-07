<script setup lang="ts">
const props = defineProps<{
  name: string
  sex: string | null
  birthDate: string | null
  avatarColor?: string | null
}>()

const sexLabels: Record<string, string> = { M: 'Masc.', F: 'Fem.' }
const sexLabel = computed(() => props.sex ? (sexLabels[props.sex] ?? props.sex) : 'N/A')

const age = computed(() => calculateAge(props.birthDate))

const showModal = ref(false)
</script>

<template>
  <div class="user-info" role="button" tabindex="0" @click="showModal = true" @keydown.enter="showModal = true">
    <p class="name">{{ name }}</p>
    <ul class="meta">
      <li><span class="label">Sexo bio.</span> {{ sexLabel }}</li>
      <li><span class="label">Edad</span> {{ age }}</li>
    </ul>
  </div>

  <UserInfoModal
    v-if="showModal"
    :name="name"
    :sex="sex"
    :birth-date="birthDate"
    :avatar-color="avatarColor"
    @close="showModal = false"
  />
</template>

<style scoped>
.user-info {
  display: inline-block;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px 22px;
  margin-bottom: 16px;
  cursor: pointer;
}

.user-info:hover {
  border-color: var(--ink-faint);
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
