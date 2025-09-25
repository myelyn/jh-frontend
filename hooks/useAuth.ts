import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAlert } from '@/components/alert'
import { API_ROUTES } from '@/constants/api-routes'
import { request } from '@/services/api'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const { showAlert } = useAlert()
  const router = useRouter()

  const login = async (data: { username: string; password: string }) => {
    if (!data.username || !data.password) {
      showAlert({
        type: 'error',
        title: '输入不完整',
        message: '请输入用户名和密码',
        duration: 2000,
        position: 'top',
      })
      return
    }

    try {
      setLoading(true)
      const res = await request<{ token: string }>('post', API_ROUTES.LOGIN, data)

      showAlert({
        type: 'success',
        title: '欢迎回来',
        message: '侠客，欢迎回来',
        duration: 2000,
        position: 'top',
      })

      console.log(res)
      if (res?.token) {
        localStorage.setItem('token', res.token)
      }

      router.push('/chatroom')
    } catch (error) {
      showAlert({
        type: 'error',
        title: '登录失败',
        message: error instanceof Error ? error.message : '未知错误',
        duration: 2000,
        position: 'top',
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      // await authApi.logout()
      localStorage.removeItem('token')
      router.push('/')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  return {
    login,
    logout,
    loading,
  }
}
