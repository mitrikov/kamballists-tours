<script setup lang="ts">
import {ref} from "vue";
import useHistoryStore from "@/stores/history";

const kitchen = [
  { value: 'europe', name: 'Европейская', img: 'kitchen1.png' },
  { value: 'japan', name: 'Японская', img: 'kitchen2.png' },
  { value: 'india', name: 'Индийская', img: 'kitchen3.png' },
  { value: 'italia', name: 'Итальянская', img: 'kitchen4.png' },
  { value: 'georgian', name: 'Грузинская', img: 'kitchen5.png' },
  { value: 'fastFood', name: 'Фастфуд', img: 'kitchen6.png' },
  { value: 'russian', name: 'Народов России', img: 'kitchen7.png' },
  { value: 'chinese', name: 'Китайская', img: 'kitchen8.png' }
]
const list = ref(new Set())
const historyStore = useHistoryStore()
function add(value){
  if(list.value.has(value)){
    list.value.delete(value)
  } else {
    list.value.add(value)
  }

  historyStore.answer.cuisines = [...list.value]

  if([...list.value].length > 0){
    historyStore.nextStep = historyStore.getHistory().getPaths()[0]
  }
}
</script>

<template>
  <div class="row">
    <div v-for="i in kitchen" class="col">
      <div class="item" @click="add(i.value)" :class="list.has(i.value) ? 'active' : ''">
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
.active
  border: 2px solid var(--color-global-secondary)
</style>