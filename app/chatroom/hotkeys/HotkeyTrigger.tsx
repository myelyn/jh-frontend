import { useCallback, useEffect, useState } from 'react';
import hotkeys from 'hotkeys-js';
import { HotkeyRecord } from '../types';

interface HotkeyTriggerProps {
  isEnabled: boolean;
  hotkeyRecords: HotkeyRecord[];
  onSendValue?: (value: string) => void;
}

export default function HotkeyTrigger({ hotkeyRecords, onSendValue, isEnabled }: HotkeyTriggerProps) {

  const sendToChat = useCallback((content: string) => {
    onSendValue?.(content)
  }, [onSendValue])

  const executeCombo = useCallback(async (record: HotkeyRecord) => {
    const { contentList, sendDelay } = record;
    console.log(contentList, sendDelay)
    for (let i = 0; i < contentList.length; i++) {
      // 发送命令到聊天框
      sendToChat(contentList[i]);
      
      // 如果不是最后一个命令，等待指定时间
      if (i < contentList.length - 1 && sendDelay) {
        await new Promise(resolve => setTimeout(resolve, parseInt(sendDelay)))
        sendToChat(contentList[i + 1])
      }
    }
}, [sendToChat])

  useEffect(() => {
    if (!isEnabled) {
      // 禁用时立即清理所有热键
      hotkeyRecords?.forEach((record) => {
        hotkeys.unbind(record.hotkey.toLowerCase());
      });
      return;
    }
  
    if (!hotkeyRecords || hotkeyRecords.length === 0) return;
  
    // 注册所有热键
    hotkeyRecords.forEach((record) => {
      const hotkey = record.hotkey.toLowerCase();
      
      hotkeys(hotkey, (event) => {
        event.preventDefault()
        executeCombo(record);
      });
    });

    // 清理函数
    return () => {
      hotkeyRecords.forEach((record) => {
        hotkeys.unbind(record.hotkey.toLowerCase());
      });
    }
  }, [hotkeyRecords, isEnabled, executeCombo]);

  return (
    <div className="flex gap-1 justify-center items-center">
        {isEnabled && hotkeyRecords.map((record) => (
          <div key={record.id} onClick={() => executeCombo(record)} className="relative w-10 h-10 rounded-md border-1 border-gray-300 cursor-pointer">
            <div className="absolute top-0 left-0 font-medium text-gray-800">{record.hotkey}</div>
            <div className="text-sm text-gray-600">
              {record.contentList.join(' → ')}
            </div>
          </div>
        ))}
    </div>
  );
}