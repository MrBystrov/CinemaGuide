<template>
    <button class="btn genre__back-btn">
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z"
                fill="white" />
        </svg>
    </button>
</template>

<style scoped>
    .genre__back-btn path{
        padding: 13.5px;
        transition: fill 0.3s;
    }
    .genre__back-btn:hover:not(:focus-visible) path{
        fill: var(--background-brand-hovered);
    }
    .genre__back-btn:active:not(:focus-visible) path{
        fill: var(--background-brand-active);
    }
</style>