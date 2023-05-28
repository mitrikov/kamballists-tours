<script setup lang="ts">
import {Interests} from "@/interfaces"
import {ref} from "vue";
import useHistoryStore from "@/stores/history";

const list = ref(new Set())
const historyStore = useHistoryStore()

const interests = [
  { value: Interests.architecture, title: 'Архитектура', desc: 'Памятники, площади, дворцы и усадьбы' },
  { value: Interests.culture, title: 'Культура и искусство', desc: 'Музеи, театры, спектакли и выставки' },
  { value: Interests.tourism, title: 'Активный отдых', desc: 'Пешие прогулки, туризм, экстрим' },
  { value: Interests.excursions, title: 'Экскурсии', desc: 'Обзорные экскурсии по улицам и музеям города' },
  { value: Interests.nature, title: 'Природа', desc: 'Заповедники, парки и горы' },
  { value: Interests.kids, title: 'С детьми', desc: 'Аннимационные программы, цирки и зоопарки' },
  { value: Interests.relaxation, title: 'Релаксация', desc: 'СПА и йога' },
  { value: Interests.night, title: 'Ночная жизнь', desc: 'Концерты, бары и клубы' },
  { value: Interests.shopping, title: 'Шоппинг', desc: 'Бутики, аутлеты и местные рынки' },
  { value: Interests.adventure, title: 'Приключения', desc: 'Скайдайвинг, прыжки с парашютом и прогулки по крышам' },
  { value: Interests.sport, title: 'Спорт', desc: 'Спортивные чемпионаты, футбол, велопрогулки и забеги' },
  { value: Interests.photo, title: 'Фото и видеосъемка', desc: 'Лучшие места для ярких воспоминаний' }
]

function add(value){
  console.log(list.value)
  if(list.value.has(value)){
    list.value.delete(value)
  } else {
    list.value.add(value)
  }

  historyStore.answer.interests = [...list.value]

  if([...list.value].length > 5){
    historyStore.nextStep = historyStore.getHistory().getPaths()[0]
  }
}

</script>

<template>
  <div class="row">
    <div class="col" v-for="i in interests">
      <div class="item" @click="add(i.value)" :class="list.has(i.value) ? 'active' : ''">
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
.active
  border: 2px solid var(--color-global-secondary)
</style>