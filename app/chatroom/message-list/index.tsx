'use client';

import { Message } from '../types';

interface MessageAreaProps {
  messages: Message[]
}

export default function MessageArea({ messages }: MessageAreaProps) {
  return (
    <div className="flex flex-col flex-1 p-2.5 bg-[#f8f8f8]">
      消息内容
    </div>
  );
}
