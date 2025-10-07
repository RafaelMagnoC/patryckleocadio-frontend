<template>
  <div class="categories-container">
    <h1>Lista de Categorias</h1>
    <router-link to="category/create" class="create-btn" style="margin: 10px 0; display: block;">+ Nova
      Categoria</router-link>
    <div class="table-wrapper">
      <table class="category-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Grupos</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td>
              <div class="groups" v-for="group in category.groups" :key="group.id"
                v-if="category.groups && category.groups.length > 0">
                <span class="group-badge">{{ group.name }}</span>
              </div>
              <div class="groups" v-else>
                <span class="group-badge" style="color: red;">N/H</span>
              </div>
            </td>
            <td class="text-right">
              <div class="actions">
                <button class="action-btn">⋮</button>
                <ul class="dropdown">
                  <li>
                    <router-link :to="{ name: 'category-update', params: { id: category.id } }"
                      class="create-btn">Editar</router-link>
                  </li>
                  <li class="danger" @click="deleteCategory(category)">Excluir</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { CategoryReadWithGroupsDTO } from "../dtos/CategoryReadDTO";
import { CategoryService } from "../services/Category.services";
import router from "@/router";

export default defineComponent({
  setup() {
    const categories = ref<CategoryReadWithGroupsDTO[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const categoryService = new CategoryService();

    const loadCategories = async () => {
      loading.value = true;
      error.value = null;

      try {
        categories.value = await categoryService.categories();
      } catch (err) {

        error.value = "Erro ao carregar categorias" + err;

      } finally {
        loading.value = false;
      }
    };

    async function deleteCategory(category: CategoryReadWithGroupsDTO) {

      const confirmacao = confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)

      if (!confirmacao) return

      try {
        await categoryService.delete(category.id);
        alert('Excluído com sucesso')
        loadCategories();
      } catch (error) {

        alert('Não foi possível excluir a categoria. Tente novamente.' + error)
      }
    }

    onMounted(() => {
      loadCategories();
    });

    return {
      categories,
      loading,
      error,
      deleteCategory,
    };

  },
});
</script>

<style scoped>
/* Container principal */
.categories-container {
  padding: 32px;
  font-family: system-ui, sans-serif;
  color: #333;
}

/* Título */
.categories-container h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
}

/* Wrapper para permitir rolagem horizontal em telas pequenas */
.table-wrapper {
  overflow-x: auto;
}

/* Estilo base da tabela */
.category-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Cabeçalho */
.category-table thead {
  background-color: #f5f6f8;
}

.category-table th {
  text-align: left;
  padding: 14px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 2px solid #e5e7eb;
}

/* Linhas e células */
.category-table td {
  padding: 14px 16px;
  font-size: 0.95rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

/* Linhas alternadas e hover */
.category-table tr:nth-child(even) {
  background-color: #fafafa;
}

.category-table tr:hover {
  background-color: #f1f5f9;
  transition: background 0.2s;
}

/* Grupos (badges) */
.groups {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.group-badge {
  background-color: #e7f0ff;
  color: #2b6cb0;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

/* Ações */
.text-right {
  text-align: right;
}

.actions {
  position: relative;
  display: inline-block;
}

.action-btn {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #666;
  padding: 4px 8px;
  border-radius: 6px;
}

.action-btn:hover {
  background-color: #f0f0f0;
}

/* Dropdown */
.dropdown {
  display: none;
  position: absolute;
  right: 0;
  margin-top: 6px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-width: 140px;
  list-style: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 4px 0;
}

.dropdown li {
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
  transition: background 0.5s;
}

.dropdown li:hover {
  background-color: #f5f5f5;
}

.dropdown .danger {
  color: #c53030;
}

/* Mostrar dropdown no hover */
.actions:hover .dropdown {
  display: block;
}

/* Responsivo */
@media (max-width: 600px) {

  .category-table th,
  .category-table td {
    padding: 10px 12px;
    font-size: 0.85rem;
  }

  .group-badge {
    font-size: 0.7rem;
  }
}
</style>
