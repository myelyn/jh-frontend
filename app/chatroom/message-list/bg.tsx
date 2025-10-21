export default function BoxBg() {
  return (
    <>
      <div className="absolute z-[2] top-[-1px] left-[-1px] w-[22px] h-[22px] bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-cover rotate-180"></div>
      <div className="absolute z-[2] top-[-1px] right-[-1px] w-[22px] h-[22px] bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-cover rotate-270"></div>
      <div className="absolute z-[2] bottom-[-1px] left-[-1px] w-[22px] h-[22px] bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-cover rotate-90"></div>
      <div className="absolute z-[2] bottom-[-1px] right-[-1px] w-[22px] h-[22px] bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-cover"></div>
    </>
  )
}
