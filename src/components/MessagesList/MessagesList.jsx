import "./styles/MessagesList.css";

export default function MessagesList({ messagesList, isTyping }) {
  return (
    <div className="messages-list">
      {messagesList?.map((message, i) => {
        return (
          <div className={message.role + "-message-container"} key={i}>
            <p className={message.role + "-message"}>{message.content}</p>
          </div>
        );
      })}

      <p className="isTyping">{isTyping ? "chatGPT is typing..." : ""}</p>
    </div>
  );
}
