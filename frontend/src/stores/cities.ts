import {defineStore} from "pinia"
import {type Ref, ref} from "vue";
import {server} from "@/helpers";

const useCitiesStore = defineStore('cities', () => {
    const cities : Ref<Array<{}>> = ref([])

    const getCities = () : Array<String> => {
        return cities.value.data.map(item => {
            return item.dictionary_data.title as String
        })
    }

    const fetchEvents = async () : Promise<Array<{  }>>  => {
        const result = await server.get("cities")
        return result
    }

    const fetchByEventId = async(id : number) : Promise<Array<{  }>> =>  {
        const result = await server.get(`cities/?activity_id=${id}`)
        return result
    }

    return {
        cities,
        getCities,
        fetchEvents,
        fetchByEventId,
    }
})

export default useCitiesStore
