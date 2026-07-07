<script setup lang="ts">
const props = defineProps<{
  name: string
  sex: string | null
  birthDate: string | null
  avatarColor?: string | null
}>()

defineEmits<{ close: [] }>()

const sexLabels: Record<string, string> = { M: 'Masc.', F: 'Fem.' }
const sexLabel = computed(() => props.sex ? (sexLabels[props.sex] ?? props.sex) : 'N/A')

const age = computed(() => calculateAge(props.birthDate))
</script>

<template>
  <Modal :background="avatarColor" @close="$emit('close')">
    <h2 class="modal-title">{{ name }}</h2>
    <ul class="info-list">
      <li><span class="label">Sexo biológico</span> {{ sexLabel }}</li>
      <li><span class="label">Edad</span> {{ age ?? 'N/A' }}</li>
      <li><span class="label">Nacimiento</span> {{ birthDate ?? 'N/A' }}</li>
    </ul>
  </Modal>
</template>

<style scoped>
.modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
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
