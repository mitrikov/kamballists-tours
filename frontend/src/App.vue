<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="container" data-type="hgaps">
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
    </div>
  </header>
  <RouterView />
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers"
@import 'sweetalert2/src/sweetalert2.scss'
.menu
  display: flex
  justify-content: space-between
  margin-top: 1rem
  margin-bottom: 4rem
  font-size: 14px
  @media (max-width: $md)
    display: none
  &-left__list
    display: flex
    gap: 1rem
  &-right__list
    display: flex
    gap: 1rem

  a
    color: #555
    text-decoration: none
</style>
