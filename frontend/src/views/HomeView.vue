<script lang="ts" setup>
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'
import useEventsStore from "@/stores/events";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {server} from "@/helpers";
import axios from "axios";


const eventsStore = useEventsStore()
const userStore = useUserStore()

let recomendEvents = ref()

onMounted(async () => {
  eventsStore.eventsPag = await eventsStore.fetchEvents()
  eventsStore.events = eventsStore.eventsPag.data
  userStore.user_id = await userStore.init()
  userStore.likes = await userStore.getListLikes()

 let asdfafds = JSON.parse((await axios.get(import.meta.env.VITE_DJANGO_URL + '/tours/recommended/' + userStore.user_id)).data)
  asdfafds = (await server.get('events', {
    ids: asdfafds
  }))
  recomendEvents.value = asdfafds
  console.log(asdfafds)

  eventsStore.events.map(e => {
    if(userStore.checkForExistence(e._id)){
      e.isLiked = true
    } else {
      e.isLiked = false
    }
    return e
  })
})



</script>
<template>
  <main>
    <Questionnaire />
    <div class="container">
      <h1 class="recommendations-title">Рекомендации <span>будут меняться в зависимости от лайков</span></h1>
      <div class="row recommendations-list">
          <div class="col2" v-for="rec in recomendEvents">
            <ItemCardOrder :event="rec" />
          </div>
      </div>

      <h1>Все мероприятия</h1>
      <div class="row recommendations-list" v-if="eventsStore.events.length != 0">
        <div class="col2" v-for="event in eventsStore.events">
          <ItemCardOrder :event="event" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"

.recommendations-list
  margin-bottom: 3rem

.recommendations-title
  span
    font-size: 12px
    font-weight: normal
</style>
