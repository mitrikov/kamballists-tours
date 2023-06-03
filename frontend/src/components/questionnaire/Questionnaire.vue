<template>
  <div class="container">
    <div class="questionnaire_header">
      <ItemButtonBack v-if="historyStore.getHistory().getParent() || true" @click="historyStore.selectParent()"
          class="questionnaire_header-back">
          Предыдущий вопрос
        </ItemButtonBack>
      <h2 class="questionnaire_header-title">Составим план идеальной поездки</h2>
    </div>
    <p class="questionnaire_desc">Помоги нам узнать о твоих интересах и наш алгоритм составит план вашего идеального
      путешествия</p>
    <h4 class="questionnaire_step">Вопрос {{ historyStore.getHistory().getStep() }}/5: <strong>{{
      historyStore.getHistory().getTitle() }}</strong></h4>

    <div style="height: 320px">
      <component :is="historyStore.getHistory().getComponent()" />
    </div>

    <div class="row">
      <div class="col2">

      </div>
      <div class="col2">
        <ItemButton @click="next">Далее</ItemButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useHistoryStore from "@/stores/history"
import axios from "axios"
import {server} from "@/helpers"
import {ref, watch} from "vue"
import {useUserStore} from "@/stores/user"
import Swal from "sweetalert2";



const historyStore = useHistoryStore()
const userStore = useUserStore()
let recomendEvents = ref()

const emit = defineEmits(['finish'])

async function next() {
  if (historyStore.getNextStep() != null) {
    historyStore.next()
  } else if (historyStore.getHistory().getPaths().length == 0 && historyStore.getAnswers().interests.length > 0) {
    console.log('finish!')
    try {
      await updateRecommendation()

    } catch (e) { /* empty */ }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Рекомендации обновлены',
      showConfirmButton: false,
      timer: 1500
    })
    emit('finish')
  }
}

async function updateRecommendation() {
  const modifiedUser = await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/users/" + userStore.user_id, {
      city: historyStore.getAnswers().city,
      cuisines: historyStore.getAnswers().cuisines.join(','),
      fromDate: historyStore.getAnswers().fromDate,
      interests: historyStore.getAnswers().interests.join(','),
      traveler_type: historyStore.getAnswers().traveler_type,
      traveler_wealth: historyStore.getAnswers().traveler_wealth,
  })
  let listRecomend = JSON.parse((await axios.get(import.meta.env.VITE_DJANGO_URL + '/tours/recommended/' + userStore.user_id, {})).data)
  listRecomend = (await server.get('events', {
    ids: listRecomend
  }))
  recomendEvents.value = listRecomend
  console.log(modifiedUser)
  console.log(listRecomend)
}


</script>

<style lang="sass" scoped>
.questionnaire
  &_header
    position: relative
    &-title
      text-align: center
      margin-bottom: 10px
    &-back
      position: absolute
      top: 50%
      left: 0
      transform: translate(0, -50%)
  &_desc
    text-align: center
    font-weight: 400
    font-size: 16px
    line-height: 22px
    color: var(--color-secondary)
    margin-bottom: 10px
  &_step
    text-align: center
    margin-bottom: 40px
</style>