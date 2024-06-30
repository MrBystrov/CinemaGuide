<template>
  <div class="app-container" :class="{ 'modal-open': store.isModalOpen }">
    <Transition name="modal">
      <app-modal v-if="store.isModalOpen"></app-modal>
    </Transition>
    <app-header :filtredMovies="filtredMovies" @filter-input="showFiltred">hjgjhgjhg</app-header>
    <RouterView v-slot="{Component}">
      <Transition name="page-opacity" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
    <app-footer class="footer"></app-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppModal from './components/AppModal.vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { getMoviesList } from './api/getMoviesList'
import type { IMovie } from './types/IMovie'
import { useAppStore } from './stores/globalStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const store = useAppStore()
const router = useRouter()

const filtredMovies = ref<IMovie[] | null>(null)

async function showFiltred(searchValue: string) {
  const response = await getMoviesList(
    'https://cinemaguide.skillbox.cc/movie' + '?title=' + searchValue
  )
  filtredMovies.value = response
  console.log(filtredMovies.value)
  console.log(searchValue)
}

onMounted(() => {
  router.push('/main')
  if (localStorage.getItem('currentUser')) {
    store.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  } else {
    return
  }

  if (localStorage.getItem('isAuth')) {
    store.isAuthorised = JSON.parse(localStorage.getItem('isAuth'))
  }
})
</script>



<style scoped>
@import './assets/main.css';




.app-container {
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  background-color: var(--background-black);
  min-height: 100vh;
}
.modal-open {
  overflow: hidden;
}
.temp-btn {
  position: absolute;
  top: 300px;
}
.footer {
  width: 100%;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
