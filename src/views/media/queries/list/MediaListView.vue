<template>
  <div class="midia-list">
    <div class="header">
      <h2>Minhas mídias</h2>
      <router-link to="/home/midia/nova" class="nova-midia-button">Nova Mídia</router-link>
    </div>

    <div v-if="loading">Carregando mídias...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

    <div v-else class="midia-rows">
      <div v-for="midia in midias" :key="midia.id" class="midia-row">
        <div class="midia-thumb" @click="openInNewWindow(midia)" style="cursor: pointer;">
          <video v-if="isVideo(midia.contentType)" :src="getVideoUrl(midia.fileName)" width="140" height="80" muted
            preload="metadata"></video>
        </div>

        <div class="midia-info title">{{ midia.title || 'Sem título' }}</div>
        <div class="midia-info categoria">🦾 {{ midia.categoria || 'Alongamento' }}</div>
        <div class="midia-info grupo">🦵 {{ midia.grupo || 'Membros Inferiores' }}</div>

        <div class="midia-info actions">
          <button class="action-btn" @click="openActions(midia.id)">⋮</button>
          <div v-if="activeActionId === midia.id" class="action-menu">
            <button @click="abrirDetalhes(midia)">Detalhes</button>
            <button @click="editarMidia(midia)">Editar</button>
            <button @click="excluirMidia(midia)">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Midia {
  id: string
  title: string
  url: string
  contentType: string
  fileName: string
  sizeInBytes: number
  categoria?: string
  grupo?: string
}

const midias = ref<Midia[]>([])
const loading = ref(true)
const errorMessage = ref('')
const activeActionId = ref<string | null>(null)

function isVideo(contentType: string) {
  return contentType.startsWith('video/')
}

function getVideoUrl(name: string) {
  return `${import.meta.env.VITE_API_URL_HTTPS}/api/video/play/${name}`
}

function openInNewWindow(midia: Midia) {
  const url = getVideoUrl(midia.fileName)
  console.log(url)
  const windowFeatures = "toolbar=no, menubar=no, width=800, height=600, top=100, left=100, resizable=yes, scrollbars=yes"
  window.open(url, '_blank', windowFeatures)
}

function openActions(id: string) {
  activeActionId.value = activeActionId.value === id ? null : id
}

function abrirDetalhes(midia: Midia) {
  alert(`Detalhes da mídia: ${midia.title}`)
}

function editarMidia(midia: Midia) {
  alert(`Editar mídia: ${midia.title}`)
}

async function excluirMidia(midia: Midia) {
  const confirmacao = confirm(`Tem certeza que deseja excluir a mídia "${midia.title}"?`)

  if (!confirmacao) return

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL_HTTPS}/api/video/${midia.id}`, {
      withCredentials: true
    })

    // Remover da lista local
    midias.value = midias.value.filter(m => m.id !== midia.id)
  } catch (error) {
    console.error('Erro ao excluir mídia:', error)
    alert('Não foi possível excluir a mídia. Tente novamente.')
  }
}


onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL_HTTPS}/api/videos`, {
      withCredentials: true
    })

    midias.value = response.data.map((m: Midia) => ({
      ...m,
      categoria: m.categoria || 'Alongamento', // Exemplo categoria fisioterapia
      grupo: m.grupo || 'Membros Inferiores'  // Exemplo grupo/região do corpo
    }))
  } catch (error: any) {
    errorMessage.value = 'Erro ao buscar as mídias.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="sass">
$border-color: #e2e8f0
$bg-color: #fff
$hover-bg: #f9fafb
$text-color: #333
$accent: #4f46e5

.midia-list
  padding: 1rem

.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 1rem

.nova-midia-button
  background-color: #007bff
  color: white
  padding: 0.5rem 1rem
  border-radius: 4px
  text-decoration: none
  font-size: 0.9rem
  transition: background-color 0.2s ease

.nova-midia-button:hover
  background-color: #0056b3

.midia-rows
  display: flex
  flex-direction: column
  gap: 0.75rem

.midia-row
  display: flex
  align-items: center
  justify-content: space-between
  background-color: $bg-color
  border: 1px solid $border-color
  border-radius: 8px
  padding: 1rem
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)
  transition: background-color 0.2s ease
  position: relative

  &:hover
    background-color: $hover-bg

.midia-thumb
  flex: none
  width: 140px
  margin-right: 1rem

.midia-info
  flex: 1
  font-size: 0.95rem
  color: $text-color

  &.title
    font-weight: 600
    color: $accent

  &.categoria,
  &.grupo
    text-align: center

  &.actions
    flex: none
    width: 50px
    position: relative
    text-align: right

.action-btn
  background: transparent
  border: none
  font-size: 1.5rem
  cursor: pointer
  color: $text-color

.action-menu
  position: absolute
  top: 120%
  right: 0
  background-color: #ffffff
  border: 1px solid $border-color
  border-radius: 6px
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
  display: flex
  flex-direction: column
  z-index: 10

  button
    padding: 0.5rem 1rem
    background: none
    border: none
    text-align: left
    font-size: 0.9rem
    color: $text-color
    cursor: pointer

    &:hover
      background-color: #f3f4f6

.error
  color: red

@media (max-width: 768px)
  .midia-row
    flex-direction: column
    align-items: flex-start
    gap: 0.5rem

  .midia-info
    width: 100%
    text-align: left !important

  .midia-thumb
    margin: 0
</style>
