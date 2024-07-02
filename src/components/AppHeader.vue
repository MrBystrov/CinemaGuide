<template>
  <header class="header">
    <div class="container header__container flex">
      <router-link to="/main" class="header__logo" v-if="!isSearchShow">
        <header-logo></header-logo>
      </router-link>
      <nav class="header__nav nav flex">
        <ul class="nav__list list-reset flex" v-if="!isSearchShow">
          <li class="nav__item">
            <router-link activeClass="link-active" to="/main" v-if="store.width > 1100">Главная</router-link>
          </li>
          <li class="nav__item">
            <router-link activeClass="link-active" to="/genres" @click="openGenresView">
              <span v-if="store.width > 1100">Жанры</span>
              <icon-genres v-else></icon-genres>
            </router-link>
          </li>
        </ul>
        <div class="search-group flex" :class="{ 'search-group-opened': isSearchShow }">
          <input ref="inputField" id="nav-search" type="search" class="nav__search" placeholder="Поиск"
            v-model="searchValue" @input="emit('filter-input', searchValue)"
            v-if="store.width > 700 || isSearchShow === true" />
          <button-search v-else class="btn" @click="searchShow"></button-search>
          <div class="filtred-modal" v-if="searchValue">
            <div class="filtred-container">
              <div class="not-found" v-if="!filtredMovies?.length">Ничего не нашлось</div>
              <ul class="filtred__list list-reset" name="filtred" v-else>
                <li class="filtred__item flex" v-for="movie of filtredMovies?.slice(0, 5)" :key="movie.id">
                  <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="filtred__link flex"
                    @click="openMovie(movie)">
                    <img :src="movie.posterUrl" alt="" class="filtred__img" />
                    <div class="filtred__info info flex">
                      <ul class="filtred__info-top list-reset flex">
                        <li class="filtred__top-rating flex" :class="{
                            'rating-gold': movie.tmdbRating > 8,
                            'rating-green': movie.tmdbRating < 8 && movie.tmdbRating >= 7,
                            'rating-gray': movie.tmdbRating < 7 && movie.tmdbRating >= 5,
                            'rating-red': movie.tmdbRating < 5
                          }">
                          <rating-star width="10"></rating-star>
                          <span>{{ movie.tmdbRating.toFixed(1) }}</span>
                        </li>
                        <li class="filtred__top-year">{{ movie.releaseYear }}</li>
                        <ul class="filtred__top-genres list-reset flex">
                          <li class="filtred__top-genre" v-for="genre in movie.genres.slice(0, 3)" :key="genre">
                            {{ genre }}&nbsp;
                          </li>
                        </ul>
                        <li class="filtred__top-duration">{{ corecteDuration(movie.runtime) }}</li>
                      </ul>
                      <h3 class="filtred__title title">{{ movie.title }}</h3>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button id="btn-clear-search" class="btn btn-clear-search" v-if="searchValue" @click="clearSearch">
          <button-clear></button-clear>
        </button>
      </nav>
      <router-link activeClass="link-active" :to="{ name: 'account' }" class="auth-btn nav__item btn"
        v-if="store.isAuthorised && !isSearchShow">
        <span v-if="store.width > 1000">{{
          store.isAuthorised ? store.currentUser?.name : 'Войти'
          }}</span>
        <account-icon v-else></account-icon>
      </router-link>
      <button :class="{ 'visually-hidden': isSearchShow }" class="auth-btn nav__item btn" @click="store.openModal()"
        v-else>
        <span v-if="store.width > 1000">Войти</span>
        <account-icon v-else></account-icon>
      </button>
    </div>
  </header>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderLogo from '../components/icons/MainLogo.vue'
import ButtonClear from '../components/icons/ButtonClear.vue'
import { RouterLink } from 'vue-router'
import type { IMovie } from '../types/IMovie'
import RatingStar from './icons/RatingStar.vue'
import corecteDuration from '../api/correctedTime'
import { useAppStore } from '../stores/globalStore'
import IconGenres from './icons/IconGenres.vue'
import AccountIcon from './icons/AccountIcon.vue'
import ButtonSearch from './ButtonSearch.vue'

const store = useAppStore()

window.addEventListener('resize', store.checkWidth)

const inputField = ref<HTMLInputElement | null>(null)
const searchValue = ref<string>('')
const isSearchShow = ref<boolean>(false)

function openMovie(movie: IMovie): void {
  store.activeMovie = movie
  store.isOpenedMovie = true
  searchValue.value = ''
}

function clearSearch(): void {
  const searchInput = document.getElementById('nav-search')
  if (searchInput) {
    searchValue.value = ''
  }
}

function closeSearch() {
  isSearchShow.value = false
  searchValue.value = ''
}

function searchShow() {
  isSearchShow.value = true
  document.addEventListener(
    'click',
    (e) => {
      if (!e.target.closest('input')) {
        console.log('ok')
        closeSearch()
      }
    },
    true
  )
}

const props = defineProps<{
  filtredMovies: IMovie[] | null
}>()

const emit = defineEmits(['filter-input'])
function openGenresView() {
  store.isGenreOpened = false
}
onMounted(() => {
  console.log(inputField.value)
  inputField.value?.focus
})
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
.header__nav,
.nav__list {
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
  width: 100%;
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
.search-group {
  position: relative;
  max-width: 559px;
  flex-grow: 1;
}
.filtred-modal {
  position: absolute;
  border-radius: 8px;
  top: 65px;
  right: 0;
  width: 100%;
  min-height: 50px;
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
  /* max-width: 400px; */
}
.filtred__title {
  font-size: 18px;
  white-space: break-spaces;
}
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.filtred-enter-active,
.filtred-leave-active {
  transition: all 0.5s ease;
}

.filtred-enter-from,
.filtred-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 1s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  line-height: 0;
}

@media (max-width: 1100px) {
  .header__nav {
    padding-right: 0;
    justify-content: end;
    gap: 22px;
    margin-right: 22px;
    flex-shrink: 1;
    flex-grow: 1;
  }

  .header__container {
    flex-wrap: nowrap;
  }

  .header {
    padding-top: 14px;
    padding-bottom: 14px;
  }

}
@media (max-width: 700px) {
  .filtred__list {
    display: flex;
    align-items: start;
  }
  .filtred__item {
    min-width: 220px;
  }
  .filtred-modal {
    overflow: hidden;
  }
  .filtred__img {
    width: 158px;
    height: 206px;
  }
  .filtred-container {
    overflow-x: scroll;
    padding-bottom: 20px;
    margin-bottom: -20px;
  }
  .filtred__info-top {
    justify-content: start;

  }
  .search-group {
    flex-grow: 0;
  }
  .search-group-opened {
    flex-grow: 1;
  }
}

</style>
