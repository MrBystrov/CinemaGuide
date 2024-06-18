<template>
  <main class="main">
      <custom-movie :customMovie="customMovie" @click-refresh="updateCustomMovie"></custom-movie>
      <transition name="fade">
        <top-ten :topMovies="topMovies"></top-ten>
      </transition>
  </main>
</template>

<script setup lang="ts">
  import CustomMovie from '../components/CustomMovie.vue';
  import TopTen from '../components/TopTen.vue';
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  import { getCustomMovie } from '../api/getCustomApi'
  import { getMoviesList } from '../api/getMoviesList'
  import type { IMovie } from "../types/IMovie";
  import { useAppStore } from '../stores/globalStore';
  const store = useAppStore()

  const customMovie = ref<IMovie | null>(null)


onMounted(async () => {
  store.isOpenedMovie = false
  updateCustomMovie()
})

async function updateCustomMovie() {
  customMovie.value = await getCustomMovie('https://cinemaguide.skillbox.cc/movie/random');
}




</script>



<style scoped>

</style>
