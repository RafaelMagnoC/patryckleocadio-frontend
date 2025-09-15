<script setup lang="ts"></script>

<template>
    <div class="video-thumb">
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" muted autoplay loop playsinline
            preload="metadata"></video>
    </div>
</template>

<style lang="sass" scoped>

    video-thumb
        border-radius: 20px
        display: flex
        justify-content: center
        align-items: center
        height: 100%

    video
        padding: 10px
        border-radius: 20px
        height: 150px
</style>