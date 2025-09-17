'use client';

import { useState, useEffect } from 'react';
import Header from './header/index';
import MessageList from './message-list/index';
import MessageInput from './message-input/index';
import Sidebar from './sidebar/index';
import BoxBg from './components/BoxBg';

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
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#2b2d2c] to-[#707571] text-gray-700">
      <Header
        navigationItems={navigationItems}
        onTabClick={handleTabClick}
      />
      
      <div className="relative flex flex-1 overflow-hidden m-2.5 bg-[url('/images/backgrounds/chatroom-bg-f.png')] bg-cover bg-bottom bg-right bg-no-repeat border-2 border-[#adb0a9]">
        <BoxBg/>
        <div className="flex flex-col flex-1">
          <MessageList
            messages={[]}
          />
          <MessageInput/>
        </div>
        <Sidebar
          onlineCount={onlineCount}
        />
      </div>
    </div>
  );
}
