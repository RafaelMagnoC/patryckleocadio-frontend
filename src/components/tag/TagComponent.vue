<script setup lang="ts">
const props = defineProps({
    text: String
})
</script>


<template>
    <div class="tag">
        <p>{{ text }}</p>
    </div>
</template>

<style lang="sass" scoped>
    .tag
        border-radius: 8px
        border: solid 1px #ccc
        padding: 5px
        cursor: pointer


</style>