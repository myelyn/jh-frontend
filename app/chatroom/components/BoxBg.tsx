export default function BoxBg() {
  return (
    <>
      <div className="absolute z-[2] top-0 left-0 w-5 h-5 bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-no-repeat"></div>
      <div className="absolute z-[2] top-0 right-0 w-5 h-5 bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-no-repeat rotate-90"></div>
      <div className="absolute z-[2] bottom-0 left-0 w-5 h-5 bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-no-repeat rotate-[270deg]"></div>
      <div className="absolute z-[2] bottom-0 right-0 w-5 h-5 bg-[url('/images/backgrounds/chatroom-bg-corner.png')] bg-no-repeat rotate-180"></div>
    </>
  );
}