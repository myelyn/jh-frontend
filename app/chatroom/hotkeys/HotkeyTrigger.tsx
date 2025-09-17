import { useEffect, useState } from 'react';
import hotkeys from 'hotkeys-js';
import { HotkeyRecord } from '../types';

interface HotkeyTriggerProps {
  hotkeyRecords: HotkeyRecord[];
  onUpdate?: () => void;
}

export default function HotkeyTrigger({ hotkeyRecords, onUpdate }: HotkeyTriggerProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (!isEnabled) return;

    // 注册所有热键
    hotkeyRecords.forEach((record) => {
      const hotkey = record.hotkey.toLowerCase();
      
      hotkeys(hotkey, (event) => {
        event.preventDefault();
        
        // 执行连招
        executeCombo(record);
      });
    });

    // 清理函数
    return () => {
      hotkeyRecords.forEach((record) => {
        hotkeys.unbind(record.hotkey.toLowerCase());
      });
    };
  }, [hotkeyRecords, isEnabled]);

  const executeCombo = async (record: HotkeyRecord) => {
    const { contentList, sendDelay } = record;
    
    for (let i = 0; i < contentList.length; i++) {
      // 发送命令到聊天框
      sendToChat(contentList[i]);
      
      // 如果不是最后一个命令，等待指定时间
      if (i < contentList.length - 1 && sendDelay) {
        await new Promise(resolve => setTimeout(resolve, parseInt(sendDelay)));
      }
    }
  };

  const sendToChat = (message: string) => {
     
  }

  const toggleHotkeys = () => {
    if (isEnabled) {
      // 禁用所有热键
      hotkeyRecords.forEach((record) => {
        hotkeys.unbind(record.hotkey.toLowerCase());
      });
    } else {
      // 重新注册热键
      hotkeyRecords.forEach((record) => {
        const hotkey = record.hotkey.toLowerCase();
        hotkeys(hotkey, (event) => {
          event.preventDefault();
          executeCombo(record);
        });
      });
    }
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">热键触发器</h3>
        <button
          onClick={toggleHotkeys}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isEnabled
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isEnabled ? '禁用热键' : '启用热键'}
        </button>
      </div>
      
      <div className="space-y-2">
        {hotkeyRecords.map((record) => (
          <div key={record.id} className="p-3 bg-gray-100 rounded-md">
            <div className="font-medium text-gray-800">{record.hotkey}</div>
            <div className="text-sm text-gray-600">
              {record.contentList.join(' → ')}
            </div>
            {record.sendDelay && (
              <div className="text-xs text-gray-500">
                间隔: {record.sendDelay}ms
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}