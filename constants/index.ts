// 导出所有常量
export * from './messages'

// API 相关常量
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3021',
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3021/chat',
  TIMEOUT: 10000,
} as const

// 应用配置常量
export const APP_CONFIG = {
  NAME: '江湖游戏',
  VERSION: '1.0.0',
  DESCRIPTION: '一个多人在线聊天游戏',
} as const

// 存储键名常量
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  CURRENT_ROOM: 'currentRoom',
} as const

// Socket 事件名常量
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  USER_JOINED: 'userJoined',
  USER_LOGIN: 'userLogin',
  JOIN_ROOM: 'joinRoom',
  SEND_MESSAGE: 'sendMessage',
  EXIT: 'exit',
} as const
