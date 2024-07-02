<template>
  <footer class="footer container flex">
    <div class="copyright flex">
      <p class="copyright__name text">LLC «Мультимедиа Визион»</p>

      <p class="copyright__reserved text flex">
        <copyright-icon></copyright-icon>
        <span>Все права защищены</span>
      </p>
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
.copyright__reserved {
  column-gap: 14px;
}
@media (max-width: 700px) {
  .footer {
    padding-top: 24px;
    padding-bottom: 24px;
    align-items: start;
  }
  .copyright {
    margin-bottom: 32px;
  }
  .copyright__reserved {
    align-items: center;
    font-size: 14px;
  }

  .socials {
    transform: scale(0.665);
    align-items: start;
  }
  @media (max-width: 500px) {
    .copyright__name {
      margin-bottom: 8px;
    }
  }
}
</style>
