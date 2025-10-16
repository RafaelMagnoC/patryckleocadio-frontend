<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GroupServices } from '@/views/group/services/GroupServices'
import router from '@/router'
import type { GroupCreateDTO } from '../dtos/GroupCreateDTO'
import type { CategoryReadDTO } from '@/views/category/dtos/CategoryReadDTO'
import { CategoryService } from '@/views/category/services/CategoryServices'

// Serviços
const groupServices = new GroupServices();
const categoryServices = new CategoryService();
// Dados do formulário
const name = ref('')
const description = ref('')
const selectedCategories = ref<string[]>([])

// Lista de categorias
const categories = ref<CategoryReadDTO[]>([])
const loading = ref(true)
const error = ref('')

// Buscar grupos ao montar
onMounted(async () => {
  try {
    categories.value = await categoryServices.categories()
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar grupos.'
  } finally {
    loading.value = false
  }
})

// Função para enviar o formulário
const submitForm = async () => {
  const dto: GroupCreateDTO = {
    name: name.value,
    description: description.value,
    categories: selectedCategories.value // Assumindo que o DTO espera os ids dos grupos
  }

  try {
    await groupServices.create(dto)
    alert('Grupo criado com sucesso!')
    router.push('/home/grupos')
  } catch (err: any) {
    alert(err.message || 'Erro ao criar categoria.')
  }
}
</script>


<template>
  <div class="category-create">
    <h1>Criar Novo Grupo</h1>

    <form class="category-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nome do Grupo</label>
        <input id="name" type="text" v-model="name" placeholder="Ex: Funcional, Musculação...máximo de 20 caracteres" />
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea id="description" rows="3" v-model="description"
          placeholder="Descreva brevemente o grupo...máximo de 50 caracteres"></textarea>
      </div>

      <div class="form-group">
        <label for="groups">Categorias Vinculadas</label>
        <select id="groups" multiple v-model="selectedCategories">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <small>Segure CTRL (ou CMD) para selecionar múltiplos grupos.</small>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary">Cancelar</button>
        <button type="submit" class="btn-primary">Salvar Grupo</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.category-create {
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

/* Formulário */
.category-form {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Campos */
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
textarea,
select {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Texto auxiliar */
small {
  font-size: 0.8rem;
  color: #666;
}

/* Ações */
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

/* Botões específicos */
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

/* Responsivo */
@media (max-width: 600px) {
  .category-create {
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
