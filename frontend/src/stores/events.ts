import {defineStore} from "pinia"
import {type Ref, ref} from "vue";
import {server} from "@/helpers";

const useEventsStore = defineStore('events', () => {
    const events : Ref<Array<{  }>> = ref([])

    const fetchEvents = async () : Promise<Array<{  }>>  => {
        const result = await server.get("events")
        return result
    }

    const fetchByEventId = async(id : number) : Promise<Array<{  }>> =>  {
        const result = await server.get(`events/?activity_id=${id}`)
        return result
    }

    return {
        events,
        fetchEvents,
        fetchByEventId,
    }
})

export default useEventsStore
