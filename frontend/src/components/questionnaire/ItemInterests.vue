<script setup lang="ts">
const interests = [
  { title: 'Архитектура', desc: 'Памятники, площади, дворцы и усадьбы' },
  { title: 'Культура и искусство', desc: 'Музеи, театры, спектакли и выставки' },
  { title: 'Активный отдых', desc: 'Пешие прогулки, туризм, экстрим' },
  { title: 'Экскурсии', desc: 'Обзорные экскурсии по улицам и музеям города' },
  { title: 'Природа', desc: 'Заповедники, парки и горы' },
  { title: 'С детьми', desc: 'Аннимационные программы, цирки и зоопарки' },
  { title: 'Релаксация', desc: 'СПА и йога' },
  { title: 'Ночная жизнь', desc: 'Концерты, бары и клубы' },
  { title: 'Шоппинг', desc: 'Бутики, аутлеты и местные рынки' },
  { title: 'Приключения', desc: 'Скайдайвинг, прыжки с парашютом и прогулки по крышам' },
  { title: 'Спорт', desc: 'Спортивные чемпионаты, футбол, велопрогулки и забеги' },
  { title: 'Фото и видеосъемка', desc: 'Лучшие места для ярких воспоминаний' }
]
</script>

<template>
  <div class="row">
    <div class="col" v-for="i in interests">
      <div class="item">
        <h5 class="item-title">
          {{ i.title }}
        </h5>
        <p class="item-descr">
          {{ i.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.item
  background: var(--color-background-floating)
  text-align: center
  border-radius: 20px
  padding: 20px 7px
  &-title
    font-weight: 500
    font-size: 16px
    line-height: 100%
    color: var(--color-primary)
    margin-bottom: 7px
  &-desc
    font-weight: 400
    font-size: 12px
    line-height: 100%
    color: var(--color-secondary)
</style>