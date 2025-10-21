'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import Image from 'next/image'
import { useUser } from '@/contexts/userContext'
import { useChatroom } from '@/contexts/chatroomContext'

export default function Online() {
  const { logout } = useUser()
  const { exitChatRoom, onlineUsers } = useChatroom()

  return (
    <div className="flex w-[220px] p-[3px] bg-[#e8e3d6]">
      <div className="flex flex-col flex-1 relative gap-1 p-2 border-1 border-[rgba(206,197,179,0.5)]">
        <div className="absolute z-[2] right-[2px] top-[2px] w-6 h-6 bg-[url('/images/backgrounds/online-corner.png')] bg-cover rotate-90 opacity-70"></div>
        <div className="absolute z-[2] left-[2px] bottom-[2px] w-6 h-6 bg-[url('/images/backgrounds/online-corner.png')] bg-cover rotate-270 opacity-30"></div>
        <div className="h-[60px] leading-[30px]">
          <div className="h-10 color-primary font-bold px-2 leading-[30px]">当前在线: {onlineUsers.length}</div>
          <Input variant="noborder" className="bg-[#ddd1b9]" placeholder="搜索在线玩家" fullWidth circle />
        </div>
        <div className="flex flex-col flex-1 gap-2 overflow-y-auto overflow-x-hidden rounded-sm">
          <div className="flex flex-col flex-1 min-h-0 px-2 py-2 overflow-y-auto overflow-x-hidden">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex h-[50px] items-center justify-center">
                <div className="flex items-center justify-center w-[40px] h-[60px]">
                  <Image src="/images/backgrounds/online-avatar.png" alt="avatar" width={40} height={40} className="rounded-full" />
                </div>
                <div className="flex flex-col flex-1 p-1 gap-0.5">
                  <div className="inline-flex items-center gap-1 text-sm font-bold">
                    <div className="no-wrap color-dark">{user.username}</div>
                    <div className="h-[12px] text-[10px] color-bronze">VIP6</div>
                  </div>
                  <div className="inline-flex gap-2 text-xs">
                    <div className="text-xs color-tertiary no-wrap">天上人间</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[160px] rounded-sm">
          <Button
            onClick={() => {
              exitChatRoom()
              logout()
            }}
          >
            退出
          </Button>
        </div>
      </div>
    </div>
  )
}
