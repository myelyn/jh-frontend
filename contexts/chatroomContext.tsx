'use client'
import { Room, roomApi } from '@/services'
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useUser } from './userContext'
import { alert } from '@/components/alert'
import { useRouter } from 'next/navigation'

interface SocketEventData {
  id?: string
  type: string
  content: string
  timestamp: number
  data?: object
  color?: string
  messageCategory: 'self' | 'others'
}

interface OnlineUser {
  id: number
  username: string
}

export interface ChatroomContextType {
  // socket相关
  isConnected: boolean
  // 房间相关
  roomList: Room[]
  setRoomList: (roomList: Room[]) => void
  currentRoom: Room | null
  setCurrentRoom: (currentRoom: Room | null) => void
  switchRoom: (roomId: number) => void

  // 消息相关
  otherMessages: SocketEventData[]
  setOtherMessages: (otherMessages: SocketEventData[]) => void
  myMessages: SocketEventData[]
  setMyMessages: (myMessages: SocketEventData[]) => void
  sendMessage: (message: { content: string }) => void
  exitChatRoom: () => void
  onlineUsers: OnlineUser[]
  setOnlineUsers: (onlineUsers: OnlineUser[]) => void
}

const ChatroomContext = createContext<ChatroomContextType | undefined>(undefined)

export const ChatroomProvider = ({ children }: { children: React.ReactNode }) => {
  // 使用全局用户信息
  const { isAuthenticated, getUserInfo, user: currentUser } = useUser()

  // 房间状态
  const [roomList, setRoomList] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])

  // 消息状态
  const [otherMessages, setOtherMessages] = useState<SocketEventData[]>([])
  const [myMessages, setMyMessages] = useState<SocketEventData[]>([])

  // socket状态
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && currentUser?.id) {
      if (socketRef.current && socketRef.current.connected) {
        console.log('Socket已连接，跳过重复连接')
        return
      }

      if (socketRef.current) {
        console.log('关闭现有连接')
        socketRef.current.close()
        socketRef.current = null
        setIsConnected(false)
      }

      const token = localStorage.getItem('token')

      if (!token) {
        alert.error('您还没有登录，不能进入聊天室', '请先登录', 2000, 'top')
        return
      }

      const newSocket = io('http://localhost:3021/chat', {
        query: {
          token: token,
        },
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 3000,
        reconnectionDelayMax: 10000,
        timeout: 20000,
        forceNew: false,
        autoConnect: true,
      })

      newSocket.on('connect', () => {
        console.log('Socket连接成功')
        setIsConnected(true)
      })

      newSocket.on('disconnect', reason => {
        console.log('Socket连接断开:', reason)
        setIsConnected(false)
      })

      newSocket.on('connect_error', error => {
        console.error('Socket连接错误:', error.message)
        setIsConnected(false)
        if (error.message.includes('登录') || error.message.includes('认证')) {
          router.push('/')
          console.error('认证失败，请重新登录')
        }
      })

      newSocket.on('error', error => {
        console.error('Socket错误:', error)
        setIsConnected(false)
      })

      // 监听消息
      newSocket.on('message', (data: SocketEventData) => {
        if (data.messageCategory === 'others') setOtherMessages(prev => [...prev, data])
        if (data.messageCategory === 'self') setMyMessages(prev => [...prev, data])
      })

      // 更新在线用户列表
      newSocket.on('onlineListUpdate', (data: { roomId: number; onlineUsers: OnlineUser[] }) => {
        setOnlineUsers([...data.onlineUsers])
      })

      socketRef.current = newSocket

      return () => {
        console.log('关闭Socket连接')
        if (socketRef.current) {
          socketRef.current.close()
          socketRef.current = null
        }
        setIsConnected(false)
      }
    }
  }, [isAuthenticated, currentUser?.id])

  // 切换房间
  const switchRoom = (roomId: number) => {
    const socket = socketRef.current
    try {
      socket?.emit('switchRoom', {
        roomId,
      })
    } catch (error) {
      alert.error(error instanceof Error ? error.message : '未知错误', '切换房间失败', 2000, 'top')
    }
  }

  const sendMessage = (message: { content: string }) => {
    const socket = socketRef.current
    try {
      socket?.emit('sendMessage', message)
    } catch (error) {
      alert.error(error instanceof Error ? error.message : '未知错误', '发送消息失败', 2000, 'top')
    }
  }

  const exitChatRoom = () => {
    socketRef.current?.emit('userExit')
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  useEffect(() => {
    roomApi.getRoomList().then(data => {
      setRoomList(data)
    })
  }, [isAuthenticated])

  return (
    <ChatroomContext.Provider
      value={{
        isConnected,
        roomList,
        setRoomList,
        currentRoom,
        setCurrentRoom,
        switchRoom,
        otherMessages,
        setOtherMessages,
        myMessages,
        setMyMessages,
        sendMessage,
        exitChatRoom,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </ChatroomContext.Provider>
  )
}

export const useChatroom = () => {
  const context = useContext(ChatroomContext)
  if (!context) {
    throw new Error('useChatroom must be used within a ChatroomProvider')
  }
  return context
}
