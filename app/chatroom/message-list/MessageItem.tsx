'use client';

import { Message } from '../types';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div>
      消息
    </div>
  );
}
