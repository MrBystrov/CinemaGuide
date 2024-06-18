<template>
  <div class="top container">
    <h2 class="top-title">Топ 10 фильмов</h2>
    <!-- <ul class="top__list list-reset flex">
            <li class="top__item" v-for="(movie, index) of topMovies" :key="movie.id">
                <router-link :to="{name: 'movie', params: { id: movie.id}}" class="top__link" @click="openMoviePage(movie)">
                    <img :src="movie.posterUrl" alt="" class="top__img">

                </router-link>
            </li>
        </ul> -->
    <movies-list :moviesList="topMovies"></movies-list>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/globalStore'
import { RouterLink } from 'vue-router'
import type { IMovie } from '../types/IMovie'
import MoviesList from './MoviesList.vue'
import { onMounted, ref } from 'vue'
import { getMoviesList } from '../api/getMoviesList'

const store = useAppStore()

const topMovies = ref<IMovie[] | null>(null)

async function updateTopMovies() {
  topMovies.value = await getMoviesList('https://cinemaguide.skillbox.cc/movie/top10')
}

onMounted(() => {
  updateTopMovies()
})

</script>



<style scoped>
.top {
  padding-top: 40px;
  padding-bottom: 120px;
  color: white;
}
.top__list {
  column-gap: 40px;
  row-gap: 64px;
}
.top__item {
  position: relative;
  z-index: 0;
  height: 336px;
  width: 224px;
  border-radius: 16px;
  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
  overflow: hidden;
}
.top__link {
}
.top__img {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

</style>
