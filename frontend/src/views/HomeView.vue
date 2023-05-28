<script lang="ts" setup>
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'
import useEventsStore from "@/stores/events";
import {onMounted} from "vue";

const excursionsStore = useEventsStore()

onMounted(async () => {
  excursionsStore.events = (await excursionsStore.fetchEvents()).data
})

</script>
<template>
  <main>
    <Questionnaire />
    <div class="container">
      <div class="row">
        <div class="col2" v-for="i in 10">
          <ItemCardOrder />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>
