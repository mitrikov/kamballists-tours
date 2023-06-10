import axios from "axios";
import {Cuisines, Interests, TravelerType, TravelerWealth} from "@/interfaces";
import type {Ref} from "vue";
import {ref} from "vue";

export class Server {
    private static url : string | undefined = import.meta.env.VITE_BACKEND_URL

    constructor() {}

    public async get(endpoint : string, params? : object) {
        let paramsString;
        if(!params || Object.keys(params).length === 0) {
            paramsString = '';
        } else {
            const paramsArray = []
            for (const [key, value] of Object.entries(params)) {
                paramsArray.push(encodeURI(`${key}=${value}`))
            }
            paramsString = `?${paramsArray.join('&')}`
        }

        try {
            const response = await axios.get(`${Server.url}/api/${endpoint}${paramsString}`)
            return response.data
        } catch(error : any) {
            if (axios.isAxiosError(error))  {
                console.error(error.response?.data)
                return error.response?.data
            } else {
                console.error(error)
                return undefined
            }
            return undefined
        }
    }
}
export const server = new Server()

export class Answer {
    public traveler_type: TravelerType | null
    public traveler_wealth: TravelerWealth | null
    public interests: Array<Interests>
    public cuisines: Array<Cuisines>
    public city: any = null
    public fromDate: Ref<Date | undefined> = null
    public byDate: Ref<Date | undefined> = null

    constructor() {
        this.traveler_type = null
        this.traveler_wealth = null
        this.interests = []
        this.cuisines = []
        this.city = []
        this.fromDate = ref(new Date())
    }
}

