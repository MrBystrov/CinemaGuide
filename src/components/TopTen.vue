<template>
  <div class="top container">
    <h2 class="top-title title">Топ 10 фильмов</h2>
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
.top-title {
  margin-bottom: 64px;
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

@media (max-width: 700px) {
  .top {
    padding-top: 32px;
    padding-bottom: 32px;
  }
}
</style>
