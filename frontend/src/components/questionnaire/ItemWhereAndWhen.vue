<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import Calendar from 'primevue/calendar'
import type {Ref} from "vue";
import useCitiesStore from "@/stores/cities";
import {onMounted, ref} from "vue";
import type {ICity} from "@/interfaces";
const citiesStore = useCitiesStore()

let selectedPlace: Ref<Array<Object> | undefined> = ref()
let date: Ref<Date | undefined> = ref()
let listCities: Ref<Array<String> | undefined> = ref()

function search(q){
  listCities.value = citiesStore.getCities().filter(i => i.match(q.query))
}

onMounted(async () => {
  citiesStore.cities = await citiesStore.fetchEvents()
})
</script>

<template>
  <div class="row">
    <div class="col3">
      <div class="item">
        <AutoComplete v-model="selectedPlace" :suggestions="listCities" @complete="search" dropdown forceSelection placeholder="Куда?" class="md:w-20rem w-full" />
      </div>
    </div>
    <div class="col3">
      <div class="item">
        <Calendar v-model="date" dateFormat="dd-mm-yy" placeholder="Когда?" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/helpers.sass"
.item
  display: flex
  justify-content: center
  align-items: center
  height: 220px
  background-color: var(--color-background-floating)
  box-shadow: 0px 8px 20px var(--color-secondary)
  border-radius: 20px
</style>