import { request } from './api'
import { API_ROUTES } from '@/constants/api-routes'

export interface User {
  id: number
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
  current_room_id: number
}

export interface LoginResponse {
  token: string
  user: User
}

export const userApi = {
  LOGIN: (data: { username: string; password: string }) => request<LoginResponse>('post', API_ROUTES.LOGIN, data),
  LOGOUT: () => request('post', API_ROUTES.LOGOUT),
  USERINFO: () => request<User>('get', API_ROUTES.USERINFO),
}
