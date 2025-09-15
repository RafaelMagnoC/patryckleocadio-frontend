<script setup lang="ts">
import CardVideoPlaylistComponent from '@/components/cards/card-video-playlist/CardVideoPlaylistComponent.vue';
import CardVideoSearchComponent from '@/components/cards/card-video-search/CardVideoSearchComponent.vue';
import TagComponent from '@/components/tag/TagComponent.vue';

</script>

<template>
    <section class="player">
        <header class="player__header">
            <div class="TV-Buttons__wrapper">
                <button class="TV-Buttons__button">Tv 1</button>
                <button class="TV-Buttons__button">Tv 2</button>
                <button class="TV-Buttons__button">Tv 3</button>
                <button class="TV-Buttons__button">Tv 4</button>
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
                <TagComponent text="#Tudo" />
                <TagComponent text="#Ombro" />
                <TagComponent text="#Pernas" />
            </div>

            <div class="content__wrapper">

                <div class="content__main">
                    <div class="content-main__video">
                        <video controls class="video-play">
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                            </source>
                        </video>
                    </div>
                </div>

                <div class="content__videos-search">
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                    <CardVideoSearchComponent name="alongamento de ombro" category="alongamento" />
                </div>

                <div class="content-main__playlist">
                    <h2 class="content-main-playlist__title">Playlist <span>▶️</span><span>⏯️</span><span>⏹️</span></h2>
                    <div class="playlist-card-videos">
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                        <CardVideoPlaylistComponent />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="sass" scoped>
    @use 'PlayerView.sass'

    .search__wrapper
        display: flex
        justify-content: center
        height: 60px

    #search-video
        padding: 10px
        border-radius: 8px
        border: solid 1px #ccc
        min-width: 250px
        transition: ease-in-out .4s

        &:placeholder-shown
            text-align: center

        &:focus
            box-shadow: 1px 2px 1px 2px blue
            border: none
            outline: none

    .btn-search
        background: transparent
        border: solid 1px #ccc
        border-radius: 8px
        padding: 10px
        cursor: pointer
        transition: ease-in-out .4s

        &:hover
            background: blue
            color: #fff 

    .player
        padding: 20px
        margin: 0 auto
        width: 100%
        height: 100%

    .tags__wrapper
        display: flex
        gap: 10px
        padding: 10px 0

    .content__wrapper
        display: grid
        grid-template-columns: 80% 20%
        grid-template-rows: 80% 20%
        grid-template-areas: "video-play video-search" "playlist video-search"
        gap: 20px
        height: 700px

    .content__main
        height: auto
        width: 100%
        grid-area: video-play

    .content-main__video
        background: black
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        border-radius: 8px

    .video-play
        height: auto
        width: 100%
        border-radius: 8px

    .content__videos-search
        display: flex
        flex-direction: column
        gap: 10px
        overflow-y: auto
        grid-area: video-search

    .content-main__playlist
        grid-area: playlist
        width: 100%
        max-width: 1320px
        height: 300px        

    .content-main-playlist__title
        margin-top: 20px

    .playlist-card-videos
        border-radius: 8px
        height: 100%
        width: 100%
        display: flex
        align-items: center
        overflow-x: auto        

    

</style>