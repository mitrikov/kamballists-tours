import { ref } from 'vue'
import { defineStore } from 'pinia'
import {server} from "@/helpers";

export const useUserStore = defineStore('user', () => {
  const user_id = ref(0)
  const likes = ref([])

  const init = async () => {
    let user_id: string | null = localStorage.getItem("user")
    if(user_id == null){
      user_id = await server.get('new-user')
      localStorage.setItem('user', user_id)
    }
    console.log(`user: ${user_id}`)
    return user_id
  }

  const getListLikes = async () => {
    const asdasd = user_id
    const likes = await server.get('user/likes', {
      user_id: user_id.value
    })
    return likes
  }

  const like = async(user_id, event) => {
    console.log(user_id)
    console.log(event)
    await server.get(`like`, {
      user_id: user_id,
      event_id: event._id,
    })
  }

  return { user_id, likes, init, getListLikes, like }
})
