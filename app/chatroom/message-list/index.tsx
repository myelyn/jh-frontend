'use client'

import { Room, roomApi } from '@/services/roomApi'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function MessageArea() {
  const [roomList, setRoomList] = useState<Room[]>([])
  useEffect(() => {
    roomApi.getRoomList().then(data => {
      setRoomList(data)
    })
  }, [])
  return (
    <div className="flex flex-col flex-1 relative p-0.5 bg-light rounded-sm shadow-box-md">
      <div className="flex flex-col flex-1">上半屏</div>
      <div className="flex h-10 p-2 border-t-1 border-b-1 border-light gap-2 overflow-x-auto">
        {roomList.map(room => (
          <div key={room.id} className="flex flex-shrink-0 items-center gap-0.5 cursor-pointer">
            <Image src={`/images/icon/room-${room.id}.png`} alt={room.name} width={24} height={24} />
            <span className="text-[13px] text-primary whitespace-nowrap">{room.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1">下半屏</div>
    </div>
  )
}
