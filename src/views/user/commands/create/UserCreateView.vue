<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface UserCreateDTO {
  name: string
  lastName: string
  password: string
  email: string
  birthDate: string
  role: string
}

interface ValidationError {
  propertyName: string
  errorMessage: string
}

const router = useRouter()
const loading = ref(false)
const errors = ref<ValidationError[]>([])

// Dados do formulário
const formData = ref<UserCreateDTO>({
  name: '',
  lastName: '',
  password: '',
  email: '',
  birthDate: '',
  role: ''
})

// Opções de roles (ajuste conforme seu enum)
const roleOptions = [
  { value: 'Admin', label: 'Administrador' },
  { value: 'Collaborator', label: 'Colaborador' },
  { value: 'Customer', label: 'Cliente' }
]

const submitForm = async () => {
  loading.value = true
  errors.value = []

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL_HTTPS}/user`, formData.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 201) {
      alert('Usuário criado com sucesso!')
      router.push('/home/usuarios') // Redireciona para a lista de usuários
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      errors.value = error.response.data
    } else {
      alert('Erro ao criar usuário. Tente novamente.')
      console.error('Erro:', error)
    }
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  formData.value = {
    name: '',
    lastName: '',
    password: '',
    email: '',
    birthDate: '',
    role: ''
  }
  errors.value = []
}
</script>

<template>
  <div class="user-create-container">
    <div class="header">
      <h1>Criar Novo Usuário</h1>
      <p>Preencha os dados abaixo para criar um novo usuário</p>
    </div>

    <form @submit.prevent="submitForm" class="user-form">
      <!-- Mensagens de erro gerais -->
      <div v-if="errors.length > 0" class="error-messages">
        <div v-for="(error, index) in errors" :key="index" class="error-message">
          {{ error.propertyName }}: {{ error.errorMessage }}
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="name">Nome *</label>
          <input id="name" v-model="formData.name" type="text" required
            :class="{ 'error': errors.some(e => e.propertyName === 'Name') }">
        </div>

        <div class="form-group">
          <label for="lastName">Sobrenome *</label>
          <input id="lastName" v-model="formData.lastName" type="text" required
            :class="{ 'error': errors.some(e => e.propertyName === 'LastName') }">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">Email *</label>
          <input id="email" v-model="formData.email" type="email" required
            :class="{ 'error': errors.some(e => e.propertyName === 'Email') }">
        </div>

        <div class="form-group">
          <label for="password">Senha *</label>
          <input id="password" v-model="formData.password" type="password" required
            :class="{ 'error': errors.some(e => e.propertyName === 'Password') }">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="birthDate">Data de Nascimento *</label>
          <input id="birthDate" v-model="formData.birthDate" type="date" required
            :class="{ 'error': errors.some(e => e.propertyName === 'BirthDate') }">
        </div>

        <div class="form-group">
          <label for="role">Tipo de Usuário *</label>
          <select id="role" v-model="formData.role" required
            :class="{ 'error': errors.some(e => e.propertyName === 'Role') }">
            <option value="" disabled>Selecione um tipo</option>
            <option v-for="option in roleOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn btn-secondary" :disabled="loading">
          Limpar
        </button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading">Criando...</span>
          <span v-else>Criar Usuário</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.user-create-container
  max-width: 800px
  margin: 0 auto
  padding: 2rem
  background: #fff
  border-radius: 12px
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)

.header
  text-align: center
  margin-bottom: 2rem

  h1
    color: #333
    font-size: 2rem
    margin-bottom: 0.5rem

  p
    color: #666
    font-size: 1rem

.user-form
  .error-messages
    background: #fee
    border: 1px solid #fcc
    border-radius: 6px
    padding: 1rem
    margin-bottom: 1.5rem

  .error-message
    color: #d32f2f
    font-size: 0.9rem
    margin-bottom: 0.5rem

    &:last-child
      margin-bottom: 0

.form-row
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 1.5rem
  margin-bottom: 1.5rem

  @media (max-width: 768px)
    grid-template-columns: 1fr

.form-group
  label
    display: block
    margin-bottom: 0.5rem
    color: #333
    font-weight: 500
    font-size: 0.9rem

  input,
  select
    width: 100%
    padding: 0.75rem
    border: 2px solid #e1e5e9
    border-radius: 6px
    font-size: 1rem
    transition: border-color 0.3s ease

    &:focus
      outline: none
      border-color: #007bff
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1)

    &.error
      border-color: #d32f2f
      background-color: #fff5f5

.form-actions
  display: flex
  gap: 1rem
  justify-content: flex-end
  margin-top: 2rem

  @media (max-width: 768px)
    flex-direction: column

.btn
  padding: 0.75rem 1.5rem
  border: none
  border-radius: 6px
  font-size: 1rem
  font-weight: 500
  cursor: pointer
  transition: all 0.3s ease
  min-width: 120px

  &:disabled
    opacity: 0.6
    cursor: not-allowed

  &.btn-primary
    background: #007bff
    color: white

    &:hover:not(:disabled)
      background: #0056b3

  &.btn-secondary
    background: #6c757d
    color: white

    &:hover:not(:disabled)
      background: #545b62
</style>
