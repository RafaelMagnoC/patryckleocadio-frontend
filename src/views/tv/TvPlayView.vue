<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const playlist = ref<any[]>([])
const currentIndex = ref(0)
const videoRef = ref<HTMLVideoElement | null>(null)

function playVideo(index: number) {
    currentIndex.value = index
    const video = playlist.value[index]
    console.log("Tentando tocar vídeo:", video)
    const url = video?.url || "https://www.w3schools.com/html/mov_bbb.mp4"
    console.log("URL usada:", url)
    if (videoRef.value) {
        videoRef.value.src = playlist.value[index].url || "https://www.w3schools.com/html/mov_bbb.mp4"
        videoRef.value.play()
    }
}

function pauseVideo() {
    videoRef.value?.pause()
}

onMounted(() => {
    const videoEl = videoRef.value

    if (videoEl) {
        videoEl.addEventListener('ended', () => {
            if (playlist.value.length === 0) return

            // incrementa índice e volta ao início se necessário
            currentIndex.value = (currentIndex.value + 1) % playlist.value.length
            playVideo(currentIndex.value)
        })
    }

    // escuta mensagens vindas da janela principal
    window.addEventListener('message', (event) => {
        const { type, playlist: newPlaylist } = event.data

        if (type === 'LOAD_PLAYLIST') {
            playlist.value = newPlaylist
            if (playlist.value.length) playVideo(0)
        }

        if (type === 'PAUSE') pauseVideo()
    })
})


onBeforeUnmount(() => {
    window.removeEventListener('message', () => { })
})
</script>

<template>
    <div style="padding:20px">
        <h1>🎬 Player Externo</h1>
        <video ref="videoRef" controls autoplay muted style="width:100%; max-height:80vh"></video>
    </div>
</template>
