export interface HotkeyRecord extends Record<string, unknown> {
  id: number
  hotkey: string
  contentList: string[]
  sendDelay: string
}
