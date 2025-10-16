<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import CardVideoPlaylistComponent from '@/components/cards/card-video-playlist/CardVideoPlaylistComponent.vue'
import CardVideoSearchComponent from '@/components/cards/card-video-search/CardVideoSearchComponent.vue'
import TagComponent from '@/components/tag/TagComponent.vue'
import { useRoute, useRouter } from 'vue-router'

// lista inicial de vídeos (normalmente virá do backend)
const availableVideos = ref([
    { id: 1, name: "Alongamento de Ombro", category: "alongamento", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, name: "Flexão de braço", category: "força", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 3, name: "Agachamento", category: "pernas", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
])

// playlist começa vazia
const playlistVideos = ref<any[]>([])

// vídeo em pré-visualização
const previewVideo = ref<any | null>(null)
const previewList = ref<any[]>([])

function removePreview() {
    previewVideo.value = null
    previewList.value = []
}

// Mantém previewVideo sincronizado com previewList
watch(previewList, (newVal) => {
    previewVideo.value = newVal[0] || null
})

let playerWindow: Window | null = null

function openPlayer() {
    if (!playlistVideos.value.length) {
        alert("A playlist está vazia!")
        return
    }

    // abre nova janela com rota /tv
    playerWindow = window.open('/tv', 'PlaylistPlayer', 'width=800,height=600')

    // envia playlist para a janela assim que carregar
    const interval = setInterval(() => {
        if (playerWindow && !playerWindow.closed) {
            const cleanPlaylist = JSON.parse(JSON.stringify(playlistVideos.value)) // 🔥 transforma em objeto simples
            playerWindow.postMessage({ type: 'LOAD_PLAYLIST', playlist: cleanPlaylist }, '*')
            clearInterval(interval)
        }
    }, 500)
}
function pausePlayer() {
    if (playerWindow && !playerWindow.closed) {
        playerWindow.postMessage({ type: 'PAUSE' }, '*')
    }
}

function stopPlayer() {
    if (playerWindow && !playerWindow.closed) {
        playerWindow.close()
        playerWindow = null
    }
}

function onAddPreview(evt: any) {
    if (previewVideo.value) {
        // já existe um vídeo, cancela a adição
        evt.preventDefault() // evita que o draggable insira outro
        alert('Remova o vídeo atual antes de adicionar outro.')
        return
    }
    previewVideo.value = evt.item.__draggable_context.element
}

const route = useRoute()
const router = useRouter()
const tvId = ref(Number(route.params.tvId) || 1)

// TV selecionada
const selectedTV = ref(Number(route.params.tvId) || 1)

// Atualiza a rota ao clicar em outra TV
function selectTV(tvNumber: number) {
    selectedTV.value = tvNumber
    router.push({ name: 'player', params: { tvId: tvNumber } })
}

watch(
    () => route.params.tvId,
    (newTvId) => {
        tvId.value = Number(newTvId) || 1
        // Aqui você pode resetar ou carregar a playlist específica dessa TV
        playlistVideos.value = []// ou carregar de algum backend/localStorage
    },
    { immediate: true }
)


</script>

<template>
    <section class="player">
        <header class="player__header">
            <div class="TV-Buttons__wrapper">
                <button v-for="tv in [1, 2, 3, 4]" :key="tv" @click="selectTV(tv)"
                    :class="{ 'selected': selectedTV === tv }" class="btn-tv">
                    TV {{ tv }}
                </button>
            </div>
        </header>
        <div>
            <div class="search__wrapper">
                <div class="search__filter-button">
                    <button type="button" class="btn-search">Buscar</button>
                </div>
                <div class="search__search-bar">
                    <input type="text" placeholder="Pesquisar..." id="search-video">
                </div>
            </div>

            <div class="tags__wrapper">
                <TagComponent text="#Ombro" />
            </div>

            <div class="content__wrapper">

                <div class="content-main__video"
                    style="border:1px dashed #ccc; padding:10px; border-radius:8px; min-height:200px; display:flex; align-items:center; justify-content:center; flex-direction:column;">

                    <draggable :list="previewVideo ? [previewVideo] : []"
                        :group="{ name: 'videos', pull: false, put: true }" item-key="id"
                        :clone="(el: any) => ({ ...el })" @add="onAddPreview">
                        <template #item="{ element }">
                            <div v-if="element">
                                <video controls autoplay style="width:100%; max-height:250px; border-radius:8px;">
                                    <source :src="element.url" type="video/mp4" />
                                </video>
                                <button @click="removePreview"
                                    style="margin-top:8px; background:#f44; color:#fff; padding:5px 10px; border:none; border-radius:4px; cursor:pointer;">
                                    Remover vídeo
                                </button>
                            </div>
                        </template>
                    </draggable>

                    <div v-if="!previewVideo">
                        <p style="color:#666">Nenhum vídeo selecionado</p>
                    </div>
                </div>


                <div class="content__videos-search">
                    <draggable v-model="availableVideos" :group="{ name: 'videos', pull: 'clone', put: false }"
                        item-key="id">
                        <template #item="{ element }">
                            <CardVideoSearchComponent :name="element.name" :category="element.category" />
                        </template>
                    </draggable>
                </div>

                <div class="content-main__playlist">
                    <h2 class="content-main-playlist__title">Playlist</h2>
                    <span @click="openPlayer" style="cursor:pointer;" class="icon-play">▶️</span>
                    <span @click="pausePlayer" style="cursor:pointer" class="icon-play">⏯️</span>
                    <span @click="stopPlayer" style="cursor:pointer" class="icon-play">⏹️</span>
                    <draggable v-model="playlistVideos" :group="{ name: 'videos', pull: false, put: true }"
                        item-key="id"
                        style="display: flex; border: solid 1px #ccc; border-radius: 8px; margin-top: 10px;">
                        <template #item="{ element }">
                            <CardVideoPlaylistComponent :video="element" muted />
                        </template>
                    </draggable>
                    <div v-if="playlistVideos.length < 1"
                        style="height: 100px; border: solid 1px #ccc; border-radius: 8px; padding: 10px;">
                        <p style="color:#666">Nenhum vídeo selecionado</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="sass" scoped>
    @use 'PlayerView.sass'
</style>
