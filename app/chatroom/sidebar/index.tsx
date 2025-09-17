'use client';

import { User } from '../types';

interface SidebarProps {
  onlineCount: number;
  currentUser?: User;
}

export default function Sidebar({ onlineCount, currentUser }: SidebarProps) {
  return (
    <div className="w-[200px] m-0 p-1.5 text-gray-700 overflow-y-auto overflow-x-hidden relative bg-[rgba(230,230,230,0.6)]">
        在线名单
    </div>
  );
}
