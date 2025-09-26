import { forwardRef } from 'react'
import { Input } from '@/components/input'

type HotkeyInputProps = {
  value: string
  placeholder?: string
}

const HotkeyInput = forwardRef<HTMLInputElement, HotkeyInputProps>(({ value, placeholder = '快捷键' }, ref) => {
  return <Input ref={ref} value={value} readOnly placeholder={placeholder} variant="outlined" size="small" fullWidth />
})

HotkeyInput.displayName = 'HotkeyInput'

export default HotkeyInput
