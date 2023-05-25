import axios from "axios"
import {defineStore} from "pinia"
import story from "@/components/questionnaire/history.ts"
import {ref} from "vue";

const useHistoryStore = defineStore('history', {
    state : () => ({
        stage: ref(story),
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

        nextStep(){
            if(this.stage.getPaths()[0])
                this.stage = this.stage.getPaths()[0]
        },
    }
})

export default useHistoryStore
