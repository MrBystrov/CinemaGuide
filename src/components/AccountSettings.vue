<template>
  <TransitionGroup tag="div" class="settings flex" name="settings">
    <ul class="settings__list list-reset flex">
      <li class="settings__item name">
        <span class="settings__icon settings__initials">{{
          store.currentUser
            ? store.currentUser?.name.slice(0, 1) + store.currentUser?.surname.slice(0, 1)
            : null
        }}</span>
        <div class="settings__text-group">
          <dt class="settings__item-term">Имя Фамилия</dt>
          <dd class="settings__item-descr">
            {{ store.currentUser?.name + ' ' + store.currentUser?.surname }}
          </dd>
        </div>
      </li>
      <li class="settings__item mail">
        <span class="settings__icon settings__mail-icon">
          <mail-icon></mail-icon>
        </span>
        <div class="settings__text-group">
          <dt class="settings__item-term">Электронная почта</dt>
          <dd class="settings__item-descr">{{ store.currentUser?.email }}</dd>
        </div>
      </li>
    </ul>
    <button class="close-acc-btn btn" @click="store.closeAccount(), toMain()">
      Выйти из аккаунта
    </button>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/globalStore'
import MailIcon from './icons/MailIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useAppStore()

function toMain() {
  router.push('/')
}
</script>



<style scoped>
.settings {
  flex-direction: column;
  align-items: start;
  row-gap: 64px;
}
.settings__list {
  flex-direction: column;
  align-items: start;
  row-gap: 40px;
  color: var(--content-primary);
}
.settings__item {
  display: flex;
  column-gap: 16px;
}
.settings__item-descr {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 133%;
  color: var(--content-primary);
}
.settings__item-descr {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 24px;
  line-height: 133%;
  color: var(--content-primary);
  margin: 0;
}
.close-acc-btn {
  padding: 16px 48px;
  background: var(--background-brand-active);
  font-weight: 700;
  font-size: 18px;
  border-radius: 28px;
  color: var(--content-primary);
}
.settings__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: var(--background-disabled);
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 24px;
  line-height: 133%;
  color: var(--content-primary);
}
.settings-enter-active,
.settings-leave-active {
  transition: all 0.5s ease;
}
.settings-enter-from,
.settings-leave-to {
  opacity: 1;
  transform: translateX(30px);
}

@media (max-width: 700px) {
  .settings__item-term {
    font-size: 14px;
  }
  .settings__item-descr {
    font-size: 18px;
  }
  .close-acc-btn {
    width: 100%;
  }
}
</style>
