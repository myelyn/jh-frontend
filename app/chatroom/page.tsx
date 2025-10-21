'use client'

import Header from './header/index'
import MessageList from './message-list/index'
import MessageInput from './message-input/index'
import Online from './online/index'
import { ChatroomProvider } from '@/contexts/chatroomContext'

export default function Chatroom() {
  return (
    <ChatroomProvider>
      <div className="relative flex flex-col w-full h-screen overflow-hidden bg-[url('/images/backgrounds/chatroom-bg.png')] bg-cover">
        <div className="flex h-[50px] border-b-1 border-[rgba(255,255,255,0.4)]">
          <Header />
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 gap-2 pt-1.5 pl-1.5 pr-1.5 ">
            <MessageList />
            <MessageInput />
          </div>
          <Online />
        </div>
      </div>
    </ChatroomProvider>
  )
}
