<script setup lang="ts">
import { Filter, Plus } from '@lucide/vue'
import RegisterDataModal from '~/components/modal/RegisterDataModal.vue'

const menuOpen = ref(false)
const menuItems = ['Configuración', 'Perfil', 'Cambiar usuario']

const user: { name: string; sex: 'M' | 'F'; birthDate: string } = {
  name: 'Jane Doe',
  sex: 'F',
  birthDate: '1994-03-17'
}

const metrics: { badge: string; name: string; value: number; unit: string; status: string; variant: 'ok' | 'warn' | 'alert' }[] = [
  { badge: 'SYS', name: 'Sistólica', value: 138, unit: 'mmHg', status: 'Elevada', variant: 'warn' },
  { badge: 'DIA', name: 'Diastólica', value: 96, unit: 'mmHg', status: 'Normal', variant: 'ok' },
  { badge: 'PPM', name: 'Pulso por minuto', value: 63, unit: 'ppm', status: 'Normal', variant: 'ok' },
  { badge: 'TEST', name: 'Test card', value: 99, unit: 'tst', status: 'Test', variant: 'alert' },
]
</script>

<template>
  <div class="page">
    <header class="header">
      <img src="/logo.png" alt="lifeStat logo" width="100"/>
      <div class="menu-wrap">
        <button type="button" class="burger" aria-label="Abrir menú" @click="menuOpen = !menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul v-if="menuOpen" class="menu">
          <li v-for="item in menuItems" :key="item">{{ item }}</li>
        </ul>
      </div>
    </header>
    <div class="toolbar">
      <UserInfo :name="user.name" :sex="user.sex" :birth-date="user.birthDate" />
      <div class="actions">
        <ToolbarButton :modal="RegisterDataModal" :modal-props="{ metrics }">
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
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2em;
  height: 2em;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.burger span {
  display: block;
  height: 2px;
  border-radius: 1px;
  background: var(--ink);
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
</style>
