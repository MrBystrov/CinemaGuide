<template>
  <div class="favorite" color="white">
    <movies-list :moviesList="favoriteList" @remove-favorite="updateFavoriteList()"></movies-list>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onMounted, onUpdated, shallowRef } from 'vue';
import { ref, computed, watch } from 'vue';
import { getMoviesList } from '../api/getMoviesList';
import { useAppStore } from '../stores/globalStore';
import type { IMovie } from '../types/IMovie';
import MoviesList from './MoviesList.vue';

const store = useAppStore()
const favoriteList = ref<IMovie[]>([])


async function updateFavoriteList() {
  favoriteList.value = Object.assign(favoriteList.value, await getMoviesList('https://cinemaguide.skillbox.cc/favorites'))
  favoriteList.value = await getMoviesList('https://cinemaguide.skillbox.cc/favorites')
  store.showAcc()
}



onMounted(async () =>
  updateFavoriteList(),
)



</script>



<style scoped></style>
