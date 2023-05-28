<template>
  <div class="container">
    <div class="questionnaire_header">
      <ItemButtonBack
          v-if="historyStore.getHistory().getParent() || true"
          @click="historyStore.selectParent()"
          class="questionnaire_header-back">
        назад
      </ItemButtonBack>
      <h2 class="questionnaire_header-title">Составим план идеальной поездки</h2>
    </div>
    <p class="questionnaire_desc">Помоги нам узнать о твоих интересах и наш алгоритм составит план вашего идеального путешествия</p>
    <h4 class="questionnaire_step">Вопрос {{ historyStore.getHistory().getStep() }}/5: <strong>{{ historyStore.getHistory().getTitle() }}</strong></h4>

    <div style="height: 320px">
      <component :is="historyStore.getHistory().getComponent()" />
    </div>

    <div class="row">
      <div class="col2"></div>
      <div class="col2">
        <ItemButton @click="historyStore.next()">Далее</ItemButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useHistoryStore from "@/stores/history"
const historyStore = useHistoryStore()


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