<script setup lang="ts">
const props = defineProps<{
  metrics: { id: number; badge: string; name: string; unit: string }[]
  profileId: number
}>()

const emit = defineEmits<{ close: []; saved: [] }>()

const selectedMetric = ref<{ id: number; badge: string; name: string; unit: string } | null>(null)

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const now = new Date()

const valueInput = ref('')
const timeInput = ref(`${pad(now.getHours())}:${pad(now.getMinutes())}`)
const dateInput = ref(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`)
const notesInput = ref('')

async function save() {
  await $fetch('/api/readings', {
    method: 'POST',
    query: { profileId: props.profileId },
    body: {
      metricId: selectedMetric.value!.id,
      value: Number(valueInput.value),
      note: notesInput.value || null,
      readingDate: dateInput.value,
      readingTime: timeInput.value,
    },
  })
  emit('saved')
  emit('close')
}
</script>

<template>
  <Modal v-if="!selectedMetric" @close="$emit('close')">
    <h2 class="modal-title">Métricas</h2>
    <div class="metric-picker">
      <button
        v-for="metric in props.metrics"
        :key="metric.badge"
        type="button"
        class="metric-picker-item"
        @click="selectedMetric = metric"
      >
        <span class="metric-picker-badge" :style="{ background: hashColor(metric.badge) }">{{ metric.badge }}</span>
        <span>{{ metric.name }}</span>
      </button>
    </div>
  </Modal>

  <Modal v-else @close="$emit('close')">
    <div class="entry-title">
      <span class="metric-picker-badge" :style="{ background: hashColor(selectedMetric.badge) }">{{ selectedMetric.badge }}</span>
      <h2 class="modal-title">{{ selectedMetric.name }}</h2>
    </div>

    <form class="entry-form" @submit.prevent="save">
      <label class="field">
        <span class="label">Valor</span>
        <div class="value-row">
          <input v-model="valueInput" type="number" step="any" name="value" required />
          <span class="unit">{{ selectedMetric.unit }}</span>
        </div>
      </label>

      <div class="row">
        <label class="field">
          <span class="label">Hora</span>
          <input v-model="timeInput" type="time" name="time" />
        </label>

        <label class="field">
          <span class="label">Fecha</span>
          <input v-model="dateInput" type="date" name="date" />
        </label>
      </div>

      <label class="field">
        <span class="label">Notas</span>
        <textarea v-model="notesInput" name="notes" rows="3"></textarea>
      </label>

      <button type="submit" class="toolbar-btn save-btn">Guardar</button>
    </form>
  </Modal>
</template>

<style scoped>
.modal-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
}

.metric-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-picker-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-size: 13px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
}
.metric-picker-item:hover {
  border-color: var(--ink-faint);
}

.metric-picker-badge {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 6px;
  color: #1f2430;
  flex-shrink: 0;
}

.entry-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.entry-title .modal-title {
  margin: 0;
}

.entry-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: flex;
  gap: 16px;
}

.row .field {
  flex: 1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
}

.label {
  color: var(--ink-faint);
  text-transform: uppercase;
  font-size: 10.5px;
  letter-spacing: 0.06em;
}

.value-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.value-row input {
  flex: 1;
}

.unit {
  font-size: 13px;
  color: var(--ink-faint);
}

input[type='number'],
input[type='time'],
input[type='date'],
textarea {
  font: inherit;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 10px;
}

textarea {
  resize: vertical;
}

.save-btn {
  align-self: flex-start;
  margin-top: 4px;
}
</style>
