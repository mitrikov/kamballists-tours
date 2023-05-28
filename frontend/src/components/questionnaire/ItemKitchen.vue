<script setup lang="ts">
const kitchen = [
  { name: 'Европейская', img: 'kitchen1.png' },
  { name: 'Японская', img: 'kitchen2.png' },
  { name: 'Индийская', img: 'kitchen3.png' },
  { name: 'Итальянская', img: 'kitchen4.png' },
  { name: 'Грузинская', img: 'kitchen5.png' },
  { name: 'Фастфуд', img: 'kitchen6.png' },
  { name: 'Народов России', img: 'kitchen7.png' },
  { name: 'Китайская', img: 'kitchen8.png' }
]
</script>

<template>
  <div class="row">
    <div v-for="i in kitchen" class="col">
      <div class="item">
        <img :src="`/${i.img}`" :alt="i.name">
        <h5 class="item-title">
          {{ i.name }}
        </h5>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.item
  display: flex
  align-items: center
  background: var(--color-background-floating)
  text-align: center
  border-radius: 20px
  padding: 20px 7px
  &-title
    font-weight: 500
    font-size: 16px
    line-height: 100%
    color: var(--color-primary)
    margin-left: 10px
    margin-bottom: 7px
</style>