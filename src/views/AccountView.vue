<template>
  <div class="account container">
    <div class="contsiner account-container">
      <h2 class="account__title view-title title">Мой аккаунт</h2>
      <ul class="account__menu list-reset flex">
        <li class="account__menu-item ">
          <router-link :to="{name: 'favorite'}" activeClass='link-active ' class="account__menu-link favorite-item">
            <span v-if="store.width > 1000">
              Избранные фильмы
            </span>
            <span v-else>
              Избранное
            </span>
          </router-link>
        </li>
        <li class="account__menu-item ">
          <router-link :to="{ name: 'settings' }" activeClass='link-active' class="account__menu-link settings-item">
            <span v-if="store.width > 1000">
              Настройка аккаунта
            </span>
            <span v-else>Настройки</span>
          </router-link>
        </li>
      </ul>
      <RouterView v-slot="{ Component }">
        <Transition name="page-opacity" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAppStore } from '../stores/globalStore'
const route = useRoute()
const store = useAppStore()


</script>



<style scoped>
.account {
  align-self: start;
  padding-top: 160px;
  width: 100%;
}
.view-title {
  margin-bottom: 64px;
  align-items: center;
  font-weight: 700;
  font-size: 48px;
  line-height: 117%;
  color: var(--content-primary);
}
.account__menu {
  padding-bottom: 64px;
  color: var(--content-primary);
  justify-content: start;
  column-gap: 64px;
}

.account__menu-link {
  padding: 8px 0 8px 32px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 24px;
  line-height: 133%;
  color: var(--background-white);
  background-position: left center;
  background-repeat: no-repeat;
}
.favorite-item {
  background-image: url('../assets/img/icons/favorite.svg');
}
.settings-item {
  background-image: url('../assets/img/icons/settings.svg');
}
.account__menu-link:after {
  top: 40px;
}
@media (max-width: 700px) {
  .account__menu {
    column-gap: 24px;
  }
}
</style>
