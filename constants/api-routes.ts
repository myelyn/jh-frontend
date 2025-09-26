// 路由常量定义
export const API_ROUTES = {
  // 认证相关
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  FORGOT_PASSWORD: '/user/forgot-password',

  // 门派相关
  SECT_LIST: '/sect/list',

  // 房间相关
  ROOM_LIST: '/room/list',
  ROOM_CREATE: '/room/create',
  ROOM_UPDATE: '/room/update',
  ROOM_DELETE: '/room/delete',
} as const
