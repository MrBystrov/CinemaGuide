<template>
  <div class="genres">
    <div class="genres-container container">
      <RouterView v-if="store.isGenreOpened" />
      <div class="genres__content" v-else>
        <h2 class="genres__title">Жанры фильмов</h2>
        <ul class="genres__list flex list-reset">
          <li
            class="genres__item"
            v-for="genre of genresPicture"
            :key="genre"
            :style="{ backgroundImage: `url(${Object.values(genre)[0]})` }"
          >
            <router-link
              :to="{ name: 'genre', params: { genre: Object.keys(genre)[0] } }"
              class="genres__link"
              @click="openGenreView"
            >
              <h3 class="genre__title title">{{ Object.keys(genre)[0] }}</h3>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getMoviesList } from '../api/getMoviesList'
import { useAppStore } from '../stores/globalStore'
import { useRoute } from 'vue-router'

const store = useAppStore()
const route = useRoute()

const genres = ref<string[] | null>(null)
const genresPicture = ref([])

store.isGenreOpened = false
async function updateGenresPage() {
  const response = await fetch('https://cinemaguide.skillbox.cc/movie/genres')
  genres.value = await response.json()
  if (genres.value !== null) {
    genres.value.forEach(async (item) => {
      const response = await getMoviesList(
        'https://cinemaguide.skillbox.cc/movie' + '?genre=' + item
      )
      const random = Math.round(Math.random() * 50)

      genresPicture.value.push({ [item]: response[random].posterUrl })

    })
  }
}
updateGenresPage()

console.log(genresPicture.value)

function openGenreView(gen: string): void {
  store.isGenreOpened = true
}
</script>



<style scoped>
.ten {
  padding-top: 40px;
  padding-bottom: 120px;
  color: white;
}
.genres {
  padding-top: 160px;
}
.genres__title {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 48px;
  line-height: 117%;
  color: var(--content-primary);
}
.genres__list {
  column-gap: 40px;
  row-gap: 64px;
}
.genre__title {
  padding: 22px 30px;
  border-radius: 0 0 24px 24px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 24px;
  line-height: 133%;
  text-align: center;
  text-transform: capitalize;
  color: var(--content-primary);
  background: var(--background-black);
}
.genres__item {
  position: relative;
  display: flex;
  align-items: end;
  border-radius: 24px;
  justify-content: center;
  flex: 1 1 22%;
  height: 304px;
  min-width: 290px;
  max-width: 335px;
  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.genres__link {
  width: 100%;
}
.genres__link:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
