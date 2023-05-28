<template>
  <div class="card">
    <div class="card-img"></div>
    <div class="card-content">
      <h5 class="card-content__title">Отель Holiday Inn Express Moscow</h5>
      <p class="card-content__desc">Москва, пер. Петровско-Разумовский, 80сА</p>
      <ul class="card-content__list-strong">
        <li class="card-content__list_options_strong">Питание включено</li>
        <li class="card-content__list_options_strong">Бесплатная отмена</li>
      </ul>
      <ul class="card-content__list">
        <li>Wi-Fi</li>
        <li>Бассейн</li>
        <li>Парковка</li>
        <li>Кондиционер в номере</li>
        <li>Тренажёрный зал</li>
        <li>Оплата картой</li>
      </ul>

    </div>

    <div class="card-content__btns">
      <button class="card-content__btn card-content__btn_show">от 5 000 ₽ за ночь <span>Посмотреть</span></button>
      <button class="card-content__btn card-content__btn_like">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3508 5.45488C8.65965 3.72533 5.87681 3.72533 4.1857 5.45488C2.54748 7.13033 2.54748 9.8075 4.18569 11.483L11.7996 19.2699C11.9026 19.3752 12.072 19.3752 12.1749 19.2699L19.7888 11.483C21.427 9.8075 21.427 7.13033 19.7888 5.45488C18.0977 3.72533 15.3149 3.72533 13.6237 5.45488L12.5235 6.58012C12.3824 6.72443 12.1891 6.80578 11.9873 6.80578C11.7854 6.80578 11.5921 6.72443 11.451 6.58012L10.3508 5.45488ZM20.8613 4.4062C23.0695 6.66459 23.0695 10.2732 20.8613 12.5316L13.2474 20.3186C12.5561 21.0256 11.4184 21.0256 10.7271 20.3186L3.11319 12.5316C0.904979 10.2732 0.90498 6.66459 3.11319 4.4062C5.3927 2.07488 9.14377 2.07489 11.4233 4.4062L11.9873 4.983L12.5512 4.4062C14.8307 2.07489 18.5818 2.07488 20.8613 4.4062Z" fill="#1D1D1D"/>
        </svg>
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="sass" scoped>
.card
  padding: 2px
  border: 2px solid var(--color-background-accent)
  border-radius: 24px
  &-img
    width: 100%
    height: 290px
    background: url(@/assets/images/hostel.png) no-repeat center
    background-size: cover
    border-radius: 21px
  &-content
    padding: 10px
    &__title
      font-weight: bold
      font-size: 16px
      line-height: 22px
      color: var(--color-primary)
    &__desc
      font-weight: bold
      font-size: 14px
      line-height: 18px
      display: flex
      align-items: center
      color: var(--color-secondary)
      margin-bottom: 12px
    &__list
      display: flex
      flex-wrap: wrap
      font-weight: 400
      font-size: 14px
      line-height: 18px
      color: var(--color-secondary)
      li
        margin-right: 6px
      &-strong
        display: flex
        flex-wrap: wrap
        font-weight: 500
        color: var(--color-global-secondary)
        margin-bottom: 7px
        li
          margin-right: 6px
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