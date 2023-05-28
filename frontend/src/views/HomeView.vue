<script lang="ts" setup>
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'
import useEventsStore from "@/stores/events";
import {onMounted} from "vue";

const excursionsStore = useEventsStore()


onMounted(async () => {
  excursionsStore.eventsPag = await excursionsStore.fetchEvents()
  excursionsStore.events = excursionsStore.eventsPag.data
})

</script>
<template>
  <main>
    <Questionnaire />
    <div class="container">
      <div class="row" v-if="excursionsStore.events.length != 0">
        <div class="col2" v-for="event in excursionsStore.events">
          <ItemCardOrder :event="event" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>
