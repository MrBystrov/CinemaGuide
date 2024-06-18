<template>
  <header class="header ">
    <div class="container header__container flex">
      <router-link to="/main" class="header__logo">
        <header-logo></header-logo>
      </router-link>
      <nav class="header__nav nav flex">
        <ul class="nav__list list-reset flex">
          <li class="nav__item">
            <router-link activeClass='link-active' to="/main">Главная</router-link>
          </li>
          <li class="nav__item">
            <router-link activeClass='link-active' to="/genres" @click="openGenresView">Жанры</router-link>
          </li>
        </ul>
        <input id="nav-search" type="search" class="nav__search" placeholder="Поиск" v-model="searchValue"
          @input="emit('filter-input', searchValue)">
        <button id="btn-clear-search" class="btn btn-clear-search" v-if="searchValue" @click="clearSearch">
          <button-clear></button-clear>
        </button>
        <div class="filtred-modal" v-if="searchValue">
          <ul class="filtred__list list-reset">
            <li class="filtred__item flex" v-for="movie of filtredMovies?.slice(0, 5)" :key="movie.id">
              <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="filtred__link flex"
                @click="openMovie(movie)">
                <img :src="movie.posterUrl" alt="" class="filtred__img">
                <div class="filtred__info info flex">
                  <ul class="filtred__info-top list-reset flex">
                    <li class="filtred__top-rating flex" :class="{
                      'rating-gold': movie.tmdbRating > 8,
                      'rating-green': movie.tmdbRating < 8 && movie.tmdbRating >= 7,
                      'rating-gray': movie.tmdbRating < 7 && movie.tmdbRating >= 5,
                      'rating-red': movie.tmdbRating < 5,
                    }">
                      <rating-star width="10"></rating-star>
                      <span>{{ movie.tmdbRating.toFixed(1) }}</span>
                    </li>
                    <li class="filtred__top-year">{{ movie.releaseYear }}</li>
                    <ul class="filtred__top-genres list-reset flex">
                      <li class="filtred__top-genre" v-for="genre in movie.genres.slice(0, 3)" :key="genre">{{ genre
                        }}&nbsp;</li>
                    </ul>
                    <li class="filtred__top-duration">{{ corecteDuration(movie.runtime) }}</li>
                  </ul>
                  <h3 class="filtred__title title">{{ movie.title }}</h3>
                </div>

              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-link activeClass='link-active' :to="{ name: 'account'}" class="auth-btn nav__item btn"
        v-if="store.isAuthorised">{{
        store.isAuthorised ? store.currentUser?.name
        : 'Войти' }}</router-link>
      <button class="auth-btn nav__item btn" @click="store.openModal()" v-else>Войти</button>
    </div>
  </header>
</template>


<script setup lang="ts">
  import {computed, ref} from 'vue'
  // import { useRoute } from 'vue-router'
  import HeaderLogo from '../components/icons/MainLogo.vue'
  import ButtonClear from '../components/icons/ButtonClear.vue'
  import { RouterLink } from 'vue-router'
  import type { IMovie } from '../types/IMovie'
  import { onMounted } from 'vue'
  import RatingStar from './icons/RatingStar.vue'
  import corecteDuration from '../api/correctedTime'
  import { useAppStore } from '../stores/globalStore'
  import { useRouter, useRoute } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const store = useAppStore()


  const searchValue = ref<string>('')

  function openMovie(movie: IMovie): void {
    store.activeMovie = movie;
    store.isOpenedMovie = true;
    searchValue.value = ''
  }


  function clearSearch(): void {
    const searchInput = document.getElementById('nav-search')
    if(searchInput) {
      searchValue.value = ''
    }
  }
  const props = defineProps<{
    filtredMovies: IMovie[] | null
  }>()

  const emit = defineEmits(['filter-input'])
  function openGenresView() {
    store.isGenreOpened = false
  }


</script>



<style scoped>
.header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  padding: 24px 0;
  flex-wrap: nowrap;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.5);
  color: var(--background-white);
}
.header__nav, .nav__list {
  gap: 40px;
  flex-wrap: nowrap;
}
.header__nav {
  z-index: 1000;
  position: relative;
  flex-basis: 63.3%;
}


.nav__search {
  padding: 12px 16px 12px 52px;
  border: none;
  flex-grow: 1;
  max-width: 559px;
  border-radius: 8px;
  background-color: var(--background-secondary);
  background-image: url('../assets/img/icons/search-icon.svg');
  background-repeat: no-repeat;
  background-position: 18px center;
  font-size: 18px;
  line-height: 133%;
  color: inherit;
}
.nav__search::placeholder {
  color: var(--content-disabled);
}
.auth-btn {
  font-size: inherit;
}
.btn-clear-search {
  position: absolute;
  right: 18px;
}
.filtred-modal {
  position: absolute;
  border-radius: 8px;
  top: 65px;
  right: 0;
  width: 559px;
  min-height: 300px;
  background: var(--background-secondary);
}
.filtred__item {
  padding: 20px 16px;
  flex-wrap: nowrap;
  font-size: 14px;
}
.filtred__info-top {
  gap: 12px 8px;
  font-size: 14px;
  line-height: 143%;
  color: var(--content-secondary);
}
.filtred__top-rating {
  align-items: center;
  border-radius: 16px;
  column-gap: 4px;
  padding: 5px 8px;
  font-size: 12px;
  font-weight: 700;
}
.filtred__link {
  column-gap: 4px;
  justify-content: start;
  width: 100%;
  gap: 16px;
}
.filtred__img {
  width: 40px;
  height: 52px;
}
.filtred__info {
  flex-direction: column;
  align-items: start;
  row-gap: 8px;
  max-width: 400px;
}
.filtred__title {
  font-size: 18px;
  white-space: break-spaces;
}


</style>
