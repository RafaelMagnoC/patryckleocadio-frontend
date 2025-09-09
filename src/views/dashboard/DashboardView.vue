<script setup lang="ts"></script>

<template>
    <div>
        <input type="checkbox" id="menu-toggle">
        <section class="sidebar__wrapper">
            <div class="sidebar__header">
                <img src="@images/PatryckLeocadioLogo.png" alt="" class="siderbar-header__logo">
            </div>

            <div class="sidebar__content">

                <div class="sidebar-content__menu">
                    <ul>
                        <li>
                            <router-link to="/home/user" class="active">
                                <span class="las la-user-alt"></span>
                                <small>Usuário</small>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/home/midia" exact>
                                <span class="las la-image"></span>
                                <small>Mídias</small>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/home/player" exact>
                                <span class="las la-image"></span>
                                <small>Player</small>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="footer__wrapper">
            <div class="footer__content">
                <div class="footer-content__text">
                    <small>Todos os Direitos Reservados • 2025</small>
                </div>
            </div>
        </section>
        <section class="header__wrapper">
            <div class="header__content">
                <label for="menu-toggle">
                    <span class="las la-bars"></span>
                </label>

                <div class="header-content__menu">
                    <label for="">
                        <span class="las la-search"></span>
                    </label>

                    <div class="notify-icon">
                        <span class="las la-envelope"></span>
                        <span class="notify">4</span>
                    </div>

                    <div class="notify-icon">
                        <span class="las la-bell"></span>
                        <span class="notify">3</span>
                    </div>

                    <div class="user">
                        <div class="bg-img" style="background-image: url('@img/userimage.png')"></div>

                        <span class="las la-power-off"></span>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="main-content__wrapper">

            <main>

                <div class="page-header">
                    <h1>Dashboard</h1>
                    <small>Home / Dashboard</small>
                </div>

                <div class="page-content">

                    <router-view />

                </div>
            </main>
        </section>
    </div>
</template>

<style lang="sass" scoped>
  @use './DashboardView.sass'
</style>
