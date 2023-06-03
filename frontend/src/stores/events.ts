import {defineStore} from "pinia"
import {type Ref, ref} from "vue";
import {server} from "@/helpers";

const useEventsStore = defineStore('events', () => {
    const eventsPag : Ref<Array<{  }>> = ref([])
    const events : Ref<Array<{  }>> = ref([])
    const recommendedEvents : Ref<Array<{  }>> = ref([])

    const fetchEvents = async () : Promise<Array<{  }>>  => {
        const result = await server.get("events")
        return result
    }

    const fetchByEventId = async(id : number) : Promise<Array<{  }>> =>  {
        const result = await server.get(`events/?activity_id=${id}`)
        return result
    }

    return {
        eventsPag,
        events,
        recommendedEvents,
        fetchEvents,
        fetchByEventId,
    }
})

export default useEventsStore
