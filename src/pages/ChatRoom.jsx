import ChatBox from "../components/ChatBox"
import SendMessage from "../components/SendMessage"

const ChatRoom = () => {
  return (
    <div className="chatboxHolder">
      <ChatBox/>
      <SendMessage/>
    </div>
  )
}

export default ChatRoom