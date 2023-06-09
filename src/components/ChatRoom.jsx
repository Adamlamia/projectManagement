import ChatBox from "./ChatBox";
import SendMessage from "./SendMessage";

const ChatRoom = () => {
  return (
    <div className="chatRoomContainer">
      <ChatBox />
      <SendMessage />
    </div>
  );
};

export default ChatRoom;
