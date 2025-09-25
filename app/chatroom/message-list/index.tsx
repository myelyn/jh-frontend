'use client';

import Bg from './bg';

export default function MessageArea() {
  return (
    <div className="flex flex-col flex-1 relative shadow-md border-1 border-[#9f8e6e]">
      <Bg/>
      <div className="flex flex-col flex-1 h-full bg-[#f2f2f2] rounded-sm border-1 border-[#ebe3d0]">
        <div className="flex flex-col flex-1 bg-[#f2f2f2] rounded-sm border-1 border-[#ebe3d0]">
          上半屏
        </div>
        <div className="flex h-10 bg-[#f2f2f2] p-2 border-t-1 border-b-1 border-[#ebe3d0]">
          房间列表
        </div>
        <div className="flex flex-col flex-1 bg-[#f2f2f2] rounded-sm border-1 border-[#ebe3d0]">
          下半屏
        </div>
      </div>
    </div>
  );
}
