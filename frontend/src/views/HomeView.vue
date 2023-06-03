<script lang="ts" setup>
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'
import useEventsStore from "@/stores/events";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {server} from "@/helpers";
import axios from "axios";
import PopUp from "@/components/ui/PopUp.vue";
import useHistoryStore from "@/stores/history";


const eventsStore = useEventsStore()
const historyStore = useHistoryStore()
const userStore = useUserStore()
let isShowModal = ref(true)
let recomendEvents = ref()

onMounted(async () => {
  eventsStore.eventsPag = await eventsStore.fetchEvents()
  eventsStore.events = eventsStore.eventsPag.data
  userStore.user_id = await userStore.init()
  userStore.likes = await userStore.getListLikes()
  const answers = await server.get(`user/${userStore.user_id}`)
  console.log("answers: ")
  console.log(answers)
  //пхапх...
  if(answers.cuisines){
    historyStore.getAnswers().cuisines = answers.cuisines
    historyStore.getAnswers().interests = answers.interests
    historyStore.getAnswers().traveler_type = answers.traveler_type
    historyStore.getAnswers().traveler_wealth = answers.traveler_wealth
  }

  console.log(historyStore.getAnswers())

  let listRecomend = JSON.parse((await axios.get(import.meta.env.VITE_DJANGO_URL + '/tours/recommended/' + userStore.user_id, {
    params: {
      city: historyStore.getAnswers().city,
      cuisines: historyStore.getAnswers().cuisines.join(','),
      fromDate: historyStore.getAnswers().fromDate,
      interests: historyStore.getAnswers().interests.join(','),
      traveler_type: historyStore.getAnswers().traveler_type,
      traveler_wealth: historyStore.getAnswers().traveler_wealth,
    }
  })).data)
  listRecomend = (await server.get('events', {
    ids: listRecomend
  }))
  recomendEvents.value = listRecomend
  console.log(listRecomend)
  if(userStore.likes.length > 0) {
    eventsStore.events.map(e => {
      if (userStore.checkForExistence(e._id)) {
        e.isLiked = true
      } else {
        e.isLiked = false
      }
      return e
    })
  }
})
</script>
<template>
  <main>
    <PopUp v-model="isShowModal">
      <template #header>
        <!-- Помогите нам подобрать для вас лучшие события! -->
      </template>

      <template #default>
        <Questionnaire @finish="isShowModal = false" />
      </template>
    </PopUp>
    <div class="container">
      <h1 class="recommendations-title">Рекомендации <span>будут меняться в зависимости от лайков</span></h1>
      <div class="row recommendations-list">
          <div class="col2 col-md6" v-for="rec in recomendEvents">
            <ItemCardOrder :event="rec" />
          </div>
      </div>

      <h1>Все мероприятия</h1>
      <div class="row recommendations-list" v-if="eventsStore.events.length != 0">
        <div class="col2 col-md6" v-for="event in eventsStore.events">
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
