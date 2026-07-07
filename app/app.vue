<script setup lang="ts">
import { Filter, Menu, Plus } from '@lucide/vue'
import RegisterDataModal from '~/components/modal/RegisterDataModal.vue'

type Profile = { id: number; name: string; sex: string | null; birthDate: string | null; avatarColor: string | null }

const selectedProfileId = useCookie<number | null>('profileId', { default: () => null })
const profile = ref<Profile | null>(null)

const { data: latest, refresh: refreshLatest } = await useFetch('/api/readings/latest', {
  query: { profileId: selectedProfileId },
  immediate: false,
})

const { data: metricsCatalog } = await useFetch('/api/metrics')

if (selectedProfileId.value) {
  const { data: existingProfile } = await useFetch<Profile>('/api/profile', { query: { profileId: selectedProfileId } })
  profile.value = existingProfile.value
  await refreshLatest()
}

function selectProfile(p: Profile) {
  profile.value = p
  selectedProfileId.value = p.id
  refreshLatest()
}

const menuOpen = ref(false)
const menuItems = ['Configuración', 'Perfil', 'Cambiar usuario']
const showProfileModal = ref(false)
const showSwitchUserModal = ref(false)

function onMenuItemClick(item: string) {
  menuOpen.value = false
  if (item === 'Perfil') showProfileModal.value = true
  if (item === 'Cambiar usuario') showSwitchUserModal.value = true
}

const metrics = computed(() => (latest.value ?? []).map(m => ({
  badge: m.key.toUpperCase(),
  name: m.label,
  value: m.value,
  unit: m.unit,
  status: 'Normal',      // classification logic still TODO
  variant: 'ok' as const,
})))

const registerMetrics = computed(() => (metricsCatalog.value ?? []).map(m => ({
  id: m.id,
  badge: m.key.toUpperCase(),
  name: m.label,
  unit: m.unit,
})))
</script>

<template>
  <ProfileLauncher v-if="!profile" @select="selectProfile" />

  <div v-else class="page">
    <header class="header">
      <img src="/logo.png" alt="lifeStat logo" width="100"/>
      <div class="menu-wrap">
        <button type="button" class="burger" aria-label="Abrir menú" @click="menuOpen = !menuOpen">
          <Menu :size="20" />
        </button>
        <ul v-if="menuOpen" class="menu">
          <li v-for="item in menuItems" :key="item" @click="onMenuItemClick(item)">{{ item }}</li>
        </ul>
      </div>
    </header>

    <ProfileModal
      v-if="showProfileModal"
      :profile-id="profile.id"
      :name="profile.name"
      :sex="profile.sex"
      :birth-date="profile.birthDate"
      :avatar-color="profile.avatarColor"
      @saved="profile = $event"
      @close="showProfileModal = false"
    />

    <SwitchUserModal
      v-if="showSwitchUserModal"
      @select="selectProfile($event); showSwitchUserModal = false"
      @close="showSwitchUserModal = false"
    />
    <div class="toolbar">
      <UserInfo v-if="profile" :name="profile.name" :sex="profile.sex" :birth-date="profile.birthDate" :avatar-color="profile.avatarColor" />
      <div class="actions">
        <ToolbarButton :modal="RegisterDataModal" :modal-props="{ metrics: registerMetrics, profileId: profile.id }" @saved="refreshLatest">
          <Plus :size="14" />
          <span class="label">Registrar datos</span>
        </ToolbarButton>
        <ToolbarButton>
          <Filter :size="14" />
          <span class="label">Filtrar</span>
        </ToolbarButton>
      </div>
    </div>
    <div class="cards">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.badge"
        :badge="metric.badge"
        :name="metric.name"
        :value="metric.value"
        :unit="metric.unit"
        :status="metric.status"
        :variant="metric.variant"
      />
    </div>
  </div>
</template>

<style>
:root {
  --paper: #F2F4F5;
  --card: #FFFFFF;
  --ink: #182430;
  --ink-soft: #5B6672;
  --ink-faint: #93A0AB;
  --border: #E1E5E8;
  --grid-line: #EDF0F2;
  --ok-fill: #E9F4EC;
  --ok-text: #2E7D46;
  --warn-fill: #FDF3E3;
  --warn-text: #A56A0A;
  --alert-fill: #FBEAEA;
  --alert-text: #B23A32;
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #14181C;
    --card: #1C2126;
    --button: #252b31;
    --ink: #E7EBEE;
    --ink-soft: #A6AFB8;
    --ink-faint: #6E7882;
    --border: #2A3138;
    --grid-line: #1A1F24;
    --ok-fill: #1B3323;
    --ok-text: #7FC993;
    --warn-fill: #3A2E14;
    --warn-text: #E3B156;
    --alert-fill: #3A1E1C;
    --alert-text: #EB8983;
  }
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  background: var(--paper);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 28px 28px;
  font-family: system-ui, sans-serif;
  color: var(--ink);
}

.page {
  max-width: 60em;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0 -20px 0px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-wrap {
  position: relative;
}

.burger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
}

.menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.menu li {
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.menu li:hover {
  background: var(--paper);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 10px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  background: var(--button);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
}

.toolbar-btn:hover {
  color: var(--ink);
  border-color: var(--ink-faint);
}
</style>
