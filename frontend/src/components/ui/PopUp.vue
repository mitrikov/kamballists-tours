<template>
    <div v-show="modelValue" v-if="modelValue" class="modal" :modal-id="uuid" @click="modalClickModal($event.target)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"></slot>
                    <span class="close" @click="closeModal"></span>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
let uuid = 1;

export default {
    name: "PopUp",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },

        closeOutsideTheArea: {
            type: Boolean,
            default: true,
        }
    },

    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },

    methods: {
        closeModal(close = true){
            this.$emit('update:modelValue', !close)
        },

        modalClickModal(element){
            if(element.classList.contains('modal-dialog'))
                element = element.parentElement
            if(this.uuid === element.getAttribute('modal-id')
                && this.closeOutsideTheArea
                && element.classList.contains('modal'))
                this.closeModal();
        }
    }
}
</script>

<style>
body:has(.modal){
    overflow-y: hidden;
    padding-right: 16px;
}
</style>

<style lang="sass" scoped>
.modal
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(28, 91, 147, 0.5)
    overflow-x: hidden
    overflow-y: auto
    z-index: 100
    &-dialog
        position: relative
        display: flex
        align-items: center
        width: fit-content
        min-height: calc(100% - 3.5rem)
        margin: 1.75rem auto
    &-content
        position: relative
        width: fit-content
        width: 1320px
        background-color: var(--color-background-default)
        border-radius: 20px
        padding: 40px
        @media (max-width: 576px)
            padding: 10px
    &-header
        display: flex
        justify-content: flex-end
        align-items: center
.modal-back::before
    display: block
    content: ''
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    background: linear-gradient(0deg, rgba(28, 91, 147, 0.5), rgba(28, 91, 147, 0.5))
    z-index: 50
.close
    display: block
    position: absolute
    top: 2.8rem
    width: 20px
    height: 20px
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVR4nO3ZTQqDMBAF4HeKPOkV2+MWbE9jKXUhRcQk8xeZt3Il8xFNZgiQyWQyV8odwORdBH41fGtpygPAAmB2xkxrDctaU3UKgOf6gjeAG+zDTQ2vnho8MZRCeGIojfDAUAthiaE2wgJjhtDEmCM0MG4ISYw7QgITBtGDCYdowYRF1GDCI85ghkEcYYZD7M0Q899zhEGteWWGW4lttp+T53DWlUt8Wtz5sSOMzVU52p2GwfDEFhsew4pzIiyGDYddOAw7TuwwGAq0He4YCvZObhgqNIDmGCp2sWYYi1a8aGMs54mihfEYioo0xnOyK1KYCONpkcBc5urtMpehmUwmg3D5AAklyc9YEtl/AAAAAElFTkSuQmCC') no-repeat 0 0
    background-size: contain
    cursor: pointer
    line-height: 20px
    z-index: 4
</style>
