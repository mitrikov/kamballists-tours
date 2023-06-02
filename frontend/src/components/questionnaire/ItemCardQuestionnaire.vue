<template>
  <div @click="selectItem()" ref="element" class="card">
    <img :src="question.img" :alt="question.title" class="card-img">
    <p class="card-text">{{ props.question.title }}</p>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import useHistoryStore from "@/stores/history";
import {TravelerType} from "@/interfaces";


const props = defineProps<{
  question: Object
}>()
const emit = defineEmits(['answer'])

const historyStore = useHistoryStore()
const element = ref()

function selectItem() {

  // element.value.classList.toggle('active')
  // emit("answer")

  if(typeof props.question.answer == 'number'){
    historyStore.nextStep = historyStore.getHistory().getPaths()[props.question.answer]
  } else if(props.question.type == 'TravelerType') {
    historyStore.answer.traveler_type = props.question.answer
  } else if(props.question.type == 'TravelerWealth') {
    historyStore.answer.traveler_wealth = props.question.answer
  } else if(historyStore.getHistory().getPaths()[0])
    historyStore.nextStep = historyStore.getHistory().getPaths()[0]

}

</script>

<style lang="sass" scoped>
.card
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 220px
  background-color: var(--color-background-floating)
  border-radius: var(--border-radius-primary)
  padding: 0 40px
  &-img
    width: 110px
    height: 110px
  &-text
    font-weight: bold
    font-size: 16px
    line-height: 22px
    text-align: center
.active
  border: 2px solid var(--color-global-secondary)
</style>