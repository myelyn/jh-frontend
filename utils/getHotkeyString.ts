export const getHotkeyString = (e: KeyboardEvent): string => {
  const parts: string[] = []

  if (e.ctrlKey) parts.push('ctrl')
  if (e.shiftKey) parts.push('shift')
  if (e.altKey) parts.push('alt')
  if (e.metaKey) parts.push('meta')

  // 获取实际的物理键位，而不是字符值
  let key = e.key.toLowerCase()

  // 如果是特殊字符，尝试从 code 获取物理键位
  if (e.altKey && e.code.startsWith('Key')) {
    // 从 code 中提取字母，如 "KeyA" -> "a"
    key = e.code.replace('Key', '').toLowerCase()
  }

  // 处理其他特殊情况
  if (e.code.startsWith('Key')) {
    key = e.code.replace('Key', '').toLowerCase()
  } else if (e.code.startsWith('Digit')) {
    key = e.code.replace('Digit', '')
  } else if (e.code.startsWith('Numpad')) {
    key = e.code.replace('Numpad', '')
  }

  // 过滤修饰键和空格
  if (key !== 'control' && key !== 'shift' && key !== 'alt' && key !== 'meta' && key !== ' ') {
    parts.push(key)
  }

  return parts.length > 0 ? parts.join('+') : ''
}
