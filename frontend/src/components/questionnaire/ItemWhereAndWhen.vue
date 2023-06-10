<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import Calendar from 'primevue/calendar'
import type {Ref} from "vue";
import useCitiesStore from "@/stores/cities";
import {onMounted, ref, watch} from "vue";
import type {ICity} from "@/interfaces";
import useHistoryStore from "@/stores/history";
import {a} from "vitest/dist/types-ad1c3f45";
const citiesStore = useCitiesStore()

let selectedPlace: Ref<Array<Object> | undefined> = ref()
let date: Ref<Date> = ref(new Date())
let listCities: Ref<Array<String> | undefined> = ref()
const storyStore = useHistoryStore()

function search(q){
  listCities.value = citiesStore.getCities().filter(i => i.match(q.query))
}

function allowNextStep(){
  storyStore.nextStep = storyStore.getHistory().getPaths()[0]
  if(storyStore.stage.data.type == 2){
    if(storyStore.answer.city && storyStore.answer.fromDate){

    }
  }
  return false
}

onMounted(async () => {
  citiesStore.cities = await citiesStore.fetchEvents()
  allowNextStep()
})

watch(selectedPlace, (newValue, oldValue) => {
  storyStore.answer.city = citiesStore.getObject(newValue)
  allowNextStep()
})

watch(date, (newValue, oldValue) => {
  storyStore.answer.fromDate = newValue

})
</script>

<template>
  <div class="row place-and-date">
    <div class="col3" v-if="storyStore.stage.data.type <= 2">
      <div class="item">
        <AutoComplete v-model="selectedPlace" :suggestions="listCities" @complete="search" dropdown forceSelection placeholder="Куда?" class="md:w-20rem w-full" />
      </div>
    </div>
    <div class="col3" v-if="storyStore.stage.data.type >= 2">
      <div class="item" >
        <Calendar v-model="date" dateFormat="dd-mm-yy" :minDate="new Date()" placeholder="Когда?" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/helpers.sass"

.row.place-and-date
  display: flex
  justify-content: center

  .col3
    flex-basis: 50%
  .item
    width: 100%
.item
  display: flex
  justify-content: center
  align-items: center
  height: 220px
  background-color: var(--color-background-floating)
  box-shadow: 0px 8px 20px var(--color-secondary)
  border-radius: 20px
</style>