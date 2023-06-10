<template>
  <ul class="row questionnaire_list" ref="list">
    <li class="col2"  v-for="item in storyStore.stage.data" >
      <ItemCardQuestionnaire :question="item" @click="highlightSelected" class="temp"></ItemCardQuestionnaire>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import ItemCardQuestionnaire from '@/components/questionnaire/ItemCardQuestionnaire.vue'
import useStoryStore from '@/stores/history'
import {ref, type Ref } from 'vue';

const storyStore = useStoryStore()

const list : Ref<HTMLElement | undefined> = ref()

const highlightSelected = (e : Event) => {
  const target = e.target as HTMLElement

  list.value?.querySelectorAll("div").forEach(item => {
    item.classList.remove("active")
  })
  // console.log(target)
  target.closest(".temp").classList.add("active")
  
} 

</script>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>