<template>
  <div class="genres">
    <div class="genres-container container">
      <div class="genres__content" v-if="!store.isGenreOpened">
        <h2 class="genres__title title">Жанры фильмов</h2>
        <TransitionGroup tag="ul" name="page-opacity" class="genres__list flex list-reset">
          <li
            class="genres__item"
            v-for="(genre, index) of genresPicture"
            :key="index"
            :style="{ backgroundImage: `url(${Object.values(genre)[0]})` }"
          >
            <router-link
              :to="{ name: 'genre', params: { genre: Object.keys(genre)[0] } }"
              class="genres__link"
              @click="openGenreView()"
            >
              <h3 class="genre__title title">{{ Object.keys(genre)[0] }}</h3>
            </router-link>
          </li>
        </TransitionGroup>
      </div>
      <RouterView v-else />
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import { getMoviesList } from '../api/getMoviesList'
import { useAppStore } from '../stores/globalStore'
const route = useRoute()
const store = useAppStore()

const genres = ref<string[] | null>(null)
const genresPicture = ref<Object[]>([])

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

function openGenreView(): void {
  store.isGenreOpened = true
}

onMounted(() => {
  if(route.params.genre) {
    store.isGenreOpened = true
  }
})

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
  margin-bottom: 64px;
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
@media (max-width: 700px) {
  .genres {
    padding-top: 80px;
  }
  .genres__list {
    gap: 24px;
  }
  .genres__title {
    font-size: 24px;
    margin-bottom: 40px;
  }
}
</style>
