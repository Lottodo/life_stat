<script setup lang="ts">
const props = defineProps<{
  metrics: { badge: string; name: string }[]
}>()

defineEmits<{ close: [] }>()

const selectedMetric = ref<{ badge: string; name: string } | null>(null)
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
    <h2 class="modal-title">{{ selectedMetric.name }}</h2>
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
}
</style>
