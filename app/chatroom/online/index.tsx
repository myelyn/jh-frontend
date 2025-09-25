'use client';

import { Button } from '@/components/button';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

interface OnlineProps {
  onlineCount: number;
}

export default function Online({ onlineCount }: OnlineProps) {

  const { logout } = useAuth();

  return (
    <div className="flex w-[200px] m-0 p-0.5 rounded-sm bg-gradient-to-b from-[#e6dfc5] to-[#f3eddd]  shadow-md">
      <div className="flex flex-col flex-1 gap-1 rounded-sm border-1 border-[#e3d3b7]">
        <div className="h-[28px] bg-[url('/images/backgrounds/online-header-bg.png')] bg-contain no-repeat rounded-md leading-[26px] text-white text-center font-bold text-sm">
          栖云城 300人
        </div>
        <div className="flex flex-col flex-1 gap-2 p-1 overflow-y-auto overflow-x-hidden rounded-md ">
          <div className="flex flex-col flex-1 min-h-0 p-1 overflow-y-auto overflow-x-hidden bg-[#f1ead8] rounded-md border-1 border-[#e6e0ce]">
            {
              Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="flex h-[60px] items-center justify-center border-b-1 border-[#ebe3d1]">
                  <div className="flex items-center justify-center w-[40px] h-[60px]">
                    <Image 
                      src="/images/avatars/online-avatar.png" 
                      alt="avatar" 
                      width={40}
                      height={40}
                      className="rounded-[50%]" 
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-1 gap-0.5">
                    <div className="inline-flex items-center gap-1 text-sm font-bold text-[#786650]">
                      <div className="no-wrap">月下无限连</div>
                      <div className="h-[12px] bg-[#f3e2ab] text-[10px] text-[#715d15]">VIP6</div>
                    </div>
                    <div className="inline-flex gap-2 text-xs text-gray-500">
                      <div className="px-1 bg-[#eee4d0] rounded-sm text-xs text-[#a7957a] no-wrap">天上人间</div>
                      <div className="text-xs text-gray-500">掌门</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="h-[200px] bg-[#f6eee2] border-1 border-[#e2daca] rounded-sm shadow-md">
            <Button onClick={logout}>退出</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
