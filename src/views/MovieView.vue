<template>
    <div class="movie-card">
        <customMovie :customMovie="store.activeMovie"></customMovie>
        <div class="container about-container">
            <h2 class="movie-card__title title">
                О фильме
            </h2>
            <ul class="movie-card__about about flex list-reset">
                <li class="about__item">
                    <dt class="about__term">Язык&nbsp;оригинала</dt>
                    <dd class="about__description">{{ store.activeMovie?.language }}</dd>
                </li>
                <li class="about__item" v-if="store.activeMovie?.budget">
                    <dt class="about__term">Бюджет</dt>
                    <dd class="about__description">{{ store.activeMovie?.budget }}</dd>
                </li>
                <li class="about__item" v-if="store.activeMovie?.revenue">
                    <dt class="about__term">Выручка</dt>
                    <dd class="about__description">{{ store.activeMovie?.revenue }}</dd>
                </li>
                <li class="about__item" v-if="store.activeMovie?.director">
                    <dt class="about__term">Режиссёр</dt>
                    <dd class="about__description">{{ store.activeMovie?.director }}</dd>
                </li>
                <li class="about__item" v-if="store.activeMovie?.production">
                    <dt class="about__term">Продакшен</dt>
                    <dd class="about__description">{{ store.activeMovie?.production }}</dd>
                </li>
                <li class="about__item" v-if="store.activeMovie?.awardsSummary">
                    <dt class="about__term">Награды</dt>
                    <dd class="about__description">{{ store.activeMovie?.awardsSummary }}</dd>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import  CustomMovie  from '../components/CustomMovie.vue'
import { useAppStore } from '../stores/globalStore';

const store = useAppStore()


</script>



<style scoped>
.about-container {
    padding-top: 40px;
}
.about__item {
    display: flex;
    font-size: 18px;
    line-height: 133%;
    color: var(--content-primary);
}
.about__term {
    width: 320px;
    overflow: hidden;
    word-wrap: normal;
}
.about__term::after {
    content: '.........................................................................';
}
.about__description {
    padding-left: 8px;
    margin: 0;
}
.movie-card__about {
    flex-direction: column;
    row-gap: 25px;
    align-items: start;
}
.movie-card__title {
    margin-bottom: 64px;
    font-weight: 700;
    font-size: 48px;
    line-height: 117%;
    color: var(--content-primary);
}
</style>