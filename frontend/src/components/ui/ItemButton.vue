<template>
    <button :disabled="disabled" class="btn">
        <slot></slot>
    </button>
</template>

<script lang="ts">
export default {
    name: "ItemButton",

    props: {
        disabled: {
            type: Boolean,
            default: false
        },
    }
}
</script>

<style lang="sass" scoped>
.btn
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  width: 100%

  font-weight: bold
  font-size: 16px
  line-height: 22px

  color: var(--color-primary)
  background-color: var(--color-global-prymary)
  padding: 13px 16px
  border: none
  border-radius: var(--border-radius-primary)
  &:hover
      cursor: pointer

.btn[disabled]


</style>
