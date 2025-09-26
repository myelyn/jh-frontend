'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

interface OnlineProps {
  onlineCount: number
}

export default function Online({ onlineCount }: OnlineProps) {
  const { logout } = useAuth()

  return (
    <div className="flex w-[200px] m-0 bg-[url('/images/backgrounds/online-bg-repeat.png')] bg-repeat">
      <div className="flex flex-col flex-1 relative gap-1 p-1.5">
        <div className="absolute z-[2] w-7 top-0 left-[-18px]">
          <div className="absolute z-[3] w-7 h-[100%] bg-[url('/images/backgrounds/current-room-bg-top.png')] bg-no-repeat bg-top"></div>
          <div className="absolute z-[3] w-7 top-10 bottom-10 bg-[url('/images/backgrounds/current-room-bg-repeat.png')] bg-repeat-y bg-left"></div>
          <div className="absolute z-[3] w-7 h-[100%] bg-[url('/images/backgrounds/current-room-bg-bottom.png')] bg-no-repeat bg-bottom"></div>
          <div className="relative z-[4] w-7 px-2 py-5 leading-[18px] color-light text-sm font-bold">栖云城</div>
        </div>
        <div className="h-[30px] leading-[30px] px-1">
          <Input variant="lightoutlined" placeholder="搜索在线玩家" fullWidth circle />
        </div>
        <div className="flex flex-col flex-1 gap-2 overflow-y-auto overflow-x-hidden shadow-box-md rounded-sm">
          <div className="h-10 color-dark font-bold px-2 leading-10 border-b-1 border-light">当前在线: 300</div>
          <div className="flex flex-col flex-1 min-h-0 px-2 overflow-y-auto overflow-x-hidden">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="flex h-[50px] items-center justify-center">
                <div className="flex items-center justify-center w-[40px] h-[60px]">
                  <Image src="/images/avatars/online-avatar.png" alt="avatar" width={40} height={40} className="rounded-full" />
                </div>
                <div className="flex flex-col flex-1 p-1 gap-0.5">
                  <div className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                    <div className="no-wrap">月下无限连</div>
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

        <div className="h-[160px] rounded-sm  bg-[url('/images/backgrounds/online-bg.png')] bg-no-repeat bg-bottom">
          <Button onClick={logout}>退出</Button>
        </div>
      </div>
    </div>
  )
}
