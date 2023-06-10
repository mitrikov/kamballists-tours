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
import ItemButton from "@/components/ui/ItemButton.vue";

const eventsStore = useEventsStore()
const historyStore = useHistoryStore()
const userStore = useUserStore()
let isShowModal = ref(true)
let {recommendedEvents} = storeToRefs(eventsStore)

onMounted(async () => {
  await updateRec()
})

async function updateRec() {
  recommendedEvents.value = []
  eventsStore.eventsPag = await eventsStore.fetchEvents()
  eventsStore.events = eventsStore.eventsPag.data
  userStore.user_id = await userStore.init()
  userStore.likes = await userStore.getListLikes()
  userStore.transactions = await userStore.getListTransactions()
  const answers = await server.get(`user/${userStore.user_id}`)
  //пхапх...
  if (answers.cuisines) {
    historyStore.getAnswers().cuisines = answers.cuisines
    historyStore.getAnswers().interests = answers.interests
    historyStore.getAnswers().traveler_type = answers.traveler_type
    historyStore.getAnswers().traveler_wealth = answers.traveler_wealth
  }

  const recommendedResponse = await axios.get(import.meta.env.VITE_DJANGO_URL + '/tours/recommended/' + userStore.user_id)
  const recommendedIds = JSON.parse(recommendedResponse.data)

  recommendedEvents.value = await server.get('events', {ids: recommendedIds})
  if (userStore.likes.length > 0) {
    eventsStore.events.map(e => {
      if (userStore.checkForExistenceLikes(e._id)) {
        e.isLiked = true
      } else {
        e.isLiked = false
      }
      return e
    })
  }

  if (userStore.transactions.length > 0) {
    eventsStore.events.map(e => {
      if (userStore.checkForExistenceTransactions(e._id)) {
        e.isBuy = true
      } else {
        e.isBuy = false
      }
      return e
    })
  }
}
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
      <div class="heedaer">
        <h1 class="recommendations-title">
          Рекомендации <span>будут меняться в зависимости от лайков</span>
        </h1>
        <ItemButton @click="updateRec" style="width: 50px; height: 50px;">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#000000" fill-rule="evenodd" d="M2.945 11.76a1 1 0 101.86-.736c-.892-2.256.024-4.967 2.316-6.29 1.987-1.147 4.354-.879 5.934.45l-2.49.295a1 1 0 10.234 1.986l4.31-.509a1 1 0 00.863-.793l.802-3.927a1 1 0 00-1.96-.4l-.385 1.889c-2.226-1.939-5.573-2.302-8.308-.723C3 4.803 1.675 8.549 2.945 11.76zm14.11-3.52a1 1 0 00-1.86.736c.892 2.256-.024 4.967-2.316 6.29-1.987 1.147-4.355.879-5.934-.45l2.49-.295a1 1 0 00-.234-1.986l-4.31.509a1 1 0 00-.863.793l-.802 3.927a1 1 0 001.96.4l.385-1.889c2.226 1.939 5.573 2.302 8.308.723 3.12-1.801 4.446-5.547 3.176-8.758z"/>
          </svg>
        </ItemButton>
      </div>
      <div class="row recommendations-list" v-if="recommendedEvents.length !== 0">
          <div class="col2 col-md6" v-for="rec in recommendedEvents">
            <ItemCardOrder :event="rec" />
          </div>
         
      </div>
      <Preloader v-else />
    </div>
    <div class="all-events">
      <div class="container" data-type="hgaps">
        <h1 class="recommendations-title">Все мероприятия <span>в системе</span></h1>
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
.heedaer
  display: flex
  justify-content: space-between
  align-items: center
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
