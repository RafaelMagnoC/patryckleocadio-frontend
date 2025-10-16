<template>
  <div class="categories-container">
    <h1>Lista de Tags</h1>
    <router-link to="tag/criacao" class="create-btn" style="margin: 10px 0; display: block;">+ Nova
      Tag</router-link>
    <div class="table-wrapper">
      <table class="category-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Situação</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.id">
            <td>#{{ tag.name }}</td>
            <td>{{ tag.description }}</td>
            <td>{{ tag.status }}</td>
            <td class="text-right">
              <div class="actions">
                <button class="action-btn" @click="handleMenu($event)">⋮</button>
                <ul class="dropdown hide">
                  <li>
                    <router-link :to="{ name: 'tag-update', params: { id: tag.id } }"
                      class="create-btn">Editar</router-link>
                  </li>
                  <li class="danger" @click="deleteTag(tag)">Excluir</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { TagReadDTO } from "../dtos/TagReadDTO";
import { TagServices } from "../services/TagServices";

const tags = ref<TagReadDTO[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const tagServices = new TagServices();

const loadTags = async () => {
  loading.value = true;
  error.value = null;

  try {
    tags.value = await tagServices.tags();
  } catch (err) {
    error.value = "Erro ao carregar tags: " + err;
  } finally {
    loading.value = false;
  }
};

const deleteTag = async (tag: TagReadDTO) => {
  const confirmacao = confirm(`Tem certeza que deseja excluir a tag "${tag.name}"?`);
  if (!confirmacao) return;

  try {
    await tagServices.delete(tag.id);
    alert("Excluído com sucesso");
    await loadTags();
  } catch (error) {
    alert("Não foi possível excluir a tag. Tente novamente. " + error);
  }
};

function handleMenu(event: MouseEvent) {
  event.stopPropagation(); // impede o clique no botão de propagar e fechar o menu

  const button = event.currentTarget as HTMLElement;
  const dropdown = button.parentElement?.querySelector<HTMLElement>('.dropdown');
  if (!dropdown) return;

  const isOpen = dropdown.classList.contains('show');

  // Fecha todos os dropdowns abertos
  document.querySelectorAll<HTMLElement>('.dropdown.show').forEach(d => {
    d.classList.remove('show');
    d.classList.add('hide');
  });

  // Se o atual não estava aberto, abre ele
  if (!isOpen) {
    dropdown.classList.remove('hide');
    dropdown.classList.add('show');
  }
}

// Fecha tudo ao clicar fora
function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node;
  // Fecha apenas se o clique não estiver dentro de .actions
  if (!(target instanceof HTMLElement && target.closest('.actions'))) {
    document.querySelectorAll<HTMLElement>('.dropdown.show').forEach(d => {
      d.classList.remove('show');
      d.classList.add('hide');
    });
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
});
onMounted(loadTags);
</script>

<style scoped>
.dropdown.hide {
  display: none;
}

.dropdown.show {
  display: block;
}

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
  flex-direction: column;
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
  position: fixed;
}

.dropdown li {
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
  transition: background 0.5s;
  display: block;
  text-align: center;
}

.dropdown li:hover {
  background-color: #f5f5f5;
}

.dropdown .danger {
  color: #c53030;
}

.create-btn {
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
