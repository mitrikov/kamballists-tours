import axios from "axios"
import {defineStore} from "pinia"
import story, {Story} from "@/components/questionnaire/history.ts"
import {Ref, ref} from "vue";
import {Answer} from "@/helpers";

const useHistoryStore = defineStore('history', {
    state : () => ({
        stage: ref(story),
        answer: ref(new Answer()),
        nextStep: null as Story | null,
    }),

    getters: {
        getHistory(store){
            return () => {
                return store.stage
            }
        },
    },

    actions: {
        selectParent(){
            if(this.stage.getParent())
                this.stage = this.stage.getParent()
        },

        next(){
            if(this.nextStep)
                this.stage = this.nextStep
            this.nextStep = null
        },
    }
})

export default useHistoryStore
