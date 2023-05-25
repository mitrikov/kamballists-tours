<template>
    <div class="pt-2">
        <div class="input"
             :class="{'input-error' : error}">
            <label for="input"><slot></slot></label>
            <input
                :disabled="disabled"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :name="name"
                @input="$emit('update:modelValue', $event.target.value)"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: "ItemInput",
    props: {
        value: {
            type: String,
            default: ''
        },

        type: {
            type: String,
            default: 'text'
        },

        name: {
            type: String,
            default: 'text'
        },

        modelValue: {
            type: String,
            default: ''
        },

        placeholder: {
            type: String
        },

        disabled: {
            type: Boolean,
            default: false
        },

        error: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="sass" scoped>
.input
    position: relative
    cursor: pointer
    font-size: 12px
    margin-top: 7px
    outline: 1px solid #79747E
    &-error
        outline: 2px solid #D26666
    label
        position: absolute
        top: -10px
        left: 12px
        font-size: 12px
        color: black
        background-color: #fff
        padding: 0 4px
    input
        padding: 0 7px
        height: 36px
        width: 100%
        outline: none
        &[disabled]
            cursor: not-allowed
.input-monitor
    .input
        display: flex
        flex-direction: column
        label
            position: static
            background-color: transparent
            border: none
            color: #fff
        input
            position: static
            background: rgba(255, 255, 255, 0.1)
            border: 1px solid var(--main-border-color)
            border-radius: 2px

.required
    label::after
        content: '*'
        color: darkred
        margin-left: 3px
</style>
