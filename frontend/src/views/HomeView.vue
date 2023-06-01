<script lang="ts" setup>
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'
import useEventsStore from "@/stores/events";
import {onMounted} from "vue";
import {useUserStore} from "@/stores/user";


const eventsStore = useEventsStore()
const userStore = useUserStore()



onMounted(async () => {
  eventsStore.eventsPag = await eventsStore.fetchEvents()
  eventsStore.events = eventsStore.eventsPag.data
  userStore.user_id = await userStore.init()
  userStore.likes = await userStore.getListLikes()
  console.log("userStore.likes")
  console.log(userStore.likes)
  console.log(eventsStore.events)

  eventsStore.events.map(e => {
    console.log(userStore.checkForExistence(e._id))
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
      <div class="row" v-if="eventsStore.events.length != 0">
        <div class="col2" v-for="event in eventsStore.events">
          <ItemCardOrder :event="event" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>
