<template>
  <ul class="row questionnaire_list">
    <li class="col2" v-for="i in 3">
      <ItemCardQuestionnaire></ItemCardQuestionnaire>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import ItemCardQuestionnaire from '@/components/questionnaire/ItemCardQuestionnaire.vue'


</script>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>