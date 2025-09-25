import axios from 'axios'
import { AxiosError } from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // localStorage.removeItem('token')
      console.log('Token 失效，已清除本地存储')
    }
    return Promise.reject(error)
  }
)

export const request = async <T = unknown>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: unknown): Promise<T> => {
  try {
    const res = await api[method](url, data as Record<string, unknown>)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message)
    }
    throw new Error('未知错误')
  }
}

export default api
