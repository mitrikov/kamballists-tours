<template>
  <ul class="row questionnaire_list">
    <li class="col2" v-for="item in storyStore.stage.data">
      <ItemCardQuestionnaire :question="item"></ItemCardQuestionnaire>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import ItemCardQuestionnaire from '@/components/questionnaire/ItemCardQuestionnaire.vue'
import useStoryStore from '@/stores/history'
const storyStore = useStoryStore()


</script>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>