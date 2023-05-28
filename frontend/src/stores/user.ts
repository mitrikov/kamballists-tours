import { ref } from 'vue'
import { defineStore } from 'pinia'
import {server} from "@/helpers";

export const useUserStore = defineStore('user', () => {
  const user_id = ref(0)

  const init = async () => {
    let user = localStorage.getItem("user")

    if(user == null){
      user = await server.get('new-user')
      console.log(user)
      localStorage.setItem('user', user)
    }

    return user
  }

  return { init, user_id }
})
