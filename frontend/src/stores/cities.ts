import {defineStore} from "pinia"
import {type Ref, ref} from "vue";
import {server} from "@/helpers";

const useCitiesStore = defineStore('cities', () => {
    const cities : Ref<Array<{}>> = ref([])

    const getCities = () : Array<String> => {
        return cities.value.map(item => {
            return item.dictionary_data.title as String
        })
    }

    const fetchEvents = async () : Promise<Array<{  }>>  => {
        const result = await server.get("cities")
        return result
    }

    const getObject = (cityName) => {
        return cities.value.find(city => {
            return city.dictionary_data.title == cityName
        })
    }

    const fetchByEventId = async(id : number) : Promise<Array<{  }>> =>  {
        const result = await server.get(`cities/?activity_id=${id}`)
        return result
    }

    return {
        cities,
        getCities,
        fetchEvents,
        getObject,
        fetchByEventId,
    }
})

export default useCitiesStore
