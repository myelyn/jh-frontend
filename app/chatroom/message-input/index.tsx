'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import HotkeyManager from '../hotkeys/HotkeyManager';
import HotkeyTrigger from '../hotkeys/HotkeyTrigger';
import { HotkeyRecord } from '../types';

export default function BottomInput() {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotkeyRecords, setHotkeyRecords] = useState<HotkeyRecord[]>([]);

  const handleHotkeyUpdate = () => {
    const records = localStorage.getItem('hotkeyRecords')
    if (records) {
      setHotkeyRecords(JSON.parse(records))
    }
  }

  useEffect(() => {
    handleHotkeyUpdate()
  }, [])

  return (
    <div className="h-[150px] py-4 px-5 bg-[#ededed] border-t-2 border-[#efefef] bg-[#ededed] text-gray-700">
      <input
        type="text"
        placeholder="输入16*8"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <button>
        发送
      </button>
      
      <HotkeyTrigger hotkeyRecords={hotkeyRecords} />

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        打开弹窗
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="快捷键设置"
      >
        <HotkeyManager onUpdate={() => {
          handleHotkeyUpdate()
        }}/>
      </Modal>
    </div>
  );
}
