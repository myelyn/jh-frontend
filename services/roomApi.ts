import { request } from './api'
import { API_ROUTES } from '@/constants/api-routes'

export interface Room {
  id: number
  name: string
  description: string
}

export const roomApi = {
  getRoomList: () => request<Room[]>('get', API_ROUTES.ROOM_LIST),
}
