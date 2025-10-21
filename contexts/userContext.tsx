'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { alert } from '@/components/alert'
import { User, userApi } from '@/services/userApi'

interface UserContext {
  user: User | null
  setUser: (user: User) => void
  login: (data: { username: string; password: string }) => Promise<void>
  logout: () => void
  loading: boolean
  getUserInfo: () => Promise<void>
  isAuthenticated: boolean
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
  loading: false,
  getUserInfo: async () => {},
  isAuthenticated: false,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const login = async (data: { username: string; password: string }) => {
    if (!data.username || !data.password) {
      alert.error('请输入用户名和密码', '输入不完整', 2000, 'top')
      return
    }

    try {
      setLoading(true)
      const res = await userApi.LOGIN(data)

      if (res?.token) {
        localStorage.setItem('token', res.token)
        setUser(res.user)
        alert.success(`${res.user.username}，欢迎回来`, '欢迎回来', 2000, 'top')
      }
      setIsAuthenticated(true)
      router.push('/chatroom')
    } catch (error) {
      alert.error(error instanceof Error ? error.message : '未知错误', '登录失败', 2000, 'top')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      console.error('退出失败:', error)
    }
  }

  const getUserInfo = useCallback(async () => {
    try {
      const res = await userApi.USERINFO()
      setUser(res)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      alert.error(error instanceof Error ? error.message : '请重新登录', '获取用户信息失败', 2000, 'top')
    }
  }, [])

  const contextValue: UserContext = {
    user,
    setUser,
    login,
    logout,
    loading,
    getUserInfo,
    isAuthenticated,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
