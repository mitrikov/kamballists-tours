<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ItemYandexMap from '@/components/ItemYandexMap.vue'
</script>

<template>
  <header>
    <nav class="menu">
      <div class="menu-left">
        <div class="menu-logo"></div>
        <ul class="menu-left__list">
          <li><a href="#">Меню</a></li>
          <li><a href="#">Поиск</a></li>
          <li><a href="#">Бонусы</a></li>
        </ul>
      </div>

      <ul class="menu-right__list">
        <li><a href="#">РУС / RUB</a></li>
        <li><a href="#">Поддержка</a></li>
        <li><a href="#">Избранное</a></li>
        <li><a href="#">Профиль</a></li>
      </ul>
    </nav>
  </header>
  <ItemYandexMap />
  <RouterView />
</template>

<style lang="sass" scoped>
.menu
  display: flex
  justify-content: space-between
  &-left__list
    display: flex
  &-right__list
    display: flex
</style>
