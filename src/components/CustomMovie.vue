<template>
  <div class="custom-section custom movie">
    <img :src="customMovie?.backdropUrl" :alt="customMovie?.title" class="custom-image">
    <div class="custom-content flex">
      <ul class="movie__info flex list-reset">
        <li class="movie__info-rating flex" :class="{
                'rating-gold': customMovie?.tmdbRating > 8,
                'rating-green': customMovie?.tmdbRating < 8 && customMovie?.tmdbRating >= 7,
                'rating-gray': customMovie?.tmdbRating < 7 && customMovie?.tmdbRating >= 5,
                'rating-red': customMovie?.tmdbRating < 5
              }">
          <rating-star></rating-star>
          <span>{{ customMovie?.tmdbRating.toFixed(1) }} </span>
        </li>
        <li>
          <span class="movie__info-item movie__info-year">{{ customMovie?.releaseYear }}</span>
        </li>
        <li>
          <span class="movie__info-item movie__info-genre" v-for="genre in customMovie?.genres" :key="genre">{{ genre
            }}&nbsp;</span>
        </li>
        <li>
          <span class="movie__info-item movie__info-duration">{{ corecteDuration(customMovie?.runtime) }}</span>
        </li>
      </ul>
      <h2 class="movie__title">{{ customMovie?.title }}</h2>
      <p class="movie__description">{{ customMovie?.plot }}</p>
      <div class="movie__buttons flex">
        <button class="movie__buttons-trailer btn" @click="store.isTrailerOpen = true">
          Трейлер
        </button>
        <button class="movie__buttons-about btn custom-movie-btn" v-if="!store.isOpenedMovie"
          @click="openMovie(customMovie)">
          О фильме
        </button>
        <favorite-btn :class="{
                'in-favorites': store.currentUser?.favorites?.includes(String(customMovie?.id))
              }" @click="store.isAuthorised ? changeFavorite(customMovie?.id) : store.openModal()"></favorite-btn>
        <button-refresh @click="emit('click-refresh')" v-if="!store.isOpenedMovie"></button-refresh>
      </div>
    </div>
    <div class="trailer-container" v-if="store.isTrailerOpen">
      <div class="trailer-modal">
        <iframe class="trailer-modal-movie" width="900" height="600"
          :src="'https://www.youtube.com/embed/' + customMovie?.trailerYouTubeId" frameborder="0" autoplay="true"
          allowfullscreen>
        </iframe>
        <button-close class="trailer-close btn-close" @click="store.isTrailerOpen = false"></button-close>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import RatingStar from './icons/RatingStar.vue'
import FavoriteBtn from './icons/FavoriteBtn.vue'
import ButtonRefresh from './icons/ButtonRefresh.vue'
import type { IMovie } from '../types/IMovie'
import corecteDuration from '../api/correctedTime'
import { useAppStore } from '../stores/globalStore'
import { useRouter } from 'vue-router'
import ButtonClose from './icons/ButtonClose.vue'

const store = useAppStore()
const router = useRouter()

const currentfavorite = ref(store.currentUser?.favorites)
console.log(currentfavorite)

const props = defineProps<{
  customMovie: IMovie | null
}>()

const emit = defineEmits<{
  (name: 'click-refresh'): void
}>()

function openMovie(movie: IMovie): void {
  router.push({ name: 'movie', params: { id: movie.id } })
  store.activeMovie = movie
  store.isOpenedMovie = true
}

function changeFavorite(id: number) {
  store.currentUser?.favorites.includes(String(id))
    ? store.removeFavorite(id)
    : store.addFavorite(id)
}
</script>



<style scoped>
.custom-section {
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  margin-left: auto;
  padding-top: 205px;
  padding-bottom: 122px;
  background-repeat: no-repeat;
  background-size: cover;

}
.custom-content {
  padding-left: 80px;
  position: relative;
  max-width: 680px;
  flex-direction: column;
  align-items: start;
  row-gap: 16px;
  color: var(--content-primary);
  z-index: 1;
}
.movie__info {
  gap: 16px;
  justify-content: start;
  color: var(--content-secondary);
}
.movie__info-rating {
  padding: 4px 12px;
  border-radius: 16px;
  justify-content: start;
  flex-grow: 0;
  gap: 4px;
  color: var(--content-primary);
}
.movie__title {
  margin: 0;
  font-weight: 700;
  font-size: 48px;
  line-height: 117%;
  color: var(--content-primary);
}
.movie__description {
  margin: 0;
  margin-bottom: 44px;
  font-size: 24px;
  line-height: 133%;
  color: var(--content-secondary);
}
.movie__buttons {
  gap: 16px;
  font-size: 18px;
  font-weight: 700;
}
.movie__buttons-trailer,
.movie__buttons-about {
  font-weight: inherit;
  font-size: 18px;
  padding: 16px 48px;
  border-radius: 28px;
}
.movie__buttons-trailer {
  background-color: var(--background-brand-active);
  transition: background-color 0.3s;
}
.movie__buttons-trailer:hover:not(:focus-visible) {
  background-color: var(--background-brand-hovered);
}
.movie__buttons-about {
  background-color: var(--background-secondary);
}
.movie__buttons-favorite,
.movie__buttons-next {
  padding: 16px 22px;
  border-radius: 28px;
  background-color: var(--background-secondary);
}
.rating-gold {
  background-color: #a59400;
}
.rating-green {
  background-color: #308e21;
}
.rating-gray {
  background-color: #777;
}
.rating-red {
  background-color: #c82020;
}
.custom-image {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  height: 100%;
  width: 63%;
  filter: brightness(70%);
  object-fit: cover;
}
.trailer-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.trailer-container {
  content: '';
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 11, 11, 0.9);
}
.trailer-close {
  position: absolute;
}
.movie-enter-active,
.movie-leave-active {
  transition: all 0.5s ease;
}

.movie-enter-from,
.movie-leave-to {
  opacity: 0;
  transform: translateX(100px);
}


@media (max-width: 700px) {
.custom-section {
  padding-top: 56px;
  padding-bottom: 24px;
}
.custom-image, .custom-content {
    padding-left: 20px;
    padding-right: 20px;
  }
  .custom-content {
    padding: 24px;
  }
  .custom-image {
    position: static;
    width: 100%;
    object-fit: cover;
  }
  .movie__title {
    font-size: 24px;
  }
  .movie__description {
    font-size: 18px;
  }
  .movie__info-item {
    font-size: 14px;
  }
  .movie__buttons {
    align-self: center;
    justify-content: center;
    max-width: 350px;
    min-width: 335px;
  }
  .movie__buttons-trailer {
    min-width: 100%;
  }
  .movie__buttons-favorite, .movie__buttons-next {
    padding: 16px 18px;
  }
}
</style>
