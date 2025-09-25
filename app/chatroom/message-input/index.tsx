'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/modal';
import HotkeyManager from '../hotkeys/HotkeyManager';
import HotkeyTrigger from '../hotkeys/HotkeyTrigger';
import { HotkeyRecord } from '../types';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import Bg from './bg';

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
    <div className="flex flex-col relative w-full h-[130px] justify-center items-center p-0.5 gap-2 bg-[url('/images/backgrounds/message-input-bg2.png')] bg-repeat bg-contain border-2 border-[#9f8e6e] shadow-md rounded-sm">
      <Bg/>
      <div className="flex h-10 w-full gap-1 justify-center items-center">
        <div className="w-[50%] flex justify-center items-center">
        <Input
          type="text"
          size="medium"
          placeholder="输入发言内容"
          className={'bg-[rgba(255,255,255,0.2)] rounded-[16px]'}
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        </div>
      
        <Button onClick={() => {}} variant="primary" className="rounded-[16px]">
          发送
        </Button>
      </div>
      
      {/* <HotkeyTrigger hotkeyRecords={hotkeyRecords} /> */}

      <div className="flex h-10 w-full gap-1 justify-center items-center">
        <Button onClick={() => setIsModalOpen(true)}>
          打开弹窗
        </Button>
      </div>

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
