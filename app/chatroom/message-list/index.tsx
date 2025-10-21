'use client'

import { useChatroom } from '@/contexts/chatroomContext'
import { useUser } from '@/contexts/userContext'
import Image from 'next/image'
import BoxBg from './bg'

export default function MessageArea() {
  const { roomList, switchRoom, otherMessages, myMessages } = useChatroom()
  const { user } = useUser()
  return (
    <div className="flex flex-col flex-1 relative p-0.5 bg-[#f5f2ec]">
      <BoxBg />
      {/* 上半屏 */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          {otherMessages.map((message, index) => {
            const uniqueKey = message.id || `other-${index}-${Date.now()}`
            return <div key={uniqueKey}>{message.content}</div>
          })}
        </div>
      </div>
      {/* 房间列表 */}
      <div className="flex h-10 p-2 border-t-1 border-b-1 border-light gap-2 overflow-x-auto">
        {roomList.map(room => (
          <div key={room.id} onClick={() => switchRoom(room.id)} className="flex flex-shrink-0 items-center gap-0.5 cursor-pointer">
            <Image src={`/images/icon/room-${room.id}.png`} alt={room.name} width={24} height={24} />
            <span className="text-[13px] text-primary whitespace-nowrap">{room.name}</span>
          </div>
        ))}
      </div>
      {/* 下半屏 */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          {myMessages.map((message, index) => {
            const uniqueKey = message.id || `my-${index}-${Date.now()}`
            return <div key={uniqueKey}>{message.content}</div>
          })}
        </div>
      </div>
    </div>
  )
}
