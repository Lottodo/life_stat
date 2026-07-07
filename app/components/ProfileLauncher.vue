<script setup lang="ts">
const emit = defineEmits<{ select: [profile: { id: number; name: string; sex: string | null; birthDate: string | null; avatarColor: string | null }] }>()

const { data: profiles } = await useFetch('/api/profiles')
</script>

<template>
  <div class="launcher">
    <h1 class="title">¿Quién eres?</h1>
    <ProfileList :profiles="profiles ?? []" @select="emit('select', $event)" />
  </div>
</template>

<style scoped>
.launcher {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
</style>
