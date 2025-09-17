import { TableColumn } from '@/components/table'
import { HotkeyRecord } from '../types'

export const columns: TableColumn[] = [
  {
    key: 'hotkey',
    title: '快捷键',
    dataIndex: 'hotkey',
    width: 160,
  },
  {
    key: 'contentList',
    title: '命令',
    dataIndex: 'contentList',
    render: (value: unknown, record: Record<string, unknown>): React.ReactNode => {
      const list = value as string[]
      const hotkeyRecord = record as HotkeyRecord
      return (
        <div className="flex flex-col">
          {list.map((content, index) => (
              <div key={index}>
              <div className="text-gray-900 text-xs">{content}</div>
              {index < list.length - 1 && <div className="text-gray-500 text-xs">延时：{hotkeyRecord.sendDelay}ms</div>}
              </div>
          ))}
        </div>
      )
    },
  },
]
