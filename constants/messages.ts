// 系统提示信息常量
export const MESSAGES = {
  // 认证相关
  AUTH: {
    NOT_LOGGED_IN: '您还没有登录，不能进入聊天室',
    LOGIN_FIRST: '请先登录',
    AUTH_FAILED: '认证失败，请重新登录',
  },

  // 房间相关
  ROOM: {
    SWITCH_FAILED: '切换房间失败',
    JOIN_FAILED: '加入房间失败',
    LEAVE_FAILED: '离开房间失败',
  },

  // 消息相关
  MESSAGE: {
    SEND_FAILED: '发送消息失败',
    RECEIVE_FAILED: '接收消息失败',
  },

  // 连接相关
  CONNECTION: {
    CONNECTING: '正在连接...',
    CONNECTED: '连接成功',
    DISCONNECTED: '连接断开',
    RECONNECTING: '正在重连...',
    CONNECTION_ERROR: '连接错误',
  },

  // 用户相关
  USER: {
    JOINED_ROOM: '用户加入房间',
    LEFT_ROOM: '用户离开房间',
    LOGGED_IN: '用户登录',
    LOGGED_OUT: '用户登出',
  },

  // 通用错误
  ERROR: {
    UNKNOWN: '未知错误',
    NETWORK_ERROR: '网络错误',
    SERVER_ERROR: '服务器错误',
    TIMEOUT: '请求超时',
  },
} as const

// 提示持续时间常量
export const ALERT_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const

// 提示位置常量
export const ALERT_POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom',
  CENTER: 'center',
} as const
