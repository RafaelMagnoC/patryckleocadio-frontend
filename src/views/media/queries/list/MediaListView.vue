<template>
    <div class="midia-list">
        <div class="header">
            <h2>Minhas mídias</h2>
            <router-link to="/home/midia/nova" class="nova-midia-button">Nova Mídia</router-link>
        </div>

        <div v-if="loading">Carregando mídias...</div>
        <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div v-else class="grid">
            <div v-for="midia in midias" :key="midia.id" class="midia-card">
                <video v-if="isVideo(midia.contentType)" :src="midia.url" controls width="200" height="120"></video>

                <div class="midia-info">
                    <h4>{{ midia.title || 'Sem título' }}</h4>
                    <a href="#" @click.prevent="openInNewWindow(midia)">Abrir mídia</a>

                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

function openInNewWindow(midia: Midia) {
    const url = `http://217.196.61.26:7235${midia.url}`
    const windowFeatures = "toolbar=no, menubar=no, width=800, height=600, top=100, left=100, resizable=yes, scrollbars=yes"
    window.open(url, '_blank', windowFeatures)
}


interface Midia {
    id: string
    title: string
    url: string
    contentType: string
    fileName: string
    sizeInBytes: number
}

const midias = ref<Midia[]>([])
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
    try {
        const response = await axios.get('http://217.196.61.26:7235/api/media', {
            withCredentials: true,
        })

        midias.value = response.data
    } catch (error: any) {
        errorMessage.value = 'Erro ao buscar as mídias.'
    } finally {
        loading.value = false
    }
})

function isVideo(contentType: string) {
    return contentType.startsWith('video/')
}
</script>

<style scoped>
.midia-list {
    padding: 1rem;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.midia-card {
    border: 1px solid #ccc;
    padding: 1rem;
    width: 220px;
    border-radius: 6px;
    background-color: #f9f9f9;
}

.midia-info h4 {
    margin: 0.5rem 0;
}

.error {
    color: red;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.nova-midia-button {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;
}

.nova-midia-button:hover {
    background-color: #0056b3;
}
</style>
