<script lang="ts" setup>
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'
import useEventsStore from "@/stores/events";
import {onMounted} from "vue";
import {useUserStore} from "@/stores/user";

const excursionsStore = useEventsStore()
const userStore = useUserStore()

onMounted(async () => {
  excursionsStore.eventsPag = await excursionsStore.fetchEvents()
  excursionsStore.events = excursionsStore.eventsPag.data
  userStore.user_id = await userStore.init()
  userStore.likes = await userStore.getListLikes()
  console.log(userStore.likes)
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
