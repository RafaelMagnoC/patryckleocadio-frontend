<template>
    <div class="midia-form">
        <h2>Cadastrar nova mídia</h2>

        <form @submit.prevent="handleSubmit">
            <div>
                <label for="title">Título (opcional):</label>
                <input id="title" v-model="form.title" type="text" />
            </div>

            <div>
                <label for="description">Descrição (opcional):</label>
                <textarea id="description" v-model="form.description" rows="4" />
            </div>

            <div>
                <label for="file">Arquivo:</label>
                <input id="file" type="file" @change="handleFileChange" accept="video/*" required />
            </div>

            <button type="submit">Enviar</button>
        </form>

        <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
    title: '',
    description: '',
})

const selectedFile = ref<File | null>(null)
const successMessage = ref('')
const errorMessage = ref('')

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0]
    }
}

async function handleSubmit() {
    if (!selectedFile.value) {
        errorMessage.value = 'Selecione um arquivo.'
        return
    }

    try {
        const formData = new FormData()
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('file', selectedFile.value)

        const response = await axios.post(`${import.meta.env.VITE_API_URL_HTTPS}/api/video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // se estiver usando autenticação por cookie
        })

        successMessage.value = 'Mídia enviada com sucesso!'
        errorMessage.value = ''

        // opcional: redirecionar após alguns segundos
        setTimeout(() => {
            router.push('/home/midia')
        }, 1500)
    } catch (error: any) {
        successMessage.value = ''
        if (error.response) {
            console.error('Erro completo da API:', error.response.data)
            errorMessage.value = error.response.data?.message || 'Erro ao enviar a mídia.'
        } else if (error.message) {
            console.error('Erro genérico:', error.message)
            errorMessage.value = error.message
        } else {
            errorMessage.value = 'Erro inesperado ao enviar a mídia.'
        }
    }

}
</script>

<style scoped>
.midia-form {
    max-width: 500px;
    margin: 0 auto;
}

.midia-form label {
    display: block;
    margin-top: 1rem;
}

.midia-form input,
.midia-form textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
}

.midia-form button {
    margin-top: 1.5rem;
    padding: 10px 20px;
}
</style>
