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
import { storeToRefs } from 'pinia'

const eventsStore = useEventsStore()
const historyStore = useHistoryStore()
const userStore = useUserStore()
let isShowModal = ref(true)
let {recommendedEvents} = storeToRefs(eventsStore)

onMounted(async () => {
  eventsStore.eventsPag = await eventsStore.fetchEvents()
  eventsStore.events = eventsStore.eventsPag.data
  userStore.user_id = await userStore.init()
  userStore.likes = await userStore.getListLikes()
  userStore.transactions = await userStore.getListTransactions()
  const answers = await server.get(`user/${userStore.user_id}`)
  //пхапх...
  if(answers.cuisines){
    historyStore.getAnswers().cuisines = answers.cuisines
    historyStore.getAnswers().interests = answers.interests
    historyStore.getAnswers().traveler_type = answers.traveler_type
    historyStore.getAnswers().traveler_wealth = answers.traveler_wealth
  }

  const recommendedResponse = await axios.get(import.meta.env.VITE_DJANGO_URL + '/tours/recommended/' + userStore.user_id)
  const recommendedIds = JSON.parse(recommendedResponse.data)

  recommendedEvents.value = await server.get('events', {ids: recommendedIds })
  if(userStore.likes.length > 0) {
    eventsStore.events.map(e => {
      if (userStore.checkForExistenceLikes(e._id)) {
        e.isLiked = true
      } else {
        e.isLiked = false
      }
      return e
    })
  }

  if(userStore.transactions.length > 0) {
    eventsStore.events.map(e => {
      if (userStore.checkForExistenceTransactions(e._id)) {
        e.isBuy = true
      } else {
        e.isBuy = false
      }
      return e
    })
  }

  // console.log(eventsStore.events.filter(e => e.isLiked))
  // console.log(eventsStore.events.filter(e => e.isBuy))
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
    <div class="container" data-type="hgaps">
      <h1 class="recommendations-title">Рекомендации <span>будут меняться в зависимости от лайков</span></h1>
      <div class="row recommendations-list" v-if="recommendedEvents.length !== 0">
          <div class="col2 col-md6" v-for="rec in recommendedEvents">
            <ItemCardOrder :event="rec" />
          </div>
         
      </div>
      <Preloader v-else />
    </div>
    <div class="all-events">
      <div class="container" data-type="hgaps">
        <h1>Все мероприятия</h1>
        <div class="row recommendations-list" v-if="eventsStore.events.length !== 0">
          <div class="col2 col-md6" v-for="event in eventsStore.events">
            <ItemCardOrder :event="event" />
          </div>
        </div>
        <Preloader v-else />
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"

.recommendations-list
  margin-bottom: 3rem


.all-events
  background-color: #faedd7
  padding: 4rem 0
  border-top-left-radius: 50px
  border-top-right-radius: 50px
  @media (max-width: $md)
    padding-top: 2.5rem
  .card
    background-color: #fff6

.recommendations-title
  span
    font-size: 12px
    font-weight: normal
</style>
