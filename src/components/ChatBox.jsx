import Message from "./Message";

const ChatBox = () => {

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours}:${minutes}`;
    return time;
  };

  const messages = [
    {
      id: 1,
      text: "Hello World 1",
      name: "Lord Lamia I ",
      time: getCurrentTime()
    },
    {
      id: 2,
      text: "Hello World 2",
      name: "Lord Lamia II ",
      time: getCurrentTime()
    },
  ];

  return (
    <div className="chatBoxContainer">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatBox;
