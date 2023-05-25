<template>
  <div @click="selectItem()" ref="element" class="card">
    <img src="@/assets/images/card-img.png" alt="" class="card-img">
    <p class="card-text">Я знаю город и даты поездки</p>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

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
  &-img
    width: 110px
    height: 110px
  &-text
    font-weight: bold
    font-size: 16px
    line-height: 22px
.active
  border: 2px solid var(--color-global-secondary)
</style>