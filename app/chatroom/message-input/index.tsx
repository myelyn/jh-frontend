'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/modal'
import HotkeyManager from '../hotkeys/HotkeyManager'
import HotkeyTrigger from '../hotkeys/HotkeyTrigger'
import { HotkeyRecord } from '../types'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import Bg from './bg'

export default function BottomInput() {
  const [inputValue, setInputValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hotkeyRecords, setHotkeyRecords] = useState<HotkeyRecord[]>([])
  const [isHotkeyEnabled, setIsHotkeyEnabled] = useState<boolean>(true)

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
    <>
      <HotkeyTrigger hotkeyRecords={hotkeyRecords} onSendValue={setInputValue} isEnabled={isHotkeyEnabled} />
      <div
        className={`flex flex-col relative w-full justify-center items-center p-0.5 gap-2 bg-[url('/images/backgrounds/message-bg-left.png')] bg-no-repeat bg-contain bg-position-bottom`}
      >
        <div className="flex h-10 w-full gap-1 justify-center items-center">
          <div className="w-[50%] flex justify-center items-center">
            <Input
              size="medium"
              variant="lightoutlined"
              placeholder="输入发言内容"
              fullWidth
              circle
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>

          <Button onClick={() => {}} variant="danger" size="medium" circle>
            发送
          </Button>
        </div>

        <div className="flex h-10 w-full gap-1 justify-center items-center">
          <Button onClick={() => setIsModalOpen(true)}>打开弹窗</Button>
          <Button onClick={() => setIsHotkeyEnabled(!isHotkeyEnabled)} variant={isHotkeyEnabled ? 'danger' : 'default'}>
            {isHotkeyEnabled ? '禁用热键' : '启用热键'}
          </Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="快捷键设置">
          <HotkeyManager
            onUpdate={() => {
              handleHotkeyUpdate()
            }}
          />
        </Modal>
      </div>
    </>
  )
}
