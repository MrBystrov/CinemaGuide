<template>
  <ul class="movies__list list-reset flex movie__list">
    <li class="movie__item" v-for="(movie, index) of moviesList" :key="movie.id">
      <router-link class="movie__link" :to="{ name: 'movie', params: { id: movie.id } }"
        @click="store.openMovie(movie)">
        <img :src="movie.posterUrl" :alt="movie.title">
        <span class="top__number" v-if="route.path === '/main'"> {{ index + 1 }} </span>
      </router-link>
      <button-close className="btn-close remove-btn" v-if="route.path === '/account/favorite'"
        @click="store.removeFavorite(movie.id), emit('remove-favorite')"></button-close>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterLink } from 'vue-router';
import type { IMovie } from '../types/IMovie';
import { useAppStore } from '../stores/globalStore';
import ButtonClose from '../components/icons/ButtonClose.vue'
import { useRoute } from 'vue-router';
const store = useAppStore()
const route = useRoute()



const props = defineProps<{
  moviesList: IMovie[] | null,
  
}>()


const emit = defineEmits([
  'remove-favorite'
])



</script>




<style scoped>
.movies__list {
  justify-content: start;
  column-gap: 40px;
  row-gap: 64px;
  margin-bottom: 16px;
}

.movie__item {
  position: relative;
  width: 224px;
  height: 336px;
  border-radius: 16px;
  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
}

.movie__item:hover:not(:focus-visible) .remove-btn{
  transform: scale(1);
}

.remove-btn {
  top: -20px;
  right: -20px;
  transform: scale(0);
  transition: transform 0.3s;
  cursor: pointer;
}
.movie__link {
  display: inline-block;
  border-radius: 20px;
}
.top__number {
  padding: 8px 24px;
  background-color: var(--background-white);
  border-radius: 50px;
  position: absolute;
  top: -12px;
  left: -12px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 24px;
  line-height: 133%;
  color: var(--background-brand-active);
}
</style>
