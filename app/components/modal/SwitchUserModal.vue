<script setup lang="ts">
const emit = defineEmits<{ close: []; select: [profile: { id: number; name: string; sex: string | null; birthDate: string | null; avatarColor: string | null }] }>()

const { data: profiles } = await useFetch('/api/profiles')
</script>

<template>
  <Modal @close="$emit('close')">
    <h2 class="modal-title">Cambiar usuario</h2>
    <ProfileList :profiles="profiles ?? []" @select="emit('select', $event)" />
  </Modal>
</template>

<style scoped>
.modal-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
}
</style>
