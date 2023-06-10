import { ref } from 'vue'
import { defineStore } from 'pinia'
import {server} from "@/helpers";

export const useUserStore = defineStore('user', () => {
  const user_id = ref(0)
  let likes = ref([])
  let transactions = ref([])

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
    const likes = await server.get('user/likes', {
      user_id: user_id.value
    })
    return likes
  }

  const getListTransactions = async () => {
    const transactions = await server.get('user/transactions', {
      user_id: user_id.value
    })
    return transactions
  }

  const like = async(user_id, event) => {
    await server.get(`like`, {
      user_id: user_id,
      event_id: event._id,
    })
  }

  const buy = async(user_id, event) => {
    await server.get(`buy`, {
      user_id: user_id,
      event_id: event._id,
    })
  }

  const checkForExistenceLikes = (id) => {
    // @ts-ignore
    return likes.value.events.find(e => id === e)
  }

  const checkForExistenceTransactions = (id) => {
    // @ts-ignore
    return transactions.value.find(e => id === e)
  }

  return { user_id, likes, transactions, init, getListLikes, getListTransactions, like, buy, checkForExistenceLikes, checkForExistenceTransactions }
})
