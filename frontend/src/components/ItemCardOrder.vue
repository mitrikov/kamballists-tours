<template>
  <div class="card">
    <div class="wrapper">
      <div class="card-img"></div>
      <div class="card-content">
        <h5 class="card-content__title">
          <a :href="event.dictionary_data.link_source" target="_blank">{{ event.dictionary_data.title }}</a>
          <span class="card-content__age">{{event.dictionary_data.age ?? event.dictionary_data.age}}</span>
        </h5>
        <p class="card-content__desc" >{{ cutText(event.dictionary_data.description) }}</p>
      </div>
    </div>

    <ul class="card-content__list-strong">
      <li class="card-content__list_options_strong">Бесплатная отмена</li>
    </ul>
    <ul class="card-content__list">
      <li>Wi-Fi</li>
      <li>Парковка</li>
      <li>Оплата картой</li>
    </ul>

    <div class="card-content__btns">
      <button class="card-content__btn card-content__btn_show" @click="buy">
        {{ getTextForBtnBuy() }}
        <span v-if="!event.isBuy">Приобрести</span>
      </button>
      <button class="card-content__btn card-content__btn_like" @click="like">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10.3508 5.45488C8.65965 3.72533 5.87681 3.72533 4.1857 5.45488C2.54748 7.13033 2.54748 9.8075 4.18569 11.483L11.7996 19.2699C11.9026 19.3752 12.072 19.3752 12.1749 19.2699L19.7888 11.483C21.427 9.8075 21.427 7.13033 19.7888 5.45488C18.0977 3.72533 15.3149 3.72533 13.6237 5.45488L12.5235 6.58012C12.3824 6.72443 12.1891 6.80578 11.9873 6.80578C11.7854 6.80578 11.5921 6.72443 11.451 6.58012L10.3508 5.45488Z"
            :stroke="getColorStoke()" :fill="getColorFill()" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useEventsStore from "@/stores/events";
import { useUserStore } from "@/stores/user";
import {onBeforeMount, onMounted} from "vue";
import {server} from "@/helpers";


const props = defineProps<{
  event: Object,
  events: []
}>()

const eventsStore = useEventsStore()
const userStore = useUserStore()


function cutText(text) {
  var sliced = text.slice(0,60);
  if (sliced.length < text.length) {
    sliced += '...';
  }
  return sliced
}
function getColorStoke(){
  return props.event.isLiked ? "red" : "#1D1D1D"
}

function getColorFill(){
  return props.event.isLiked ? "red" : ""
}

function getTextForBtnBuy(){
  return props.event.isBuy ? "Приобретено" : `от ${props.event.dictionary_data.ticket_price} ₽`
}

function like() {
  props.event.isLiked = true
  userStore.like(userStore.user_id, props.event)
}

function buy(){
  props.event.isBuy = true
  userStore.buy(userStore.user_id, props.event)
}
</script>

<style lang="sass" scoped>
.card
  display: flex
  flex-direction: column
  height: 100%
  justify-content: space-between
  padding: 2px
  border: 2px solid var(--color-background-accent)
  border-radius: 24px
  &-img
    width: 100%
    height: 290px
    background: url('/no-phono.jpg') no-repeat center
    background-size: cover
    border-radius: 21px
  &-content
    padding: 10px
    &__title
      display: flex
      justify-content: space-between
      font-weight: bold
      font-size: 16px
      line-height: 22px
      color: var(--color-primary)
      margin-bottom: 10px
      a
        color: var(--color-primary)
        text-decoration: none
    &__desc
      font-weight: bold
      font-size: 14px
      line-height: 18px
      word-wrap: break-word
      align-items: center
      color: var(--color-secondary)
      margin-bottom: 12px
    &__list
      display: flex
      flex-wrap: wrap
      font-weight: 400
      font-size: 14px
      line-height: 18px
      padding: 0 10px
      color: var(--color-secondary)
      margin-bottom: 1rem
      li
        margin-right: 6px
        &::after
          content: ','
        &:last-child::after
          content: ''
      &-strong
        display: flex
        flex-wrap: wrap
        font-weight: 500
        color: var(--color-global-secondary)
        padding: 0 10px
        margin-bottom: 7px
        li
          margin-right: 6px
          &::after
            content: ','
          &:last-child::after
            content: ''
          
    &__btns
      display: flex
      width: 100%
      justify-content: center
      gap: 2px
      padding: 2px
    &__btn
      font-weight: 600
      background-color: transparent
      border: none
      cursor: pointer
      padding: 5px 16px
      &_show
        width: 100%
        background-color: var(--color-global-prymary)
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        border-radius: 20px 4px 4px 20px
        span
          color: var(--color-secondary)
      &_like
        width: 40px
        background-color: var(--color-background-accent-transparency)
        border: 2px solid var(--color-background-accent)
        border-radius: 4px 20px 20px 4px
        svg
          margin-left: -12px

</style>