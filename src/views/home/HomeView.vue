<script setup lang="ts">
import MenuComponent from '@/components/menu/MenuComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue';
</script>


<template>
  <main>
    <HeaderComponent />
    <MenuComponent />
    <router-view />
    <FooterComponent />
  </main>
</template>

<style lang="sass" scoped>
    @use 'HomeView.sass'
    
</style>
