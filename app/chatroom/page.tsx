'use client';

import { useState } from 'react';
import Header from './header/index';
import MessageList from './message-list/index';
import MessageInput from './message-input/index';
import Online from './online/index';

export default function Chatroom() {
  const [navigationItems] = useState([
    { id: 'announcement', label: '公告', href: '/announcement', isActive: false },
    { id: 'mall', label: '商城', href: '/mall', isActive: true },
    { id: 'help', label: '帮助', href: '/help', isActive: false },
    { id: 'forum', label: '论坛', href: '/forum', isActive: false },
  ]);


  const [onlineCount] = useState(80);

  const handleTabClick = (item) => {
    console.log('顶部导航栏:', item.label);
  }

  return (
    <div className="flex flex-col h-screen p-2 text-gray-700 bg-[url('/images/backgrounds/chatroom-bg2.png')] bg-cover">
      <Header
        navigationItems={navigationItems}
        onTabClick={handleTabClick}
      />
      
      <div className="relative flex flex-1 overflow-hidden gap-1.5">
        <div className="flex flex-col flex-1 gap-1.5 rounded-sm">
          <MessageList
            messages={[]}
          />
          <MessageInput/>
        </div>
        <Online
          onlineCount={onlineCount}
        />
      </div>
    </div>
  );
}
