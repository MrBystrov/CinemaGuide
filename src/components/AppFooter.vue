<template>
  <footer class="footer container flex">
    <div class="copyright flex">
      <p class="copyright__name">LLC «Мультимедиа Визион»</p>
      <copyright-icon></copyright-icon>
      <p class="copyright__reserved">Все права защищены</p>
    </div>
    <ul class="footer__socials socials flex list-reset">
      <li class="socials__item vk">
        <vk-icon></vk-icon>
      </li>
      <li class="socials__item youtube">
        <yt-icon></yt-icon>
      </li>
      <li class="socials__item ok">
        <ok-icon></ok-icon>
      </li>
      <li class="socials__item tg">
        <tg-icon></tg-icon>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import CopyrightIcon from './icons/CopyrightIcon.vue'
import VkIcon from './icons/VkIcon.vue'
import YtIcon from './icons/YtIcon.vue'
import OkIcon from './icons/OkIcon.vue'
import TgIcon from './icons/TgIcon.vue'
</script>



<style scoped>
.footer {
  /* position: fixed;
  z-index: 1000;
  width: 100%; */
  bottom: 0;
  padding-top: 48px;
  padding-bottom: 48px;
  background: var(--background-black);
}

.copyright {
  column-gap: 12px;
  font-family: var(--font-family);
  line-height: 133%;
  color: var(--content-secondary);
}
.copyright__name {
  font-weight: 700;
  color: var(--content-primary);
}
.socials {
  column-gap: 24px;
}
</style>
