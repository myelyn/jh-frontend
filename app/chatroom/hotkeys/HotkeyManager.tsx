'use client'
import { useState, useEffect, useRef } from 'react'
import HotkeyInput from './HotkeyInput'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import Table from '@/components/table/Table'
import { useAlert } from '@/components/alert'
import { getHotkeyString } from '@/utils'
import { columns } from './columns'
import type { HotkeyRecord } from '../types'

export default function HotkeyManager({ onUpdate }: { onUpdate: () => void }) {
  const { showAlert } = useAlert()

  const [hotkey, setHotkey] = useState<string>('')
  const [contentList, setContentList] = useState<string[]>([''])
  const [sendDelay, setSendDelay] = useState<string>('')
  const [records, setRecords] = useState<Array<HotkeyRecord>>([])
  const [editingId, setEditingId] = useState<number | string | null>(null)

  const maxContentListLength = 2
  const hotkeyInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const records = localStorage.getItem('hotkeyRecords')
    if (records) {
      setRecords(JSON.parse(records))
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hotkeyInputRef.current || document.activeElement !== hotkeyInputRef.current) {
        console.log('document.activeElement', document.activeElement)
        console.log('hotkeyInputRef.current', hotkeyInputRef.current)
        return
      }

      e.preventDefault()

      const keyCombo = getHotkeyString(e)
      if (!keyCombo) return

      setHotkey(keyCombo)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleReset = () => {
    setHotkey('')
    setContentList([''])
    setSendDelay('')
    setEditingId(null)
  }

  const handleEditClick = (record: HotkeyRecord): void => {
    setHotkey(record.hotkey)
    setContentList(record.contentList)
    setSendDelay(record.sendDelay)
    setEditingId(record.id)
  }

  const handleUpdate = (isNew = false) => {
    const filterContentList = contentList.filter(c => c.trim())
    if (!hotkey.trim() || !filterContentList.length) {
      showAlert({
        type: 'error',
        title: '输入不完整',
        message: '请设置热键和内容',
        duration: 2000,
        position: 'center',
      })
      return
    }
    if (sendDelay.trim() === '' && filterContentList.length > 1) {
      showAlert({
        type: 'error',
        title: '输入不完整',
        message: '请设置发送间隔',
        duration: 2000,
        position: 'center',
      })
      return
    }
    let newRecords: HotkeyRecord[]
    if (isNew) {
      const newRecord: HotkeyRecord = {
        id: Date.now(),
        hotkey,
        contentList: filterContentList,
        sendDelay,
      }
      newRecords = [...records, newRecord]
    } else {
      newRecords = records.map(r => (r.id === editingId ? { ...r, hotkey, contentList: filterContentList, sendDelay } : r))
    }

    setRecords(newRecords)
    saveRecords(newRecords)
    handleReset()
  }

  const handleDelete = () => {
    if (editingId === null) return
    const newRecords = records.filter(r => r.id !== editingId)
    setRecords(newRecords)
    saveRecords(newRecords)
    handleReset()
  }

  const saveRecords = (records: HotkeyRecord[]) => {
    localStorage.setItem('hotkeyRecords', JSON.stringify(records))
    onUpdate()
  }

  const isUpdating = editingId !== null

  return (
    <div className="p-3">
      {/* 已插入的记录列表 */}
      <div style={{ marginBottom: 20 }}>
        <Table columns={columns} dataSource={records} onRowClick={handleEditClick} />
      </div>

      {/* 设置区域：热键输入 + 内容输入 + 按钮 */}
      <div>
        <div className="flex items-start mb-2 gap-2">
          <div className="w-30">
            <HotkeyInput ref={hotkeyInputRef} value={hotkey} />
            {contentList.length > 1 && (
              <div className="mt-2">
                <Input
                  variant="outlined"
                  value={sendDelay}
                  type="number"
                  fullWidth
                  onChange={e => setSendDelay(e.target.value)}
                  placeholder="发送间隔（毫秒）"
                />
              </div>
            )}
          </div>
          <div className="flex-1">
            {contentList.map((content, index) => (
              <div key={index}>
                <Input
                  className={index > 0 ? 'mt-2' : ''}
                  variant="outlined"
                  value={content}
                  fullWidth
                  onChange={e => setContentList(contentList.map((c, i) => (i === index ? e.target.value : c)))}
                  placeholder={`输入快捷键触发的第${index + 1}个命令`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <Button onClick={() => handleUpdate(true)} size="small" variant="primary">
              插入
            </Button>
          </div>
          <div>
            {isUpdating && (
              <Button onClick={() => handleUpdate()} size="small" className="ml-3">
                更新
              </Button>
            )}
            {isUpdating && (
              <Button onClick={handleDelete} size="small" variant="danger" className="ml-3">
                删除
              </Button>
            )}
            <Button onClick={handleReset} size="small" variant="outlined" className="ml-3">
              重置
            </Button>
            {contentList.length < maxContentListLength && (
              <Button onClick={() => setContentList([...contentList, ''])} size="small" variant="text">
                添加连招
              </Button>
            )}

            {contentList.length > 1 && (
              <Button onClick={() => setContentList(contentList.slice(0, -1))} size="small" variant="text">
                删除第{contentList.length}个连招
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
