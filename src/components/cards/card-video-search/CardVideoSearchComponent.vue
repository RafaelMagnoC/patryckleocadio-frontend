<script setup lang="ts">
const props = defineProps({
    name: String,
    category: String
})

</script>

<template>
    <div class="card-video-search">
        <div class="video-thumb">
            <video src="https://www.w3schools.com/html/mov_bbb.mp4" muted autoplay loop playsinline
                preload="metadata"></video>
        </div>
        <div class="video-text">
            <p class="video-title">{{ name }}</p>
            <p class="video-category">{{ category }}</p>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.card-video-search
  display: flex
  gap: 1rem
  padding: 1rem
  border: 1px solid #ddd
  border-radius: 8px
  background: #fff
  max-width: 600px

.video-thumb
  width: 160px
  height: 90px
  overflow: hidden
  border-radius: 6px
  flex-shrink: 0

  video
    width: 100%
    height: 100%
    object-fit: cover
    pointer-events: none

.video-text
  display: flex
  flex-direction: column

.video-title
  font-weight: bold
  font-size: 1rem
  margin: 0

.video-category
  font-size: 0.875rem
  color: #666
  margin-top: 1rem
</style>
