<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  modal?: Component
  modalProps?: Record<string, unknown>
}>()

const showModal = ref(false)
</script>

<template>
  <button type="button" class="toolbar-btn" @click="props.modal && (showModal = true)">
    <slot />
  </button>

  <component :is="modal" v-if="modal && showModal" v-bind="modalProps" @close="showModal = false" />
</template>

<style scoped>
.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
}
.toolbar-btn:hover {
  color: var(--ink);
  border-color: var(--ink-faint);
}

@media (orientation: portrait) {
  .toolbar-btn :slotted(.label) {
    display: none;
  }
}
</style>
