<template>
  <div class="user-list">
    <div class="header">
      <h2>Usuários</h2>
      <router-link to="/home/user/create" class="novo-user-button">Novo usuário</router-link>
    </div>
    <div v-if="loading">Carregando usuários...</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>

    <div v-for="user in users" :key="user.id" class="user-row">
      <div class="user-col name">{{ user.name }} {{ user.lastName }}</div>
      <div class="user-col phone">✉️ {{ user.email }}</div>
      <div class="user-col phone">📞 (21) 9-9999-9999</div>
      <div class="user-col type">👤 {{ user.role }}</div>
      <div class="user-col status">
        <span :class="['badge', user.status?.toLowerCase()]">{{ user.status }}</span>
      </div>
      <!--
    <div class="user-col financeiro">
        <span :class="['badge', user.financeiro?.toLowerCase()]">adiplente</span>
      </div>
    -->


      <div class="user-col actions">
        <button class="action-btn" @click="openActions(user.id)">⋮</button>
        <div v-if="user.id === activeActionId" class="action-menu">
          <button @click="verDetalhes(user)">Detalhes</button>
          <button @click="editarUsuario(user)">Editar</button>
          <button @click="excluirUsuario(user)">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

type Usuario = {
  id: number
  name: string,
  lastName: string
  telefone: string
  email?: string
  role?: string
  status?: string
  financeiro?: 'Adimplente' | 'Inadimplente'
}

const users = ref<Usuario[]>([])
const activeActionId = ref<number | null>(null)
const loading = ref(false)
const errorMessage = ref('')

// Fetch direto da API
onMounted(async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL_HTTPS}/user`, {
      withCredentials: true,
    })
    users.value = response.data
  } catch (err) {
    errorMessage.value = 'Erro ao carregar usuários.'
  } finally {
    loading.value = false
  }
})

function openActions(id: number) {
  activeActionId.value = activeActionId.value === id ? null : id
}

function verDetalhes(user: Usuario) {
  alert(`Ver detalhes de ${user.name}`)
}

function editarUsuario(user: Usuario) {
  alert(`Editar usuário ${user.name}`)
}

async function excluirUsuario(user: Usuario) {
  const confirmacao = confirm(`Deseja realmente excluir ${user.name} ${user.lastName}?`)

  if (!confirmacao) return

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL_HTTPS}/user/${user.id}`, {
      withCredentials: true
    })

    // Remove da lista
    users.value = users.value.filter(u => u.id !== user.id)

    // Fecha o menu de ações
    activeActionId.value = null
  } catch (error) {
    console.error('Erro ao excluir usuário:', error)
    alert('Não foi possível excluir o usuário. Tente novamente.')
  }
}

</script>


<style lang="sass" scoped>
  $bg-color: #fff
  $border-color: #e2e8f0
  $hover-bg: #f9fafb
  $accent-color: #4f46e5
  $text-color: #333

  $green: #10b981
  $red: #ef4444
  $gray: #9ca3af
  $yellow: #f59e0b
  $blue: #3b82f6

  .header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 1rem

  .novo-user-button
    background-color: #007bff
    color: white
    padding: 0.5rem 1rem
    border-radius: 4px
    text-decoration: none
    font-size: 0.9rem
    transition: background-color 0.2s ease

  .novo-user-button:hover
    background-color: #0056b3

  .user-list
    display: flex
    flex-direction: column
    gap: 0.75rem
    padding: 1rem

  .user-row
    display: flex
    justify-content: space-between
    align-items: center
    background-color: $bg-color
    border: 1px solid $border-color
    border-radius: 8px
    padding: 1rem 1.5rem
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)
    transition: background-color 0.2s ease
    position: relative

    &:hover
      background-color: $hover-bg

  .user-col
    flex: 1
    color: $text-color
    font-size: 1rem

    &.name
      font-weight: 600
      color: $accent-color

    &.phone,
    &.type,
    &.status,
    &.financeiro
      text-align: center

    &.actions
      flex: none
      width: 50px
      position: relative
      text-align: right

  .badge
    display: inline-block
    padding: 0.3rem 0.6rem
    border-radius: 999px
    font-size: 0.8rem
    font-weight: 500
    text-transform: uppercase
    letter-spacing: 0.5px
    color: #fff

    &.ativo
      background-color: $green

    &.inativo
      background-color: $gray

    &.bloqueado
      background-color: $red

    &.adimplente
      background-color: $blue

    &.inadimplente
      background-color: $yellow

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

  // Responsivo
  @media (max-width: 700px)
    .user-row
      flex-direction: column
      align-items: flex-start
      gap: 0.5rem

    .user-col
      text-align: left !important
      width: 100%
</style>
