<template>
  <div @click="selectItem()" ref="element" class="card">
    <img :src="question.img" :alt="question.title" class="card-img">
    <p class="card-text">{{ props.question.title }}</p>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"


const props = defineProps<{
  question: Object
}>()
const element = ref()
function selectItem() {
  element.value.classList.toggle('active')
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