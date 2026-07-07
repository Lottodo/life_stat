<script setup lang="ts">
defineProps<{
  profiles: { id: number; name: string; sex: string | null; birthDate: string | null; avatarColor: string | null }[]
}>()

const emit = defineEmits<{ select: [profile: { id: number; name: string; sex: string | null; birthDate: string | null; avatarColor: string | null }] }>()
</script>

<template>
  <div class="user-list">
    <button
      v-for="profile in profiles"
      :key="profile.id"
      type="button"
      class="user-row"
      :style="{ background: profile.avatarColor ? `color-mix(in srgb, ${profile.avatarColor} 40%, white)` : undefined }"
      @click="emit('select', profile)"
    >
      {{ profile.name }}
    </button>
  </div>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.user-row {
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #1f2430;
  background: var(--border);
  border: none;
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
}

.user-row:hover {
  opacity: 0.85;
}
</style>
