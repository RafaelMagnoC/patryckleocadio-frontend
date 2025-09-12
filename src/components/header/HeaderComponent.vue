<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const logout = async () => {
    await store.dispatch('auth/logout')
    router.push('/')
}
</script>

<template>
    <header class="header">
        <div class="header__icons">

            <div class="header-icon group-icon">
                <i class="fas fa-envelope"></i>
                <span class="notify">4</span>
            </div>

            <div class="header-icon group-icon">
                <i class="fas fa-bell group-icon"></i>
                <span class="notify">3</span>
            </div>
        </div>

        <div class="header__user" @click="logout">
            <div class="bg-img" style="background-image: url('@img/userimage.png')"></div>
            <i class="fas fa-power-off header-icon"></i>
            <span class="header-icon">Logout</span>
        </div>

    </header>
</template>

<style lang="sass" scoped>
    @use './HeaderComponent.sass'
</style>