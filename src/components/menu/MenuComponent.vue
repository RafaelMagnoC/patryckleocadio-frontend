<script setup lang="ts">
import LogoComponent from '../logo/LogoComponent.vue';

</script>


<template>
    <menu class="menu">
        <LogoComponent />
        <div class="menu__items">
            <ul class="menu__items-list">
                <li class="menu__list-item">
                    <router-link to="/home/dashboard" class="menu__item-nav active">
                        <i class="fas fa-tachometer-alt"></i>
                        <small>Dashboard</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/user" class="menu__item-nav">
                        <i class="fas fa-user"></i>
                        <small>Usuário</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fa-solid fa-dumbbell"></i>
                        <small>Exercícios</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fas fa-image"></i>
                        <small>Vídeos</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/player" exact class="menu__item-nav">
                        <i class="fa-solid fa-tv"></i>
                        <small>Player</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fa-solid fa-person"></i>
                        <small>Clientes</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fa-solid fa-layer-group"></i>
                        <small>Categorias</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fa-solid fa-hashtag"></i>
                        <small>Tags</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fa-brands fa-cash-app"></i>
                        <small>Contas a Pagar</small>
                    </router-link>
                </li>
                <li class="menu__list-item">
                    <router-link to="/home/midia" exact class="menu__item-nav">
                        <i class="fa-brands fa-cash-app"></i>
                        <small>Contas a Receber</small>
                    </router-link>
                </li>
            </ul>
        </div>
    </menu>
</template>


<style lang="sass" scoped>
    @use './MenuComponent.sass'
</style>