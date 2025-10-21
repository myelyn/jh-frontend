export default function Bg() {
  return (
    <>
      <div className="absolute z-[2] top-0 left-0 w-[50px] h-[43px] bg-[url('/images/backgrounds/message-input-top-left.png')] bg-no-repeat"></div>
      <div className="absolute z-[2] top-0 right-0 w-[50px] h-[43px] bg-[url('/images/backgrounds/message-input-top-right.png')] bg-no-repeat"></div>
      <div className="absolute z-[2] bottom-0 left-0 w-[50px] h-[43px] bg-[url('/images/backgrounds/message-input-bottom-left.png')] bg-no-repeat"></div>
      <div className="absolute z-[2] bottom-0 right-0 w-[50px] h-[43px] bg-[url('/images/backgrounds/message-input-bottom-right.png')] bg-no-repeat"></div>
    </>
  )
}
