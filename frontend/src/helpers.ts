import axios from "axios";
import {Cuisines, Interests, TravelerType, TravelerWealth} from "@/interfaces";

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
            const response = await axios.get(`${Server.url}/backend/api/${endpoint}${paramsString}?page=1`)
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

export class Antworten {
    private traveler_type: TravelerType
    private traveler_wealth: TravelerWealth
    private interests: Array<Interests>
    private cuisines: Array<Cuisines>
}
