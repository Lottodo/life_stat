<script setup lang="ts">
const props = defineProps<{
  badge: string
  name: string
  value: string | number
  unit: string
  status: string
  variant: 'ok' | 'warn' | 'alert'
}>()

const badgeColor = computed(() => hashColor(props.badge))
</script>

<template>
  <div class="card">
    <div class="card-head">
      <span class="badge" :style="{ background: badgeColor }">{{ badge }}</span>
      <span class="name">{{ name }}</span>
    </div>
    <div class="reading">
      <span class="value">{{ value }}</span>
      <span class="unit">{{ unit }}</span>
    </div>
    <span class="status" :class="`status--${variant}`">{{ status }}</span>
  </div>
</template>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 9px;
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  font-family: 'Barlow', normal;
  font-size: 1.5em;
  border-radius: 8px;
  color: #1f2430;
}

.name {
  font-size: 1.0em;
  font-family: 'Sora', normal;
  color: var(--ink-soft);
}

.reading {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.value {
  font-weight: 700;
  font-size: 2em;
  font-family: 'JetBrains Mono';
  font-weight: 800;
}

.unit {
  font-size: 0.9em;
  color: var(--ink-faint);
}

.status {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 20px;
}

.status--ok {
  background: var(--ok-fill);
  color: var(--ok-text);
}

.status--warn {
  background: var(--warn-fill);
  color: var(--warn-text);
}

.status--alert {
  background: var(--alert-fill);
  color: var(--alert-text);
}
</style>
