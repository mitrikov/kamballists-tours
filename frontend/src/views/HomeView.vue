<script setup lang="ts">
import Questionnaire from '@/components/questionnaire/Questionnaire.vue'
import ItemCardOrder from '@/components/ItemCardOrder.vue'

</script>
<template>
  <main>
    <Questionnaire />
    <div class="container">
      <div class="row">
        <div class="col2" v-for="i in 10">
          <ItemCardOrder />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/helpers.sass"
</style>
