<template>
  <div class="genre flex">
    <div class="genre__title-group flex">
      <back-genres-btn @click="backGenresPage"></back-genres-btn>
      <h2 class="genre__title title">{{ route.params.genre }}</h2>
    </div>
    <movies-list :moviesList="moviesByGenre"></movies-list>
    <button class="btn genre__btn-more" @click="loadNextPage">Показать еще</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { getMoviesList } from '../api/getMoviesList'
import type { IMovie } from '../types/IMovie'
import BackGenresBtn from '../components/icons/ArrowBack.vue'
import { useAppStore } from '../stores/globalStore'
import MoviesList from '../components/MoviesList.vue'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const pageNumber = ref<number>(1)

const moviesByGenre = ref<IMovie[]>([])

onMounted(async () => {
  if (store.width > 700) {
    openByGenreMovies(15)
  } else {
    openByGenreMovies(5)
  }
})

async function openByGenreMovies(num: number): Promise<IMovie[]> {
  return (moviesByGenre.value = await getMoviesList(
    'https://cinemaguide.skillbox.cc/movie' +
      '?genre=' +
      route.params.genre +
      `&count=${num}` +
      `&page=${pageNumber.value}`
  ))
}

function backGenresPage() {
  emit('click-back-genres')
  store.isGenreOpened = false
  router.push('/genres')
}

async function loadNextPage() {
  ++pageNumber.value
  const nextTen = await getMoviesList(
    'https://cinemaguide.skillbox.cc/movie' +
      '?genre=' +
      route.params.genre +
      `&page=${pageNumber.value}` +
      '&count=10'
  )
  moviesByGenre.value = [...moviesByGenre.value, ...nextTen]
  console.log(moviesByGenre.value)
  console.log(nextTen)
}
console.log(route.path);
const emit = defineEmits(['click-back-genres'])
</script>


<style scoped>
.genre {
  flex-direction: column;
  row-gap: 64px;
}
.genre-container {
  color: var(--content-primary);
}
.genre__title-group {
  align-self: start;
  justify-content: start;
  align-items: center;
  column-gap: 17px;
}

.genre__title {
  align-items: center;
  font-weight: 700;
  font-size: 48px;
  line-height: 117%;
  color: var(--content-primary);
  text-transform: capitalize;
}
.genre__btn-more {
  padding: 16px 48px;
  background: var(--background-brand-active);
  border-radius: 28px;
  color: var(--content-primary);
  align-self: center;
}

@media (max-width: 700px) {
  .genre {
    align-items: start;
  }
  .genre__title {
    font-size: 24px;
  }
  .movies__list {
    color: red;
  }
}
</style>
