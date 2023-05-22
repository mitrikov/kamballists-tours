<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="menu">
      <div class="menu-logo"></div>
      <ul class="menu-left">
        <li><a href="#">Меню</a></li>
        <li><a href="#">Поиск</a></li>
        <li><a href="#">Бонусы</a></li>
      </ul>

      <ul class="menu-right">
        <li><a href="#">РУС / RUB</a></li>
        <li><a href="#">Поддержка</a></li>
        <li><a href="#">Избранное</a></li>
        <li><a href="#">Профиль</a></li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style lang="sass" scoped>

</style>
