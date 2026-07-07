<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  modal?: Component
  modalProps?: Record<string, unknown>
}>()

defineEmits<{ saved: [] }>()

const showModal = ref(false)
</script>

<template>
  <button type="button" class="toolbar-btn" @click="props.modal && (showModal = true)">
    <slot />
  </button>

  <component :is="modal" v-if="modal && showModal" v-bind="modalProps" @close="showModal = false" @saved="$emit('saved')" />
</template>

<style scoped>
@media (orientation: portrait) {
  .toolbar-btn :slotted(.label) {
    display: none;
  }
}
</style>
