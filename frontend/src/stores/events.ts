import {defineStore} from "pinia"
import {type Ref, ref} from "vue";
import {server} from "@/helpers";

const useEventsStore = defineStore('events', () => {
    const eventsPag : Ref<Array<{  }>> = ref([])
    const events : Ref<Array<{  }>> = ref([])

    const fetchEvents = async () : Promise<Array<{  }>>  => {
        const result = await server.get("events")
        return result
    }

    const fetchByEventId = async(id : number) : Promise<Array<{  }>> =>  {
        const result = await server.get(`events/?activity_id=${id}`)
        return result
    }

    const like = async(user_id, event) => {
        await server.get(`like`, {
            user_id: user_id,
            event_id: event._id,
        })
    }

    return {
        eventsPag,
        events,
        fetchEvents,
        fetchByEventId,
        like,
    }
})

export default useEventsStore
