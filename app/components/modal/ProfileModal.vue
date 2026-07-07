<script setup lang="ts">
const props = defineProps<{
  name: string
  sex: string | null
  birthDate: string | null
  avatarColor?: string | null
}>()

defineEmits<{ close: [] }>()

const nameInput = ref(props.name)
const sexInput = ref(props.sex)
const birthDateInput = ref(props.birthDate)
const avatarColorInput = ref(props.avatarColor ?? '#000000')
</script>

<template>
  <Modal @close="$emit('close')">
    <h2 class="modal-title">Perfil</h2>
    <form class="profile-form" @submit.prevent>
      <label class="field">
        <span class="label">Nombre</span>
        <input v-model="nameInput" type="text" name="name" />
      </label>

      <div class="row">
        <div class="field">
          <span class="label">Sexo biológico</span>
          <div class="radio-group">
            <label class="radio">
              <input v-model="sexInput" type="radio" name="sex" value="M" />
              Masc.
            </label>
            <label class="radio">
              <input v-model="sexInput" type="radio" name="sex" value="F" />
              Fem.
            </label>
          </div>
        </div>

        <label class="field field-color">
          <span class="label">Color favorito</span>
          <input v-model="avatarColorInput" type="color" name="avatarColor" />
        </label>
      </div>

      <label class="field">
        <span class="label">Nacimiento</span>
        <input v-model="birthDateInput" type="date" name="birthDate" />
      </label>
    </form>
  </Modal>
</template>

<style scoped>
.modal-title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
}

.field-color {
  flex: none;
}

.label {
  color: var(--ink-faint);
  text-transform: uppercase;
  font-size: 10.5px;
  letter-spacing: 0.06em;
}

input[type='text'],
input[type='date'] {
  font: inherit;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 10px;
}

input[type='color'] {
  width: 40px;
  height: 32px;
  padding: 2px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--paper);
  cursor: pointer;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio {
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: none;
  letter-spacing: normal;
  font-size: 13px;
  color: var(--ink-soft);
  cursor: pointer;
}
</style>
