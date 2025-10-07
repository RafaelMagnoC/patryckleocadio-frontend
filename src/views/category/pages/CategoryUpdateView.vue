<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { CategoryUpdateDTO } from '@/views/category/dtos/CategoryUpdateDTO'
import type { CategoryReadDTO } from '@/views/category/dtos/CategoryReadDTO'
import { CategoryService } from '../services/Category.services'

const categoryService = new CategoryService()
const route = useRoute()
const router = useRouter()

const category = ref<CategoryReadDTO | null>(null)
const loading = ref(true)
const error = ref('')

const form = ref<CategoryUpdateDTO>({
  name: '',
  description: ''
})

onMounted(async () => {
  try {
    const id = route.params.id as string
    const data = await categoryService.categoryById(id)
    category.value = data

    // Preenche o form
    form.value.name = data.name
    form.value.description = data.description ?? ''
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar categoria.'
  } finally {
    loading.value = false
  }
})

async function handleSubmit() {
  if (!category.value) return
  try {
    await categoryService.update(category.value.id, form.value)
    alert('Categoria atualizada com sucesso!')
    router.push('/home/categories')
  } catch (err: any) {
    alert(err.message || 'Erro ao atualizar categoria.')
  }
}
</script>

<template>
  <div class="category-edit">
    <h1>Editar Categoria</h1>

    <form class="category-form" @submit.prevent="handleSubmit" v-if="!loading && category">
      <div class="form-group">
        <label for="name">Nome da Categoria</label>
        <input id="name" type="text" v-model="form.name"
          placeholder="Digite o nome da categoria. Máximo de 20 caracteres" />
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea id="description" v-model="form.description" rows="3"
          placeholder="Digite a descrição. Máximo de 50 caracteres"></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="router.push('/home/categories')">
          Cancelar
        </button>
        <button type="submit" class="btn-primary">Salvar Alterações</button>
      </div>
    </form>

    <p v-else-if="loading">Carregando...</p>
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.category-edit {
  padding: 32px;
  font-family: system-ui, sans-serif;
  color: #333;
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.category-form {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
}

input,
textarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

button {
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 10px 18px;
  transition: background 0.25s, transform 0.15s;
  border: none;
}

button:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background-color: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

@media (max-width: 600px) {
  .category-edit {
    padding: 20px;
  }

  .category-form {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  button {
    width: 100%;
  }
}
</style>
